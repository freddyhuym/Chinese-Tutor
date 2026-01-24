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
import heroBackground from "@/assets/generated_images/handsome_reddy_taipei_101_hero_v2.png";
import appLogo from "@/assets/generated_images/app_logo.png";
import chineseCulturalBg from "@assets/generated_images/light_chinese_lanterns_architecture_background.png";
import { type Language, getTranslations } from "@/lib/i18n";
import { Link } from "wouter";
import { Header } from "@/components/Header";

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
      <Header />

      <section className="relative overflow-hidden min-h-[100vh] flex items-center justify-center bg-black/10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
          <div className="flex flex-col items-start gap-8 max-w-2xl">
            
            {/* Text Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white drop-shadow-lg"
            >
              <h1 className="text-4xl md:text-6xl font-bold font-serif-chinese tracking-tight mb-6 leading-tight">
                 {/* @ts-ignore */}
                {t.hero.randyIntro.split('\n')[0]}
              </h1>
              
              <div className="space-y-4 text-lg md:text-2xl font-serif-chinese text-slate-100/90 leading-relaxed whitespace-pre-line text-shadow-sm">
                 {/* @ts-ignore */}
                 {t.hero.randyIntro.split('\n').slice(1).join('\n')}
              </div>
              
              <div className="mt-10">
                <Link href="/chapter1">
                  <Button 
                    size="lg" 
                    className="gap-3 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 text-xl px-10 py-7 rounded-full transition-all hover:scale-105" 
                    data-testid="button-start-learning"
                  >
                    {t.hero.startLearning}
                    <ArrowRight className="w-6 h-6" />
                  </Button>
                </Link>
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>

      <section id="about-section" className="py-24 border-y border-border bg-muted/30 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-serif-chinese mb-8">適合對象與程度</h2>
            <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed font-serif-chinese">
              <p>
                本教材專為 <span className="text-foreground font-semibold">學習中文三個月以上</span> 的學習者設計
              </p>
              <p>
                難度相當於 <span className="text-jade font-bold">TCBL 第二級</span> 程度
              </p>
              <p>
                無論您是自學還是參與課程，這都是您 <span className="text-foreground font-semibold">課堂之外的最佳補充教材</span>
              </p>
            </div>

            <div className="mt-12">
              <Button 
                size="lg" 
                variant="outline"
                className="gap-2 text-lg px-8 py-6"
                onClick={() => {
                  const toolsSection = document.getElementById('tools-section');
                  if (toolsSection) {
                    toolsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                探索學習工具
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
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
              <img src={appLogo} alt="Logo" className="w-8 h-8 rounded-lg bg-white/90 p-1" />
              <div className="px-2 py-1 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-xs font-bold font-chinese text-primary-foreground">說中文吧：約會篇</span>
              </div>
              <span className="font-semibold font-serif-chinese">Let’s Speak Chinese: Dating Edition</span>
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
