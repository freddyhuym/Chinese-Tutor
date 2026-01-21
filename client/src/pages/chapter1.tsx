import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ChevronLeft,
  Languages,
  BookOpen,
  Play,
  CheckCircle2
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
    comingSoonDesc: "我們正在努力準備精彩的學習內容，敬請期待！"
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
    comingSoonDesc: "We are working hard to prepare exciting learning content. Stay tuned!"
  }
};

export default function Chapter1() {
  const [lang, setLang] = useState<Language>("zh");
  const [showStoryTranslation, setShowStoryTranslation] = useState(false);
  const t = getTranslations(lang);
  const content = chapterContent[lang];

  const toggleLang = () => {
    setLang(prev => prev === "zh" ? "en" : "zh");
  };

  const currentStoryContent = showStoryTranslation 
    ? translations.en.chapter1Page?.background 
    : translations.zh.chapter1Page?.background;

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
    </div>
  );
}
