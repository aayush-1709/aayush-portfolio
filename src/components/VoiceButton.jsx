import React, { useEffect, useRef, useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { listen, parseIntent, voiceSupported } from '../lib/voice';
import { track } from '../lib/analytics';

/** Mic button: say "projects", "dark mode", "open terminal", "cyber theme"… Hidden where speech recognition is unavailable. */
const VoiceButton = ({ onIntent }) => {
  const [listening, setListening] = useState(false);
  const [note, setNote] = useState('');
  const stopRef = useRef(null);
  const noteTimer = useRef(0);

  useEffect(
    () => () => {
      stopRef.current?.();
      clearTimeout(noteTimer.current);
    },
    [],
  );

  if (!voiceSupported) return null;

  const say = (text) => {
    setNote(text);
    clearTimeout(noteTimer.current);
    noteTimer.current = setTimeout(() => setNote(''), 3500);
  };

  const toggle = () => {
    if (listening) {
      stopRef.current?.();
      return;
    }
    setListening(true);
    say('Listening… try “projects” or “dark mode”');
    try {
      stopRef.current = listen({
        onResult: (alts) => {
          const intent = alts.map(parseIntent).find(Boolean);
          track('voice_command', { matched: Boolean(intent) });
          if (intent) {
            say(`Heard: “${alts[0]}”`);
            onIntent(intent);
          } else say(`Didn't catch a command in “${alts[0]}”`);
        },
        onError: (err) => say(err === 'not-allowed' ? 'Microphone permission was denied.' : 'Voice input unavailable right now.'),
        onEnd: () => setListening(false),
      });
    } catch {
      setListening(false);
      say('Voice input unavailable right now.');
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggle}
        aria-label={listening ? 'Stop voice control' : 'Start voice control'}
        aria-pressed={listening}
        className={`rounded-lg p-2 transition-colors ${
          listening
            ? 'bg-red-500/15 text-red-500'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
        }`}
      >
        {listening ? <MicOff size={19} className="animate-pulse" /> : <Mic size={19} />}
      </button>
      {note && (
        <p role="status" className="absolute right-0 top-full z-50 mt-2 w-60 rounded-lg bg-slate-900 px-3 py-2 text-xs text-slate-100 shadow-lg dark:bg-slate-700">
          {note}
        </p>
      )}
    </div>
  );
};

export default VoiceButton;
