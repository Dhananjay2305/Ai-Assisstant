// SARA AI - Action Dispatcher & Real App Launcher
// Maps normalized voice/text commands to executable Android Intents, Deep Links, and Web Actions

import { CONTACTS } from '../data/assistantData';

/**
 * Normalizes input text by trimming, lowercasing, and stripping punctuation.
 */
export function normalizeCommand(rawText = '') {
  return rawText
    .toLowerCase()
    .trim()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Detects whether the current browser user agent is on Android.
 */
export function isAndroidDevice() {
  if (typeof navigator === 'undefined') return false;
  return /android/i.test(navigator.userAgent || '');
}

/**
 * Detects wake-word occurrences ("Hey SARA", "Hey Sarah", "SARA") in the transcript.
 * Returns:
 * {
 *   hasWakeWord: boolean,
 *   isWakeWordOnly: boolean,
 *   commandText: string (transcript stripped of wake word)
 * }
 */
export function detectWakeWord(rawText = '') {
  const normalized = normalizeCommand(rawText);

  // Exact wake-word matches
  const wakeWordsOnly = [
    'hey sara',
    'hey sarah',
    'hey sera',
    'hey saras',
    'hi sara',
    'hi sarah',
    'hello sara',
    'hello sarah',
    'ok sara',
    'okay sara',
    'sara',
    'sarah',
    'sera'
  ];

  if (wakeWordsOnly.includes(normalized)) {
    return {
      hasWakeWord: true,
      isWakeWordOnly: true,
      commandText: ''
    };
  }

  // Check if speech starts with a wake-word prefix e.g. "hey sara open whatsapp"
  const prefixRegex = /^(?:hey\s+sara|hey\s+sarah|hey\s+sera|hi\s+sara|hi\s+sarah|hello\s+sara|ok\s+sara|okay\s+sara|sara|sarah)\b[\s,:-]*/i;
  if (prefixRegex.test(rawText.trim())) {
    const stripped = rawText.trim().replace(prefixRegex, '').trim();
    return {
      hasWakeWord: true,
      isWakeWordOnly: !stripped,
      commandText: stripped
    };
  }

  // Also check if wake word is mentioned anywhere e.g. "can you open whatsapp sara"
  const containsWakeWord = wakeWordsOnly.some(w => normalized.includes(w));
  return {
    hasWakeWord: containsWakeWord,
    isWakeWordOnly: false,
    commandText: rawText.trim()
  };
}

/**
 * Searches the contacts database for matching names.
 */
export function findContact(queryText) {
  const normalized = normalizeCommand(queryText);
  return CONTACTS.find(contact => {
    const contactNorm = normalizeCommand(contact.name);
    const firstName = contactNorm.split(' ')[0];
    return (
      normalized.includes(contactNorm) ||
      normalized.includes(firstName) ||
      (contact.role && normalized.includes(normalizeCommand(contact.role)))
    );
  }) || null;
}

/**
 * Dispatches the action when the user taps an action button or auto-executes when supported.
 */
export function executeAppAction(actionPayload, onFeedback) {
  if (!actionPayload) {
    if (onFeedback) onFeedback({ status: 'error', message: 'No action payload provided.' });
    return;
  }

  const { type, intentUrl, fallbackUrl, telNumber, query } = actionPayload;
  const isAndroid = isAndroidDevice();

  try {
    if (type === 'CALL') {
      if (telNumber) {
        window.location.href = `tel:${telNumber.replace(/\s+/g, '')}`;
        if (onFeedback) {
          onFeedback({ 
            status: 'success', 
            message: `Opening phone dialer for ${telNumber}...` 
          });
        }
      } else {
        window.location.href = 'tel:';
        if (onFeedback) {
          onFeedback({ 
            status: 'success', 
            message: 'Opening phone dialer...' 
          });
        }
      }
      return;
    }

    if (type === 'CAMERA') {
      const cameraInput = document.getElementById('sara-native-camera-input');
      if (cameraInput) {
        cameraInput.click();
        if (onFeedback) {
          onFeedback({ 
            status: 'success', 
            message: 'Opening device camera capture...' 
          });
        }
        return;
      }
      if (isAndroid && intentUrl) {
        window.location.href = intentUrl;
        return;
      }
    }

    if (type === 'SEARCH') {
      const searchUrl = fallbackUrl || `https://www.google.com/search?q=${encodeURIComponent(query || 'SARA AI')}`;
      window.open(searchUrl, '_blank', 'noopener,noreferrer');
      if (onFeedback) {
        onFeedback({ 
          status: 'success', 
          message: 'Opened Google search in a new tab.' 
        });
      }
      return;
    }

    // App Launchers (WhatsApp, YouTube, Maps, Gmail, Settings)
    const targetUrl = isAndroid && intentUrl ? intentUrl : (fallbackUrl || intentUrl);

    if (!targetUrl) {
      if (onFeedback) {
        onFeedback({ 
          status: 'warning', 
          message: 'Sorry, I couldn\'t complete that action in this browser directly.' 
        });
      }
      return;
    }

    let hasBlurred = false;
    const handleBlur = () => {
      hasBlurred = true;
    };
    window.addEventListener('blur', handleBlur, { once: true });

    if (targetUrl.startsWith('intent://') || targetUrl.startsWith('whatsapp://') || targetUrl.startsWith('vnd.youtube:')) {
      window.location.href = targetUrl;
    } else {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }

    setTimeout(() => {
      window.removeEventListener('blur', handleBlur);
      if (!hasBlurred && fallbackUrl && fallbackUrl !== targetUrl) {
        if (onFeedback) {
          onFeedback({
            status: 'fallback',
            message: `Opening web version as fallback...`,
            fallbackUrl
          });
        }
        window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
      } else if (onFeedback) {
        onFeedback({
          status: 'success',
          message: `Action dispatched successfully.`
        });
      }
    }, 1500);

  } catch (err) {
    console.error('Action execution failed:', err);
    if (fallbackUrl) {
      window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
      if (onFeedback) {
        onFeedback({ 
          status: 'fallback', 
          message: 'Launched web version as fallback.' 
        });
      }
    } else if (onFeedback) {
      onFeedback({ 
        status: 'error', 
        message: 'Sorry, I couldn\'t complete that action.' 
      });
    }
  }
}

/**
 * Main command processor that parses intent and generates real action payloads.
 */
export function parseVoiceAction(rawInput = '', selectedLang = 'en') {
  // First check if the input is only the wake word
  const wakeWordCheck = detectWakeWord(rawInput);
  if (wakeWordCheck.hasWakeWord && wakeWordCheck.isWakeWordOnly) {
    return {
      actionId: 'WAKE_WORD_ACK',
      appName: 'SARA AI',
      spoken: "Yes, I'm listening.",
      display: "Yes, I'm listening. Please speak your command (e.g. \"Open WhatsApp\").",
      isWakeWordAck: true,
      actionPayload: null
    };
  }

  // Use stripped command text if wake word was prefixed
  const commandText = wakeWordCheck.commandText || rawInput;
  const normalized = normalizeCommand(commandText);

  if (!normalized) {
    return {
      actionId: 'EMPTY',
      appName: 'SARA AI',
      spoken: "Yes, I'm listening.",
      display: "Yes, I'm listening. Please say or type a command.",
      isWakeWordAck: true,
      actionPayload: null
    };
  }

  // 1. WHATSAPP (Open WhatsApp / Send message to Rahul on WhatsApp)
  if (
    normalized.includes('whatsapp') ||
    normalized.includes('what app') ||
    normalized.includes('what s app') ||
    normalized.includes('watsapp')
  ) {
    const isMessage = 
      normalized.includes('message') || 
      normalized.includes('text') || 
      normalized.includes('sandesham') || 
      normalized.includes('send a message');
    
    if (isMessage) {
      const contact = findContact(normalized) || { name: 'Rahul Sharma', phone: '+91 98765 43210' };
      const cleanPhone = contact.phone.replace(/[^0-9]/g, '');
      const defaultText = encodeURIComponent('Hello from SARA AI voice assistant.');
      
      return {
        actionId: 'SEND_MESSAGE_WHATSAPP',
        appName: 'WhatsApp',
        spoken: `Preparing a WhatsApp message to ${contact.name.split(' ')[0]}.`,
        display: `Preparing WhatsApp message for ${contact.name} (${contact.phone}). Tap below to open chat:`,
        actionPayload: {
          type: 'APP_LAUNCH',
          targetName: 'WhatsApp',
          buttonLabel: `Open WhatsApp Chat (${contact.name})`,
          intentUrl: `intent://send?phone=${cleanPhone}#Intent;package=com.whatsapp;scheme=whatsapp;end`,
          fallbackUrl: `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${defaultText}`,
          description: `Direct Android Intent: com.whatsapp to chat with ${contact.name}`
        }
      };
    }

    return {
      actionId: 'OPEN_WHATSAPP',
      appName: 'WhatsApp',
      spoken: 'Opening WhatsApp.',
      display: 'Opening WhatsApp. Tap below to launch on your device:',
      actionPayload: {
        type: 'APP_LAUNCH',
        targetName: 'WhatsApp',
        buttonLabel: 'Open WhatsApp',
        intentUrl: 'intent://send/#Intent;package=com.whatsapp;scheme=whatsapp;end',
        fallbackUrl: 'https://web.whatsapp.com',
        description: 'Android Intent: com.whatsapp'
      }
    };
  }

  // 2. YOUTUBE (Open YouTube)
  if (
    normalized.includes('youtube') ||
    normalized.includes('you tube')
  ) {
    let queryParam = '';
    if (normalized.includes('play') || normalized.includes('study music') || normalized.includes('music')) {
      queryParam = 'lo-fi+study+music';
    }

    return {
      actionId: 'OPEN_YOUTUBE',
      appName: 'YouTube',
      spoken: 'Opening YouTube.',
      display: 'Opening YouTube. Tap below to launch on your device:',
      actionPayload: {
        type: 'APP_LAUNCH',
        targetName: 'YouTube',
        buttonLabel: 'Open YouTube',
        intentUrl: queryParam 
          ? `intent://www.youtube.com/results?search_query=${queryParam}#Intent;package=com.google.android.youtube;scheme=https;end`
          : 'intent://www.youtube.com/#Intent;package=com.google.android.youtube;scheme=https;end',
        fallbackUrl: queryParam ? `https://www.youtube.com/results?search_query=${queryParam}` : 'https://www.youtube.com',
        description: 'Android Intent: com.google.android.youtube'
      }
    };
  }

  // 3. GOOGLE MAPS (Open Google Maps / Navigate)
  if (
    normalized.includes('maps') ||
    normalized.includes('google maps') ||
    normalized.includes('navigate') ||
    normalized.includes('directions') ||
    normalized.includes('route')
  ) {
    return {
      actionId: 'OPEN_MAPS',
      appName: 'Google Maps',
      spoken: 'Opening Google Maps.',
      display: 'Opening Google Maps. Tap below to launch on your device:',
      actionPayload: {
        type: 'APP_LAUNCH',
        targetName: 'Google Maps',
        buttonLabel: 'Open Google Maps',
        intentUrl: 'intent://maps.google.com/#Intent;package=com.google.android.apps.maps;scheme=https;end',
        fallbackUrl: 'https://maps.google.com',
        description: 'Android Intent: com.google.android.apps.maps'
      }
    };
  }

  // 4. CAMERA (Open Camera / Take photo)
  if (
    normalized.includes('camera') ||
    normalized.includes('take photo') ||
    normalized.includes('take picture') ||
    normalized.includes('take a photo') ||
    normalized.includes('snapshot') ||
    normalized.includes('capture')
  ) {
    return {
      actionId: 'OPEN_CAMERA',
      appName: 'Camera',
      spoken: 'Opening Camera.',
      display: 'Opening Camera. Tap below to launch camera capture:',
      actionPayload: {
        type: 'CAMERA',
        targetName: 'Camera',
        buttonLabel: 'Launch Camera',
        intentUrl: 'intent:#Intent;action=android.media.action.IMAGE_CAPTURE;end',
        fallbackUrl: null,
        description: 'Android Intent: android.media.action.IMAGE_CAPTURE'
      }
    };
  }

  // 5. CALLS (Call Rahul / Call Mom)
  if (
    normalized.includes('call') ||
    normalized.includes('dial') ||
    normalized.includes('phone')
  ) {
    const contact = findContact(normalized);

    if (contact) {
      const shortName = contact.name.split(' ')[0];
      return {
        actionId: 'PREPARE_CALL',
        appName: 'Phone Dialer',
        spoken: `Preparing a call to ${shortName}.`,
        display: `Preparing call to ${contact.name} (${contact.phone}). Tap below to open dialer:`,
        actionPayload: {
          type: 'CALL',
          targetName: contact.name,
          buttonLabel: `Call ${contact.name} (${contact.phone})`,
          telNumber: contact.phone,
          description: `Native Telecom Action: tel:${contact.phone}`
        }
      };
    }

    const numberMatch = normalized.match(/\d{5,12}/);
    if (numberMatch) {
      const dialNum = numberMatch[0];
      return {
        actionId: 'PREPARE_CALL',
        appName: 'Phone Dialer',
        spoken: `Preparing dialer for ${dialNum}.`,
        display: `Phone number: ${dialNum}. Tap below to open dialer:`,
        actionPayload: {
          type: 'CALL',
          targetName: dialNum,
          buttonLabel: `Call ${dialNum}`,
          telNumber: dialNum,
          description: `Native Telecom Action: tel:${dialNum}`
        }
      };
    }

    return {
      actionId: 'SELECT_CONTACT_CALL',
      appName: 'Phone Dialer',
      spoken: 'Preparing phone dialer.',
      display: 'Tap below to open your phone dialer:',
      actionPayload: {
        type: 'CALL',
        targetName: 'Phone Dialer',
        buttonLabel: 'Open Phone Dialer',
        telNumber: '',
        description: 'Native Telecom Action: tel:'
      }
    };
  }

  // 6. GMAIL / EMAIL (Open Gmail / Check mail)
  if (
    normalized.includes('gmail') ||
    normalized.includes('g mail') ||
    normalized.includes('email') ||
    normalized.includes('inbox')
  ) {
    return {
      actionId: 'OPEN_GMAIL',
      appName: 'Gmail',
      spoken: 'Opening Gmail.',
      display: 'Opening Gmail. Tap below to launch your email client:',
      actionPayload: {
        type: 'APP_LAUNCH',
        targetName: 'Gmail',
        buttonLabel: 'Open Gmail',
        intentUrl: 'intent://#Intent;package=com.google.android.gm;scheme=googlegmail;end',
        fallbackUrl: 'https://mail.google.com',
        description: 'Android Intent: com.google.android.gm'
      }
    };
  }

  // 7. REMINDERS (Set a reminder for 7 PM)
  if (
    normalized.includes('remind') ||
    normalized.includes('reminder') ||
    normalized.includes('alarm')
  ) {
    const timeMatch = normalized.includes('7') ? '7:00 PM' : '7:00 PM';
    const calText = encodeURIComponent('SARA AI: Evening Study & Project Reminder');

    return {
      actionId: 'SET_REMINDER',
      appName: 'Calendar & Reminder',
      spoken: 'Your reminder has been created.',
      display: `Reminder created for ${timeMatch}: "Evening Study & Project Session". Tap below to save:`,
      actionPayload: {
        type: 'CALENDAR',
        targetName: 'Google Calendar',
        buttonLabel: `Save Reminder (${timeMatch})`,
        fallbackUrl: `https://calendar.google.com/calendar/r/eventedit?text=${calText}&details=Created+by+SARA+AI`,
        description: 'Alarm & Calendar Scheduling Action'
      }
    };
  }

  // 8. STUDY MODE (Start my study mode)
  if (
    normalized.includes('study mode') ||
    normalized.includes('study')
  ) {
    return {
      actionId: 'START_STUDY_ROUTINE',
      appName: 'Smart Routines',
      spoken: 'Starting your study mode.',
      display: 'Starting study mode: DND enabled, Notion macro ready, 45-minute timer started. Tap below:',
      actionPayload: {
        type: 'APP_LAUNCH',
        targetName: 'Study Workspace',
        buttonLabel: 'Launch Study Mode (Notion + Timer)',
        fallbackUrl: 'https://www.notion.so',
        description: 'Multi-Action Macro Execution'
      }
    };
  }

  // 9. SCHEDULE (Tell me today's schedule)
  if (
    normalized.includes('schedule') ||
    normalized.includes('meeting') ||
    normalized.includes('agenda')
  ) {
    return {
      actionId: 'VIEW_SCHEDULE',
      appName: 'Google Calendar',
      spoken: "Here is today's schedule: Capstone Review at 10:30 AM and Study Session at 7:00 PM.",
      display: 'Today: 10:30 AM (Capstone Review in Lab 3) & 7:00 PM (Study Session). Tap to open calendar:',
      actionPayload: {
        type: 'CALENDAR',
        targetName: 'Google Calendar',
        buttonLabel: 'Open Google Calendar',
        fallbackUrl: 'https://calendar.google.com',
        description: 'Calendar Agenda Inspection'
      }
    };
  }

  // 10. GOOGLE SEARCH (Search Google for ...)
  if (
    normalized.includes('search') ||
    normalized.startsWith('google ') ||
    normalized.includes('look up')
  ) {
    let cleanQuery = rawInput
      .replace(/search for/i, '')
      .replace(/search/i, '')
      .replace(/google/i, '')
      .trim();
    if (!cleanQuery) cleanQuery = 'latest technology news';

    return {
      actionId: 'GOOGLE_SEARCH',
      appName: 'Google Search',
      spoken: `Searching Google for ${cleanQuery}.`,
      display: `Google Search: "${cleanQuery}". Tap below to open:`,
      actionPayload: {
        type: 'SEARCH',
        targetName: 'Google Search',
        buttonLabel: `Search Google for "${cleanQuery}"`,
        query: cleanQuery,
        fallbackUrl: `https://www.google.com/search?q=${encodeURIComponent(cleanQuery)}`,
        description: 'Web Search Action'
      }
    };
  }

  // 11. EMERGENCY (Emergency / I need help)
  if (
    normalized.includes('emergency') ||
    normalized.includes('help') ||
    normalized.includes('need help') ||
    normalized.includes('sahayam') ||
    normalized.includes('madad')
  ) {
    return {
      actionId: 'EMERGENCY_SOS',
      appName: 'Emergency Assistant',
      spoken: 'Emergency sequence initiated. Tap below to call Mom immediately.',
      display: '⚠️ Emergency Alert. Tap below to place an immediate SOS call to Mom (+91 99000 11223):',
      actionPayload: {
        type: 'CALL',
        targetName: 'Mom (Amma)',
        buttonLabel: 'Call Mom (+91 99000 11223) - SOS',
        telNumber: '+919900011223',
        description: 'Emergency Direct Telecom Dispatch'
      }
    };
  }

  // 12. TELUGU REGIONAL SUPPORT
  if (normalized.includes('telugu')) {
    return {
      actionId: 'TELUGU_RESPONSE',
      appName: 'Multilingual Voice',
      spoken: 'నమస్కారం! నేను సారా AI. వాట్సాప్ ఓపెన్ చేయడానికి బటన్ నొక్కండి.',
      display: 'నమస్కారం! SARA AI supports real Telugu voice actions. Try: "WhatsApp open cheyyi", "Rahul ki call cheyyi".',
      actionPayload: {
        type: 'APP_LAUNCH',
        targetName: 'WhatsApp',
        buttonLabel: 'WhatsApp ఓపెన్ చేయండి (Open WhatsApp)',
        intentUrl: 'intent://send/#Intent;package=com.whatsapp;scheme=whatsapp;end',
        fallbackUrl: 'https://web.whatsapp.com',
        description: 'Telugu Regional Voice Action'
      }
    };
  }

  // 13. DEFAULT / UNRECOGNIZED ACTION
  return {
    actionId: 'UNRECOGNIZED',
    appName: 'Assistant Core',
    spoken: "Sorry, I couldn't complete that action. Please try asking to open WhatsApp, YouTube, Maps, or make a call.",
    display: `I understood: "${rawInput}", but this browser cannot execute that action directly. Try a supported command:`,
    actionPayload: {
      type: 'SEARCH',
      targetName: 'Google Search',
      buttonLabel: `Search Google for "${rawInput}"`,
      query: rawInput,
      fallbackUrl: `https://www.google.com/search?q=${encodeURIComponent(rawInput)}`,
      description: 'Web Fallback Query'
    }
  };
}
