package ai.sara.assistant.model

sealed class VoiceCommand {
    data class OpenApp(val targetName: String, val packageName: String?) : VoiceCommand()
    data class PrepareCall(val contactName: String) : VoiceCommand()
    data class PrepareMessage(val contactName: String, val platform: String = "WhatsApp", val body: String = "") : VoiceCommand()
    data class SetReminder(val text: String, val timeString: String = "7:00 PM") : VoiceCommand()
    data class SetAlarm(val hour: Int, val minute: Int, val message: String = "SARA Alarm") : VoiceCommand()
    data class StartRoutine(val routineName: String) : VoiceCommand()
    data class OpenCamera(val mode: String = "photo") : VoiceCommand()
    data class OpenMaps(val query: String = "") : VoiceCommand()
    data class OpenSettings(val settingType: String = "general") : VoiceCommand()
    data class Unknown(val rawText: String) : VoiceCommand()
}
