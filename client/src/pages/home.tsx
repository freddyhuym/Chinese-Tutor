import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  Volume2, 
  Sparkles, 
  ChevronRight, 
  RotateCcw,
  Trophy,
  Target,
  Zap,
  Heart,
  Star,
  ArrowRight,
  Play,
  CheckCircle2,
  Languages
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import heroBackground from "@assets/generated_images/chinese_calligraphy_ink_texture_background.png";
import chineseCulturalBg from "@assets/generated_images/chinese_cultural_floral_background.png";
import { type Language, getTranslations } from "@/lib/i18n";
import { Link } from "wouter";

const flashcards = [
  { character: "你好", pinyin: "nǐ hǎo", meaning: "Hello", meaningZh: "問候語" },
  { character: "谢谢", pinyin: "xiè xiè", meaning: "Thank you", meaningZh: "感謝" },
  { character: "再见", pinyin: "zài jiàn", meaning: "Goodbye", meaningZh: "告別" },
  { character: "学习", pinyin: "xué xí", meaning: "To study", meaningZh: "學習" },
  { character: "中文", pinyin: "zhōng wén", meaning: "Chinese", meaningZh: "中國語言" },
];

const lessonsData = {
  en: [
    { id: 1, title: "Basic Greetings", characters: 12, duration: "15 min", progress: 100, completed: true },
    { id: 2, title: "Numbers 1-10", characters: 10, duration: "12 min", progress: 75, completed: false },
    { id: 3, title: "Family Members", characters: 15, duration: "20 min", progress: 30, completed: false },
    { id: 4, title: "Colors & Shapes", characters: 14, duration: "18 min", progress: 0, completed: false },
    { id: 5, title: "Food & Drinks", characters: 20, duration: "25 min", progress: 0, completed: false },
  ],
  zh: [
    { id: 1, title: "基本問候", characters: 12, duration: "15 分鐘", progress: 100, completed: true },
    { id: 2, title: "數字 1-10", characters: 10, duration: "12 分鐘", progress: 75, completed: false },
    { id: 3, title: "家庭成員", characters: 15, duration: "20 分鐘", progress: 30, completed: false },
    { id: 4, title: "顏色與形狀", characters: 14, duration: "18 分鐘", progress: 0, completed: false },
    { id: 5, title: "食物與飲料", characters: 20, duration: "25 分鐘", progress: 0, completed: false },
  ],
};

const tonesData = [
  { tone: 1, mark: "ā", example: "mā (妈) - mother", exampleZh: "mā (媽) - 媽媽" },
  { tone: 2, mark: "á", example: "má (麻) - hemp", exampleZh: "má (麻) - 麻" },
  { tone: 3, mark: "ǎ", example: "mǎ (马) - horse", exampleZh: "mǎ (馬) - 馬" },
  { tone: 4, mark: "à", example: "mà (骂) - scold", exampleZh: "mà (罵) - 罵" },
];

function FlashcardSection({ lang }: { lang: Language }) {
  const t = getTranslations(lang);
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCard((prev) => (prev + 1) % flashcards.length);
    }, 150);
  };

  const card = flashcards[currentCard];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold font-serif-chinese">{t.flashcard.title}</h3>
          <p className="text-muted-foreground text-sm mt-1">{t.flashcard.subtitle}</p>
        </div>
        <Badge variant="secondary" className="gap-1">
          <Sparkles className="w-3 h-3" />
          {currentCard + 1}/{flashcards.length}
        </Badge>
      </div>

      <motion.div
        className="relative h-64 cursor-pointer perspective-1000"
        onClick={() => setIsFlipped(!isFlipped)}
        data-testid="flashcard-container"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentCard}-${isFlipped}`}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Card className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-card to-background border-2 border-border/50 shadow-lg">
              {!isFlipped ? (
                <div className="text-center space-y-4">
                  <span className="text-7xl font-chinese text-foreground">{card.character}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg text-primary font-medium">{card.pinyin}</span>
                    <button 
                      className="p-1.5 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                      onClick={(e) => { e.stopPropagation(); }}
                      data-testid="audio-button"
                    >
                      <Volume2 className="w-4 h-4 text-primary" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-3">
                  <span className="text-5xl font-chinese text-muted-foreground/50">{card.character}</span>
                  <span className="block text-2xl font-semibold text-foreground">
                    {lang === "zh" ? card.meaningZh : card.meaning}
                  </span>
                  <span className="text-primary">{card.pinyin}</span>
                </div>
              )}
            </Card>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="flex gap-3">
        <Button 
          variant="outline" 
          className="flex-1 gap-2"
          onClick={() => setCurrentCard(0)}
          data-testid="button-reset"
        >
          <RotateCcw className="w-4 h-4" />
          {t.flashcard.reset}
        </Button>
        <Button 
          className="flex-1 gap-2 bg-primary hover:bg-primary/90"
          onClick={nextCard}
          data-testid="button-next-card"
        >
          {t.flashcard.next}
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

function TonesSection({ lang }: { lang: Language }) {
  const t = getTranslations(lang);
  const [activeTone, setActiveTone] = useState(0);

  const toneTranslations = [t.tones.tone1, t.tones.tone2, t.tones.tone3, t.tones.tone4];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold font-serif-chinese">{t.tones.title}</h3>
        <p className="text-muted-foreground text-sm mt-1">{t.tones.subtitle}</p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {tonesData.map((tone, index) => (
          <button
            key={tone.tone}
            onClick={() => setActiveTone(index)}
            className={`p-4 rounded-xl text-center transition-all duration-300 ${
              activeTone === index 
                ? "bg-primary text-primary-foreground shadow-lg scale-105" 
                : "bg-secondary hover:bg-secondary/80"
            }`}
            data-testid={`tone-button-${tone.tone}`}
          >
            <span className="text-3xl font-serif block">{tone.mark}</span>
            <span className="text-xs mt-1 block opacity-80">
              {lang === "zh" ? `第${tone.tone}聲` : `Tone ${tone.tone}`}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTone}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-muted/50 rounded-xl p-5 space-y-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-2xl font-serif text-primary">{tonesData[activeTone].mark}</span>
            </div>
            <div>
              <h4 className="font-semibold">{toneTranslations[activeTone].name}</h4>
              <p className="text-sm text-muted-foreground">{toneTranslations[activeTone].description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 pt-2 border-t border-border/50">
            <Play className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">
              {lang === "zh" ? tonesData[activeTone].exampleZh : tonesData[activeTone].example}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function LessonsSection({ lang }: { lang: Language }) {
  const t = getTranslations(lang);
  const lessons = lessonsData[lang];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold font-serif-chinese">{t.lessons.title}</h3>
          <p className="text-muted-foreground text-sm mt-1">{t.lessons.subtitle}</p>
        </div>
        <Button variant="ghost" size="sm" className="gap-1 text-primary" data-testid="button-view-all">
          {t.lessons.viewAll} <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-3">
        {lessons.map((lesson, index) => (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              className={`p-4 card-hover cursor-pointer border ${
                lesson.completed 
                  ? "border-jade/30 bg-jade/5" 
                  : lesson.progress > 0 
                    ? "border-primary/30 bg-primary/5" 
                    : "border-border"
              }`}
              data-testid={`lesson-card-${lesson.id}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  lesson.completed 
                    ? "bg-jade text-white" 
                    : lesson.progress > 0 
                      ? "bg-primary/10 text-primary" 
                      : "bg-muted text-muted-foreground"
                }`}>
                  {lesson.completed ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    <span className="text-lg font-semibold">{lesson.id}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium truncate">{lesson.title}</h4>
                    {lesson.progress > 0 && lesson.progress < 100 && (
                      <Badge variant="secondary" className="text-xs">{t.lessons.inProgress}</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {lesson.characters} {t.lessons.characters} · {lesson.duration}
                  </p>
                  {lesson.progress > 0 && !lesson.completed && (
                    <Progress value={lesson.progress} className="h-1.5 mt-2" />
                  )}
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CharacterPractice({ lang }: { lang: Language }) {
  const t = getTranslations(lang);
  const [strokeIndex, setStrokeIndex] = useState(0);
  const character = "学";
  const totalStrokes = 8;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold font-serif-chinese">{t.writing.title}</h3>
        <p className="text-muted-foreground text-sm mt-1">{t.writing.subtitle}</p>
      </div>

      <Card className="p-8 bg-gradient-to-br from-card to-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 opacity-20 pointer-events-none">
          <div className="border-r border-b border-dashed border-foreground/30" />
          <div className="border-b border-dashed border-foreground/30" />
          <div className="border-r border-dashed border-foreground/30" />
          <div />
        </div>
        <div className="relative flex items-center justify-center h-48">
          <span className="text-[140px] font-chinese text-foreground/90 select-none">{character}</span>
        </div>
        <div className="flex items-center justify-center gap-4 mt-4">
          <span className="text-sm text-muted-foreground">
            {t.writing.stroke} {strokeIndex + 1} {t.writing.of} {totalStrokes}
          </span>
        </div>
      </Card>

      <div className="flex gap-3">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => setStrokeIndex(0)}
          data-testid="button-restart-stroke"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          {t.writing.restart}
        </Button>
        <Button 
          className="flex-1 bg-jade hover:bg-jade/90 text-white"
          onClick={() => setStrokeIndex((prev) => Math.min(prev + 1, totalStrokes - 1))}
          data-testid="button-next-stroke"
        >
          {t.writing.nextStroke}
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Language>("zh");
  const t = getTranslations(lang);

  const toggleLang = () => {
    setLang(prev => prev === "zh" ? "en" : "zh");
  };

  const statsData = [
    { label: t.stats.charactersLearned, value: "156", icon: BookOpen, color: "text-vermillion" },
    { label: t.stats.dayStreak, value: "12", icon: Zap, color: "text-gold" },
    { label: t.stats.xpEarned, value: "2,450", icon: Star, color: "text-jade" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-xl font-chinese text-primary-foreground">漢</span>
              </div>
              <span className="text-xl font-semibold font-serif-chinese">HanYu</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-sm font-medium brush-underline text-foreground" data-testid="nav-home">{t.nav.home}</a>
              <Link href="/chapter1" className="text-sm font-medium brush-underline text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-chapter1">{t.nav.chapter1}</Link>
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
              <Button size="sm" className="bg-primary hover:bg-primary/90" data-testid="button-signup">{t.nav.getStarted}</Button>
            </div>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${heroBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 gap-1">
                <Sparkles className="w-3 h-3" />
                {t.hero.badge}
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold font-serif-chinese tracking-tight">
                {t.hero.title1} <span className="text-gradient-vermillion">{t.hero.title2}</span>
                <br />
                <span className="font-chinese text-6xl md:text-8xl">{t.hero.subtitle}</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                {t.hero.description}
                <span className="text-foreground font-medium"> {t.hero.descriptionHighlight}</span>
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="gap-2 bg-primary hover:bg-primary/90 shadow-lg" 
                  data-testid="button-start-learning"
                  onClick={() => {
                    const toolsSection = document.getElementById('tools-section');
                    if (toolsSection) {
                      toolsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {t.hero.startLearning}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2"
          >
            <div className="relative">
              <div className="text-[200px] font-chinese text-primary/10 select-none animate-float">
                学
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-primary/5 backdrop-blur-sm flex items-center justify-center">
                  <Heart className="w-12 h-12 text-primary" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 border-y border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statsData.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="p-6 flex items-center gap-4 bg-card/50 backdrop-blur-sm">
                  <div className={`w-14 h-14 rounded-2xl bg-background flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold font-serif-chinese">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="tools-section" className="py-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0.7 }}
            whileInView={{ opacity: 1, scale: 1.02 }}
            viewport={{ once: false }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-serif-chinese">{t.howToUse.title}</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              {t.howToUse.description}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {t.howToUse.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full card-hover bg-card border-2 border-border/50 hover:border-primary/30 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-bold text-primary">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold font-serif-chinese mb-2">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-10 max-w-2xl mx-auto"
          >
            <Card className="p-6 bg-gradient-to-r from-jade/10 to-primary/10 border-jade/30">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-jade/20 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-jade" />
                </div>
                <div>
                  <h4 className="font-semibold text-jade mb-1">{t.howToUse.tip}</h4>
                  <p className="text-muted-foreground">{t.howToUse.tipContent}</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <Button 
              size="lg" 
              variant="outline"
              className="gap-2"
              onClick={() => {
                const whySection = document.getElementById('why-choose-us');
                if (whySection) {
                  whySection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              data-testid="button-why-choose-us"
            >
              {t.howToUse.whyChooseUs}
              <ChevronRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      <section id="why-choose-us" className="py-24 scroll-mt-20 relative overflow-hidden">
        <div 
          className="absolute inset-0" 
          style={{ 
            background: 'linear-gradient(135deg, rgb(255, 245, 245) 0%, rgb(255, 235, 235) 30%, rgb(255, 220, 220) 60%, rgb(255, 210, 210) 100%)' 
          }} 
        />
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-primary/30 rounded-full shadow-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              <Sparkles className="w-4 h-4 text-primary/40" />
            </motion.div>
          ))}
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold font-serif-chinese leading-relaxed text-foreground whitespace-pre-line">
              {t.whyChooseUs.title}
            </h2>
          </motion.div>

          <div className="space-y-8 max-w-3xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground leading-loose text-justify indent-8"
            >
              {t.whyChooseUs.paragraph1}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground leading-loose text-justify indent-8"
            >
              {t.whyChooseUs.paragraph2}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Start Learning Section */}
      <section id="start-learning" className="py-24 scroll-mt-20 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${chineseCulturalBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/50" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <span className="text-7xl md:text-8xl font-chinese block mb-6 drop-shadow-sm">开始学习</span>
            <h3 className="text-2xl md:text-3xl font-bold font-serif-chinese mb-4">
              {t.cta.title}
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              {t.cta.description}
            </p>
            <Link href="/chapter1">
              <Button 
                size="lg" 
                className="gap-2 bg-primary hover:bg-primary/90 shadow-lg" 
                data-testid="button-cta"
              >
                {t.cta.button}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <footer className="py-12 border-t border-border bg-muted/20">
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
