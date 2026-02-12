// src/Pages/AIChat.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Bot,
  Send,
  Mic,
  Copy,
  Volume2,
  Zap,
  MapPin,
  Baby,
  Clock,
  MessageSquare,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import Data_Service from "../Service/data.service";

const nowHM = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export default function AIChat() {
  const { t, i18n } = useTranslation();

  const [messages, setMessages] = useState(() => [
    { role: "assistant", content: t("greeting"), timestamp: nowHM() },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Speech (optional)
  const [recognition, setRecognition] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [listeningTranscript, setListeningTranscript] = useState("");

  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  // faqat send qilganda ishlatamiz
  const scrollToBottom = (smooth = true) => {
    const el = bottomRef.current;
    if (!el) return;
    el.scrollIntoView({
      behavior: smooth ? "smooth" : "auto",
      block: "end",
    });
  };

  // FAQ
  const faqQuestions = useMemo(
    () => [
      { question: t("faq_location"), category: t("faq_category_location"), icon: <MapPin className="w-4 h-4" /> },
      { question: t("faq_age"), category: t("faq_category_age"), icon: <Baby className="w-4 h-4" /> },
      { question: t("faq_language"), category: t("faq_category_language"), icon: <span>🇬🇧</span> },
      { question: t("faq_price"), category: t("faq_category_price"), icon: <span>💵</span> },
      { question: t("faq_budget"), category: t("faq_category_budget"), icon: <span>📈</span> },
      { question: t("faq_new"), category: t("faq_category_new"), icon: <span>✨</span> },
      { question: t("faq_24h"), category: t("faq_category_time"), icon: <Clock className="w-4 h-4" /> },
      { question: t("faq_special"), category: t("faq_category_care"), icon: <span>🤝</span> },
    ],
    [t]
  );

  // Til o‘zgarsa greeting update bo‘lsin (chatni reset qilmaymiz)
  useEffect(() => {
    setMessages((prev) => {
      if (!prev.length) return [{ role: "assistant", content: t("greeting"), timestamp: nowHM() }];
      const first = prev[0];
      if (first.role !== "assistant") return prev;
      return [{ ...first, content: t("greeting") }, ...prev.slice(1)];
    });
    // MUHIM: bu joyda scroll YO'Q!
  }, [t, i18n.language]);

  // Speech recognition init (til bo‘yicha)
  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setRecognition(null);
      return;
    }

    const rec = new SR();
    rec.continuous = false;
    rec.interimResults = true;
    rec.lang = i18n.language === "ru" ? "ru-RU" : i18n.language === "en" ? "en-US" : "uz-UZ";

    rec.onstart = () => {
      setIsRecording(true);
      setListeningTranscript("");
    };

    rec.onresult = (event) => {
      let interim = "";
      let finalT = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const tr = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalT += tr;
        else interim += tr;
      }
      if (finalT) setInput((p) => (p ? `${p} ${finalT}` : finalT));
      setListeningTranscript(interim);
    };

    rec.onerror = () => setIsRecording(false);
    rec.onend = () => {
      setIsRecording(false);
      setListeningTranscript("");
    };

    setRecognition(rec);

    return () => {
      try {
        rec.onstart = null;
        rec.onresult = null;
        rec.onerror = null;
        rec.onend = null;
        rec.stop();
      } catch {}
    };
  }, [i18n.language]);

  const toggleRecording = () => {
    if (!recognition) {
      alert(t("speech_not_supported"));
      return;
    }
    try {
      if (isRecording) recognition.stop();
      else recognition.start();
    } catch {
      setIsRecording(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
  };

  const speakText = (text) => {
    try {
      if (!("speechSynthesis" in window)) return;
      const u = new SpeechSynthesisUtterance(text);
      u.lang = i18n.language === "ru" ? "ru-RU" : i18n.language === "en" ? "en-US" : "uz-UZ";
      u.rate = 0.9;
      speechSynthesis.speak(u);
    } catch {}
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    // user msg
    setMessages((prev) => [...prev, { role: "user", content: text, timestamp: nowHM() }]);
    setInput("");
    setLoading(true);

    // FAQAT yozganda pastga tushsin
    setTimeout(() => scrollToBottom(false), 0);

    try {
      const res = await Data_Service.Chat(text);

      const botText =
        typeof res?.data === "string"
          ? res.data
          : res?.data?.response || t("error_message");

      setMessages((prev) => [...prev, { role: "assistant", content: botText, timestamp: nowHM() }]);

      // bot msg kelganda ham pastga tushsin
      setTimeout(() => scrollToBottom(true), 0);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: t("error_message"), timestamp: nowHM() },
      ]);
      setTimeout(() => scrollToBottom(true), 0);
    } finally {
      setLoading(false);
      // Sahifa refresh bo'lganda fokus/scroll bo'lmasin:
      // fokusni faqat send tugagandan keyin beramiz (scroll emas)
      setTimeout(() => textareaRef.current?.focus(), 50);
    }
  };

  const handleFaqClick = (q) => {
    // FAQ bosilganda scroll bo'lmaydi
    setInput(q);
    // xohlasang fokus ham bermaymiz:
    // textareaRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-900 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:text-white transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 dark:from-indigo-600 dark:to-purple-600">
              <Bot className="text-white" size={20} />
            </div>
            <h1 className="text-xl font-bold">
              <span>{t("app_name")}</span>
              <span className="bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
                {" "}
                {t("ai_chat")}
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm bg-green-100 text-green-700 dark:bg-gray-800 dark:text-green-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>{t("online")}</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Chat */}
          <main className="lg:w-2/3">
            <div
              className="rounded-2xl overflow-hidden flex flex-col bg-white/95 backdrop-blur border border-white/50 shadow-xl dark:bg-gray-800/90 dark:border-gray-700"
              style={{ height: "calc(100vh - 180px)" }}
            >
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6" style={{ overscrollBehavior: "contain" }}>
                <div className="space-y-6">
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[85%] ${msg.role === "user" ? "ml-4" : "mr-4"}`}>
                        <div
                          className={`rounded-2xl px-4 py-3 ${
                            msg.role === "user"
                              ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-br-none dark:from-blue-600 dark:to-cyan-600"
                              : "bg-gray-50 text-gray-800 rounded-bl-none dark:bg-gray-700 dark:text-gray-100"
                          }`}
                        >
                          <div className="whitespace-pre-line text-sm md:text-base leading-relaxed">
                            {msg.content}
                          </div>

                          {msg.role === "assistant" && (
                            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200/60 dark:border-gray-600/50">
                              <button
                                onClick={() => copyToClipboard(msg.content)}
                                className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                                title={t("copy_title")}
                              >
                                <Copy size={14} className="text-gray-500 dark:text-gray-300" />
                              </button>
                              <button
                                onClick={() => speakText(msg.content)}
                                className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                                title={t("speak_title")}
                              >
                                <Volume2 size={14} className="text-gray-500 dark:text-gray-300" />
                              </button>
                              <button
                                className="p-1.5 rounded-lg ml-auto hover:bg-gray-200 dark:hover:bg-gray-600"
                                title={t("useful_title")}
                              >
                                <Zap size={14} className="text-yellow-500" />
                              </button>
                            </div>
                          )}
                        </div>

                        <div className={`mt-1 text-[11px] opacity-70 ${msg.role === "user" ? "text-right" : ""}`}>
                          {msg.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}

                  {loading && (
                    <div className="flex justify-start">
                      <div className="max-w-[85%] mr-4">
                        <div className="rounded-2xl rounded-bl-none px-4 py-3 bg-gray-100 dark:bg-gray-700">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {t("typing")}
                            </span>
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce dark:bg-gray-500" />
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce dark:bg-gray-500" style={{ animationDelay: "0.1s" }} />
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce dark:bg-gray-500" style={{ animationDelay: "0.2s" }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={bottomRef} />
                </div>
              </div>

              {/* Input */}
              <div className="p-2 px-5 border-t border-gray-200 dark:border-gray-700">
                {listeningTranscript && (
                  <div className="mb-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                    <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <span>{t("listening")}</span>
                    </div>
                    <p className="text-blue-800 dark:text-blue-200 text-sm mt-1">{listeningTranscript}</p>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <textarea
                      ref={textareaRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={t("input_placeholder")}
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl outline-none resize-none transition-all bg-gray-50 text-gray-900 placeholder-gray-500 border border-gray-200 focus:ring-2 focus:ring-indigo-300 shadow-sm dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600 dark:focus:ring-indigo-500"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={toggleRecording}
                      className={`p-2 rounded-xl transition-all ${
                        isRecording
                          ? "bg-red-500 text-white animate-pulse"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300"
                      }`}
                      title={isRecording ? t("stop_recording") : t("start_recording")}
                    >
                      <Mic size={20} />
                    </button>

                    <button
                      onClick={sendMessage}
                      disabled={loading || !input.trim()}
                      className={`p-2 rounded-xl transition-all ${
                        input.trim()
                          ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:shadow-lg dark:from-indigo-600 dark:to-blue-600"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
                      }`}
                      title={t("send")}
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </div>

                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
                  {t("keyboard_shortcuts")}
                </div>
              </div>
            </div>
          </main>

          {/* FAQ */}
          <aside className="lg:w-1/3">
            <div
              className="rounded-2xl overflow-hidden flex flex-col bg-white/95 backdrop-blur border border-white/50 shadow-xl dark:bg-gray-800/90 dark:border-gray-700"
              style={{ height: "calc(100vh - 180px)" }}
            >
              <div className="p-4 px-6 border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-600 dark:to-purple-600">
                    <MessageSquare size={15} className="text-white" />
                  </div>
                  <h2 className="text-[16px] font-bold">{t("faq_title")}</h2>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-3">
                  {faqQuestions.map((faq, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleFaqClick(faq.question)}
                      className="w-full text-left p-4 rounded-xl transition-all duration-200 hover:scale-[1.02] bg-gray-50 hover:bg-gray-100 text-gray-800 border border-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="p-1.5 rounded-lg bg-gray-200 dark:bg-gray-600">
                              {faq.icon}
                            </span>
                            <span className="text-xs font-medium px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                              {faq.category}
                            </span>
                          </div>
                          <p className="text-sm font-medium">{faq.question}</p>
                        </div>
                        <ChevronRight size={16} className="mt-1 text-gray-500 dark:text-gray-400" />
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 dark:from-indigo-900/20 dark:to-blue-900/20 dark:border-indigo-900/30">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 dark:from-indigo-600 dark:to-purple-600">
                      <BookOpen size={16} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm mb-1 text-gray-800 dark:text-gray-200">
                        {t("ai_info_title")}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {t("ai_info_description")}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
