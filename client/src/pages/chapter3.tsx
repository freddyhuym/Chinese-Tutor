import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Languages,
  BookOpen,
  Heart,
  Volume2,
  Type,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import appLogo from "@/assets/generated_images/app_logo.png";
import { type Language, getTranslations } from "@/lib/i18n";
import { Link } from "wouter";
import { Header } from "@/components/Header";
// @ts-ignore
import randyProfile from "@/assets/generated_images/randy_profile.png";
// @ts-ignore
import xiaoyuProfile from "@/assets/generated_images/xiaoyu_profile.png";
// @ts-ignore
import randyFull from "@/assets/generated_images/randy_full.png";
// @ts-ignore
import xiaoyuFull from "@/assets/generated_images/xiaoyu_full.png";
// @ts-ignore
import chatBackground from "@/assets/generated_images/chat_background_no_clouds.png";

const chapterContent = {
  zh: {
    title: "第三章",
    subtitle: "第三次見面 Third Meeting",
    description: "內容即將推出",
    backToHome: "返回首頁",
    chat: {
      title: "第三次聊天",
      subtitle: "有些回答，可能會讓小雨心跳加快",
      randy: "瑞迪",
      xiaoyu: "小雨",
      affinity: "",
    },
  },
  en: {
    title: "Chapter 3",
    subtitle: "Third Meeting",
    description: "Content coming soon",
    backToHome: "Back to Home",
    chat: {
      title: "Third Chat",
      subtitle: "Some of your replies might make Xiaoyu's heart beat faster",
      randy: "Randy",
      xiaoyu: "Xiao Yu",
      affinity: "Xiao Yu's Affinity",
    },
  },
};

type BarMessage = {
  id: number;
  sender: "randy" | "xiaoyu" | "narrator";
  text: string;
  en: string;
  pinyin: string;
};

const BAR_MESSAGES: BarMessage[] = [
  {
    id: 1,
    sender: "randy",
    text: "小雨，你想不想一起喝酒？",
    en: "Xiaoyu, would you like to drink together?",
    pinyin: "Xiǎoyǔ, nǐ xiǎng bù xiǎng yīqǐ hējiǔ?",
  },
  {
    id: 2,
    sender: "xiaoyu",
    text: "好啊，我們去喝酒吧，台北101附近有很多酒吧。",
    en: "Sure, let's go drink. There are many bars near Taipei 101.",
    pinyin: "Hǎo a, wǒmen qù hējiǔ ba, Táiběi 101 fùjìn yǒu hěn duō jiǔbā.",
  },
  {
    id: 3,
    sender: "randy",
    text: "那我們走吧。",
    en: "Then let's go.",
    pinyin: "Nà wǒmen zǒu ba.",
  },
  {
    id: 4,
    sender: "narrator",
    text: "他們走在路上，一邊走，一邊聊天。進入了一間店後，他們又開始說話了。",
    en: "They walked on the road, chatting as they walked. After entering a shop, they started talking again.",
    pinyin: "Tāmen zǒu zài lùshàng, yībiān zǒu, yībiān liáotiān. Jìnrù le yī jiān diàn hòu, tāmen yòu kāishǐ shuōhuà le.",
  },
  {
    id: 5,
    sender: "xiaoyu",
    text: "你第一次跟新朋友出去，就喝酒嗎？",
    en: "Is this the first time you go out with a new friend and drink?",
    pinyin: "Nǐ dì yī cì gēn xīn péngyǒu chūqù, jiù hējiǔ ma?",
  },
  {
    id: 6,
    sender: "randy",
    text: "不一定，但認識你比喝酒更重要。",
    en: "Not necessarily, but getting to know you is more important than drinking.",
    pinyin: "Bù yīdìng, dàn rènshí nǐ bǐ hējiǔ gèng zhòngyào.",
  },
  {
    id: 7,
    sender: "xiaoyu",
    text: "你很會說話。",
    en: "You're very good at talking.",
    pinyin: "Nǐ hěn huì shuōhuà.",
  },
  {
    id: 8,
    sender: "randy",
    text: "我們一邊喝酒，一邊聊天，乾杯。",
    en: "Let's drink and chat at the same time, cheers.",
    pinyin: "Wǒmen yībiān hējiǔ, yībiān liáotiān, gānbēi.",
  },
  {
    id: 9,
    sender: "xiaoyu",
    text: "乾杯。",
    en: "Cheers.",
    pinyin: "Gānbēi.",
  },
];

type MessageState = {
  [key: number]: {
    showEn: boolean;
    showPinyin: boolean;
  };
};

export default function Chapter3() {
  const [lang, setLang] = useState<Language>("zh");
  const [showStoryTranslation, setShowStoryTranslation] = useState(false);
  const [barChatLang, setBarChatLang] = useState<Language>("zh");
  
  // Message states for bar chat
  const [barMessageStates, setBarMessageStates] = useState<MessageState>({});
  
  // Bar chat state
  const [barChatState, setBarChatState] = useState<{ messages: BarMessage[] }>(() => {
    const saved = localStorage.getItem("chapter3_bar_chat_state_v2");
    if (!saved) return { messages: BAR_MESSAGES };
    try {
      const parsed = JSON.parse(saved);
      // 若舊資料是合併前的格式（有 id 5 的 narrator），改用新的 BAR_MESSAGES
      const hasOldNarrator5 = parsed.messages?.some(
        (m: BarMessage) => m.id === 5 && m.sender === "narrator" && m.text?.includes("進入了一間店後，他們開始聊天")
      );
      if (hasOldNarrator5 || (parsed.messages?.length ?? 0) !== BAR_MESSAGES.length) {
        return { messages: BAR_MESSAGES };
      }
      return parsed;
    } catch {
      return { messages: BAR_MESSAGES };
    }
  });
  
  // Shared scenario state using localStorage
  const [appScenario, setAppScenario] = useState<"dining" | "movie" | null>(() => {
    const saved = localStorage.getItem("app_scenario");
    return (saved === "dining" || saved === "movie") ? saved : "movie";
  });
  
  // Affinity state - shared with chapter1 and chapter2
  const [affinity, setAffinity] = useState<"green" | "red">(() => {
    const saved = localStorage.getItem("affinity_state");
    return (saved === "green" || saved === "red") ? saved : "green";
  });
  
  const t = getTranslations(lang);
  const content = chapterContent[lang];

  const barChatRef = useRef<HTMLDivElement>(null);

  // Save scenario to localStorage when it changes
  useEffect(() => {
    if (appScenario) {
      localStorage.setItem("app_scenario", appScenario);
    }
  }, [appScenario]);
  
  // Save affinity to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("affinity_state", affinity);
  }, [affinity]);

  // Save bar chat state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("chapter3_bar_chat_state_v2", JSON.stringify(barChatState));
  }, [barChatState]);

  // Scroll to top on mount
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }, 10);
    return () => clearTimeout(timeoutId);
  }, []);

  const toggleLang = () => {
    setLang((prev) => (prev === "zh" ? "en" : "zh"));
  };

  const toggleBarChatLang = () => {
    setBarChatLang((prev) => (prev === "zh" ? "en" : "zh"));
  };

  const toggleBarMessageEn = (id: number) => {
    setBarMessageStates((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        showEn: !prev[id]?.showEn,
      },
    }));
  };

  const toggleBarMessagePinyin = (id: number) => {
    setBarMessageStates((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        showPinyin: !prev[id]?.showPinyin,
      },
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/">
            <Button
              variant="ghost"
              className="gap-2 mb-6"
              data-testid="button-back"
            >
              <ChevronLeft className="w-4 h-4" />
              {content.backToHome}
            </Button>
          </Link>

          <div className="mb-8">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <BookOpen className="w-3 h-3 mr-1" />
              {content.title}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-serif-chinese mb-4">
              {content.subtitle}
            </h1>
            <p className="text-lg text-muted-foreground">
              {content.description}
            </p>
          </div>

          <div className="mb-12">
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-2 border-primary/20 shadow-sm relative">
              <div className="absolute top-4 right-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-primary hover:text-primary hover:bg-primary/10"
                  onClick={() => setShowStoryTranslation(!showStoryTranslation)}
                >
                  <Languages className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold font-serif-chinese mb-4 text-primary">
                    {showStoryTranslation ? "Background Story" : "背景故事"}
                  </h2>
                  <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-line font-serif-chinese">
                    {showStoryTranslation 
                      ? "After finishing dinner / watching the movie, they went to a bar near Taipei 101."
                      : "吃完晚餐／看完電影之後，他們去台北101附近的酒吧。"
                    }
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Bar Chat Interface */}
          <div ref={barChatRef} className="mb-12 relative max-w-4xl mx-auto scroll-mt-20">
            <Card
              className="overflow-hidden border-2 border-primary/50 shadow-lg bg-slate-50 dark:bg-slate-900 z-10 relative w-full"
            >
              <div
                className="absolute inset-0 z-0 opacity-40 pointer-events-none bg-cover bg-center"
                style={{ backgroundImage: `url(${chatBackground})` }}
              />
              <div className="bg-primary/5 p-4 border-b border-border/50 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🍺</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg font-serif-chinese">
                      {content.chat.title} - {barChatLang === "zh" ? "酒吧情境" : "Bar"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {content.chat.subtitle}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  onClick={toggleBarChatLang}
                  className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 border border-transparent min-h-8 rounded-md px-3 text-xs gap-2 text-primary hover:text-primary hover:bg-primary/10"
                >
                  <Languages className="w-4 h-4" />
                </Button>
              </div>

              <div className="overflow-visible p-8 space-y-6 bg-slate-100/50 dark:bg-slate-950/50 relative">
                {barChatState.messages.map((msg, index) => (
                  <div key={msg.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-4"
                    >
                      {msg.sender === "narrator" ? (
                        <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-md border-2 border-slate-300 bg-slate-50">
                          {msg.id === 4 ? (
                            // 特別處理"他們走在路上，一邊走，一邊聊天。"這句，使用男生女生聊天的emoji動畫
                            <motion.div
                              animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 5, -5, 0],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 0.5,
                                ease: "easeInOut",
                              }}
                              className="text-2xl"
                            >
                              💬
                            </motion.div>
                          ) : (
                            <motion.div
                              animate={{
                                rotate: [0, 14, -8, 14, -8, 0],
                              }}
                              transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                repeatDelay: 1,
                                ease: "easeInOut",
                              }}
                              className="text-2xl"
                            >
                              📝
                            </motion.div>
                          )}
                        </div>
                      ) : (
                        <div
                          className={`w-12 h-12 rounded-full overflow-hidden flex-shrink-0 shadow-md border-2 ${
                            msg.sender === "randy" ? "border-blue-200" : "border-pink-200"
                          }`}
                        >
                          <img
                            src={msg.sender === "randy" ? randyProfile : xiaoyuProfile}
                            alt={msg.sender === "randy" ? "Randy" : "Xiaoyu"}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        {msg.sender !== "narrator" && (
                          <div className="mb-1">
                            <span className="text-xs text-muted-foreground font-medium">
                              {msg.sender === "randy" ? "瑞迪" : "小雨"}
                            </span>
                          </div>
                        )}
                        <div className={`space-y-2 ${msg.sender === "narrator" ? "" : "mb-2"}`}>
                          {barMessageStates[msg.id]?.showPinyin && (
                            <p className="text-sm text-primary font-medium border-b border-primary/10 pb-1 font-serif-chinese">
                              {msg.pinyin}
                            </p>
                          )}
                          <p className={`${msg.sender === "narrator" ? "text-sm italic text-slate-600" : "text-base font-medium"} leading-relaxed`}>
                            {msg.text}
                          </p>
                          {barMessageStates[msg.id]?.showEn && (
                            <p className="text-sm text-slate-500 mt-2 pt-2 border-t border-slate-200/60 font-sans">
                              {msg.en}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`h-7 px-2 rounded-full gap-1 text-xs font-medium transition-colors ${
                              barMessageStates[msg.id]?.showEn
                                ? "bg-primary/10 text-primary hover:bg-primary/20"
                                : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                            }`}
                            onClick={() => toggleBarMessageEn(msg.id)}
                          >
                            <Languages className="w-3.5 h-3.5" />
                            <span>翻譯</span>
                          </Button>
                          <div className="w-px h-3 bg-slate-200" />
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`h-7 px-2 rounded-full gap-1 text-xs font-medium transition-colors ${
                              barMessageStates[msg.id]?.showPinyin
                                ? "bg-primary/10 text-primary hover:bg-primary/20"
                                : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                            }`}
                            onClick={() => toggleBarMessagePinyin(msg.id)}
                          >
                            <Type className="w-3.5 h-3.5" />
                            <span>拼音</span>
                          </Button>
                          {msg.sender !== "narrator" && (
                            <>
                              <div className="w-px h-3 bg-slate-200" />
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 px-2 rounded-full gap-1 text-xs font-medium text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                                onClick={() => {
                                  // Mock audio play
                                  const utterance = new SpeechSynthesisUtterance(msg.text);
                                  utterance.lang = "zh-TW";
                                  utterance.rate = 0.8;
                                  window.speechSynthesis.speak(utterance);
                                }}
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                                <span>朗讀</span>
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </motion.div>
      </main>

      <footer className="py-12 border-t border-border bg-muted/20 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img
                src={appLogo}
                alt="Logo"
                className="w-8 h-8 rounded-lg bg-white/90 p-1"
              />
              <div className="px-2 py-1 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-xs font-bold font-chinese text-primary-foreground">
                  心動中文
                </span>
              </div>
              <span className="font-semibold font-serif-chinese">
                Heartbeat Chinese
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t.footer.copyright}
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Affinity Meter - Fixed at bottom right */}
      <div className="fixed bottom-8 right-8 z-[60] flex flex-col gap-3">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`flex items-center gap-3 px-6 py-4 rounded-full shadow-2xl backdrop-blur-md border-2 cursor-pointer transition-colors duration-500 ${
              affinity === "green"
                ? "bg-jade/90 border-jade text-white shadow-jade/20"
                : "bg-red-500/90 border-red-500 text-white shadow-red-500/20"
            }`}
          >
            {affinity === "green" ? (
              <div>
                <Heart className={`w-6 h-6 fill-current`} />
              </div>
            ) : (
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 0.7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Heart className={`w-6 h-6 fill-current`} />
              </motion.div>
            )}
            <div className="flex flex-col">
              <span className="text-xs opacity-90 font-medium">
                {affinity === "green" ? "小雨的心跳普通" : "小雨的心跳加速"}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Floating Scenario Toggle - Fixed below affinity meter */}
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`flex items-center gap-3 px-5 py-3 rounded-full shadow-2xl backdrop-blur-md border-2 transition-colors duration-500 ${
              (appScenario || "movie") === "movie"
                ? "bg-purple-500/90 border-purple-500 text-white shadow-purple-500/20"
                : "bg-orange-500/90 border-orange-500 text-white shadow-orange-500/20"
            }`}
          >
            <span className="font-medium text-sm whitespace-nowrap">小雨想</span>
            <div className="flex items-center gap-2 bg-white/20 rounded-full px-2 py-1 border border-white/30">
              <span className={`text-xs font-medium transition-opacity ${(appScenario || "movie") === "movie" ? "opacity-100" : "opacity-50"}`}>
                🍿 看電影
              </span>
              <Switch
                checked={(appScenario || "movie") === "dining"}
                onCheckedChange={(checked) => {
                  setAppScenario(checked ? "dining" : "movie");
                }}
                className="data-[state=checked]:bg-orange-500"
              />
              <span className={`text-xs font-medium transition-opacity ${(appScenario || "movie") === "dining" ? "opacity-100" : "opacity-50"}`}>
                🍽️ 吃飯
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
