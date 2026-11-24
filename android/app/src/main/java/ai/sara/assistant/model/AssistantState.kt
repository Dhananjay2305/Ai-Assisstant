package ai.sara.assistant.model

enum class AssistantState {
    IDLE,
    WAKE_WORD_DETECTED,
    LISTENING,
    THINKING,
    EXECUTING,
    SPEAKING,
    ERROR
}
