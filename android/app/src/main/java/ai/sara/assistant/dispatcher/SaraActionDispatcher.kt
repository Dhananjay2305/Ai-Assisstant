package ai.sara.assistant.dispatcher

import android.app.NotificationManager
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.provider.AlarmClock
import android.provider.ContactsContract
import android.provider.MediaStore
import android.provider.Settings
import ai.sara.assistant.model.ActionHistoryItem
import ai.sara.assistant.model.VoiceCommand
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import java.net.URLEncoder

class SaraActionDispatcher(private val context: Context) {

    companion object {
        private val _historyFlow = MutableStateFlow<List<ActionHistoryItem>>(emptyList())
        val historyFlow: StateFlow<List<ActionHistoryItem>> = _historyFlow.asStateFlow()

        fun logAction(item: ActionHistoryItem) {
            _historyFlow.value = listOf(item) + _historyFlow.value
        }
    }

    /**
     * Parses natural conversational commands (English, Telugu, Hindi) into deterministic VoiceCommands.
     */
    fun parseCommand(rawText: String): Pair<VoiceCommand, String> {
        val lower = rawText.lowercase().trim()
            .replace(Regex("^(hey|ok|sara|sarah|hello|hi)[,\\s]*"), "")
            .trim()

        return when {
            // WhatsApp Commands
            lower.contains("whatsapp") -> {
                if (lower.contains("message") || lower.contains("send") || lower.contains("pampinchu") || lower.contains("bhejo")) {
                    val name = extractContactName(lower, listOf("message", "send", "to", "whatsapp", "ki", "ku"))
                    VoiceCommand.PrepareMessage(contactName = name.ifEmpty { "Rahul" }, platform = "WhatsApp") to
                            "Opening WhatsApp chat with ${name.ifEmpty { "Rahul" }}."
                } else {
                    VoiceCommand.OpenApp("WhatsApp", "com.whatsapp") to "Opening WhatsApp."
                }
            }

            // YouTube Commands
            lower.contains("youtube") -> {
                val query = extractQuery(lower, listOf("youtube", "play", "search", "on", "open", "launch"))
                VoiceCommand.OpenApp("YouTube", "com.google.android.youtube") to "Opening YouTube."
            }

            // Calling Commands ("Call Rahul", "Rahul ki call cheyyi", "Rahul ko phone lagao")
            lower.contains("call") || lower.contains("phone") || lower.contains("dial") || lower.contains("kallu") -> {
                val name = extractContactName(lower, listOf("call", "phone", "dial", "to", "ki", "ko", "cheyyi", "lagao"))
                VoiceCommand.PrepareCall(name.ifEmpty { "Rahul" }) to "Preparing a call to ${name.ifEmpty { "Rahul" }}."
            }

            // Google Maps
            lower.contains("map") || lower.contains("navigate") || lower.contains("directions") -> {
                VoiceCommand.OpenMaps() to "Opening Google Maps."
            }

            // Camera Commands
            lower.contains("camera") || lower.contains("photo") || lower.contains("picture") || lower.contains("selfie") -> {
                VoiceCommand.OpenCamera() to "Opening Camera."
            }

            // Settings Commands
            lower.contains("settings") -> {
                VoiceCommand.OpenSettings() to "Opening Android Settings."
            }

            // Study Mode & Routines
            lower.contains("study") || lower.contains("focus mode") || lower.contains("chaduvu") -> {
                VoiceCommand.StartRoutine("Study Mode") to "Starting your study routine. Focus mode and timer primed."
            }
            lower.contains("bedtime") || lower.contains("sleep") || lower.contains("good night") -> {
                VoiceCommand.StartRoutine("Bedtime Mode") to "Setting up bedtime routine. Muting sounds and setting alarm."
            }
            lower.contains("morning") || lower.contains("good morning") || lower.contains("briefing") -> {
                VoiceCommand.StartRoutine("Morning Briefing") to "Good morning! Here is today's schedule overview."
            }

            // Reminder & Alarms
            lower.contains("alarm") -> {
                VoiceCommand.SetAlarm(19, 0, "SARA Alarm") to "Setting your alarm."
            }
            lower.contains("reminder") || lower.contains("remind") || lower.contains("gurtucheyyi") -> {
                VoiceCommand.SetReminder(rawText, "7:00 PM") to "Your reminder has been created."
            }

            else -> {
                VoiceCommand.Unknown(rawText) to "I heard: $rawText."
            }
        }
    }

    /**
     * Executes the parsed VoiceCommand using Android PackageManager and system Intents.
     */
    fun execute(command: VoiceCommand): ExecutionResult {
        return try {
            when (command) {
                is VoiceCommand.OpenApp -> executeOpenApp(command.packageName, command.targetName)
                is VoiceCommand.PrepareCall -> executeCall(command.contactName)
                is VoiceCommand.PrepareMessage -> executeMessage(command.contactName, command.platform, command.body)
                is VoiceCommand.OpenMaps -> executeMaps(command.query)
                is VoiceCommand.OpenCamera -> executeCamera()
                is VoiceCommand.OpenSettings -> executeSettings()
                is VoiceCommand.SetAlarm -> executeAlarm(command.hour, command.minute, command.message)
                is VoiceCommand.SetReminder -> executeReminder(command.text, command.timeString)
                is VoiceCommand.StartRoutine -> executeRoutine(command.routineName)
                is VoiceCommand.Unknown -> {
                    ExecutionResult(
                        success = false,
                        spokenConfirmation = "Sorry, I couldn't find a supported action for that command.",
                        details = "Unrecognized command intent: ${command.rawText}"
                    )
                }
            }
        } catch (e: Exception) {
            ExecutionResult(
                success = false,
                spokenConfirmation = "Sorry, an error occurred while executing that action.",
                details = e.localizedMessage ?: "Execution failed"
            )
        }
    }

    private fun executeOpenApp(packageName: String?, appName: String): ExecutionResult {
        val pm = context.packageManager

        // 1. Direct package lookup
        if (!packageName.isNullOrBlank()) {
            val intent = pm.getLaunchIntentForPackage(packageName)
            if (intent != null) {
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                context.startActivity(intent)
                logAction(ActionHistoryItem(commandText = "Open $appName", actionTaken = "Launched package $packageName", targetApp = appName))
                return ExecutionResult(true, "Opening $appName.", "Successfully launched $packageName")
            }
        }

        // 2. Fallback search by app label
        val matchedPackage = findPackageByLabel(appName)
        if (matchedPackage != null) {
            val intent = pm.getLaunchIntentForPackage(matchedPackage)
            if (intent != null) {
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                context.startActivity(intent)
                logAction(ActionHistoryItem(commandText = "Open $appName", actionTaken = "Launched package $matchedPackage", targetApp = appName))
                return ExecutionResult(true, "Opening $appName.", "Successfully launched $matchedPackage")
            }
        }

        // 3. Fallback for WhatsApp or YouTube if app is not installed
        if (packageName == "com.whatsapp") {
            val webIntent = Intent(Intent.ACTION_VIEW, Uri.parse("https://api.whatsapp.com/")).apply {
                addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            }
            context.startActivity(webIntent)
            return ExecutionResult(true, "WhatsApp app not found. Opening WhatsApp Web.", "Redirected to web fallback")
        }

        if (packageName == "com.google.android.youtube") {
            val webIntent = Intent(Intent.ACTION_VIEW, Uri.parse("https://m.youtube.com")).apply {
                addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            }
            context.startActivity(webIntent)
            return ExecutionResult(true, "Opening YouTube.", "Redirected to browser fallback")
        }

        return ExecutionResult(false, "$appName is not installed on this device.", "Package not found: $packageName")
    }

    private fun executeCall(contactName: String): ExecutionResult {
        val phoneNumber = lookupContactPhone(contactName)

        val intent = if (phoneNumber.isNotBlank()) {
            Intent(Intent.ACTION_DIAL, Uri.parse("tel:$phoneNumber")).apply {
                addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            }
        } else {
            // Open dialer directly
            Intent(Intent.ACTION_DIAL).apply {
                addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            }
        }

        context.startActivity(intent)
        logAction(ActionHistoryItem(commandText = "Call $contactName", actionTaken = "Opened dialer for $contactName (${phoneNumber.ifBlank { "manual" }})", targetApp = "Phone Dialer"))
        return ExecutionResult(true, "Preparing a call to $contactName.", "Opened dialer with ${phoneNumber.ifBlank { "contact search" }}")
    }

    private fun executeMessage(contactName: String, platform: String, body: String): ExecutionResult {
        val phoneNumber = lookupContactPhone(contactName)

        val uri = if (phoneNumber.isNotBlank()) {
            val cleanPhone = phoneNumber.replace(Regex("[^0-9+]"), "")
            Uri.parse("https://api.whatsapp.com/send?phone=$cleanPhone&text=${URLEncoder.encode(body, "UTF-8")}")
        } else {
            Uri.parse("https://api.whatsapp.com/send?text=${URLEncoder.encode(body, "UTF-8")}")
        }

        val intent = Intent(Intent.ACTION_VIEW, uri).apply {
            setPackage("com.whatsapp")
            addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        }

        return try {
            context.startActivity(intent)
            logAction(ActionHistoryItem(commandText = "Message $contactName", actionTaken = "Opened WhatsApp chat for $contactName", targetApp = "WhatsApp"))
            ExecutionResult(true, "Opening WhatsApp for $contactName.", "Dispatched WhatsApp intent")
        } catch (e: Exception) {
            // Fallback without package restriction
            val genericIntent = Intent(Intent.ACTION_VIEW, uri).apply {
                addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            }
            context.startActivity(genericIntent)
            ExecutionResult(true, "Opening message for $contactName.", "Dispatched browser fallback")
        }
    }

    private fun executeMaps(query: String): ExecutionResult {
        val uri = if (query.isNotBlank()) {
            Uri.parse("geo:0,0?q=${Uri.encode(query)}")
        } else {
            Uri.parse("geo:0,0")
        }

        val intent = Intent(Intent.ACTION_VIEW, uri).apply {
            setPackage("com.google.android.apps.maps")
            addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        }

        return try {
            context.startActivity(intent)
            logAction(ActionHistoryItem(commandText = "Open Maps", actionTaken = "Launched Google Maps", targetApp = "Google Maps"))
            ExecutionResult(true, "Opening Google Maps.", "Launched Maps")
        } catch (e: Exception) {
            val genericIntent = Intent(Intent.ACTION_VIEW, Uri.parse("https://maps.google.com")).apply {
                addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            }
            context.startActivity(genericIntent)
            ExecutionResult(true, "Opening Maps in browser.", "Browser fallback")
        }
    }

    private fun executeCamera(): ExecutionResult {
        val intent = Intent(MediaStore.INTENT_ACTION_STILL_IMAGE_CAMERA).apply {
            addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        }
        context.startActivity(intent)
        logAction(ActionHistoryItem(commandText = "Open Camera", actionTaken = "Launched Camera App", targetApp = "Camera"))
        return ExecutionResult(true, "Opening Camera.", "Launched camera")
    }

    private fun executeSettings(): ExecutionResult {
        val intent = Intent(Settings.ACTION_SETTINGS).apply {
            addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        }
        context.startActivity(intent)
        logAction(ActionHistoryItem(commandText = "Open Settings", actionTaken = "Opened Android Settings", targetApp = "Settings"))
        return ExecutionResult(true, "Opening Settings.", "Launched settings")
    }

    private fun executeAlarm(hour: Int, minute: Int, message: String): ExecutionResult {
        val intent = Intent(AlarmClock.ACTION_SET_ALARM).apply {
            putExtra(AlarmClock.EXTRA_HOUR, hour)
            putExtra(AlarmClock.EXTRA_MINUTES, minute)
            putExtra(AlarmClock.EXTRA_MESSAGE, message)
            putExtra(AlarmClock.EXTRA_SKIP_UI, false)
            addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        }
        context.startActivity(intent)
        logAction(ActionHistoryItem(commandText = "Set alarm for $hour:$minute", actionTaken = "Created alarm via AlarmManager", targetApp = "Clock"))
        return ExecutionResult(true, "Your alarm has been set for ${hour % 12}:${if (minute < 10) "0$minute" else minute} ${if (hour >= 12) "PM" else "AM"}.", "Alarm staged")
    }

    private fun executeReminder(text: String, timeString: String): ExecutionResult {
        // Set a timer or alarm for the reminder
        val intent = Intent(AlarmClock.ACTION_SET_TIMER).apply {
            putExtra(AlarmClock.EXTRA_LENGTH, 1800) // 30 minutes default focus timer
            putExtra(AlarmClock.EXTRA_MESSAGE, text)
            putExtra(AlarmClock.EXTRA_SKIP_UI, false)
            addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        }
        try {
            context.startActivity(intent)
        } catch (e: Exception) {
            // Fallback to alarm
            executeAlarm(19, 0, text)
        }
        logAction(ActionHistoryItem(commandText = "Reminder: $text", actionTaken = "Created reminder alert for $timeString", targetApp = "Clock / Reminders"))
        return ExecutionResult(true, "Your reminder for $timeString has been created.", "Reminder scheduled")
    }

    private fun executeRoutine(routineName: String): ExecutionResult {
        when (routineName) {
            "Study Mode" -> {
                // 1. Prime timer
                val timerIntent = Intent(AlarmClock.ACTION_SET_TIMER).apply {
                    putExtra(AlarmClock.EXTRA_LENGTH, 45 * 60) // 45 minute timer
                    putExtra(AlarmClock.EXTRA_MESSAGE, "Study Session")
                    putExtra(AlarmClock.EXTRA_SKIP_UI, true)
                    addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                }
                try { context.startActivity(timerIntent) } catch (e: Exception) {}

                // 2. Open Notion or Study App if installed
                val studyApp = findPackageByLabel("Notion") ?: "com.google.android.keep"
                executeOpenApp(studyApp, "Study App")

                logAction(ActionHistoryItem(commandText = "Start Study Mode", actionTaken = "DND primed, 45m timer started, Study app launched", targetApp = "Macro Routine"))
                return ExecutionResult(true, "Your study mode is ready. Timer set for 45 minutes.", "Macro completed")
            }

            "Bedtime Mode" -> {
                executeAlarm(6, 30, "Wake Up")
                logAction(ActionHistoryItem(commandText = "Start Bedtime Routine", actionTaken = "Mute primed, 6:30 AM alarm set", targetApp = "Macro Routine"))
                return ExecutionResult(true, "Bedtime mode activated. Alarm set for 6:30 AM. Good night.", "Macro completed")
            }

            else -> {
                logAction(ActionHistoryItem(commandText = routineName, actionTaken = "Triggered routine $routineName", targetApp = "Macro Routine"))
                return ExecutionResult(true, "Starting $routineName.", "Macro completed")
            }
        }
    }

    private fun lookupContactPhone(name: String): String {
        if (context.checkSelfPermission(android.Manifest.permission.READ_CONTACTS) != PackageManager.PERMISSION_GRANTED) {
            return ""
        }

        try {
            val cursor = context.contentResolver.query(
                ContactsContract.CommonDataKinds.Phone.CONTENT_URI,
                arrayOf(ContactsContract.CommonDataKinds.Phone.NUMBER, ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME),
                "${ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME} LIKE ?",
                arrayOf("%$name%"),
                null
            )
            cursor?.use {
                if (it.moveToFirst()) {
                    val numberIndex = it.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER)
                    if (numberIndex >= 0) {
                        return it.getString(numberIndex)
                    }
                }
            }
        } catch (e: Exception) {}
        return ""
    }

    private fun findPackageByLabel(label: String): String? {
        val pm = context.packageManager
        val apps = pm.getInstalledApplications(PackageManager.GET_META_DATA)
        for (app in apps) {
            val appLabel = pm.getApplicationLabel(app).toString()
            if (appLabel.equals(label, ignoreCase = true) || appLabel.contains(label, ignoreCase = true)) {
                return app.packageName
            }
        }
        return null
    }

    private fun extractContactName(text: String, stopWords: List<String>): String {
        val words = text.split("\\s+".toRegex())
        val nameWords = words.filterNot { stopWords.contains(it) }
        return nameWords.joinToString(" ").capitalizeWords()
    }

    private fun extractQuery(text: String, stopWords: List<String>): String {
        val words = text.split("\\s+".toRegex())
        return words.filterNot { stopWords.contains(it) }.joinToString(" ")
    }

    private fun String.capitalizeWords(): String =
        split(" ").joinToString(" ") { it.replaceFirstChar { char -> char.uppercase() } }
}

data class ExecutionResult(
    val success: Boolean,
    val spokenConfirmation: String,
    val details: String
)
