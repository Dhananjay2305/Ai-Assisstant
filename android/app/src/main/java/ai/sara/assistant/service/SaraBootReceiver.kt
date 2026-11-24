package ai.sara.assistant.service

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent

class SaraBootReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        if (intent.action == Intent.ACTION_BOOT_COMPLETED) {
            val prefs = context.getSharedPreferences("sara_settings", Context.MODE_PRIVATE)
            val autoStart = prefs.getBoolean("auto_start_on_boot", true)
            if (autoStart) {
                SaraBackgroundVoiceService.startService(context)
            }
        }
    }
}
