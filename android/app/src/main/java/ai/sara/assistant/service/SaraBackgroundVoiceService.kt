package ai.sara.assistant.service

import android.app.Notification
import android.app.PendingIntent
import android.app.Service
import android.content.Context
import android.content.Intent
import android.os.IBinder
import androidx.core.app.NotificationCompat
import ai.sara.assistant.MainActivity
import ai.sara.assistant.R
import ai.sara.assistant.SaraApplication
import ai.sara.assistant.dispatcher.SaraActionDispatcher
import ai.sara.assistant.voice.SaraTextToSpeech
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class SaraBackgroundVoiceService : Service() {

    companion object {
        const val NOTIFICATION_ID = 2026
        const val ACTION_START = "ai.sara.assistant.START_BACKGROUND"
        const val ACTION_STOP = "ai.sara.assistant.STOP_BACKGROUND"
        const val ACTION_PAUSE = "ai.sara.assistant.PAUSE_BACKGROUND"

        private val _isListeningActive = MutableStateFlow(false)
        val isListeningActive: StateFlow<Boolean> = _isListeningActive

        fun startService(context: Context) {
            val intent = Intent(context, SaraBackgroundVoiceService::class.java).apply {
                action = ACTION_START
            }
            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
                context.startForegroundService(intent)
            } else {
                context.startService(intent)
            }
        }

        fun stopService(context: Context) {
            val intent = Intent(context, SaraBackgroundVoiceService::class.java).apply {
                action = ACTION_STOP
            }
            context.startService(intent)
        }
    }

    private val serviceScope = CoroutineScope(Dispatchers.Main + Job())
    private lateinit var actionDispatcher: SaraActionDispatcher
    private var textToSpeech: SaraTextToSpeech? = null
    private var isPaused = false

    override fun onCreate() {
        super.onCreate()
        actionDispatcher = SaraActionDispatcher(applicationContext)
        textToSpeech = SaraTextToSpeech(applicationContext)
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        when (intent?.action) {
            ACTION_STOP -> {
                shutdownAssistant()
                stopSelf()
                return START_NOT_STICKY
            }
            ACTION_PAUSE -> {
                isPaused = !isPaused
                updateForegroundNotification(if (isPaused) "Paused - Tap to Resume" else "Listening for 'Hey SARA'")
            }
            else -> {
                startForegroundAssistant()
            }
        }
        return START_STICKY
    }

    private fun startForegroundAssistant() {
        _isListeningActive.value = true
        isPaused = false
        val notification = createNotification("Listening for \"Hey SARA\"...")
        startForeground(NOTIFICATION_ID, notification)
        beginVoiceStandbyLoop()
    }

    private fun beginVoiceStandbyLoop() {
        serviceScope.launch {
            // Standby acoustic monitoring loop for "Hey SARA"
        }
    }

    fun handleDetectedCommand(transcript: String) {
        if (isPaused) return

        val (command, _) = actionDispatcher.parseCommand(transcript)
        val result = actionDispatcher.execute(command)

        textToSpeech?.speak(result.spokenConfirmation)
        updateForegroundNotification("Executed: ${result.spokenConfirmation}")
    }

    private fun createNotification(statusText: String): Notification {
        val appIntent = Intent(this, MainActivity::class.java)
        val pendingIntent = PendingIntent.getActivity(
            this,
            0,
            appIntent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )

        val stopIntent = Intent(this, SaraBackgroundVoiceService::class.java).apply {
            action = ACTION_STOP
        }
        val stopPendingIntent = PendingIntent.getService(
            this,
            1,
            stopIntent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )

        return NotificationCompat.Builder(this, SaraApplication.CHANNEL_ID)
            .setContentTitle("SARA AI Background Assistant")
            .setContentText(statusText)
            .setSmallIcon(R.drawable.ic_notification_sara)
            .setContentIntent(pendingIntent)
            .addAction(R.drawable.ic_notification_sara, "Stop", stopPendingIntent)
            .setOngoing(true)
            .setPriority(NotificationCompat.PRIORITY_LOW)
            .build()
    }

    private fun updateForegroundNotification(newStatus: String) {
        val notification = createNotification(newStatus)
        val manager = getSystemService(Context.NOTIFICATION_SERVICE) as android.app.NotificationManager
        manager.notify(NOTIFICATION_ID, notification)
    }

    private fun shutdownAssistant() {
        _isListeningActive.value = false
        textToSpeech?.shutdown()
        textToSpeech = null
    }

    override fun onDestroy() {
        shutdownAssistant()
        super.onDestroy()
    }

    override fun onBind(intent: Intent?): IBinder? = null
}
