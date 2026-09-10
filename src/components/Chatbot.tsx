"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Chatbot() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = language === "en"
    ? ["What are Fariz's core skills?", "Tell me about Hemdal.", "Which project used AI?", "How can I contact Fariz?"]
    : ["Apa keahlian utama Fariz?", "Ceritakan tentang Hemdal.", "Proyek mana yang memakai AI?", "Bagaimana menghubungi Fariz?"];

  const greeting = language === "en"
    ? "Hi! I can walk you through Fariz’s experience, project contributions, and technical focus."
    : "Halo! Saya bisa menjelaskan pengalaman, kontribusi proyek, dan fokus teknis Fariz.";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async (textToSend: string) => {
    const content = textToSend.trim();
    if (!content || isLoading || content.length > 4000) return;

    const userMessage: Message = { role: "user", content };
    const chatHistory = [...messages, userMessage].slice(-20);
    setMessages(chatHistory);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatHistory }),
      });
      const data: { content?: unknown; error?: unknown } = await response.json().catch(() => ({}));
      const assistantContent = typeof data.content === "string" ? data.content.trim() : "";
      if (!response.ok || !assistantContent) {
        throw new Error(typeof data.error === "string" ? data.error : "The chat service is unavailable");
      }
      setMessages((current) => [...current, { role: "assistant" as const, content: assistantContent }].slice(-20));
    } catch (error) {
      console.error("Portfolio chatbot error:", error);
      setMessages((current) => [
        ...current,
        {
          role: "assistant" as const,
          content: language === "en"
            ? "The AI gateway is not available right now. Please reach out through email or LinkedIn instead."
            : "Gateway AI sedang tidak tersedia. Silakan hubungi Fariz melalui email atau LinkedIn.",
        },
      ].slice(-20));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="hm-chatbot fixed bottom-5 right-5 z-50 flex flex-col items-end sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {isOpen && (
          <motion.section
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="hm-chat-window mb-3 flex h-[min(620px,calc(100vh-120px))] w-[min(390px,calc(100vw-2.5rem))] flex-col overflow-hidden"
            aria-label={language === "en" ? "Fariz AI assistant" : "Asisten AI Fariz"}
          >
            <header className="hm-chat-header flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="hm-chat-avatar"><Sparkles size={17} aria-hidden="true" /></div>
                <div>
                  <h2 className="hm-chat-title">{language === "en" ? "Fariz AI Assistant" : "Asisten AI Fariz"}</h2>
                  <p className="hm-chat-status"><span aria-hidden="true" />{isLoading ? (language === "en" ? "Working" : "Memproses") : "Ready"}</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hm-chat-close" aria-label="Close chat">
                <X size={17} aria-hidden="true" />
              </button>
            </header>

            <div className="hm-chat-messages flex-1 overflow-y-auto p-4" aria-live="polite">
              <div className="hm-chat-bubble hm-chat-bubble-assistant">{greeting}</div>
              <div className="mt-4 space-y-3">
                {messages.map((message, index) => (
                  <div key={`${message.role}-${index}`} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
                    <div className={cn("hm-chat-bubble", message.role === "user" ? "hm-chat-bubble-user" : "hm-chat-bubble-assistant")}>
                      {message.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="hm-chat-bubble hm-chat-bubble-assistant flex items-center gap-2">
                      <Loader2 size={14} className="animate-spin" aria-hidden="true" />
                      {language === "en" ? "Checking project context…" : "Memeriksa konteks proyek…"}
                    </div>
                  </div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </div>

            {messages.length === 0 && (
              <div className="hm-chat-suggestions">
                <p>{language === "en" ? "Try asking" : "Coba tanyakan"}</p>
                <div className="space-y-1.5">
                  {suggestions.map((suggestion) => (
                    <button key={suggestion} onClick={() => handleSend(suggestion)}>{suggestion}</button>
                  ))}
                </div>
              </div>
            )}

            <form
              className="hm-chat-form flex items-center gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                handleSend(input);
              }}
            >
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                maxLength={4000}
                placeholder={language === "en" ? "Ask about the work…" : "Tanyakan tentang karya…"}
                aria-label={language === "en" ? "Ask the AI assistant" : "Tanya asisten AI"}
              />
              <button type="submit" disabled={!input.trim() || isLoading} aria-label={language === "en" ? "Send message" : "Kirim pesan"}>
                <Send size={15} aria-hidden="true" />
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setIsOpen((open) => !open)}
        className="hm-chat-toggle"
        aria-label={isOpen ? "Close chat" : "Open Fariz AI assistant"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={22} aria-hidden="true" /> : <MessageCircle size={22} aria-hidden="true" />}
        <span>{isOpen ? "" : (language === "en" ? "Ask Fariz AI" : "Tanya AI Fariz")}</span>
      </motion.button>
    </div>
  );
}
