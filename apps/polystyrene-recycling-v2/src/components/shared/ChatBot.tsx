"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useChat } from "@ai-sdk/react";
import { TextStreamChatTransport } from "ai";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";

// ─── Suggested prompts ───────────────────────────────────────────────────────

const SUGGESTED_PROMPTS = [
  "What is polystyrene?",
  "How do I recycle EPS?",
  "Is Styrofoam recyclable?",
  "Why not just ban polystyrene?",
];

// ─── Transport (text stream since our API uses toTextStreamResponse) ─────────

const chatTransport = new TextStreamChatTransport({
  api: "/api/chat",
});

// ─── Helper: extract text content from UIMessage parts ───────────────────────

function getMessageText(parts: Array<{ type: string; text?: string }>): string {
  return parts
    .filter((p) => p.type === "text" && p.text)
    .map((p) => p.text)
    .join("");
}

// ─── Loading dots animation ──────────────────────────────────────────────────

function LoadingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-muted-foreground/60"
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: chatTransport,
  });

  const isLoading = status === "submitted" || status === "streaming";

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, status]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Handle form submission
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = input.trim();
      if (!trimmed || isLoading) return;
      setInput("");
      sendMessage({ text: trimmed });
    },
    [input, isLoading, sendMessage]
  );

  // Handle suggested prompt click
  const handleSuggestedPrompt = useCallback(
    (prompt: string) => {
      setInput("");
      sendMessage({ text: prompt });
    },
    [sendMessage]
  );

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center group"
            aria-label="Open chat"
          >
            <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
            {/* Pulse indicator */}
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-background animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 w-[min(400px,calc(100vw-3rem))] h-[min(500px,calc(100vh-6rem))] flex flex-col glass rounded-2xl shadow-2xl border border-border/50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-card/80">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm leading-none">
                    PolystyreneGuy
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Recycling Expert
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {/* Welcome message if no messages */}
              {messages.length === 0 && (
                <div className="text-center py-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-1">
                    Hi! I&apos;m PolystyreneGuy
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Ask me anything about polystyrene recycling!
                  </p>

                  {/* Suggested prompts */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {SUGGESTED_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => handleSuggestedPrompt(prompt)}
                        className="text-xs px-3 py-1.5 rounded-full border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors text-muted-foreground hover:text-foreground"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Message list */}
              {messages.map((message) => {
                const text = getMessageText(message.parts as Array<{ type: string; text?: string }>);
                if (!text) return null;

                return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "flex gap-2",
                      message.role === "user"
                        ? "justify-end"
                        : "justify-start"
                    )}
                  >
                    {message.role === "assistant" && (
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                        <Bot className="h-3.5 w-3.5 text-primary" />
                      </div>
                    )}

                    <div
                      className={cn(
                        "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm",
                        message.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "bg-card border border-border/50 rounded-bl-md"
                      )}
                    >
                      {message.role === "assistant" ? (
                        <div className="prose prose-sm prose-invert max-w-none [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5 [&_h1]:text-base [&_h2]:text-sm [&_h3]:text-sm [&_code]:text-xs [&_code]:bg-muted/50 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {text}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <p>{text}</p>
                      )}
                    </div>

                    {message.role === "user" && (
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-muted flex items-center justify-center mt-0.5">
                        <User className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                    )}
                  </motion.div>
                );
              })}

              {/* Loading indicator */}
              {isLoading &&
                (messages.length === 0 ||
                  messages[messages.length - 1]?.role === "user") && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-2"
                  >
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                      <Bot className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div className="bg-card border border-border/50 rounded-2xl rounded-bl-md">
                      <LoadingDots />
                    </div>
                  </motion.div>
                )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input bar */}
            <form
              onSubmit={handleSubmit}
              className="px-4 py-3 border-t border-border/50 bg-card/80"
            >
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about polystyrene recycling..."
                  className="flex-1 h-10 text-sm rounded-full bg-muted/50 border-border/50 focus-visible:ring-primary/50"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={isLoading || !input.trim()}
                  className="h-10 w-10 rounded-full flex-shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
