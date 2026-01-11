import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Send,
  Bot,
  User,
  Sparkles,
  Mic,
  Paperclip,
  Volume2,
  Copy,
  Zap,
  MapPin,
  Baby,
  Clock,
  MessageSquare,
  BookOpen,
  ChevronRight,
} from "lucide-react";

export default function AIChat() {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [listeningTranscript, setListeningTranscript] = useState("");
  const bottomRef = useRef(null);
  const chatContainerRef = useRef(null);
  const textareaRef = useRef(null);
  
  // Speech Recognition setup
  const [recognition, setRecognition] = useState(null);

  // Initial messages based on language
  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: t("greeting"),
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
      {
        role: "user",
        content: t("sample_question"),
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
      {
        role: "assistant",
        content: t("sample_response"),
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  }, [i18n.language, t]);

  // Ko'p berilgan savollar
  const faqQuestions = [
    {
      question: t("faq_location"),
      category: t("faq_category_location"),
      icon: <MapPin className="w-4 h-4" />,
    },
    {
      question: t("faq_age"),
      category: t("faq_category_age"),
      icon: <Baby className="w-4 h-4" />,
    },
    {
      question: t("faq_language"),
      category: t("faq_category_language"),
      icon: <span>🇬🇧</span>,
    },
    {
      question: t("faq_price"),
      category: t("faq_category_price"),
      icon: <span>💵</span>,
    },
    {
      question: t("faq_budget"),
      category: t("faq_category_budget"),
      icon: <span>📈</span>,
    },
    {
      question: t("faq_new"),
      category: t("faq_category_new"),
      icon: <span>✨</span>,
    },
    {
      question: t("faq_24h"),
      category: t("faq_category_time"),
      icon: <Clock className="w-4 h-4" />,
    },
    {
      question: t("faq_special"),
      category: t("faq_category_care"),
      icon: <span>🤝</span>,
    },
  ];

  // AI responses in different languages
  const getAIResponses = () => {
    const responses = {
      uz: [
        t("ai_response_1"),
        t("ai_response_2"),
        t("ai_response_3"),
        t("ai_response_4"),
      ],
      ru: [
        t("ai_response_1"),
        t("ai_response_2"),
        t("ai_response_3"),
        t("ai_response_4"),
      ],
      en: [
        t("ai_response_1"),
        t("ai_response_2"),
        t("ai_response_3"),
        t("ai_response_4"),
      ],
    };
    return responses[i18n.language] || responses.uz;
  };

  useEffect(() => {
    // Initialize speech recognition with current language
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = i18n.language === "ru" ? "ru-RU" : i18n.language === "en" ? "en-US" : "uz-UZ";

      recognitionInstance.onstart = () => {
        console.log("Speech recognition started");
        setIsRecording(true);
        setListeningTranscript("");
      };

      recognitionInstance.onresult = (event) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript) {
          setInput((prev) => prev + finalTranscript);
        }
        setListeningTranscript(interimTranscript);
      };

      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsRecording(false);
      };

      recognitionInstance.onend = () => {
        console.log("Speech recognition ended");
        setIsRecording(false);
        setListeningTranscript("");
      };

      setRecognition(recognitionInstance);
    }

    // Scroll to bottom only on initial load
    if (messages.length > 0 && !loading) {
      scrollToBottom();
    }
  }, [i18n.language]);

  // Auto-scroll faqat yangi xabar qo'shilganda
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role === "assistant") {
      scrollToBottom();
    }
  }, [messages.length, loading]);

  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  };

  const startListening = () => {
    if (recognition) {
      try {
        recognition.start();
      } catch (error) {
        console.error("Could not start recognition:", error);
        setIsRecording(false);
      }
    } else {
      alert(t("speech_not_supported"));
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsRecording(false);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopListening();
    } else {
      startListening();
    }
  };

  const sendMessage = async () => {
    // Tozalash va tekshirish
    const trimmedInput = input.trim();
    if (!trimmedInput) {
      console.log("Input bo'sh");
      return;
    }

    console.log("Xabar yuborilmoqda:", trimmedInput);

    // Foydalanuvchi xabarini qo'shish
    const userMessage = {
      role: "user",
      content: trimmedInput,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Textarea fokusini yo'qotish
    if (textareaRef.current) {
      textareaRef.current.blur();
    }

    // Scroll to bottom after sending message
    setTimeout(() => {
      scrollToBottom();
    }, 100);

    try {
      console.log("AI javob kutilmoqda...");

      // API chaqiruvini simulyatsiya qilish
      await new Promise((resolve) => setTimeout(resolve, 800));

      const responses = getAIResponses();
      const aiResponse = {
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      console.log(
        "AI javob tayyor:",
        aiResponse.content.substring(0, 50) + "..."
      );
      setMessages((prev) => [...prev, aiResponse]);

      // Scroll to bottom after AI response
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: t("error_message"),
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      console.log("Loading tugadi");
      setLoading(false);
      // Textarea fokusini qaytarish
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      }, 100);
    }
  };

  const copyToClipboard = (text) => {
    try {
      navigator.clipboard.writeText(text);
      console.log("Matn nusxalandi");
    } catch (error) {
      console.error("Nusxa olishda xatolik:", error);
    }
  };

  const speakText = (text) => {
    try {
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = i18n.language === "ru" ? "ru-RU" : i18n.language === "en" ? "en-US" : "uz-UZ";
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
        console.log("Ovozli o'qish boshladi");
      } else {
        console.log("Speech synthesis qo'llab-quvvatlanmaydi");
      }
    } catch (error) {
      console.error("Ovozli o'qishda xatolik:", error);
    }
  };

  const handleFaqClick = (question) => {
    console.log("FAQ tanlandi:", question);
    setInput(question);
    // Textareaga fokus
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        // Light scroll to view the textarea
        textareaRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 100);
  };

  // Enter bosganda xabar yuborish
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-900 font-sans dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:text-white transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Compact Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 dark:from-indigo-600 dark:to-purple-600">
              <Bot className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold">
                <span className="dark:text-white">{t("app_name")}</span>
                <span className="bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
                  {" "}
                  {t("ai_chat")}
                </span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm bg-green-100 text-green-700 dark:bg-gray-800 dark:text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>{t("online")}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Chat Area */}
          <main className="lg:w-2/3">
            <div
              className="rounded-2xl shadow-xl overflow-hidden flex flex-col bg-white/95 backdrop-blur border border-white/50 shadow-lg dark:bg-gray-800/90 dark:backdrop-blur dark:border-gray-700"
              style={{ height: "calc(100vh - 180px)" }}
            >
              {/* Chat Messages Container */}
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-6"
                style={{
                  scrollBehavior: "smooth",
                  overscrollBehavior: "contain",
                }}
              >
                <div className="space-y-6">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${
                        msg.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] ${
                          msg.role === "user" ? "ml-4" : "mr-4"
                        }`}
                      >
                        {/* Message bubble */}
                        <div
                          className={`relative ${
                            msg.role === "user"
                              ? "flex justify-end"
                              : "flex justify-start"
                          }`}
                        >
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

                            {/* Message actions for AI messages */}
                            {msg.role === "assistant" && (
                              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-600/50 dark:border-gray-600/50">
                                <button
                                  onClick={() => copyToClipboard(msg.content)}
                                  className="p-1.5 rounded-lg transition-colors hover:bg-gray-200 dark:hover:bg-gray-600"
                                  title={t("copy_title")}
                                >
                                  <Copy
                                    size={14}
                                    className="text-gray-500 dark:text-gray-300"
                                  />
                                </button>
                                <button
                                  onClick={() => speakText(msg.content)}
                                  className="p-1.5 rounded-lg transition-colors hover:bg-gray-200 dark:hover:bg-gray-600"
                                  title={t("speak_title")}
                                >
                                  <Volume2
                                    size={14}
                                    className="text-gray-500 dark:text-gray-300"
                                  />
                                </button>
                                <button
                                  className="p-1.5 rounded-lg transition-colors ml-auto hover:bg-gray-200 dark:hover:bg-gray-600"
                                  title={t("useful_title")}
                                >
                                  <Zap size={14} className="text-yellow-500" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Loading indicator */}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="max-w-[85%] ml-4">
                        <div className="rounded-2xl rounded-bl-none px-4 py-3 bg-gray-100 dark:bg-gray-700">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {t("typing")}
                            </span>
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce dark:bg-gray-500"></div>
                              <div
                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce dark:bg-gray-500"
                                style={{ animationDelay: "0.1s" }}
                              ></div>
                              <div
                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce dark:bg-gray-500"
                                style={{ animationDelay: "0.2s" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={bottomRef} />
                </div>
              </div>

              {/* Input Area */}
              <div className="p-2 px-5 border-t border-gray-200 dark:border-gray-700">
                {/* Speech recognition transcript */}
                {listeningTranscript && (
                  <div className="mb-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                    <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span>{t("listening")}</span>
                    </div>
                    <p className="text-blue-800 dark:text-blue-200 text-sm mt-1">
                      {listeningTranscript}
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <textarea
                      ref={textareaRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={t("input_placeholder")}
                      rows={2}
                      className="w-full px-4 py-3 pr-12 rounded-xl outline-none resize-none transition-all bg-gray-50 text-gray-900 placeholder-gray-500 border border-gray-200 focus:ring-2 focus:ring-indigo-300 shadow-sm dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600 dark:focus:ring-indigo-500"
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
                      title={
                        isRecording ? t("stop_recording") : t("start_recording")
                      }
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

          {/* Side Panel - FAQ Questions */}
          <aside className="lg:w-1/3">
            <div
              className="rounded-2xl shadow-xl overflow-hidden flex flex-col bg-white/95 backdrop-blur border border-white/50 shadow-lg dark:bg-gray-800/90 dark:backdrop-blur dark:border-gray-700"
              style={{ height: "calc(100vh - 180px)" }}
            >
              {/* FAQ Header */}
              <div className="p-4 px-6 border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-600 dark:to-purple-600">
                    <MessageSquare size={15} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-[16px] font-bold">
                      {t("faq_title")}
                    </h2>
                  </div>
                </div>
              </div>

              {/* FAQ Questions List */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-3">
                  {faqQuestions.map((faq, index) => (
                    <button
                      key={index}
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
                          <p className="text-sm font-medium mb-1">
                            {faq.question}
                          </p>
                        </div>
                        <ChevronRight
                          size={16}
                          className="mt-1 text-gray-500 dark:text-gray-400"
                        />
                      </div>
                    </button>
                  ))}
                </div>

                {/* Info Section */}
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
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-gray-500">
                          {t("version")} 2.1
                        </span>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-xs text-green-600 dark:text-green-400">
                            {t("active")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom Info */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-6 text-sm text-gray-600 dark:text-gray-500">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>{t("ai_active")}</span>
            </span>
            <span>•</span>
            <span>
              {messages.length} {t("messages_count")}
            </span>
            <span>•</span>
            <span>{t("works_24_7")}</span>
            <span>•</span>
            <span>{t("real_time_response")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}