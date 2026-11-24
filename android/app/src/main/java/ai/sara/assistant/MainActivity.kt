package ai.sara.assistant

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import android.os.Bundle
import android.provider.Settings
import androidx.activity.ComponentActivity
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.compose.setContent
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.core.content.ContextCompat
import ai.sara.assistant.dispatcher.SaraActionDispatcher
import ai.sara.assistant.model.ActionHistoryItem
import ai.sara.assistant.service.SaraBackgroundVoiceService

class MainActivity : ComponentActivity() {

    private lateinit var dispatcher: SaraActionDispatcher

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        dispatcher = SaraActionDispatcher(applicationContext)

        setContent {
            SaraTheme {
                AssistantScreen(
                    onOpenDefaultAssistantSettings = {
                        try {
                            startActivity(Intent(Settings.ACTION_VOICE_INPUT_SETTINGS))
                        } catch (e: Exception) {
                            startActivity(Intent(Settings.ACTION_SETTINGS))
                        }
                    },
                    onToggleBackgroundService = { enable ->
                        if (enable) {
                            SaraBackgroundVoiceService.startService(applicationContext)
                        } else {
                            SaraBackgroundVoiceService.stopService(applicationContext)
                        }
                    },
                    onExecuteQuickCommand = { cmdText ->
                        val (command, _) = dispatcher.parseCommand(cmdText)
                        dispatcher.execute(command)
                    }
                )
            }
        }
    }
}

@Composable
fun SaraTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = darkColorScheme(
            background = Color(0xFF000000),
            surface = Color(0xFF09090B),
            primary = Color(0xFF0066FF),
            secondary = Color(0xFF38BDF8)
        ),
        content = content
    )
}

@Composable
fun AssistantScreen(
    onOpenDefaultAssistantSettings: () -> Unit,
    onToggleBackgroundService: (Boolean) -> Unit,
    onExecuteQuickCommand: (String) -> Unit
) {
    val isListeningActive by SaraBackgroundVoiceService.isListeningActive.collectAsState()
    val historyItems by SaraActionDispatcher.historyFlow.collectAsState()

    var hasAudioPermission by remember { mutableStateOf(false) }

    val permissionLauncher = rememberLauncherForActivityResult(
        ActivityResultContracts.RequestMultiplePermissions()
    ) { permissions ->
        hasAudioPermission = permissions[Manifest.permission.RECORD_AUDIO] == true
    }

    LaunchedEffect(Unit) {
        val permissions = mutableListOf(
            Manifest.permission.RECORD_AUDIO,
            Manifest.permission.READ_CONTACTS
        )
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            permissions.add(Manifest.permission.POST_NOTIFICATIONS)
        }
        permissionLauncher.launch(permissions.toTypedArray())
    }

    Scaffold(
        containerColor = Color.Black
    ) { padding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(horizontal = 20.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            item { Spacer(modifier = Modifier.height(16.dp)) }

            // 1. Header with SARA AI Logo
            item {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                        Box(
                            modifier = Modifier
                                .size(36.dp)
                                .clip(RoundedCornerShape(8.dp))
                                .background(Color(0xFF0066FF)),
                            contentAlignment = Alignment.Center
                        ) {
                            Text("S", color = Color.White, fontWeight = FontWeight.Bold, fontSize = 18.sp)
                        }
                        Column {
                            Text("SARA AI", color = Color.White, fontWeight = FontWeight.Bold, fontSize = 18.sp)
                            Text("Android System Assistant", color = Color.Gray, fontSize = 11.sp)
                        }
                    }

                    // Status Pill
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(6.dp),
                        modifier = Modifier
                            .clip(RoundedCornerShape(20.dp))
                            .background(Color(0xFF0F172A))
                            .border(1.dp, Color(0xFF1E293B), RoundedCornerShape(20.dp))
                            .padding(horizontal = 10.dp, vertical = 4.dp)
                    ) {
                        Box(
                            modifier = Modifier
                                .size(6.dp)
                                .clip(CircleShape)
                                .background(if (isListeningActive) Color(0xFF34D399) else Color.Gray)
                        )
                        Text(
                            text = if (isListeningActive) "Online" else "Standby",
                            color = Color.LightGray,
                            fontSize = 11.sp
                        )
                    }
                }
            }

            // 2. Default Digital Assistant System Banner
            item {
                Card(
                    shape = RoundedCornerShape(16.dp),
                    colors = CardDefaults.cardColors(containerColor = Color(0xFF0B132B)),
                    modifier = Modifier
                        .fillMaxWidth()
                        .border(1.dp, Color(0xFF1E3A8A), RoundedCornerShape(16.dp))
                ) {
                    Column(modifier = Modifier.padding(18.dp)) {
                        Text(
                            text = "Set as Default Phone Assistant",
                            color = Color.White,
                            fontWeight = FontWeight.SemiBold,
                            fontSize = 16.sp
                        )
                        Text(
                            text = "Enable SARA AI to respond from the home button, power button, and lock screen over any app.",
                            color = Color(0xFF94A3B8),
                            fontSize = 12.sp,
                            modifier = Modifier.padding(top = 4.dp, bottom = 12.dp)
                        )
                        Button(
                            onClick = onOpenDefaultAssistantSettings,
                            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF0066FF)),
                            shape = RoundedCornerShape(10.dp)
                        ) {
                            Icon(Icons.Default.Settings, contentDescription = null, modifier = Modifier.size(16.dp))
                            Spacer(modifier = Modifier.width(8.dp))
                            Text("Open Assistant Settings", fontSize = 13.sp)
                        }
                    }
                }
            }

            // 3. Always-On Background Service Card
            item {
                Card(
                    shape = RoundedCornerShape(16.dp),
                    colors = CardDefaults.cardColors(containerColor = Color(0xFF09090B)),
                    modifier = Modifier
                        .fillMaxWidth()
                        .border(1.dp, Color(0xFF27272A), RoundedCornerShape(16.dp))
                ) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(18.dp),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Column(modifier = Modifier.weight(1f)) {
                            Text(
                                text = "Background Voice Listening",
                                color = Color.White,
                                fontWeight = FontWeight.SemiBold,
                                fontSize = 15.sp
                            )
                            Text(
                                text = "Listen for \"Hey SARA\" even when website and apps are closed.",
                                color = Color.Gray,
                                fontSize = 12.sp,
                                modifier = Modifier.padding(top = 2.dp)
                            )
                        }
                        Switch(
                            checked = isListeningActive,
                            onCheckedChange = onToggleBackgroundService,
                            colors = SwitchDefaults.colors(checkedThumbColor = Color.White, checkedTrackColor = Color(0xFF0066FF))
                        )
                    }
                }
            }

            // 4. Test Supported Actions Section
            item {
                Text(
                    text = "Test Supported Actions",
                    color = Color.White,
                    fontWeight = FontWeight.SemiBold,
                    fontSize = 15.sp,
                    modifier = Modifier.padding(top = 8.dp)
                )
            }

            item {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    ActionChip("Open WhatsApp", Modifier.weight(1f)) { onExecuteQuickCommand("Open WhatsApp") }
                    ActionChip("Open YouTube", Modifier.weight(1f)) { onExecuteQuickCommand("Open YouTube") }
                }
            }

            item {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    ActionChip("Call Rahul", Modifier.weight(1f)) { onExecuteQuickCommand("Call Rahul") }
                    ActionChip("Study Mode", Modifier.weight(1f)) { onExecuteQuickCommand("Start Study Mode") }
                }
            }

            // 5. Action Execution Audit Log
            item {
                Text(
                    text = "Recent Action Execution Log",
                    color = Color.White,
                    fontWeight = FontWeight.SemiBold,
                    fontSize = 15.sp,
                    modifier = Modifier.padding(top = 12.dp)
                )
            }

            if (historyItems.isEmpty()) {
                item {
                    Text(
                        text = "No voice actions executed yet. Say \"Hey SARA, Open WhatsApp\" or tap a test button above.",
                        color = Color.Gray,
                        fontSize = 12.sp,
                        modifier = Modifier.padding(vertical = 8.dp)
                    )
                }
            } else {
                items(historyItems) { item ->
                    Card(
                        shape = RoundedCornerShape(10.dp),
                        colors = CardDefaults.cardColors(containerColor = Color(0xFF09090B)),
                        modifier = Modifier
                            .fillMaxWidth()
                            .border(1.dp, Color(0xFF1E293B), RoundedCornerShape(10.dp))
                    ) {
                        Column(modifier = Modifier.padding(12.dp)) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween
                            ) {
                                Text(item.commandText, color = Color.White, fontWeight = FontWeight.Medium, fontSize = 13.sp)
                                Text(item.targetApp, color = Color(0xFF38BDF8), fontSize = 11.sp)
                            }
                            Text(item.actionTaken, color = Color.Gray, fontSize = 11.sp, modifier = Modifier.padding(top = 2.dp))
                        }
                    }
                }
            }

            item { Spacer(modifier = Modifier.height(24.dp)) }
        }
    }
}

@Composable
fun ActionChip(label: String, modifier: Modifier = Modifier, onClick: () -> Unit) {
    Box(
        modifier = modifier
            .clip(RoundedCornerShape(12.dp))
            .background(Color(0xFF0F172A))
            .border(1.dp, Color(0xFF1E293B), RoundedCornerShape(12.dp))
            .clickable { onClick() }
            .padding(vertical = 12.dp, horizontal = 14.dp),
        contentAlignment = Alignment.Center
    ) {
        Text(text = label, color = Color.White, fontSize = 12.sp, fontWeight = FontWeight.Medium)
    }
}
