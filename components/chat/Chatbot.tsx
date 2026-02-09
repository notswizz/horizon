"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

type Message = { role: "user" | "assistant"; content: string };

const WELCOME =
  "Hi! I'm here to help with questions about Horizon Energy South and free home energy upgrades in Georgia. What would you like to know?";

const TYPEWRITER_MS = 20;

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: WELCOME },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [typingIndex, setTypingIndex] = useState<number>(-1);
  const [typingLength, setTypingLength] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingLength, loading, scrollToBottom]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      scrollToBottom();
    }
  }, [open, scrollToBottom]);

  // Focus trap: keep Tab cycling inside the chat modal
  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;

      const focusable = dialog!.querySelectorAll<HTMLElement>(
        'button, input, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Typewriter: when a new assistant message is added, animate its display
  useEffect(() => {
    if (typingIndex < 0 || typingIndex >= messages.length) return;
    const msg = messages[typingIndex];
    if (msg.role !== "assistant") return;
    const targetLen = msg.content.length;
    if (typingLength >= targetLen) {
      setTypingIndex(-1);
      return;
    }
    const t = setTimeout(() => {
      setTypingLength((prev) => Math.min(prev + 1, targetLen));
    }, TYPEWRITER_MS);
    return () => clearTimeout(t);
  }, [typingIndex, typingLength, messages]);

  function clearChat() {
    setMessages([{ role: "assistant", content: WELCOME }]);
    setTypingIndex(-1);
    setTypingLength(0);
    setError(null);
  }

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setError(null);
    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              data.error ||
              "Something went wrong. You can call us at (404) 446-6668 or use the contact form.",
          },
        ]);
        setError(data.error || "Request failed");
        return;
      }
      setMessages((prev) => {
        const assistantMessage: Message = { role: "assistant", content: data.message };
        const next = [...prev, assistantMessage];
        const assistantIndex = next.length - 1;
        setTimeout(() => {
          setTypingIndex(assistantIndex);
          setTypingLength(0);
        }, 0);
        return next;
      });
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I couldn't reach the server. Please try again or call (404) 446-6668.",
        },
      ]);
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating button — offset on mobile to avoid overlapping form buttons */}
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-20 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-orange to-amber text-white shadow-lg shadow-orange/30 transition hover:shadow-orange/40 focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:ring-offset-charcoal sm:bottom-6"
        aria-label="Open chat"
        initial={false}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <ChatBubbleLeftRightIcon className="h-7 w-7" />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-charcoal/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-label="Chat with Horizon Energy South"
              aria-modal="true"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-6 right-6 z-50 flex h-[calc(100vh-6rem)] max-h-[580px] w-[calc(100vw-3rem)] max-w-md flex-col overflow-hidden rounded-2xl border border-white/10 bg-charcoal shadow-2xl shadow-black/50"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 bg-charcoal/95 px-5 py-4 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange to-amber text-white shadow-lg shadow-orange/30">
                    <ChatBubbleLeftRightIcon className="h-5 w-5" />
                  </div>
                  <h2 className="text-lg font-bold tracking-tight text-white">
                    Horizon Energy South
                  </h2>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={clearChat}
                    className="rounded-lg p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
                    aria-label="Clear chat"
                    title="Clear chat"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="rounded-lg p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
                    aria-label="Close chat"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto bg-[#0d0d0d] p-4">
                <div className="space-y-4">
                  {messages.map((msg, i) => {
                    const isTyping = msg.role === "assistant" && i === typingIndex;
                    const displayContent = isTyping
                      ? msg.content.slice(0, typingLength)
                      : msg.content;
                    const showCaret = isTyping && typingLength < msg.content.length;
                    return (
                      <div
                        key={i}
                        className={`flex ${
                          msg.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                            msg.role === "user"
                              ? "bg-gradient-to-br from-orange to-amber text-white shadow-lg shadow-orange/20"
                              : "bg-white/5 text-gray-100 border border-white/10 backdrop-blur-sm"
                          }`}
                        >
                          <p className="whitespace-pre-wrap leading-relaxed">
                            {displayContent}
                            {showCaret && (
                              <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-amber" />
                            )}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="rounded-2xl bg-white/5 border border-white/10 px-4 py-3">
                        <span className="inline-flex gap-1.5 text-gray-400">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange" />
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber [animation-delay:0.2s]" />
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange [animation-delay:0.4s]" />
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="border-t border-white/10 bg-charcoal/95 p-4 backdrop-blur-xl">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    send();
                  }}
                  className="flex gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask anything..."
                    className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-orange/50 focus:outline-none focus:ring-1 focus:ring-orange/30"
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange to-amber text-white shadow-lg shadow-orange/20 transition hover:shadow-orange/30 disabled:opacity-50 disabled:hover:shadow-orange/20"
                    aria-label="Send message"
                  >
                    <PaperAirplaneIcon className="h-5 w-5" />
                  </button>
                </form>
                {error && (
                  <p className="mt-2 text-xs text-amber">{error}</p>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
