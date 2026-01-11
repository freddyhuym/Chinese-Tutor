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
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import heroBackground from "@assets/generated_images/chinese_calligraphy_ink_texture_background.png";

const flashcards = [
  { character: "你好", pinyin: "nǐ hǎo", meaning: "Hello", audio: true },
  { character: "谢谢", pinyin: "xiè xiè", meaning: "Thank you", audio: true },
  { character: "再见", pinyin: "zài jiàn", meaning: "Goodbye", audio: true },
  { character: "学习", pinyin: "xué xí", meaning: "To study", audio: true },
  { character: "中文", pinyin: "zhōng wén", meaning: "Chinese", audio: true },
];

const lessons = [
  { id: 1, title: "Basic Greetings", characters: 12, duration: "15 min", progress: 100, completed: true },
  { id: 2, title: "Numbers 1-10", characters: 10, duration: "12 min", progress: 75, completed: false },
  { id: 3, title: "Family Members", characters: 15, duration: "20 min", progress: 30, completed: false },
  { id: 4, title: "Colors & Shapes", characters: 14, duration: "18 min", progress: 0, completed: false },
  { id: 5, title: "Food & Drinks", characters: 20, duration: "25 min", progress: 0, completed: false },
];

const tones = [
  { tone: 1, mark: "ā", name: "High level", description: "High and flat, like singing a note", example: "mā (妈) - mother" },
  { tone: 2, mark: "á", name: "Rising", description: "Rising up, like asking 'what?'", example: "má (麻) - hemp" },
  { tone: 3, mark: "ǎ", name: "Falling-rising", description: "Dips down then rises", example: "mǎ (马) - horse" },
  { tone: 4, mark: "à", name: "Falling", description: "Sharp drop, like saying 'no!'", example: "mà (骂) - scold" },
];

const stats = [
  { label: "Characters Learned", value: "156", icon: BookOpen, color: "text-vermillion" },
  { label: "Day Streak", value: "12", icon: Zap, color: "text-gold" },
  { label: "XP Earned", value: "2,450", icon: Star, color: "text-jade" },
];

function FlashcardSection() {
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
          <h3 className="text-xl font-semibold font-serif-chinese">Daily Practice</h3>
          <p className="text-muted-foreground text-sm mt-1">Tap to reveal meaning</p>
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
                  <span className="block text-2xl font-semibold text-foreground">{card.meaning}</span>
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
          Reset
        </Button>
        <Button 
          className="flex-1 gap-2 bg-primary hover:bg-primary/90"
          onClick={nextCard}
          data-testid="button-next-card"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

function TonesSection() {
  const [activeTone, setActiveTone] = useState(0);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold font-serif-chinese">Master the Tones</h3>
        <p className="text-muted-foreground text-sm mt-1">Chinese has 4 main tones that change meaning</p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {tones.map((tone, index) => (
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
            <span className="text-xs mt-1 block opacity-80">Tone {tone.tone}</span>
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
              <span className="text-2xl font-serif text-primary">{tones[activeTone].mark}</span>
            </div>
            <div>
              <h4 className="font-semibold">{tones[activeTone].name}</h4>
              <p className="text-sm text-muted-foreground">{tones[activeTone].description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 pt-2 border-t border-border/50">
            <Play className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">{tones[activeTone].example}</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function LessonsSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold font-serif-chinese">Learning Path</h3>
          <p className="text-muted-foreground text-sm mt-1">Structured lessons for beginners</p>
        </div>
        <Button variant="ghost" size="sm" className="gap-1 text-primary" data-testid="button-view-all">
          View All <ArrowRight className="w-4 h-4" />
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
                      <Badge variant="secondary" className="text-xs">In Progress</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {lesson.characters} characters · {lesson.duration}
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

function CharacterPractice() {
  const [strokeIndex, setStrokeIndex] = useState(0);
  const character = "学";
  const totalStrokes = 8;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold font-serif-chinese">Character Writing</h3>
        <p className="text-muted-foreground text-sm mt-1">Practice stroke order</p>
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
          <span className="text-sm text-muted-foreground">Stroke {strokeIndex + 1} of {totalStrokes}</span>
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
          Restart
        </Button>
        <Button 
          className="flex-1 bg-jade hover:bg-jade/90 text-white"
          onClick={() => setStrokeIndex((prev) => Math.min(prev + 1, totalStrokes - 1))}
          data-testid="button-next-stroke"
        >
          Next Stroke
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

export default function Home() {
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
              <a href="#" className="text-sm font-medium brush-underline text-foreground" data-testid="nav-learn">Learn</a>
              <a href="#" className="text-sm font-medium brush-underline text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-practice">Practice</a>
              <a href="#" className="text-sm font-medium brush-underline text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-characters">Characters</a>
              <a href="#" className="text-sm font-medium brush-underline text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-community">Community</a>
            </nav>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="gap-2" data-testid="button-streak">
                <Zap className="w-4 h-4 text-gold" />
                <span className="font-semibold">12</span>
              </Button>
              <Button variant="outline" size="sm" data-testid="button-login">Sign In</Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90" data-testid="button-signup">Get Started</Button>
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
                Interactive Learning
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold font-serif-chinese tracking-tight">
                Learn <span className="text-gradient-vermillion">Chinese</span>
                <br />
                <span className="font-chinese text-6xl md:text-8xl">一步一步</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                Master Mandarin with interactive flashcards, tone practice, and stroke-by-stroke character writing. 
                <span className="text-foreground font-medium"> Your journey starts here.</span>
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 shadow-lg" data-testid="button-start-learning">
                  Start Learning Free
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="gap-2" data-testid="button-demo">
                  <Play className="w-5 h-5" />
                  Watch Demo
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
            {stats.map((stat, index) => (
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

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-serif-chinese">Interactive Learning Tools</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Everything you need to master Mandarin Chinese, all in one place
            </p>
          </div>

          <Tabs defaultValue="flashcards" className="w-full">
            <TabsList className="grid w-full max-w-lg mx-auto grid-cols-4 mb-8">
              <TabsTrigger value="flashcards" data-testid="tab-flashcards">Flashcards</TabsTrigger>
              <TabsTrigger value="tones" data-testid="tab-tones">Tones</TabsTrigger>
              <TabsTrigger value="writing" data-testid="tab-writing">Writing</TabsTrigger>
              <TabsTrigger value="lessons" data-testid="tab-lessons">Lessons</TabsTrigger>
            </TabsList>

            <div className="max-w-xl mx-auto">
              <TabsContent value="flashcards" className="mt-0">
                <FlashcardSection />
              </TabsContent>
              <TabsContent value="tones" className="mt-0">
                <TonesSection />
              </TabsContent>
              <TabsContent value="writing" className="mt-0">
                <CharacterPractice />
              </TabsContent>
              <TabsContent value="lessons" className="mt-0">
                <LessonsSection />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Personalized Learning",
                description: "AI-powered curriculum that adapts to your pace and learning style",
                color: "bg-primary/10 text-primary"
              },
              {
                icon: Trophy,
                title: "Gamified Progress",
                description: "Earn XP, maintain streaks, and unlock achievements as you learn",
                color: "bg-jade/10 text-jade"
              },
              {
                icon: Volume2,
                title: "Native Pronunciation",
                description: "Audio from native speakers helps perfect your tones and accent",
                color: "bg-gold/10 text-gold"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-8 h-full card-hover bg-card">
                  <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6`}>
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-semibold font-serif-chinese mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-8xl font-chinese block mb-6">开始学习</span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif-chinese mb-4">
              Ready to start your Chinese journey?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of learners who are mastering Mandarin the fun and effective way.
            </p>
            <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 shadow-lg" data-testid="button-cta">
              Start Learning Free
              <ArrowRight className="w-5 h-5" />
            </Button>
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
              © 2026 HanYu. Learn Chinese with love.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
