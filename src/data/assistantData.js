// Comprehensive mock and real data for SARA AI

export const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', voiceCode: 'en-US', flag: '🌐' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', voiceCode: 'te-IN', flag: '🇮🇳' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी', voiceCode: 'hi-IN', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', native: 'मराठी', voiceCode: 'mr-IN', flag: '🇮🇳' },
];

export const APP_CATALOG = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    category: 'Communication',
    icon: 'MessageCircle',
    color: '#25D366',
    intent: 'android.intent.action.VIEW (com.whatsapp)',
    voiceCommands: [
      { en: 'Open WhatsApp', te: 'WhatsApp open cheyyi', hi: 'व्हाट्सएप खोलो', mr: 'व्हॉट्सॲप उघडा' },
      { en: 'Send message to Rahul', te: 'Rahul ki message pettu', hi: 'राहुल को मैसेज भेजो', mr: 'राहुलला मेसेज पाठवा' }
    ],
    supportedActions: ['Direct chat opening', 'Voice-to-text dictation', 'Media sharing intent', 'Group call prep']
  },
  {
    id: 'youtube',
    name: 'YouTube',
    category: 'Media',
    icon: 'Youtube',
    color: '#FF0000',
    intent: 'com.google.android.youtube',
    voiceCommands: [
      { en: 'Open YouTube', te: 'YouTube open cheyyi', hi: 'यूट्यूब खोलो', mr: 'यूट्यूब उघडा' },
      { en: 'Play lo-fi study music', te: 'Study music play cheyyi', hi: 'पढ़ाई के लिए संगीत चलाओ', mr: 'अभ्यासाचे संगीत लावा' }
    ],
    supportedActions: ['Video search queries', 'Channel subscriptions', 'Background audio prep', 'History playback']
  },
  {
    id: 'maps',
    name: 'Google Maps',
    category: 'Navigation',
    icon: 'MapPin',
    color: '#4285F4',
    intent: 'com.google.android.apps.maps',
    voiceCommands: [
      { en: 'Open Google Maps', te: 'Google Maps open cheyyi', hi: 'गूगल मैप्स खोलो', mr: 'गूगल मॅप्स उघडा' },
      { en: 'Navigate to college campus', te: 'College ki route chupinchu', hi: 'कॉलेज का रास्ता दिखाओ', mr: 'कॉलेजचा रस्ता दाखवा' }
    ],
    supportedActions: ['Turn-by-turn navigation', 'Real-time traffic preview', 'Saved places shortcut', 'ETA sharing']
  },
  {
    id: 'camera',
    name: 'Camera',
    category: 'Utilities',
    icon: 'Camera',
    color: '#E1306C',
    intent: 'android.media.action.IMAGE_CAPTURE',
    voiceCommands: [
      { en: 'Open Camera', te: 'Camera open cheyyi', hi: 'कैमरा खोलो', mr: 'कॅमेरा उघडा' },
      { en: 'Take a quick document photo', te: 'Document photo teesuko', hi: 'डॉक्यूमेंट की फोटो लो', mr: 'कागदपत्राचा फोटो घ्या' }
    ],
    supportedActions: ['Front/Rear camera toggle', 'OCR visual inspection', 'Quick snapshot intent', 'Flashlight sync']
  },
  {
    id: 'phone',
    name: 'Phone Dialer',
    category: 'System',
    icon: 'PhoneCall',
    color: '#10B981',
    intent: 'android.intent.action.CALL / DIAL',
    voiceCommands: [
      { en: 'Call Rahul', te: 'Rahul ki call cheyyi', hi: 'राहुल को कॉल करो', mr: 'राहुलला कॉल करा' },
      { en: 'Dial mom', te: 'Amma ki phone cheyyi', hi: 'मम्मी को फोन लगाओ', mr: 'आईला फोन करा' }
    ],
    supportedActions: ['Direct dial preparation', 'Speakerphone activation', 'Call log lookup', 'Voicemail trigger']
  },
  {
    id: 'settings',
    name: 'System Settings',
    category: 'System',
    icon: 'Settings',
    color: '#64748B',
    intent: 'android.settings.SETTINGS',
    voiceCommands: [
      { en: 'Open Settings', te: 'Settings open cheyyi', hi: 'सेटिंग्स खोलो', mr: 'सेटिंग्ज उघडा' },
      { en: 'Turn on Wi-Fi hotspot', te: 'Hotspot on cheyyi', hi: 'हॉटस्पॉट चालू करो', mr: 'हॉटस्पॉट सुरू करा' }
    ],
    supportedActions: ['Bluetooth & Wi-Fi toggle', 'Battery Saver mode', 'Do Not Disturb toggle', 'Display brightness']
  }
];

export const CONTACTS = [
  { id: '1', name: 'Rahul Sharma', role: 'Project Partner', phone: '+91 98765 43210', avatar: '👨‍💻', lastContacted: 'Today, 2:15 PM' },
  { id: '2', name: 'Priya Patel', role: 'Design Lead', phone: '+91 98112 34567', avatar: '👩‍🎨', lastContacted: 'Yesterday' },
  { id: '3', name: 'Mom (Amma)', role: 'Family', phone: '+91 99000 11223', avatar: '❤️', lastContacted: 'Today, 8:30 AM' },
  { id: '4', name: 'Prof. Sundaram', role: 'Project Mentor', phone: '+91 94440 55667', avatar: '👨‍🏫', lastContacted: '2 days ago' },
];

export const INITIAL_MEMORIES = [
  {
    id: 'mem-1',
    category: 'Language & Identity',
    key: 'Preferred Language',
    value: 'English with Telugu conversational commands',
    permissionApproved: true,
    timestamp: '2026-11-20',
  },
  {
    id: 'mem-2',
    category: 'Study & Projects',
    key: 'Current Capstone Project',
    value: 'SARA AI – Android Personal Assistant for College Innovation Expo',
    permissionApproved: true,
    timestamp: '2026-11-21',
  },
  {
    id: 'mem-3',
    category: 'Schedule',
    key: 'Daily Study Session',
    value: 'Starts at 7:00 PM every evening with Lo-Fi timer',
    permissionApproved: true,
    timestamp: '2026-11-22',
  },
  {
    id: 'mem-4',
    category: 'Contacts',
    key: 'Primary Emergency Contact',
    value: 'Mom (+91 99000 11223) with instant WhatsApp backup to Rahul',
    permissionApproved: true,
    timestamp: '2026-11-19',
  },
  {
    id: 'mem-5',
    category: 'Personal Routines',
    key: 'Night Routine Trigger',
    value: 'DND on, alarm at 6:30 AM, dim display to 15%',
    permissionApproved: true,
    timestamp: '2026-11-18',
  }
];

export const INITIAL_ROUTINES = [
  {
    id: 'routine-study',
    name: 'Study Mode',
    tagline: 'Deep focus, no distractions, active timer',
    icon: 'GraduationCap',
    color: '#38bdf8',
    voiceTrigger: 'Start Study Mode',
    active: true,
    steps: [
      { text: 'Activate Do Not Disturb on Android', icon: 'BellOff' },
      { text: 'Launch Notion / Study notes app', icon: 'BookOpen' },
      { text: 'Start 45-minute Pomodoro study timer', icon: 'Clock' },
      { text: 'Play Focus Lo-Fi beats playlist', icon: 'Headphones' },
      { text: 'Display today\'s pending assignment goals', icon: 'CheckSquare' }
    ]
  },
  {
    id: 'routine-work',
    name: 'Work / Meeting Mode',
    tagline: 'Schedule review, meetings list & prep notes',
    icon: 'Briefcase',
    color: '#818cf8',
    voiceTrigger: 'Start Work Mode',
    active: true,
    steps: [
      { text: 'Fetch calendar agenda for next 8 hours', icon: 'Calendar' },
      { text: 'Mute media volume and set ringtone to vibrate', icon: 'VolumeX' },
      { text: 'Prepare Google Meet link for 11:00 AM check-in', icon: 'Video' },
      { text: 'Display high-priority Slack/Email summaries', icon: 'Mail' }
    ]
  },
  {
    id: 'routine-morning',
    name: 'Morning Routine',
    tagline: 'Weather, daily briefings & battery health',
    icon: 'Sun',
    color: '#f59e0b',
    voiceTrigger: 'Good Morning SARA',
    active: true,
    steps: [
      { text: 'Speak current weather forecast (28°C Sunny)', icon: 'CloudSun' },
      { text: 'Read top 3 scheduled calendar events for today', icon: 'CalendarDays' },
      { text: 'Check device battery (92%) and remind to unplug', icon: 'BatteryCharging' },
      { text: 'Show motivational quote & project milestone', icon: 'Sparkles' }
    ]
  },
  {
    id: 'routine-sleep',
    name: 'Sleep / Bedtime Mode',
    tagline: 'Blue light filter, 6:30 AM alarm & night silence',
    icon: 'Moon',
    color: '#c084fc',
    voiceTrigger: 'Good Night SARA',
    active: false,
    steps: [
      { text: 'Set gentle wake-up alarm for 6:30 AM', icon: 'AlarmClock' },
      { text: 'Enable Android Bedtime / Night Shield tint', icon: 'EyeOff' },
      { text: 'Silence all non-emergency calls and notifications', icon: 'Shield' },
      { text: 'Offer 10-minute ambient sleep sounds', icon: 'Music' }
    ]
  }
];

export const SAMPLE_NOTIFICATIONS = [
  {
    id: 'notif-1',
    app: 'Gmail',
    sender: 'Prof. Sundaram',
    title: 'Final Capstone Project Review Scheduled',
    content: 'Tomorrow at 10:30 AM in Lab 3. Please bring SARA AI working prototype and slides.',
    time: '12m ago',
    priority: 'Urgent',
    extractedAction: 'Add calendar event: Lab 3 at 10:30 AM tomorrow',
    suggestedReply: 'Thank you Sir, the prototype is ready and I will be there at 10:20 AM.'
  },
  {
    id: 'notif-2',
    app: 'WhatsApp',
    sender: 'Rahul (Team 20)',
    title: 'Updated Android APK build',
    content: 'Hey, I pushed the voice intent service branch. Can you test speech recognition?',
    time: '24m ago',
    priority: 'High',
    extractedAction: 'Review GitHub commit & test voice service',
    suggestedReply: 'Checking the build right now, will update in 15 mins!'
  },
  {
    id: 'notif-3',
    app: 'Google Calendar',
    sender: 'Calendar Alert',
    title: 'Reminder: Study Session Starts in 30 Mins',
    content: 'Focus session: Android Accessibility Services & NLU pipelines.',
    time: '35m ago',
    priority: 'Normal',
    extractedAction: 'Prepare study notes & launch Study Mode',
    suggestedReply: 'SARA: Ready to activate Study Mode at 7:00 PM.'
  },
  {
    id: 'notif-4',
    app: 'Zomato / Swiggy',
    sender: 'Delivery Alert',
    title: 'Your order is out for delivery',
    content: 'Rider is 5 minutes away from your location.',
    time: '45m ago',
    priority: 'Low',
    extractedAction: 'No action required',
    suggestedReply: null
  }
];

export const CONTEXT_SCENARIOS = [
  {
    id: 'scenario-study',
    situation: 'User opens a PDF textbook & opens Notion at 7:00 PM',
    sensorInput: 'Time: 19:02 | App: Notion | Location: Study Desk',
    saraInference: 'Detected evening study habit from Personal Action Memory.',
    saraSuggestion: 'Would you like me to start Study Mode, mute notifications, and start a 45-minute timer?',
    quickAction: 'Activate Study Mode Now',
    icon: 'BookOpen',
    confidence: '98%'
  },
  {
    id: 'scenario-meeting',
    situation: 'Calendar event "Innovation Expo Pitch" begins in 10 minutes',
    sensorInput: 'Time: 10:50 AM | Calendar: Pitch Meeting | Mic: Quiet',
    saraInference: 'Upcoming high-stakes presentation requiring silent mode.',
    saraSuggestion: 'Your pitch starts in 10 mins. Set phone to vibration and open the project presentation slides?',
    quickAction: 'Prepare Meeting & Open Slides',
    icon: 'Presentation',
    confidence: '96%'
  },
  {
    id: 'scenario-navigation',
    situation: 'Phone connects to Car Bluetooth and user asks for Route',
    sensorInput: 'Bluetooth: Connected (Car Kit) | Speed: Moving',
    saraInference: 'User is commuting or preparing to travel.',
    saraSuggestion: 'Connected to Car Audio. Opening Google Maps navigation to your usual college route.',
    quickAction: 'Open Navigation with Voice Mode',
    icon: 'Navigation',
    confidence: '94%'
  },
  {
    id: 'scenario-repetitive',
    situation: 'User calls Rahul and opens WhatsApp every evening at 8 PM',
    sensorInput: 'Pattern: Action repeated 5 days consecutively',
    saraInference: 'Predictable communication routine identified.',
    saraSuggestion: 'I noticed you frequently check in with Rahul at 8 PM. Shall I create a 1-tap "Team Check-in" voice routine?',
    quickAction: 'Create "Team Check-in" Shortcut',
    icon: 'Repeat',
    confidence: '92%'
  }
];

export const VISUAL_DEMO_SAMPLES = [
  {
    id: 'sample-doc',
    title: 'Study Document / Notes',
    description: 'Summarize handwritten notes or textbook pages',
    badge: 'OCR & Summarization',
    previewText: 'Android Intent Architecture: An Intent is a messaging object you can use to request an action from another app component...',
    analysis: {
      type: 'Technical Document',
      keyPoints: [
        'Explains Android Intent system and IPC mechanism',
        'Covers Explicit vs Implicit Intents for voice triggering',
        'Recommends AccessibilityService for background voice assistance'
      ],
      suggestedAction: 'Save key definitions to Personal Study Memory'
    }
  },
  {
    id: 'sample-sign',
    title: 'Multilingual Street / Campus Sign',
    description: 'Real-time translation from Telugu / Hindi to English',
    badge: 'Translation & TTS',
    previewText: 'గ్రాంథాలయం మరియు అధ్యయన కేంద్రం (Library & Study Center) - నిశ్శబ్దంగా ఉండండి',
    analysis: {
      type: 'Bilingual Signage (Telugu & English)',
      keyPoints: [
        'Detected Language: Telugu (తెలుగు)',
        'Translation: "Library and Study Center - Please maintain silence"',
        'Context: Academic / Campus silent zone'
      ],
      suggestedAction: 'Enable silent mode automatically on campus'
    }
  },
  {
    id: 'sample-code',
    title: 'Code Snippet / Error Screen',
    description: 'Analyze Android Kotlin code or terminal stack trace',
    badge: 'Developer Assistant',
    previewText: 'val intent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH).apply { putExtra(EXTRA_LANGUAGE_MODEL, LANGUAGE_MODEL_FREE_FORM) }',
    analysis: {
      type: 'Kotlin Android Code',
      keyPoints: [
        'Initializes Android native Speech Recognition Intent',
        'Configures free-form conversational voice input',
        'Compatible with API Level 26+ (Android 8.0 to Android 15)'
      ],
      suggestedAction: 'Copy verified Kotlin snippet to clipboard'
    }
  }
];

export const ARCHITECTURE_STEPS = [
  {
    step: 1,
    title: 'Voice Input',
    subtitle: 'Microphone & Waveform Capture',
    desc: 'Continuously listens for wake-word "Hey SARA" or tap-to-talk with high-fidelity noise filtering.',
    icon: 'Mic',
    badge: '16kHz Audio Stream'
  },
  {
    step: 2,
    title: 'Speech Recognition',
    subtitle: 'Multilingual ASR Pipeline',
    desc: 'Converts spoken phonemes into text tokens across English, Telugu, Hindi, and regional dialects.',
    icon: 'AudioWaveform',
    badge: 'Fast Latency < 180ms'
  },
  {
    step: 3,
    title: 'AI Intent Understanding',
    subtitle: 'NLU & Entity Extraction',
    desc: 'Parses verbs, targets, temporal context, and sentiment (e.g. action: "CALL", target: "Rahul", time: "NOW").',
    icon: 'Cpu',
    badge: 'LLM Semantic Parsing'
  },
  {
    step: 4,
    title: 'Action Planning',
    subtitle: 'Dynamic Task Resolution',
    desc: 'Checks if request requires a single app launch, multi-step smart routine, or personal memory retrieval.',
    icon: 'GitFork',
    badge: 'Heuristic Planner'
  },
  {
    step: 5,
    title: 'Safety & Permission Check',
    subtitle: 'User Consent Verification',
    desc: 'Ensures sensitive actions (calling, payments, sharing location, deleting memories) require explicit confirmation.',
    icon: 'ShieldCheck',
    badge: 'Zero Silent Actions'
  },
  {
    step: 6,
    title: 'Android Action Execution',
    subtitle: 'OS & Intent Invocation',
    desc: 'Dispatches native Android Intents, Accessibility commands, Notification services, and dialers.',
    icon: 'Smartphone',
    badge: 'Android IPC'
  },
  {
    step: 7,
    title: 'Voice Response',
    subtitle: 'Natural Neural TTS',
    desc: 'Synthesizes warm, crystal-clear conversational replies in the user\'s preferred regional language.',
    icon: 'Volume2',
    badge: 'Natural Accent'
  },
  {
    step: 8,
    title: 'Memory Update',
    subtitle: 'Approved Context Persistence',
    desc: 'Stores approved preferences, new routines, or context notes to encrypted local device memory.',
    icon: 'Database',
    badge: 'User Controlled'
  }
];

export const ROADMAP_PHASES = [
  {
    phase: 'Phase 1',
    title: 'Voice Recognition & AI Conversation',
    status: 'Completed',
    desc: 'Multilingual speech-to-text, natural conversational engine, wake-word detection, and neural text-to-speech audio feedback.',
    deliverables: ['Real-time Web Speech / Android ASR', 'Telugu & Hindi NLU models', 'Conversational AI context engine', 'Interactive web demonstration']
  },
  {
    phase: 'Phase 2',
    title: 'App Launching & Mobile Actions',
    status: 'Completed',
    desc: 'Seamless invocation of WhatsApp, YouTube, Maps, Camera, and System Settings via voice commands and Android Intents.',
    deliverables: ['Android Implicit & Explicit Intents', 'Deep-linking support', 'App ecosystem catalog', 'Fail-safe error handling']
  },
  {
    phase: 'Phase 3',
    title: 'Calling, Messaging & Reminders',
    status: 'In Beta',
    desc: 'Contact recognition, voice dialing, WhatsApp message dictation, SMS integration, and temporal reminders with audio alerts.',
    deliverables: ['Fuzzy contact name matching', 'Voice message composition', 'Two-factor confirmation dialogs', 'Android AlarmManager sync']
  },
  {
    phase: 'Phase 4',
    title: 'Personal Memory & Smart Routines',
    status: 'In Progress',
    desc: 'Remembering user preferences, study schedules, custom commands, and multi-step routine orchestration (Study, Work, Sleep).',
    deliverables: ['Encrypted on-device SQLite / Room database', 'User memory dashboard', 'Custom voice macro creator', 'Routine automation runner']
  },
  {
    phase: 'Phase 5',
    title: 'Notification Intelligence & Context',
    status: 'Planned',
    desc: 'Android NotificationListenerService integration, AI-driven priority classification, smart summaries, and proactive suggestions.',
    deliverables: ['Notification filtering & summarization', 'Context sensor fusion (Time, GPS, BT)', 'Proactive AI recommendations', 'Spam/OTP isolation']
  },
  {
    phase: 'Phase 6',
    title: 'Full Android System Assistant & Launch',
    status: 'Future',
    desc: 'Default Assistant role on Android, offline edge AI processing, AccessibilityService deep automation, and Google Play Store launch.',
    deliverables: ['Android Assistant API certification', 'On-device quantized SLM (Gemma/Llama)', 'Accessibility automation engine', 'Public open-source release']
  }
];

export const TECH_STACK = [
  {
    category: 'Android Native',
    items: [
      { name: 'Kotlin', desc: 'Modern, concise, and type-safe primary Android programming language.' },
      { name: 'Android Studio Ladybug', desc: 'Official IDE for compiling, debugging, and profiling native services.' },
      { name: 'Jetpack Compose', desc: 'Modern declarative UI toolkit for fluid animations and reactive components.' }
    ]
  },
  {
    category: 'Artificial Intelligence',
    items: [
      { name: 'OpenAI API & NLU', desc: 'Advanced LLM reasoning for intent classification and multilingual understanding.' },
      { name: 'Speech Recognition (ASR)', desc: 'Android SpeechRecognizer & Web Speech API for low-latency voice capture.' },
      { name: 'Text-to-Speech (TTS)', desc: 'Neural speech synthesis supporting English, Telugu, Hindi, and Marathi.' },
      { name: 'AI Vision / OCR', desc: 'Multimodal vision models for reading documents, signs, and physical surroundings.' }
    ]
  },
  {
    category: 'Backend & Data',
    items: [
      { name: 'Supabase', desc: 'Scalable cloud infrastructure for sync, auth, and secure remote backup.' },
      { name: 'PostgreSQL & pgvector', desc: 'Relational storage and vector embeddings for semantic personal memory search.' }
    ]
  },
  {
    category: 'Mobile System Integration',
    items: [
      { name: 'Android Intents', desc: 'Standard IPC mechanism for launching external apps and passing action payloads.' },
      { name: 'AccessibilityService', desc: 'Authorized system-level automation for supported phone gestures and navigation.' },
      { name: 'Notification Listener', desc: 'Android permission-gated listener for reading and prioritizing notification cards.' },
      { name: 'Android Assistant APIs', desc: 'System hooks to register SARA as the default device voice assistant.' }
    ]
  },
  {
    category: 'Frontend & Showcase',
    items: [
      { name: 'React 19 & Vite', desc: 'High-performance interactive web demonstration and live simulator.' },
      { name: 'Tailwind CSS', desc: 'Custom futuristic dark-mode styling with glassmorphism and cyan glows.' },
      { name: 'Framer Motion', desc: 'Fluid 60fps animations, floating cards, and micro-interactions.' },
      { name: 'Lucide React', desc: 'Modern minimalist iconography across all assistant feature modules.' }
    ]
  }
];
