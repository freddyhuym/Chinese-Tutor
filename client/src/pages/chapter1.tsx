import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft,
  Languages,
  BookOpen,
  Play,
  CheckCircle2,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Language, getTranslations, translations } from "@/lib/i18n";
import { Link } from "wouter";

const chapterContent = {
  zh: {
    title: "第一章",
    subtitle: "基礎入門",
    description: "歡迎來到第一章！在這裡您將學習中文的基礎知識。",
    backToHome: "返回首頁",
    sections: [
      { title: "課程介紹", duration: "5 分鐘", completed: false },
      { title: "基本發音", duration: "10 分鐘", completed: false },
      { title: "聲調練習", duration: "15 分鐘", completed: false },
      { title: "常用問候語", duration: "10 分鐘", completed: false },
    ],
    comingSoon: "內容即將推出",
    comingSoonDesc: "我們正在努力準備精彩的學習內容，敬請期待！",
    chat: {
      title: "對話練習：初次聊天",
      subtitle: "選擇正確的回答來提升好感度！",
      reddy: "瑞迪",
      xiaoyu: "小雨",
      affinity: "小雨的好感度"
    }
  },
  en: {
    title: "Chapter 1",
    subtitle: "Getting Started",
    description: "Welcome to Chapter 1! Here you will learn the basics of Chinese.",
    backToHome: "Back to Home",
    sections: [
      { title: "Course Introduction", duration: "5 min", completed: false },
      { title: "Basic Pronunciation", duration: "10 min", completed: false },
      { title: "Tone Practice", duration: "15 min", completed: false },
      { title: "Common Greetings", duration: "10 min", completed: false },
    ],
    comingSoon: "Coming Soon",
    comingSoonDesc: "We are working hard to prepare exciting learning content. Stay tuned!",
    chat: {
      title: "Dialogue Practice: First Chat",
      subtitle: "Choose the right answer to increase affinity!",
      reddy: "Reddy",
      xiaoyu: "Xiao Yu",
      affinity: "Xiao Yu's Affinity"
    }
  }
};

type Message = {
  id: number;
  sender: 'reddy' | 'xiaoyu';
  text: string;
  isChoice?: boolean;
};

type ChatState = {
  messages: Message[];
  step: number;
  affinity: 'green' | 'red';
  completed: boolean;
};

const INITIAL_CHAT_STATE: ChatState = {
  messages: [
    { id: 1, sender: 'reddy', text: '你好，我是瑞迪，美國人，我會說一點中文' },
    { id: 2, sender: 'xiaoyu', text: '哈囉，我是小雨' },
    { id: 3, sender: 'reddy', text: '我剛來台灣，想認識新朋友' },
    { id: 4, sender: 'xiaoyu', text: '好啊，我在學習英文' },
    { id: 5, sender: 'reddy', text: '我正在學習中文，也想多練習' },
    { id: 6, sender: 'xiaoyu', text: '你為什麼學中文？' },
  ],
  step: 0,
  affinity: 'green',
  completed: false
};

const CHOICES = [
  { 
    id: 1, 
    text: '因為我覺得中文很簡單', 
    response: '哇，你很厲害！', 
    affinityChange: 'red' as const 
  },
  { 
    id: 2, 
    text: '因為我喜歡台灣文化，很有意思', 
    response: '哇，你很特別', 
    affinityChange: 'green' as const 
  }
];

export default function Chapter1() {
  const [lang, setLang] = useState<Language>("zh");
  const [showStoryTranslation, setShowStoryTranslation] = useState(false);
  const t = getTranslations(lang);
  const content = chapterContent[lang];

  // Chat state management with persistence
  const [chatState, setChatState] = useState<ChatState>(() => {
    const saved = localStorage.getItem('chapter1_chat_state');
    return saved ? JSON.parse(saved) : INITIAL_CHAT_STATE;
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('chapter1_chat_state', JSON.stringify(chatState));
    // Scroll to bottom when messages update
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [chatState]);

  const toggleLang = () => {
    setLang(prev => prev === "zh" ? "en" : "zh");
  };

  const currentStoryContent = showStoryTranslation 
    ? translations.en.chapter1Page?.background 
    : translations.zh.chapter1Page?.background;

  const handleChoice = (choiceId: number) => {
    const choice = CHOICES.find(c => c.id === choiceId);
    if (!choice) return;

    // Reset messages to initial state then append new choice
    // allow re-selecting
    const newMessages: Message[] = [
      ...INITIAL_CHAT_STATE.messages,
      { id: Date.now(), sender: 'reddy', text: choice.text },
      { id: Date.now() + 1, sender: 'xiaoyu', text: choice.response }
    ];

    setChatState(prev => ({
      ...prev,
      messages: newMessages,
      affinity: choice.affinityChange,
      completed: true
    }));
  };

  const resetChat = () => {
    setChatState(INITIAL_CHAT_STATE);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link href="/">
                <div className="flex items-center gap-3 cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                    <span className="text-xl font-chinese text-primary-foreground">漢</span>
                  </div>
                  <span className="text-xl font-semibold font-serif-chinese">HanYu</span>
                </div>
              </Link>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm font-medium brush-underline text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-home">{t.nav.home}</Link>
              <Link href="/philosophy" className="text-sm font-medium brush-underline text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-philosophy">{t.nav.philosophy}</Link>
              <a href="#" className="text-sm font-medium brush-underline text-foreground" data-testid="nav-chapter1">{t.nav.chapter1}</a>
              <Link href="/chapter2" className="text-sm font-medium brush-underline text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-chapter2">{t.nav.chapter2}</Link>
              <Link href="/chapter3" className="text-sm font-medium brush-underline text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-chapter3">{t.nav.chapter3}</Link>
            </nav>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                onClick={toggleLang}
                data-testid="button-lang-toggle"
              >
                <Languages className="w-4 h-4" />
                {lang === "zh" ? "EN" : "中文"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/">
            <Button variant="ghost" className="gap-2 mb-6" data-testid="button-back">
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
                  {showStoryTranslation ? "顯示原文" : "English Translation"}
                </Button>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold font-serif-chinese mb-4 text-primary">
                    {/* @ts-ignore */}
                    {currentStoryContent?.title}
                  </h2>
                  <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-line font-serif-chinese">
                    {/* @ts-ignore */}
                    {currentStoryContent?.content}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="mb-12 relative">
             <Card className="overflow-hidden border-2 border-border/50 shadow-lg bg-slate-50 dark:bg-slate-900">
              <div className="bg-primary/5 p-4 border-b border-border/50 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg font-serif-chinese">{content.chat.title}</h3>
                  <p className="text-sm text-muted-foreground">{content.chat.subtitle}</p>
                </div>
                {chatState.completed && (
                  <Button variant="ghost" size="sm" onClick={resetChat}>
                    重新開始
                  </Button>
                )}
              </div>
              
              <div className="h-[700px] overflow-y-auto p-6 space-y-4 bg-slate-100/50 dark:bg-slate-950/50 relative">
                {chatState.messages.map((msg, index) => (
                  <div key={`msg-${msg.id}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start mb-4"
                    >
                      <div className="flex items-end gap-3 max-w-[90%] flex-row">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-sm ${
                          msg.sender === 'reddy' 
                            ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-500/20' 
                            : 'bg-pink-100 text-pink-700 ring-2 ring-pink-500/20'
                        }`}>
                          {msg.sender === 'reddy' ? 'R' : '雨'}
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-xs text-muted-foreground ml-1">
                             {msg.sender === 'reddy' ? content.chat.reddy : content.chat.xiaoyu}
                          </span>
                          <div className={`p-4 rounded-2xl text-lg shadow-sm leading-relaxed ${
                            msg.sender === 'reddy' 
                              ? 'bg-blue-50 text-slate-800 border border-blue-100 rounded-tl-none' 
                              : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                          }`}>
                            {msg.text}
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Show choices after message 6 */}
                    {index === 5 && (
                      <div className="ml-14 my-6 space-y-3 bg-slate-50/50 p-4 rounded-xl border border-dashed border-border/60">
                         <p className="text-sm font-medium text-muted-foreground mb-2">請選擇瑞迪的回答：</p>
                         {CHOICES.map((choice) => (
                          <button
                            key={choice.id}
                            onClick={() => handleChoice(choice.id)}
                            className={`w-full p-4 text-left shadow-sm transition-all rounded-xl border-2 ${
                               chatState.completed && chatState.messages.find(m => m.text === choice.text)
                                ? 'bg-primary/5 border-primary ring-2 ring-primary/20'
                                : 'bg-white border-border'
                            }`}
                          >
                            <span className="flex items-center gap-4">
                              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                                chatState.completed && chatState.messages.find(m => m.text === choice.text)
                                  ? 'bg-primary text-white'
                                  : 'bg-slate-100 text-slate-500'
                              }`}>
                                {choice.id}
                              </span>
                              <span className="font-medium text-lg text-foreground">{choice.text}</span>
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                <div ref={chatEndRef} />
              </div>
            </Card>
          </div>

          <div className="space-y-4 mb-12">
            {content.sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4 card-hover cursor-pointer border-2 border-border/50 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      {section.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-jade" />
                      ) : (
                        <Play className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{section.title}</h3>
                      <p className="text-sm text-muted-foreground">{section.duration}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card className="p-8 bg-gradient-to-br from-muted/50 to-background border-2 border-dashed border-border text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-chinese">🚧</span>
            </div>
            <h3 className="text-xl font-semibold font-serif-chinese mb-2">{content.comingSoon}</h3>
            <p className="text-muted-foreground">{content.comingSoonDesc}</p>
          </Card>
        </motion.div>
      </main>

      <footer className="py-12 border-t border-border bg-muted/20 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-sm font-chinese text-primary-foreground">漢</span>
              </div>
              <span className="font-semibold font-serif-chinese">HanYu</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t.footer.copyright}
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Affinity Meter - Fixed at bottom right */}
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={`fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-full shadow-2xl backdrop-blur-md border-2 cursor-pointer transition-colors duration-500 ${
            chatState.affinity === 'green' 
              ? 'bg-jade/90 border-jade text-white shadow-jade/20' 
              : 'bg-red-500/90 border-red-500 text-white shadow-red-500/20'
          }`}
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Heart className={`w-6 h-6 fill-current`} />
          </motion.div>
          <div className="flex flex-col">
             <span className="font-bold text-base whitespace-nowrap">{content.chat.affinity}</span>
             <span className="text-xs opacity-90 font-medium">
               {chatState.affinity === 'green' ? '心情很好' : '心情普通'}
             </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}