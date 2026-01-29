import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Languages,
  BookOpen,
  Heart,
  ArrowDown,
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
import diningChatBackground from "@/assets/generated_images/chapter2_dining_chat_bg.png";
import movieChatBackground from "@/assets/generated_images/chapter2_movie_chat_bg.png";

const chapterContent = {
  zh: {
    title: "第二章",
    subtitle: "第一次約會 First Date",
    description: "兩個人一起吃飯或是看電影",
    backToHome: "返回首頁",
    chat: {
      title: "第二次聊天",
      subtitle: "有些回答，可能會讓小雨心跳加快",
      randy: "瑞迪",
      xiaoyu: "小雨",
      affinity: "",
    },
    scenarios: {
      dining: {
        title: "餐廳情境",
        content: "瑞迪跟小雨隔天在捷運站見面之後，一起去了一家餐廳吃晚餐，他們開始聊天……",
      },
      movie: {
        title: "電影院情境",
        content: "瑞迪跟小雨隔天在捷運站見面之後，一起去了一家電影院，準備買票。",
      },
    },
  },
  en: {
    title: "Chapter 2",
    subtitle: "First Date",
    description: "Two people eating together or watching a movie",
    backToHome: "Back to Home",
    chat: {
      title: "Second Chat",
      subtitle: "Some of your replies might make Xiaoyu's heart beat faster",
      randy: "Randy",
      xiaoyu: "Xiao Yu",
      affinity: "Xiao Yu's Affinity",
    },
    scenarios: {
      dining: {
        title: "Restaurant Scenario",
        content: "After meeting at the MRT station the next day, Randy and Xiaoyu went to a restaurant together for dinner and started chatting...",
      },
      movie: {
        title: "Movie Theater Scenario",
        content: "After meeting at the MRT station the next day, Randy and Xiaoyu went to a movie theater together to buy tickets.",
      },
    },
  },
};

export default function Chapter2() {
  const [lang, setLang] = useState<Language>("zh");
  const [showDiningTranslation, setShowDiningTranslation] = useState(false);
  const [showMovieTranslation, setShowMovieTranslation] = useState(false);
  
  // Shared scenario state using localStorage
  const [appScenario, setAppScenario] = useState<"dining" | "movie" | null>(() => {
    const saved = localStorage.getItem("app_scenario");
    return (saved === "dining" || saved === "movie") ? saved : "movie";
  });
  
  // Affinity state - shared with chapter1 and chapter3
  const [affinity, setAffinity] = useState<"green" | "red">(() => {
    const saved = localStorage.getItem("affinity_state");
    return (saved === "green" || saved === "red") ? saved : "green";
  });
  
  const t = getTranslations(lang);
  const content = chapterContent[lang];
  
  const diningChatRef = useRef<HTMLDivElement>(null);
  const movieChatRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);
  
  const scrollToDiningChat = () => {
    diningChatRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  
  const scrollToMovieChat = () => {
    movieChatRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  
  // Scroll to top on mount (ignore floating button state)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      // Mark initial mount as complete after scrolling to top
      setTimeout(() => {
        isInitialMount.current = false;
      }, 500);
    }, 10);
    return () => clearTimeout(timeoutId);
  }, []);
  
  // Save scenario to localStorage when it changes
  useEffect(() => {
    if (appScenario) {
      localStorage.setItem("app_scenario", appScenario);
      
      // Auto-scroll to corresponding chat interface when scenario changes (but not on initial mount)
      if (!isInitialMount.current) {
        if (appScenario === "dining") {
          setTimeout(() => {
            scrollToDiningChat();
          }, 100);
        } else if (appScenario === "movie") {
          setTimeout(() => {
            scrollToMovieChat();
          }, 100);
        }
      }
    }
  }, [appScenario]);
  
  // Save affinity to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("affinity_state", affinity);
  }, [affinity]);

  const toggleLang = () => {
    setLang((prev) => (prev === "zh" ? "en" : "zh"));
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

          {/* Restaurant Scenario */}
          <div className="mb-12 relative">
            {/* Highlight indicator */}
            {appScenario === "dining" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-8 left-0 z-10"
              >
                <Badge className="bg-orange-500 text-white border-orange-500 shadow-lg">
                  <span className="text-xs font-medium">
                    {lang === "zh" ? "✨ 請看這個故事" : "✨ Please read this story"}
                  </span>
                </Badge>
              </motion.div>
            )}
            <motion.div
              animate={
                appScenario === "dining"
                  ? {
                      boxShadow: [
                        "0 0 0px rgba(249, 115, 22, 0)",
                        "0 0 20px rgba(249, 115, 22, 0.5)",
                        "0 0 40px rgba(249, 115, 22, 0.8)",
                        "0 0 20px rgba(249, 115, 22, 0.5)",
                        "0 0 0px rgba(249, 115, 22, 0)",
                      ],
                    }
                  : {}
              }
              transition={{
                duration: 2,
                repeat: appScenario === "dining" ? Infinity : 0,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <Card
                className={`p-8 backdrop-blur-sm border-2 shadow-sm relative transition-all duration-300 ${
                  appScenario === "dining"
                    ? "bg-orange-50/90 border-orange-400 shadow-orange-200"
                    : "bg-card/50 border-primary/20"
                }`}
              >
                <div className="absolute top-4 right-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-primary hover:text-primary hover:bg-primary/10"
                  onClick={() => setShowDiningTranslation(!showDiningTranslation)}
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
                    {showDiningTranslation ? chapterContent.en.scenarios.dining.title : chapterContent.zh.scenarios.dining.title}
                  </h2>
                  <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-line font-serif-chinese">
                    {showDiningTranslation ? chapterContent.en.scenarios.dining.content : chapterContent.zh.scenarios.dining.content}
                  </p>
                </div>
              </div>
              {appScenario === "dining" && (
                <div className="mt-6 flex justify-center">
                  <Button
                    onClick={scrollToDiningChat}
                    className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg"
                  >
                    <ArrowDown className="w-4 h-4 mr-2" />
                    {lang === "zh" ? "開始對話" : "Start Chat"}
                  </Button>
                </div>
              )}
            </Card>
            </motion.div>
          </div>

          {/* Movie Theater Scenario */}
          <div className="mb-12 relative">
            {/* Highlight indicator */}
            {appScenario === "movie" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-8 left-0 z-10"
              >
                <Badge className="bg-purple-500 text-white border-purple-500 shadow-lg">
                  <span className="text-xs font-medium">
                    {lang === "zh" ? "✨ 請看這個故事" : "✨ Please read this story"}
                  </span>
                </Badge>
              </motion.div>
            )}
            <motion.div
              animate={
                appScenario === "movie"
                  ? {
                      boxShadow: [
                        "0 0 0px rgba(168, 85, 247, 0)",
                        "0 0 20px rgba(168, 85, 247, 0.5)",
                        "0 0 40px rgba(168, 85, 247, 0.8)",
                        "0 0 20px rgba(168, 85, 247, 0.5)",
                        "0 0 0px rgba(168, 85, 247, 0)",
                      ],
                    }
                  : {}
              }
              transition={{
                duration: 2,
                repeat: appScenario === "movie" ? Infinity : 0,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <Card
                className={`p-8 backdrop-blur-sm border-2 shadow-sm relative transition-all duration-300 ${
                  appScenario === "movie"
                    ? "bg-purple-50/90 border-purple-400 shadow-purple-200"
                    : "bg-card/50 border-primary/20"
                }`}
              >
                <div className="absolute top-4 right-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 text-primary hover:text-primary hover:bg-primary/10"
                    onClick={() => setShowMovieTranslation(!showMovieTranslation)}
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
                      {showMovieTranslation ? chapterContent.en.scenarios.movie.title : chapterContent.zh.scenarios.movie.title}
                    </h2>
                    <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-line font-serif-chinese">
                      {showMovieTranslation ? chapterContent.en.scenarios.movie.content : chapterContent.zh.scenarios.movie.content}
                    </p>
                  </div>
                </div>
                {appScenario === "movie" && (
                  <div className="mt-6 flex justify-center">
                    <Button
                      onClick={scrollToMovieChat}
                      className="bg-purple-500 hover:bg-purple-600 text-white shadow-lg"
                    >
                      <ArrowDown className="w-4 h-4 mr-2" />
                      {lang === "zh" ? "開始對話" : "Start Chat"}
                    </Button>
                  </div>
                )}
              </Card>
            </motion.div>
          </div>

          {/* Restaurant Chat Interface */}
          <div ref={diningChatRef} className="mb-12 relative max-w-4xl mx-auto scroll-mt-20">
            {/* Floating Characters (Desktop only) */}
            <div className="hidden min-[1360px]:block fixed left-[5%] bottom-0 h-[500px] w-64 z-40 pointer-events-none">
              <img
                src={randyFull}
                alt="Randy Full Body"
                className="w-full h-full object-contain object-bottom drop-shadow-2xl scale-110 origin-bottom"
              />
            </div>

            <div className="hidden min-[1360px]:block fixed right-[5%] bottom-0 h-[500px] w-64 z-40 pointer-events-none">
              <img
                src={xiaoyuFull}
                alt="Xiao Yu Full Body"
                className="w-full h-full object-contain object-bottom drop-shadow-2xl origin-bottom"
              />
            </div>

            <Card
              className="overflow-hidden border-2 border-orange-400 shadow-lg bg-slate-50 dark:bg-slate-900 z-10 relative w-full"
            >
              <div
                className="absolute inset-0 z-0 opacity-90 pointer-events-none bg-cover bg-center"
                style={{ backgroundImage: `url(${diningChatBackground})` }}
              />
              <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-yellow-50/40 via-yellow-50/10 to-white/40" />
              <div className="bg-orange-100/50 p-4 border-b border-orange-200 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🥢</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg font-serif-chinese">
                      {content.chat.title} - {lang === "zh" ? "餐廳情境" : "Restaurant"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {content.chat.subtitle}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  onClick={toggleLang}
                  className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 border border-transparent min-h-8 rounded-md px-3 text-xs gap-2 text-primary hover:text-primary hover:bg-primary/10"
                >
                  <Languages className="w-4 h-4" />
                </Button>
              </div>

              <div className="overflow-visible p-8 space-y-4 bg-slate-100/50 dark:bg-slate-950/50 relative">
                <div className="text-center py-12 text-muted-foreground">
                  <p className="text-lg">{lang === "zh" ? "餐廳對話內容即將推出" : "Restaurant chat content coming soon"}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Movie Theater Chat Interface */}
          <div ref={movieChatRef} className="mb-12 relative max-w-4xl mx-auto scroll-mt-20">
            {/* Floating Characters (Desktop only) */}
            <div className="hidden min-[1360px]:block fixed left-[5%] bottom-0 h-[500px] w-64 z-40 pointer-events-none">
              <img
                src={randyFull}
                alt="Randy Full Body"
                className="w-full h-full object-contain object-bottom drop-shadow-2xl scale-110 origin-bottom"
              />
            </div>

            <div className="hidden min-[1360px]:block fixed right-[5%] bottom-0 h-[500px] w-64 z-40 pointer-events-none">
              <img
                src={xiaoyuFull}
                alt="Xiao Yu Full Body"
                className="w-full h-full object-contain object-bottom drop-shadow-2xl origin-bottom"
              />
            </div>

            <Card
              className="overflow-hidden border-2 border-purple-400 shadow-lg bg-slate-50 dark:bg-slate-900 z-10 relative w-full"
            >
              <div
                className="absolute inset-0 z-0 opacity-90 pointer-events-none bg-cover bg-center"
                style={{ backgroundImage: `url(${movieChatBackground})` }}
              />
              <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-purple-900/25 via-slate-900/5 to-purple-950/25" />
              <div className="absolute inset-0 z-0 pointer-events-none bg-purple-500/10 mix-blend-soft-light" />
              <div className="bg-purple-100/50 p-4 border-b border-purple-200 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🍿</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg font-serif-chinese">
                      {content.chat.title} - {lang === "zh" ? "電影院情境" : "Movie Theater"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {content.chat.subtitle}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  onClick={toggleLang}
                  className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 border border-transparent min-h-8 rounded-md px-3 text-xs gap-2 text-primary hover:text-primary hover:bg-primary/10"
                >
                  <Languages className="w-4 h-4" />
                </Button>
              </div>

              <div className="overflow-visible p-8 space-y-4 bg-slate-100/50 dark:bg-slate-950/50 relative">
                <div className="text-center py-12 text-muted-foreground">
                  <p className="text-lg">{lang === "zh" ? "電影院對話內容即將推出" : "Movie theater chat content coming soon"}</p>
                </div>
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
