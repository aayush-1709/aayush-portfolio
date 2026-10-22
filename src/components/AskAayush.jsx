import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { answer, CONTEXT_TEXT, SUGGESTIONS } from '../data/knowledge';
import { track } from '../lib/analytics';
import Linkified from './Linkified';

const CHAT_API = import.meta.env.VITE_CHAT_API_URL;

const GREETING = {
  from: 'bot',
  text: "Hi! I'm a small assistant that answers from the content of this portfolio. Ask about projects, experience, skills or how to get in touch.",
};

const AskAayush = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [messages, open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const [busy, setBusy] = useState(false);

  const ask = async (q) => {
    const question = q.trim();
    if (!question || busy) return;
    setInput('');
    setMessages((m) => [...m, { from: 'me', text: question }]);

    // Optional LLM-backed answers (see api/chat.js); any failure falls back to the local answer.
    if (CHAT_API) {
      setBusy(true);
      try {
        const history = messages
          .filter((m) => m !== GREETING)
          .slice(-6)
          .map((m) => ({ role: m.from === 'me' ? 'user' : 'assistant', content: m.text }));
        const res = await fetch(CHAT_API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question, history, context: CONTEXT_TEXT() }),
        });
        if (!res.ok) throw new Error(String(res.status));
        const { reply } = await res.json();
        if (!reply) throw new Error('empty');
        track('ask_aayush', { matched: true, llm: true });
        setMessages((m) => [...m, { from: 'bot', text: reply }]);
        setBusy(false);
        return;
      } catch {
        setBusy(false);
      }
    }
    const { text, matched } = answer(question);
    track('ask_aayush', { matched, llm: false });
    setMessages((m) => [...m, { from: 'bot', text }]);
  };

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Ask about Aayush"
          className="fixed bottom-5 right-5 z-[60] inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:-translate-y-0.5"
        >
          <MessageCircle size={18} /> <span className="hidden sm:inline">Ask Aayush</span>
        </button>
      )}

      {open && (
        <div
          role="dialog"
          aria-label="Ask about Aayush"
          className="fixed bottom-5 right-5 z-[60] flex h-[28rem] max-h-[80vh] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
        >
          <div className="flex items-center justify-between bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-3 text-white">
            <p className="font-display font-semibold">Ask Aayush</p>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="rounded p-1 hover:bg-white/20">
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm" aria-live="polite">
            {messages.map((m, i) => (
              <div key={i} className={m.from === 'me' ? 'flex justify-end' : 'flex justify-start'}>
                <p
                  className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2 ${
                    m.from === 'me'
                      ? 'bg-indigo-500 text-white'
                      : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'
                  }`}
                >
                  {m.from === 'bot' ? <Linkified text={m.text} /> : m.text}
                </p>
              </div>
            ))}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => ask(s)}
                    className="rounded-full border border-indigo-200 px-3 py-1 text-xs font-medium text-indigo-700 hover:bg-indigo-50 dark:border-indigo-500/40 dark:text-indigo-300 dark:hover:bg-indigo-500/10"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            {busy && <p className="text-xs text-slate-400">Thinking…</p>}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
            className="flex items-center gap-2 border-t border-slate-200 p-3 dark:border-slate-700"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about projects, skills…"
              aria-label="Your question"
              className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
            <button type="submit" disabled={busy} aria-label="Send question" className="rounded-xl bg-indigo-500 p-2.5 text-white hover:bg-indigo-600">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AskAayush;
