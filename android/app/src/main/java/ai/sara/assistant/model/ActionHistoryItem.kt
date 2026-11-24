package ai.sara.assistant.model

data class ActionHistoryItem(
    val id: String = java.util.UUID.randomUUID().toString(),
    val commandText: String,
    val actionTaken: String,
    val targetApp: String,
    val timestamp: Long = System.currentTimeMillis(),
    val success: Boolean = true
)
