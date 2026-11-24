package ai.sara.assistant.service

import android.content.Context
import android.os.Bundle
import android.service.voice.VoiceInteractionSession
import android.view.Gravity
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import android.widget.TextView
import ai.sara.assistant.dispatcher.SaraActionDispatcher
import ai.sara.assistant.voice.SaraTextToSpeech

class SaraVoiceInteractionSession(context: Context) : VoiceInteractionSession(context) {

    private val dispatcher = SaraActionDispatcher(context)
    private var tts: SaraTextToSpeech? = null
    private var statusTextView: TextView? = null

    override fun onCreate() {
        super.onCreate()
        tts = SaraTextToSpeech(context)
    }

    override fun onCreateContentView(): View {
        val rootLayout = FrameLayout(context).apply {
            layoutParams = ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.WRAP_CONTENT
            )
            setBackgroundColor(0xEE09090B.toInt())
            setPadding(48, 48, 48, 64)
        }

        statusTextView = TextView(context).apply {
            text = "SARA AI: How can I help you?"
            setTextColor(0xFFFFFFFF.toInt())
            textSize = 18f
            gravity = Gravity.CENTER
        }

        rootLayout.addView(statusTextView)
        return rootLayout
    }

    override fun onShow(args: Bundle?, showFlags: Int) {
        super.onShow(args, showFlags)
        statusTextView?.text = "SARA AI: Listening..."
        tts?.speak("Yes, I'm listening.")
    }

    override fun onHandleAssist(data: Bundle?, structure: android.app.assist.AssistStructure?, content: android.app.assist.AssistContent?) {
        super.onHandleAssist(data, structure, content)
    }

    fun handleSpokenCommand(commandText: String) {
        statusTextView?.text = "SARA AI: $commandText"
        val (parsedCommand, spokenConfirm) = dispatcher.parseCommand(commandText)
        val result = dispatcher.execute(parsedCommand)

        tts?.speak(result.spokenConfirmation) {
            hide()
        }
    }

    override fun onDestroy() {
        tts?.shutdown()
        tts = null
        super.onDestroy()
    }
}
