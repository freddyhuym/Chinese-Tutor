import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Languages, BookOpen, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTranslations, type Language } from "@/lib/i18n";
import { Link } from "wouter";

export default function Philosophy() {
  const [lang, setLang] = useState<Language>("zh");
  const t = getTranslations(lang);
  const [location] = useLocation();

  const toggleLang = () => {
    setLang(prev => prev === "zh" ? "en" : "zh");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3 cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-xl font-chinese text-primary-foreground">漢</span>
              </div>
              <span className="text-xl font-semibold font-serif-chinese">Let’s Speak Chinese: Dating Edition</span>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm font-medium brush-underline text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-home">{t.nav.home}</Link>
              <Link href="/philosophy" className="text-sm font-medium brush-underline text-foreground" data-testid="nav-philosophy">{t.nav.philosophy}</Link>
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-serif-chinese mb-6 text-foreground">
              {t.philosophy.title}
            </h1>
            <p className="text-xl text-muted-foreground font-serif-chinese">
              {t.philosophy.subtitle}
            </p>
          </div>

          <div className="space-y-16">
            <section className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold font-serif-chinese mb-6 flex items-center gap-3 text-jade">
                <span className="w-8 h-8 rounded-full bg-jade/10 flex items-center justify-center text-sm">1</span>
                {t.philosophy.section1.title}
              </h2>
              <div className="bg-card/50 rounded-2xl p-8 border border-border/50 backdrop-blur-sm shadow-sm">
                <p className="leading-relaxed whitespace-pre-line text-muted-foreground font-serif-chinese text-lg">
                  {t.philosophy.section1.content}
                </p>
              </div>
            </section>

            <section className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold font-serif-chinese mb-6 flex items-center gap-3 text-vermillion">
                <span className="w-8 h-8 rounded-full bg-vermillion/10 flex items-center justify-center text-sm">2</span>
                {t.philosophy.section2.title}
              </h2>
              <div className="bg-card/50 rounded-2xl p-8 border border-border/50 backdrop-blur-sm shadow-sm">
                <p className="leading-relaxed whitespace-pre-line text-muted-foreground font-serif-chinese text-lg">
                  {t.philosophy.section2.content}
                </p>
              </div>
            </section>

            <section className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold font-serif-chinese mb-6 flex items-center gap-3 text-gold">
                <span className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-sm">3</span>
                {t.philosophy.section3.title}
              </h2>
              <div className="bg-card/50 rounded-2xl p-8 border border-border/50 backdrop-blur-sm shadow-sm">
                <p className="leading-relaxed whitespace-pre-line text-muted-foreground font-serif-chinese text-lg">
                  {t.philosophy.section3.content}
                </p>
              </div>
            </section>
          </div>

          <div className="mt-20 text-center">
            <Link href="/chapter1">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 gap-2">
                {t.cta.button}
                <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>

      <footer className="py-12 border-t border-border bg-muted/20 mt-20">
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