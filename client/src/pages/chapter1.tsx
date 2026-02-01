import React, { useState, useEffect, useRef, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronDown,
  Languages,
  BookOpen,
  Play,
  CheckCircle2,
  Heart,
  Volume2,
  Type,
  List,
  Mic,
  MicOff,
  RotateCcw,
  Headphones,
  BookOpenText,
  PenTool,
  Check,
  X,
  BicepsFlexed,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import appLogo from "@/assets/generated_images/app_logo.png";
import { type Language, getTranslations, translations } from "@/lib/i18n";
import { Link } from "wouter";
import { Header } from "@/components/Header";
// @ts-ignore
import casualManImage from "@assets/generated_images/asian_man_in_casual_clothes.png";
// @ts-ignore
import teacherManImage from "@assets/generated_images/asian_male_teacher_illustration.png";
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
    title: "第一章",
    subtitle: "第一次聊天｜First Chat",
    description: "兩個人互相介紹自己，聊興趣，最後約時間見面。",
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
      title: "APP 第一次聊天",
      subtitle: "有些回答，可能會讓小雨心跳加快",
      randy: "瑞迪",
      xiaoyu: "小雨",
      affinity: "",
    },
    vocabulary: {
      title: "生詞列表",
      subtitle: "手機觀看往右滑動可以看到完整資訊",
      columns: {
        word: "生詞",
        pinyin: "拼音",
        english: "英文翻譯",
        partOfSpeech: "詞類",
        tbcl: "TBCL",
      },
    },
    grammar: {
      title: "語法點",
      subtitle: "重點語法解析",
    },
  },
  en: {
    title: "Chapter 1",
    subtitle: "Getting Started",
    description:
      "Welcome to Chapter 1! Here you will learn the basics of Chinese.",
    backToHome: "Back to Home",
    sections: [
      { title: "Course Introduction", duration: "5 min", completed: false },
      { title: "Basic Pronunciation", duration: "10 min", completed: false },
      { title: "Tone Practice", duration: "15 min", completed: false },
      { title: "Common Greetings", duration: "10 min", completed: false },
    ],
    comingSoon: "Coming Soon",
    comingSoonDesc:
      "We are working hard to prepare exciting learning content. Stay tuned!",
    chat: {
      title: "First Chat",
      subtitle: "Some of your replies might make Xiaoyu’s heart beat faster",
      randy: "Randy",
      xiaoyu: "Xiao Yu",
      affinity: "Xiao Yu's Affinity",
    },
    vocabulary: {
      title: "Vocabulary List",
      subtitle: "Key words for this chapter",
      columns: {
        word: "Word",
        pinyin: "Pinyin",
        english: "Meaning",
        partOfSpeech: "POS",
        tbcl: "TBCL",
      },
    },
    grammar: {
      title: "Grammar Points",
      subtitle: "Key Grammar Explanations",
    },
  },
};

type GrammarExample = {
  zh: string;
  pinyin: string;
  en: string;
};

type GrammarPoint = {
  id: number;
  title: string;
  function: { zh: string; en: string };
  structure: { zh: string; en: string };
  explanation: { zh: string; en: string };
  examples: GrammarExample[];
};

const GRAMMAR_POINTS: GrammarPoint[] = [
  {
    id: 1,
    title: "想",
    function: {
      zh: "表示想要做某件事。",
      en: "Indicates a desire to do something.",
    },
    structure: { zh: "主語 + 想 + 動詞", en: "Subject + Want (Xiang) + Verb" },
    explanation: {
      zh: "用來說現在的想法或計畫。",
      en: "Used to express current thoughts or plans.",
    },
    examples: [
      {
        zh: "我想學中文。",
        pinyin: "Wǒ xiǎng xué Zhōngwén.",
        en: "I want to learn Chinese.",
      },
      { zh: "我想吃飯。", pinyin: "Wǒ xiǎng chīfàn.", en: "I want to eat." },
      {
        zh: "我想看電影。",
        pinyin: "Wǒ xiǎng kàn diànyǐng.",
        en: "I want to watch a movie.",
      },
    ],
  },
  {
    id: 2,
    title: "一點",
    function: {
      zh: "表示數量或程度很少。",
      en: "Indicates a very small quantity or degree.",
    },
    structure: {
      zh: "1️⃣ 動詞 + 一點\n2️⃣ 一點 + 名詞",
      en: "1. Verb + a little\n2. A little + Noun",
    },
    explanation: { zh: "用來說「不多」。", en: 'Used to say "not much".' },
    examples: [
      {
        zh: "我說一點中文。",
        pinyin: "Wǒ shuō yīdiǎn Zhōngwén.",
        en: "I speak a little Chinese.",
      },
      {
        zh: "我想喝一點水。",
        pinyin: "Wǒ xiǎng hē yīdiǎn shuǐ.",
        en: "I want to drink a little water.",
      },
      {
        zh: "你要不要吃一點飯？",
        pinyin: "Nǐ yào bù yào chī yīdiǎn fàn?",
        en: "Do you want to eat a little rice?",
      },
    ],
  },
  {
    id: 3,
    title: "也",
    function: {
      zh: "表示一樣、同樣。",
      en: "Indicates sameness or similarity.",
    },
    structure: { zh: "主語 + 也 + 動詞", en: "Subject + Also (Ye) + Verb" },
    explanation: {
      zh: "表示「我跟你一樣」。",
      en: 'Indicates "I am the same as you".',
    },
    examples: [
      {
        zh: "我喜歡爸爸，也喜歡媽媽。",
        pinyin: "Wǒ xǐhuān bàba, yě xǐhuān māma.",
        en: "I like dad, and I also like mom.",
      },
      {
        zh: "他學中文，我也學中文。",
        pinyin: "Tā xué Zhōngwén, wǒ yě xué Zhōngwén.",
        en: "He learns Chinese, I also learn Chinese.",
      },
      {
        zh: "她要去，我也要去。",
        pinyin: "Tā yào qù, wǒ yě yào qù.",
        en: "She is going, I am also going.",
      },
    ],
  },
  {
    id: 4,
    title: "在 / 正在",
    function: {
      zh: "表示現在正在做的事。",
      en: "Indicates an action currently in progress.",
    },
    structure: {
      zh: "1️⃣ 主語 + 在 + 動詞\n2️⃣ 主語 + 正在 + 動詞",
      en: "1. Subject + Zai + Verb\n2. Subject + Zhengzai + Verb",
    },
    explanation: {
      zh: "兩個都表示「現在做」，\n「在」比較口語，「正在」比較完整。",
      en: 'Both indicate "doing now". "Zai" is more colloquial, while "Zhengzai" is more complete/formal.',
    },
    examples: [
      {
        zh: "我在學中文。",
        pinyin: "Wǒ zài xué Zhōngwén.",
        en: "I am learning Chinese.",
      },
      { zh: "我正在吃飯。", pinyin: "Wǒ zhèngzài chīfàn.", en: "I am eating." },
      {
        zh: "她在看書。",
        pinyin: "Tā zài kànshū.",
        en: "She is reading a book.",
      },
    ],
  },
  {
    id: 5,
    title: "呢",
    function: {
      zh: "呢是一個助詞，用在陳述句後形成簡略問句。",
      en: "The 呢 ne question is a tag question with a short form following a statement.",
    },
    structure: {
      zh: "陳述句 + 呢？",
      en: "Statement + ne?",
    },
    explanation: {
      zh: "用來反問對方「那你呢？」或是根據上下文問「那...呢？」。",
      en: 'Used to ask "And you?" or "What about...?" depending on the context.',
    },
    examples: [
      {
        zh: "我是美國人，你呢？",
        pinyin: "Wǒ shì Měiguó rén, nǐ ne?",
        en: "I am American, and you?",
      },
      {
        zh: "這本書很有趣，那本呢？",
        pinyin: "Zhè běn shū hěn yǒuyìsi, nà běn ne?",
        en: "This book is interesting, what about that one?",
      },
      {
        zh: "爸爸在看書，媽媽呢？",
        pinyin: "Bàba zài kànshū, māma ne?",
        en: "Dad is reading, what about Mom?",
      },
    ],
  },
  {
    id: 6,
    title: "跟",
    function: {
      zh: "介系詞「跟」引出一起做動作的對象。",
      en: "The preposition 跟 gēn introduces somebody one does something with.",
    },
    structure: {
      zh: "主語 + 跟 + 對象 + (一起) + 動詞短語",
      en: "Subject + with + Person + (together) + Verb Phrase",
    },
    explanation: {
      zh: "副詞「一起」常與「跟」搭配使用，放在主要動詞前面。",
      en: "The adverb 一起 yìqǐ is commonly associated with 跟 gēn and is placed in front of the main verb.",
    },
    examples: [
      {
        zh: "我喜歡跟姐姐看電影。",
        pinyin: "Wǒ xǐhuān gēn jiějie kàn diànyǐng.",
        en: "I like watching movies with my older sister.",
      },
      {
        zh: "我跟我哥哥在學校讀書。",
        pinyin: "Wǒ gēn wǒ gēge zài xuéxiào dúshū.",
        en: "I study at school with my older brother.",
      },
      {
        zh: "我下星期要跟朋友去打籃球。",
        pinyin: "Wǒ xià xīngqī yào gēn péngyǒu qù dǎ lánqiú.",
        en: "I am going to play basketball with friends next week.",
      },
    ],
  },
];

function SpeakingPractice({
  casualImage,
  teacherImage,
}: {
  casualImage: string;
  teacherImage: string;
}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [matchState, setMatchState] = useState<0 | 1 | 2>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let recognition: any = null;

    if (isListening) {
      if ("webkitSpeechRecognition" in window) {
        // @ts-ignore
        recognition = new window.webkitSpeechRecognition();
      } else if ("SpeechRecognition" in window) {
        // @ts-ignore
        recognition = new window.SpeechRecognition();
      } else {
        setError("Your browser does not support speech recognition.");
        setIsListening(false);
        return;
      }

      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "zh-TW";

      recognition.onresult = (event: any) => {
        let sessionTranscript = "";
        for (let i = 0; i < event.results.length; ++i) {
          sessionTranscript += event.results[i][0].transcript;
        }

        setTranscript(sessionTranscript);

        setMatchState((prev) => {
          if (prev === 2) return 2;

          const hasPart1 = sessionTranscript.includes("你是老師");
          const hasPart2 = sessionTranscript.includes("我也是老師");

          if (hasPart1 && hasPart2) {
            return 2;
          } else if (hasPart1) {
            return 1;
          } else if (prev === 1 && hasPart2) {
            // If we already matched part 1 previously, and now see part 2
            return 2;
          }

          return prev;
        });
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [isListening]);

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setTranscript("");
      setMatchState(0);
      setIsListening(true);
      setError(null);
    }
  };

  const resetPractice = () => {
    setIsListening(false);
    setTranscript("");
    setMatchState(0);
    setError(null);
  };

  return (
    <div className="mt-6 pt-6 border-t border-dashed border-border/50">
      <div className="flex items-center gap-2 mb-4">
        
        <span className="text-sm text-muted-foreground">請跟著唸：</span><br/>
        <span className="text-sm font-bold font-serif-chinese">
          你是老師，我也是老師
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Left Image: Changes on "你是老師" */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-full relative aspect-square bg-slate-50 rounded-xl overflow-hidden border border-border/50 transition-all duration-500">
            <AnimatePresence mode="wait">
              <motion.img
                key={matchState >= 1 ? "teacher1" : "casual1"}
                src={matchState >= 1 ? teacherImage : casualImage}
                alt="Person 1"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-contain p-4"
              />
            </AnimatePresence>
            <div className="absolute bottom-2 left-0 right-0 text-center">
              <span
                className={`text-xs font-bold px-2 py-1 rounded-full ${matchState >= 1 ? "bg-jade text-white" : "bg-slate-200 text-slate-500"}`}
              >
                你是老師
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg font-serif-chinese">你</span>
            <span className="text-sm text-muted-foreground">You</span>
          </div>
        </div>

        {/* Right Image: Changes on "我也是老師" */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-full relative aspect-square bg-slate-50 rounded-xl overflow-hidden border border-border/50 transition-all duration-500">
            <AnimatePresence mode="wait">
              <motion.img
                key={matchState >= 2 ? "teacher2" : "casual2"}
                src={matchState >= 2 ? teacherImage : casualImage}
                alt="Person 2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-contain p-4"
              />
            </AnimatePresence>
            <div className="absolute bottom-2 left-0 right-0 text-center">
              <span
                className={`text-xs font-bold px-2 py-1 rounded-full ${matchState >= 2 ? "bg-jade text-white" : "bg-slate-200 text-slate-500"}`}
              >
                我也是老師
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg font-serif-chinese">我</span>
            <span className="text-sm text-muted-foreground">Me</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          <Button
            size="lg"
            className={`rounded-full px-8 transition-all duration-300 ${
              isListening
                ? "bg-red-500 hover:bg-red-600 animate-pulse"
                : "bg-primary hover:bg-primary/90"
            }`}
            onClick={toggleListening}
          >
            {isListening ? (
              <>
                <MicOff className="w-5 h-5 mr-2" />
                停止 Stop
              </>
            ) : (
              <>
                <Mic className="w-5 h-5 mr-2" />
                開始 Start
              </>
            )}
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-6 gap-2"
            onClick={resetPractice}
          >
            <RotateCcw className="w-5 h-5" />
            重新 Reset
          </Button>
        </div>

        {transcript && (
          <div className="text-center p-3 rounded-lg bg-slate-50 border border-border/50 max-w-md w-full">
            <p className="text-xs text-muted-foreground mb-1">
              已偵測 Detected:
            </p>
            <p className="font-serif-chinese text-lg font-medium text-slate-800">
              {transcript}
            </p>
          </div>
        )}

        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    </div>
  );
}

function GrammarPointCard({
  point,
  playAudio,
}: {
  point: GrammarPoint;
  playAudio: (text: string, isMale: boolean) => void;
}) {
  const [showFunctionEn, setShowFunctionEn] = useState(false);
  const [showStructureEn, setShowStructureEn] = useState(false);
  const [showExplanationEn, setShowExplanationEn] = useState(false);
  const [exampleStates, setExampleStates] = useState<{
    [key: number]: { showPinyin: boolean; showEn: boolean };
  }>({});

  const toggleExample = (index: number, type: "pinyin" | "en") => {
    setExampleStates((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        showPinyin:
          type === "pinyin"
            ? !prev[index]?.showPinyin
            : prev[index]?.showPinyin,
        showEn: type === "en" ? !prev[index]?.showEn : prev[index]?.showEn,
      },
    }));
  };

  return (
    <Card className="overflow-hidden border-2 border-border/50 shadow-sm bg-white dark:bg-slate-900 mb-6">
      <div className="bg-primary/5 p-4 border-b border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
            {point.id}
          </div>
          <h3 className="font-bold text-xl font-serif-chinese text-primary">
            {point.title}
          </h3>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Function */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
              功能 Function
            </h4>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 text-xs gap-1 text-primary"
              onClick={() => setShowFunctionEn(!showFunctionEn)}
            >
              <Languages className="w-3 h-3" />
              English
            </Button>
          </div>
          <p className="text-lg font-medium">{point.function.zh}</p>
          {showFunctionEn && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="text-slate-500 text-sm"
            >
              {point.function.en}
            </motion.p>
          )}
        </div>

        {/* Structure */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
              結構 Structure
            </h4>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 text-xs gap-1 text-primary"
              onClick={() => setShowStructureEn(!showStructureEn)}
            >
              <Languages className="w-3 h-3" />
              English
            </Button>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 font-mono text-base whitespace-pre-line text-slate-700">
            {point.structure.zh}
          </div>
          {showStructureEn && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="text-slate-500 text-sm whitespace-pre-line"
            >
              {point.structure.en}
            </motion.p>
          )}
        </div>

        {/* Explanation */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
              解釋 Explanation
            </h4>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 text-xs gap-1 text-primary"
              onClick={() => setShowExplanationEn(!showExplanationEn)}
            >
              <Languages className="w-3 h-3" />
              English
            </Button>
          </div>
          <p className="text-base whitespace-pre-line leading-relaxed">
            {point.explanation.zh}
          </p>
          {showExplanationEn && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="text-slate-500 text-sm whitespace-pre-line mt-1"
            >
              {point.explanation.en}
            </motion.p>
          )}
        </div>

        {/* Examples */}
        <div className="space-y-4 pt-4 border-t border-border/50">
          <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
            例句 Examples (TBCL Level 1)
          </h4>
          <div className="grid gap-3">
            {point.examples.map((ex, idx) => (
              <div
                key={idx}
                className="bg-slate-50/50 p-4 rounded-xl border border-border/50 hover:border-primary/20 transition-colors"
              >
                <div className="flex flex-col gap-2">
                  {exampleStates[idx]?.showPinyin && (
                    <p className="text-sm text-primary font-medium font-serif-chinese">
                      {ex.pinyin}
                    </p>
                  )}
                  <p className="text-lg font-medium text-slate-800">{ex.zh}</p>
                  {exampleStates[idx]?.showEn && (
                    <p className="text-sm text-slate-500">{ex.en}</p>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-dashed border-border/50">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-7 px-2 text-xs gap-1.5 ${exampleStates[idx]?.showPinyin ? "bg-primary/10 text-primary" : "text-slate-500"}`}
                    onClick={() => toggleExample(idx, "pinyin")}
                  >
                    <Type className="w-3 h-3" />
                    拼音
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-7 px-2 text-xs gap-1.5 ${exampleStates[idx]?.showEn ? "bg-primary/10 text-primary" : "text-slate-500"}`}
                    onClick={() => toggleExample(idx, "en")}
                  >
                    <Languages className="w-3 h-3" />
                    英文
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs gap-1.5 text-slate-500 hover:text-primary"
                    onClick={() => playAudio(ex.zh, true)}
                  >
                    <Volume2 className="w-3 h-3" />
                    朗讀
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Speaking Practice for '也' (ID 3) */}
        {point.id === 3 && (
          <SpeakingPractice
            casualImage={casualManImage}
            teacherImage={teacherManImage}
          />
        )}
      </div>
    </Card>
  );
}

type Message = {
  id: number;
  sender: "randy" | "xiaoyu";
  text: string;
  en: string;
  pinyin: string;
  isChoice?: boolean;
};

type ChatState = {
  messages: Message[];
  step: number;
  affinity: "green" | "red";
  completed: boolean;
};

// Track which features are enabled for each message
type MessageState = {
  [key: number]: {
    showEn: boolean;
    showPinyin: boolean;
  };
};

type VocabWord = {
  traditional: string;
  simplified: string;
  pinyin: string;
  english: string;
  partOfSpeech: string;
  tbcl: string;
  example: {
    zh: string;
    pinyin: string;
    en: string;
  };
};

const VOCABULARY_LIST: VocabWord[] = [
  {
    traditional: "學習",
    simplified: "学习",
    pinyin: "xuéxí",
    english: "to learn",
    partOfSpeech: "V",
    tbcl: "2",
    example: {
      zh: "我很喜歡學習中文。",
      pinyin: "Wǒ hěn xǐhuān xuéxí Zhōngwén.",
      en: "I like learning Chinese very much.",
    },
  },
  {
    traditional: "因為",
    simplified: "因为",
    pinyin: "yīnwèi",
    english: "because",
    partOfSpeech: "Conj",
    tbcl: "1*",
    example: {
      zh: "因為下雨，所以我沒去。",
      pinyin: "Yīnwèi xià yǔ, suǒyǐ wǒ méi qù.",
      en: "Because it was raining, I didn't go.",
    },
  },
  {
    traditional: "哇",
    simplified: "哇",
    pinyin: "wa",
    english: "wow",
    partOfSpeech: "Ptc",
    tbcl: "3",
    example: {
      zh: "哇，這個地方真漂亮！",
      pinyin: "Wa, zhège dìfāng zhēn piàoliang!",
      en: "Wow, this place is really beautiful!",
    },
  },
  {
    traditional: "為什麼",
    simplified: "为什么",
    pinyin: "wèishéme",
    english: "why",
    partOfSpeech: "Adv",
    tbcl: "1*",
    example: {
      zh: "你為什麼生氣？",
      pinyin: "Nǐ wèishéme shēngqì?",
      en: "Why are you angry?",
    },
  },
  {
    traditional: "覺得",
    simplified: "觉得",
    pinyin: "juédé",
    english: "to feel / to think",
    partOfSpeech: "Vst",
    tbcl: "1*",
    example: {
      zh: "我覺得今天很熱。",
      pinyin: "Wǒ juédé jīntiān hěn rè.",
      en: "I think it is very hot today.",
    },
  },
  {
    traditional: "剛剛",
    simplified: "刚刚",
    pinyin: "gānggāng",
    english: "just now",
    partOfSpeech: "Adv",
    tbcl: "2",
    example: {
      zh: "他剛剛離開這裡。",
      pinyin: "Tā gānggāng líkāi zhèlǐ.",
      en: "He just left here.",
    },
  },
  {
    traditional: "文化",
    simplified: "文化",
    pinyin: "wénhuà",
    english: "culture",
    partOfSpeech: "N",
    tbcl: "2",
    example: {
      zh: "我想了解台灣文化。",
      pinyin: "Wǒ xiǎng liǎojiě Táiwān wénhuà.",
      en: "I want to understand Taiwanese culture.",
    },
  },
  {
    traditional: "啊",
    simplified: "啊",
    pinyin: "a",
    english: "(particle)",
    partOfSpeech: "Ptc",
    tbcl: "2",
    example: {
      zh: "這真的是一個好主意啊！",
      pinyin: "Zhè zhēn de shì yīgè hǎo zhǔyì a!",
      en: "This is really a good idea!",
    },
  },
  {
    traditional: "聊天",
    simplified: "聊天",
    pinyin: "liáotiān",
    english: "to chat",
    partOfSpeech: "V-sep",
    tbcl: "2",
    example: {
      zh: "我們在咖啡廳聊天。",
      pinyin: "Wǒmen zài kāfēitīng liáotiān.",
      en: "We are chatting in the coffee shop.",
    },
  },
  {
    traditional: "練習",
    simplified: "练习",
    pinyin: "liànxí",
    english: "to practice",
    partOfSpeech: "V",
    tbcl: "2",
    example: {
      zh: "我每天練習彈鋼琴。",
      pinyin: "Wǒ měitiān liànxí tán gāngqín.",
      en: "I practice playing the piano every day.",
    },
  },
  {
    traditional: "特別",
    simplified: "特别",
    pinyin: "tèbié",
    english: "special",
    partOfSpeech: "Vs",
    tbcl: "2",
    example: {
      zh: "這家餐廳特別好吃。",
      pinyin: "Zhè jiā cāntīng tèbié hǎochī.",
      en: "This restaurant is especially delicious.",
    },
  },
  {
    traditional: "簡單",
    simplified: "简单",
    pinyin: "jiǎndān",
    english: "simple",
    partOfSpeech: "Vs",
    tbcl: "2",
    example: {
      zh: "這個問題很簡單。",
      pinyin: "Zhège wèntí hěn jiǎndān.",
      en: "This question is very simple.",
    },
  },
  {
    traditional: "認識",
    simplified: "认识",
    pinyin: "rènshì",
    english: "to know / to recognize",
    partOfSpeech: "Vst",
    tbcl: "2",
    example: {
      zh: "很高興認識你。",
      pinyin: "Hěn gāoxìng rènshì nǐ.",
      en: "Nice to meet you.",
    },
  },
  {
    traditional: "有意思",
    simplified: "有意思",
    pinyin: "yǒuyìsi",
    english: "interesting",
    partOfSpeech: "Vs",
    tbcl: "2",
    example: {
      zh: "這部電影很有意思。",
      pinyin: "Zhè bù diànyǐng hěn yǒuyìsi.",
      en: "This movie is very interesting.",
    },
  },
  {
    traditional: "厲害",
    simplified: "厉害",
    pinyin: "lìhài",
    english: "amazing / severe",
    partOfSpeech: "Vs",
    tbcl: "2*",
    example: {
      zh: "你的中文真厲害。",
      pinyin: "Nǐ de Zhōngwén zhēn lìhài.",
      en: "Your Chinese is really amazing.",
    },
  },
];

const CHOICES = [
  {
    id: 1,
    text: "因為我覺得中文很簡單。",
    en: "Because I think Chinese is easy.",
    pinyin: "Yīnwèi wǒ juéde Zhōngwén hěn jiǎndān.",
    response: "哇，你很厲害！",
    responseEn: "Wow, you are really good!",
    responsePinyin: "Wa, nǐ hěn lìhài!",
    affinityChange: "red" as const,
  },
  {
    id: 2,
    text: "因為我喜歡台灣文化，很有意思。",
    en: "Because I like Taiwanese culture. It’s very interesting.",
    pinyin: "Yīnwèi wǒ xǐhuān Táiwān wénhuà, hěn yǒu yìsi.",
    response: "哇，你很特別。",
    responseEn: "Wow, you are special.",
    responsePinyin: "Wa, nǐ hěn tèbié.",
    affinityChange: "green" as const,
  },
];

const APP_MESSAGES = [
  // 0
  {
    id: 101,
    sender: "randy",
    text: "你平常喜歡做什麼？",
    en: "What do you usually like to do?",
    pinyin: "Nǐ píngcháng xǐhuān zuò shénme?",
  },
  // 1
  {
    id: 102,
    sender: "xiaoyu",
    text: "我喜歡游泳、旅行，但我最喜歡跟朋友出去吃飯。你呢？",
    en: "I like swimming and traveling, but I like going out to eat with friends the most. How about you?",
    pinyin:
      "Wǒ xǐhuān yóuyǒng, lǚxíng, dàn wǒ zuì xǐhuān gēn péngyǒu chūqù chīfàn. Nǐ ne?",
  },
  // 2 - Dining Choice
  {
    id: 103,
    sender: "randy",
    text: "我也是，那我們一起出去吃飯吧。",
    en: "Me too, let's go eat together.",
    pinyin: "Wǒ yě shì, nà wǒmen yīqǐ chūqù chīfàn ba.",
  },
  // 3 - Response to Dining
  {
    id: 104,
    sender: "xiaoyu",
    text: "好啊。",
    en: "OK.",
    pinyin: "Hǎo a.",
  },
  // 4 - Movie Choice
  {
    id: 105,
    sender: "randy",
    text: "我喜歡看電影，你要不要跟我去看電影？",
    en: "I like watching movies, do you want to go watch a movie with me?",
    pinyin: "Wǒ xǐhuān kàn diànyǐng, nǐ yào bù yào gēn wǒ qù kàn diànyǐng?",
  },
  // 5 - Response to Movie
  {
    id: 106,
    sender: "xiaoyu",
    text: "好啊。",
    en: "OK.",
    pinyin: "Hǎo a.",
  },
  // 6 - Closing 1
  {
    id: 107,
    sender: "randy",
    text: "明天下午六點怎麼樣？",
    en: "How about 6 PM tomorrow?",
    pinyin: "Míngtiān xiàwǔ liù diǎn zěnmeyàng?",
  },
  // 7 - Closing 2
  {
    id: 108,
    sender: "xiaoyu",
    text: "可以的，我們在哪裡見面？",
    en: "That works, where shall we meet?",
    pinyin: "Kěyǐ de, wǒmen zài nǎlǐ jiànmiàn?",
  },
  // 8 - Closing 3
  {
    id: 109,
    sender: "randy",
    text: "台北１０１捷運站。",
    en: "Taipei 101 MRT Station.",
    pinyin: "Táiběi yī líng yī jiéyùn zhàn.",
  },
  // 9 - Closing 4
  {
    id: 110,
    sender: "xiaoyu",
    text: "沒問題，我們明天見！",
    en: "No problem, see you tomorrow!",
    pinyin: "Méi wèntí, wǒmen míngtiān jiàn!",
  },
];

const AppMessageBubble = ({
  msg,
  messageStates,
  toggleMessageEn,
  toggleMessagePinyin,
  playAudio,
}: {
  msg: any;
  messageStates: any;
  toggleMessageEn: (id: number) => void;
  toggleMessagePinyin: (id: number) => void;
  playAudio: (text: string, isMale: boolean) => void;
}) => {
  if (!msg) return null;

  return (
    <div className="flex justify-start mb-4">
      <div className="flex items-start gap-4 w-full flex-row">
        <div
          className={`w-12 h-12 rounded-full overflow-hidden flex-shrink-0 shadow-md mt-1 border-2 ${
            msg.sender === "randy" ? "border-blue-200" : "border-pink-200"
          }`}
        >
          <img
            src={msg.sender === "randy" ? randyProfile : xiaoyuProfile}
            alt={msg.sender === "randy" ? "Randy" : "Xiaoyu"}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-1 w-full">
          <span className="text-xs text-muted-foreground ml-1">
            {msg.sender === "randy" ? "瑞迪" : "小雨"}
          </span>

          <div className="flex flex-col gap-2 w-full">
            <div
              className={`p-4 rounded-2xl text-base shadow-sm leading-relaxed relative group transition-all duration-200 ${
                msg.sender === "randy"
                  ? "bg-blue-50 text-slate-800 border border-blue-100 rounded-tl-none hover:shadow-md"
                  : "bg-white text-slate-800 border border-slate-200 rounded-tl-none hover:shadow-md"
              }`}
            >
              <div className="space-y-2">
                {messageStates[msg.id]?.showPinyin && (
                  <p className="text-sm text-primary font-medium mb-1 border-b border-primary/10 pb-1 font-serif-chinese">
                    {msg.pinyin}
                  </p>
                )}

                <p className="font-medium">{msg.text}</p>

                {messageStates[msg.id]?.showEn && (
                  <p className="text-sm text-slate-500 mt-2 pt-2 border-t border-slate-200/60 font-sans">
                    {msg.en}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1 ml-1">
              <Button
                variant="ghost"
                size="sm"
                className={`h-6 px-2 rounded-full gap-1 text-[10px] font-medium transition-colors ${
                  messageStates[msg.id]?.showEn
                    ? "bg-primary/10 text-primary"
                    : "text-slate-400 hover:text-slate-600"
                }`}
                onClick={() => toggleMessageEn(msg.id)}
              >
                <Languages className="w-3 h-3" />
                <span>翻譯</span>
              </Button>
              <div className="w-px h-2 bg-slate-200" />
              <Button
                variant="ghost"
                size="sm"
                className={`h-6 px-2 rounded-full gap-1 text-[10px] font-medium transition-colors ${
                  messageStates[msg.id]?.showPinyin
                    ? "bg-primary/10 text-primary"
                    : "text-slate-400 hover:text-slate-600"
                }`}
                onClick={() => toggleMessagePinyin(msg.id)}
              >
                <Type className="w-3 h-3" />
                <span>拼音</span>
              </Button>
              <div className="w-px h-2 bg-slate-200" />
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 rounded-full gap-1 text-[10px] font-medium text-slate-400 hover:text-primary transition-colors"
                onClick={() => playAudio(msg.text, msg.sender === "randy")}
              >
                <Volume2 className="w-3 h-3" />
                <span>朗讀</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const INITIAL_CHAT_STATE: ChatState = {
  messages: [
    {
      id: 1,
      sender: "randy",
      text: "你好，我是瑞迪，美國人，我會說一點中文。",
      en: "Hello, I am Randy, an American. I can speak a little Chinese.",
      pinyin: "Nǐ hǎo, wǒ shì Ruìdí, Měiguó rén, wǒ huì shuō yīdiǎn Zhōngwén.",
    },
    {
      id: 2,
      sender: "xiaoyu",
      text: "哈囉，我是小雨。",
      en: "Hello, I am Xiao Yu.",
      pinyin: "Hālō, wǒ shì Xiǎoyǔ.",
    },
    {
      id: 3,
      sender: "randy",
      text: "我剛來台灣，想認識新朋友。",
      en: "I just arrived in Taiwan and want to meet new friends.",
      pinyin: "Wǒ gāng lái Táiwān, xiǎng rènshì xīn péngyǒu.",
    },
    {
      id: 4,
      sender: "xiaoyu",
      text: "好啊，我在學習英文。",
      en: "Sure, I am learning English.",
      pinyin: "Hǎo a, wǒ zài xuéxí Yīngwén.",
    },
    {
      id: 5,
      sender: "randy",
      text: "我正在學習中文，也想多練習。",
      en: "I am learning Chinese and also want to practice more.",
      pinyin: "Wǒ zhèngzài xuéxí Zhōngwén, yě xiǎng duō liànxí.",
    },
    {
      id: 6,
      sender: "xiaoyu",
      text: "你為什麼學中文？",
      en: "Why are you learning Chinese?",
      pinyin: "Nǐ wèishéme xué Zhōngwén?",
    },
  ],
  step: 0,
  affinity: "green",
  completed: false,
};

const APP_VOCABULARY_LIST: VocabWord[] = [
  {
    traditional: "平常",
    simplified: "平常",
    pinyin: "píngcháng",
    english: "usually",
    partOfSpeech: "Vs-attr",
    tbcl: "2",
    example: {
      zh: "我平常喜歡看書。",
      pinyin: "Wǒ píngcháng xǐhuān kànshū.",
      en: "I usually like reading books.",
    },
  },
  {
    traditional: "電影",
    simplified: "电影",
    pinyin: "diànyǐng",
    english: "movie",
    partOfSpeech: "N",
    tbcl: "1*",
    example: {
      zh: "這部電影很好看。",
      pinyin: "Zhè bù diànyǐng hěn hǎokàn.",
      en: "This movie is very good.",
    },
  },
  {
    traditional: "最",
    simplified: "最",
    pinyin: "zuì",
    english: "most",
    partOfSpeech: "Adv",
    tbcl: "1*",
    example: {
      zh: "我最喜歡吃牛肉麵。",
      pinyin: "Wǒ zuì xǐhuān chī niúròumiàn.",
      en: "I like eating beef noodles the most.",
    },
  },
  {
    traditional: "見",
    simplified: "见",
    pinyin: "jiàn",
    english: "to see / to meet",
    partOfSpeech: "V",
    tbcl: "1*",
    example: {
      zh: "明天見。",
      pinyin: "Míngtiān jiàn.",
      en: "See you tomorrow.",
    },
  },
  {
    traditional: "怎麼樣",
    simplified: "怎么样",
    pinyin: "zěnmeyàng",
    english: "how about / how is it",
    partOfSpeech: "Vs",
    tbcl: "1*",
    example: {
      zh: "這件衣服怎麼樣？",
      pinyin: "Zhè jiàn yīfú zěnmeyàng?",
      en: "How is this piece of clothing?",
    },
  },
  {
    traditional: "但",
    simplified: "但",
    pinyin: "dàn",
    english: "but",
    partOfSpeech: "Conj",
    tbcl: "2",
    example: {
      zh: "我想去，但我沒錢。",
      pinyin: "Wǒ xiǎng qù, dàn wǒ méi qián.",
      en: "I want to go, but I don't have money.",
    },
  },
  {
    traditional: "旅行",
    simplified: "旅行",
    pinyin: "lǚxíng",
    english: "to travel",
    partOfSpeech: "V (Vi)",
    tbcl: "2",
    example: {
      zh: "我喜歡去日本旅行。",
      pinyin: "Wǒ xǐhuān qù Rìběn lǚxíng.",
      en: "I like to travel to Japan.",
    },
  },
  {
    traditional: "游泳",
    simplified: "游泳",
    pinyin: "yóuyǒng",
    english: "to swim",
    partOfSpeech: "V-sep",
    tbcl: "2*",
    example: {
      zh: "他常常去游泳。",
      pinyin: "Tā chángcháng qù yóuyǒng.",
      en: "He often goes swimming.",
    },
  },
  {
    traditional: "見面",
    simplified: "见面",
    pinyin: "jiànmiàn",
    english: "to meet",
    partOfSpeech: "V-sep",
    tbcl: "2*",
    example: {
      zh: "我們約在車站見面。",
      pinyin: "Wǒmen yuē zài chēzhàn jiànmiàn.",
      en: "We agreed to meet at the station.",
    },
  },
];

// Practice Data
const LISTENING_PRACTICE = [
  {
    id: 1,
    title: "聽力練習 1",
    audioSrc: "/c1l1.mp3", // Audio file for listening practice 1
    questions: [
      {
        id: 1,
        question: "說話的人在哪裡？",
        options: ["教室", "圖書館", "咖啡店", "電影院"],
        answer: 1,
      },
      {
        id: 2,
        question: "大部分人在做什麼",
        options: ["聊天", "看電影", "看書或用電腦學習", "睡覺"],
        answer: 2,
      },
      {
        id: 3,
        question: "說話的人覺得今天怎麼樣？",
        options: ["不喜歡", "覺得很吵", "沒什麼感覺", "很喜歡"],
        answer: 3,
      },
    ],
  },
  {
    id: 2,
    title: "聽力練習 2",
    audioSrc: "/c1l2.wav", // Audio file for listening practice 2
    questions: [
      {
        id: 1,
        question: "「我」覺得學中文怎麼樣？",
        options: ["學中文很難", "學中文沒意思", "學中文很好，也很重要", "學中文不用練習"],
        answer: 2,
      },
      {
        id: 2,
        question: "短文中，「我」現在可以做什麼？",
        options: ["跟老師學中文", "跟朋友一起旅行", "跟台灣人聊天", "看中文電影"],
        answer: 2,
      },
      {
        id: 3,
        question: "為什麼「我」要多一點練習？",
        options: ["因為我很忙", "因為我說得還不太好", "因為我不喜歡中文", "因為我不想聊天"],
        answer: 1,
      },
    ],
  },
];

const READING_PRACTICE = [
  {
    id: 1,
    title: "閱讀測驗 1",
    content:
      "旅行的時候，跟人聊天很有意思，也可以了解文化。很多人想去別的地方，看風景，也吃當地的東西。路上大家在問路，在買東西，用簡單的話說明意思。平常有人看電影，有人聽音樂，一點一點練習生活中的用法。慢慢習慣以後，旅行也會很方便。",
    questions: [
      {
        id: 1,
        question: "旅行的時候，跟人聊天可以做什麼？",
        options: ["看電影", "了解文化", "聽音樂", "買東西"],
        answer: 1,
      },
      {
        id: 2,
        question: "短文中提到，路上大家在做什麼？",
        options: ["在看風景", "在聽音樂", "在問路和買東西", "在吃飯"],
        answer: 2,
      },
      {
        id: 3,
        question: "為什麼旅行會變得很方便？",
        options: ["因為有很多朋友", "因為常常看電影", "因為慢慢習慣生活中的用法", "因為去了很多地方"],
        answer: 2,
      },
    ],
  },
  {
    id: 2,
    title: "閱讀測驗 2",
    content:
      "剛剛在車站跟朋友見面，一起去吃飯。這家店看起來很特別，人不多，但是大家都在聊天。菜不多，做法也很簡單，但是味道怎麼樣？因為用的東西很新鮮，所以吃起來不錯。吃完飯以後，跟朋友一起走一走，看看附近的店。這家店很好，那家呢？平常這裡很熱鬧，很多人喜歡來這裡見面。",
    questions: [
      {
        id: 1,
        question: "短文一開始，事情發生在哪裡？",
        options: ["在餐廳", "在車站", "在家裡", "在學校"],
        answer: 1,
      },
      {
        id: 2,
        question: "這家店的食物為什麼吃起來不錯？",
        options: ["因為菜很多", "因為人很多", "因為用的東西很新鮮", "因為做法很特別"],
        answer: 2,
      },
      {
        id: 3,
        question: "「這家店很好，那家呢？」這句話想做什麼？",
        options: ["問價錢", "想知道不同的店怎麼樣", "問路", "找朋友"],
        answer: 1,
      },
    ],
  },
];

const SPEAKING_SENTENCES = [
  {
    id: 1,
    text: "我喜歡跟朋友出去吃飯。",
    pinyin: "Wǒ xǐhuān gēn péngyǒu chūqù chīfàn.",
  },
  {
    id: 2,
    text: "明天下午六點怎麼樣？",
    pinyin: "Míngtiān xiàwǔ liù diǎn zěnmeyàng?",
  },
  {
    id: 3,
    text: "我們在捷運站見面。",
    pinyin: "Wǒmen zài jiéyùn zhàn jiànmiàn.",
  },
  {
    id: 4,
    text: "你平常喜歡做什麼？",
    pinyin: "Nǐ píngcháng xǐhuān zuò shénme?",
  },
  { id: 5, text: "這部電影很好看。", pinyin: "Zhè bù diànyǐng hěn hǎokàn." },
];

const GRAMMAR_PRACTICE = [
  {
    id: 1,
    title: "練習 1｜想 + V",
    scenario: "你想做什麼？",
    answer: "我想去旅行。",
  },
  {
    id: 2,
    title: "練習 2｜一點",
    scenario: "你想不想喝水？",
    answer: "我想喝一點水。",
  },
  {
    id: 3,
    title: "練習 3｜也",
    scenario: "他喜歡游泳，你呢？",
    answer: "我也喜歡游泳。",
  },
  {
    id: 4,
    title: "練習 4｜在 + V",
    scenario: "他現在在做什麼？",
    answer: "他在看書。",
  },
  {
    id: 5,
    title: "練習 5｜呢",
    scenario: "你覺得電影好看嗎？",
    answer: "我覺得電影很好看，你覺得呢？",
  },
  {
    id: 6,
    title: "練習 6｜跟 ",
    scenario: "你喜歡一個人吃飯嗎？",
    answer: "我喜歡跟朋友吃飯。",
  },
];

function SpeakingPracticeItem({
  sentence,
}: {
  sentence: { id: number; text: string; pinyin: string };
}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [matchState, setMatchState] = useState<"none" | "partial" | "full">(
    "none",
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let recognition: any = null;

    if (isListening) {
      if ("webkitSpeechRecognition" in window) {
        // @ts-ignore
        recognition = new window.webkitSpeechRecognition();
      } else if ("SpeechRecognition" in window) {
        // @ts-ignore
        recognition = new window.SpeechRecognition();
      } else {
        setError("Your browser does not support speech recognition.");
        setIsListening(false);
        return;
      }

      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "zh-TW";

      recognition.onresult = (event: any) => {
        let sessionTranscript = "";
        for (let i = 0; i < event.results.length; ++i) {
          sessionTranscript += event.results[i][0].transcript;
        }

        setTranscript(sessionTranscript);

        // Simple matching logic
        // Remove punctuation for easier matching
        const cleanTranscript = sessionTranscript.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()。，？]/g,"");
        const cleanTarget = sentence.text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()。，？]/g,"");

        if (cleanTranscript.includes(cleanTarget)) {
          setMatchState("full");
        } else if (cleanTranscript.length > 0 && cleanTarget.includes(cleanTranscript.substring(0, Math.min(cleanTranscript.length, 2)))) {
           // Very basic partial match check
           setMatchState("partial");
        }
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [isListening, sentence.text]);

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setTranscript("");
      setMatchState("none");
      setIsListening(true);
      setError(null);
    }
  };

  const resetPractice = () => {
    setIsListening(false);
    setTranscript("");
    setMatchState("none");
    setError(null);
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
            {sentence.id}
          </div>
          <div>
            <h4 className="font-medium text-lg text-slate-800 dark:text-slate-200">{sentence.text}</h4>
            <p className="text-slate-500 text-sm font-serif-chinese">{sentence.pinyin}</p>
          </div>
        </div>
        <div className="flex gap-2">
            {matchState === "full" && <Check className="w-6 h-6 text-green-500" />}
            {matchState === "partial" && <BicepsFlexed className="w-6 h-6 text-orange-500" />}
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg min-h-[60px] mb-4 text-slate-600 dark:text-slate-400">
        {transcript || <span className="text-slate-400 text-sm">點擊麥克風開始說話...</span>}
      </div>

      <div className="flex gap-2">
        <Button
          variant={isListening ? "destructive" : "default"}
          size="sm"
          onClick={toggleListening}
          className="gap-2"
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          {isListening ? "停止錄音" : "開始練習"}
        </Button>
        <Button variant="outline" size="sm" onClick={resetPractice} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            重來
        </Button>
      </div>
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );
}

export default function Chapter1() {
  const [lang, setLang] = useState<Language>("zh");
  // Shared scenario state using localStorage
  const [appScenario, setAppScenario] = useState<"dining" | "movie" | null>(() => {
    const saved = localStorage.getItem("app_scenario");
    return (saved === "dining" || saved === "movie") ? saved : "movie";
  });
  const [showStoryTranslation, setShowStoryTranslation] = useState(false);
  const [messageStates, setMessageStates] = useState<MessageState>({});
  const t = getTranslations(lang);
  const content = chapterContent[lang];

  // Chat state management with persistence
  const [chatState, setChatState] = useState<ChatState>(() => {
    const saved = localStorage.getItem("chapter1_chat_state");
    return saved ? JSON.parse(saved) : INITIAL_CHAT_STATE;
  });

  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Save scenario to localStorage when it changes
  useEffect(() => {
    if (appScenario) {
      localStorage.setItem("app_scenario", appScenario);
    }
  }, [appScenario]);

  // Scroll to top on mount
  useEffect(() => {
    // Force scroll to top on mount with a slight delay to ensure render is complete
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }, 10);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    localStorage.setItem("chapter1_chat_state", JSON.stringify(chatState));
    // Save affinity state to shared localStorage
    localStorage.setItem("affinity_state", chatState.affinity);
    // Only scroll to bottom if we are not completed and it's NOT the initial state (length > 2)
    // This prevents scrolling when resetting to initial state
    // AND check if we have scrolled once already to avoid initial load scroll interference
    if (!chatState.completed && chatState.messages.length > 2) {
      setTimeout(() => {
        // Only scroll if we are not at the top of the page
        if (window.scrollY > 100) {
          //chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [chatState]);

  const [vocabStates, setVocabStates] = useState<{ [key: number]: boolean }>(
    {},
  );

  const toggleVocabExample = (index: number) => {
    setVocabStates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const [appVocabStates, setAppVocabStates] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleAppVocabExample = (index: number) => {
    setAppVocabStates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Practice States
  const [listeningAnswers, setListeningAnswers] = useState<{
    [key: string]: number;
  }>({});
  const [readingAnswers, setReadingAnswers] = useState<{
    [key: string]: number;
  }>({});
  const [grammarInputs, setGrammarInputs] = useState<{ [key: number]: string }>(
    {},
  );
  const [showGrammarAnswers, setShowGrammarAnswers] = useState<{
    [key: number]: boolean;
  }>({});

  const handleListeningAnswer = (
    practiceId: number,
    qId: number,
    answer: number,
  ) => {
    setListeningAnswers((prev) => ({
      ...prev,
      [`${practiceId}-${qId}`]: answer,
    }));
  };

  const handleReadingAnswer = (
    practiceId: number,
    qId: number,
    answer: number,
  ) => {
    setReadingAnswers((prev) => ({
      ...prev,
      [`${practiceId}-${qId}`]: answer,
    }));
  };

  const toggleLang = () => {
    setLang((prev) => (prev === "zh" ? "en" : "zh"));
  };

  const toggleMessageEn = (id: number) => {
    setMessageStates((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        showEn: !prev[id]?.showEn,
      },
    }));
  };

  const toggleMessagePinyin = (id: number) => {
    setMessageStates((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        showPinyin: !prev[id]?.showPinyin,
      },
    }));
  };

  const playAudio = async (text: string, isMale: boolean) => {
    try {
      // Stop any currently playing audio
      const audioElements = document.querySelectorAll("audio");
      audioElements.forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });

      // Call TTS API with caching
      const response = await fetch("/api/tts/cached", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, isMale }),
      });

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const textResponse = await response.text();
        console.error("Non-JSON response received:", textResponse.substring(0, 200));
        throw new Error(`API returned non-JSON response: ${response.status} ${response.statusText}`);
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: response.statusText }));
        throw new Error(`TTS API error: ${errorData.error || response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.audio) {
        throw new Error("No audio data in response");
      }
      
      // Play the audio
      const audio = new Audio(data.audio);
      audio.play().catch((err) => {
        console.error("Error playing audio:", err);
      });
    } catch (error) {
      console.error("Error in playAudio:", error);
      // Fallback to browser speech synthesis if API fails
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "zh-TW";
        if (isMale) {
          utterance.pitch = 0.8;
          utterance.rate = 0.9;
        } else {
          utterance.pitch = 1.2;
          utterance.rate = 1.0;
        }
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const currentStoryContent = showStoryTranslation
    ? translations.en.chapter1Page?.background
    : translations.zh.chapter1Page?.background;

  const handleChoice = (choiceId: number) => {
    const choice = CHOICES.find((c) => c.id === choiceId);
    if (!choice) return;

    // Reset messages to initial state then append new choice
    // allow re-selecting
    const newMessages: Message[] = [
      ...INITIAL_CHAT_STATE.messages,
      {
        id: Date.now(),
        sender: "randy",
        text: choice.text,
        en: choice.en,
        pinyin: choice.pinyin,
      },
      {
        id: Date.now() + 1,
        sender: "xiaoyu",
        text: choice.response,
        en: choice.responseEn,
        pinyin: choice.responsePinyin,
      },
    ];

    setChatState((prev) => ({
      ...prev,
      messages: newMessages,
      affinity: choice.affinityChange,
      completed: true,
    }));
  };

  const resetChat = () => {
    setChatState(INITIAL_CHAT_STATE);
    setMessageStates({});
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
          <div className="mb-12 relative max-w-4xl mx-auto">
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
              ref={chatContainerRef}
              className="overflow-hidden border-2 border-border/50 shadow-lg bg-slate-50 dark:bg-slate-900 z-10 relative w-full"
            >
              <div
                className="absolute inset-0 z-0 opacity-40 pointer-events-none bg-cover bg-center"
                style={{ backgroundImage: `url(${chatBackground})` }}
              />
              <div className="bg-primary/5 p-4 border-b border-border/50 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📱</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg font-serif-chinese">
                      {content.chat.title}
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
                {chatState.messages.map((msg, index) => (
                  <div key={`msg-${msg.id}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start mb-4"
                    >
                      <div className="flex items-start gap-4 w-full flex-row">
                        <div
                          className={`w-14 h-14 rounded-full overflow-hidden flex-shrink-0 shadow-md mt-8 border-2 ${
                            msg.sender === "randy"
                              ? "border-blue-200"
                              : "border-pink-200"
                          }`}
                        >
                          <img
                            src={
                              msg.sender === "randy"
                                ? randyProfile
                                : xiaoyuProfile
                            }
                            alt={msg.sender === "randy" ? "Randy" : "Xiaoyu"}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex flex-col gap-1 w-full">
                          <span className="text-xs text-muted-foreground ml-1">
                            {msg.sender === "randy"
                              ? content.chat.randy
                              : content.chat.xiaoyu}
                          </span>

                          <div className="flex flex-col gap-2 w-full">
                            {/* Message Bubble */}
                            <div
                              className={`p-5 rounded-2xl text-lg shadow-sm leading-relaxed relative group transition-all duration-200 ${
                                msg.sender === "randy"
                                  ? "bg-blue-50 text-slate-800 border border-blue-100 rounded-tl-none hover:shadow-md hover:border-blue-200"
                                  : "bg-white text-slate-800 border border-slate-200 rounded-tl-none hover:shadow-md hover:border-primary/20"
                              }`}
                            >
                              <div className="space-y-2">
                                {/* Pinyin Display */}
                                {messageStates[msg.id]?.showPinyin && (
                                  <p className="text-base text-primary font-medium mb-1 border-b border-primary/10 pb-1 font-serif-chinese">
                                    {msg.pinyin}
                                  </p>
                                )}

                                <p className="font-medium">{msg.text}</p>

                                {/* English Display */}
                                {messageStates[msg.id]?.showEn && (
                                  <p className="text-base text-slate-500 mt-2 pt-2 border-t border-slate-200/60 font-sans">
                                    {msg.en}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Action Buttons - Horizontal Row below bubble */}
                            <div className="flex items-center gap-1 ml-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className={`h-8 px-2 rounded-full gap-1.5 text-xs font-medium transition-colors ${
                                  messageStates[msg.id]?.showEn
                                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                                    : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                                }`}
                                onClick={() => toggleMessageEn(msg.id)}
                              >
                                <Languages className="w-3.5 h-3.5" />
                                <span>翻譯</span>
                              </Button>
                              <div className="w-px h-3 bg-slate-200" />
                              <Button
                                variant="ghost"
                                size="sm"
                                className={`h-8 px-2 rounded-full gap-1.5 text-xs font-medium transition-colors ${
                                  messageStates[msg.id]?.showPinyin
                                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                                    : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                                }`}
                                onClick={() => toggleMessagePinyin(msg.id)}
                              >
                                <Type className="w-3.5 h-3.5" />
                                <span>拼音</span>
                              </Button>
                              <div className="w-px h-3 bg-slate-200" />
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2 rounded-full gap-1.5 text-xs font-medium text-slate-400 hover:text-primary hover:bg-primary/5 transition-colors"
                                onClick={() =>
                                  playAudio(msg.text, msg.sender === "randy")
                                }
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                                <span>朗讀</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Show choices after message 6 */}
                    {index === 5 && (
                      <div className="ml-14 my-6 space-y-3 bg-slate-50/50 p-4 rounded-xl border border-dashed border-border/60">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium text-muted-foreground">
                            請選擇瑞迪的回答：
                          </p>
                          {chatState.completed && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={resetChat}
                              className="h-6 text-xs text-primary hover:text-primary hover:bg-primary/10 px-2"
                            >
                              <RotateCcw className="w-3 h-3 mr-1" />
                              重新選擇
                            </Button>
                          )}
                        </div>
                        {CHOICES.map((choice) => (
                          <button
                            key={choice.id}
                            onClick={() => handleChoice(choice.id)}
                            className={`w-full p-4 text-left shadow-sm transition-all rounded-xl border-2 ${
                              chatState.completed &&
                              chatState.messages.find(
                                (m) => m.text === choice.text,
                              )
                                ? "bg-primary/5 border-primary ring-2 ring-primary/20"
                                : "bg-white border-border"
                            }`}
                          >
                            <span className="flex items-center gap-4">
                              <span
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                                  chatState.completed &&
                                  chatState.messages.find(
                                    (m) => m.text === choice.text,
                                  )
                                    ? "bg-primary text-white"
                                    : "bg-slate-100 text-slate-500"
                                }`}
                              >
                                {choice.id}
                              </span>
                              <div className="flex flex-col gap-1">
                                <span className="font-medium text-lg text-foreground">
                                  {choice.text}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  {choice.en}
                                </span>
                              </div>
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

            {/* Right Full Body Image - Xiao Yu (Hidden on mobile) */}
          </div>

          {/* Vocabulary List */}
          <div className="mb-12">
            <Card className="overflow-hidden border-2 border-border/50 shadow-sm bg-white dark:bg-slate-900">
              <div className="bg-primary/5 p-4 border-b border-border/50 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <List className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg font-serif-chinese">
                    {content.vocabulary.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {content.vocabulary.subtitle}
                  </p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-border">
                      <th className="p-4 font-semibold text-sm text-muted-foreground w-auto min-w-[80px] border-r border-border/50 whitespace-nowrap">
                        {content.vocabulary.columns.word}
                      </th>
                      <th className="p-4 font-semibold text-sm text-muted-foreground w-[20%] min-w-[150px] border-r border-border/50">
                        {content.vocabulary.columns.pinyin}
                      </th>
                      <th className="p-4 font-semibold text-sm text-muted-foreground w-[40%] min-w-[200px] border-r border-border/50">
                        {content.vocabulary.columns.english}
                      </th>
                      <th className="p-4 font-semibold text-sm text-muted-foreground w-[15%] min-w-[80px] border-r border-border/50 text-center">
                        {content.vocabulary.columns.partOfSpeech}
                      </th>
                      <th className="p-4 font-semibold text-sm text-muted-foreground w-[15%] min-w-[80px] text-center">
                        {content.vocabulary.columns.tbcl}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {VOCABULARY_LIST.map((word, index) => (
                      <Fragment key={index}>
                        <tr
                          className="border-b-0 hover:bg-slate-50/50 transition-colors group cursor-pointer"
                          onClick={() => toggleVocabExample(index)}
                        >
                          <td className="p-4 border-r border-border/50 whitespace-nowrap w-min">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 rounded-full text-slate-400 hover:text-primary shrink-0"
                              >
                                <ChevronDown
                                  className={`w-4 h-4 transition-transform duration-200 ${vocabStates[index] ? "rotate-180" : ""}`}
                                />
                              </Button>
                              <div className="flex flex-col">
                                <span className="font-bold text-lg font-serif-chinese text-slate-800">
                                  {word.traditional}
                                </span>
                                <span className="text-sm text-muted-foreground font-serif-chinese">
                                  {word.simplified}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 border-r border-border/50 font-medium text-primary">
                            <div className="flex items-center gap-3">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full opacity-70 hover:opacity-100 hover:bg-primary/10 hover:text-primary shrink-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  playAudio(word.traditional, true);
                                }}
                                title="播放"
                              >
                                <Volume2 className="w-4 h-4" />
                              </Button>
                              <span>{word.pinyin}</span>
                            </div>
                          </td>
                          <td className="p-4 border-r border-border/50 text-slate-600">
                            {word.english}
                          </td>
                          <td className="p-4 border-r border-border/50 text-center">
                            <Badge
                              variant="secondary"
                              className="font-normal text-xs"
                            >
                              {word.partOfSpeech}
                            </Badge>
                          </td>
                          <td className="p-4 text-center">
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                              {word.tbcl}
                            </span>
                          </td>
                        </tr>
                        {/* Example sentence row */}
                        <AnimatePresence>
                          {vocabStates[index] && (
                            <tr className="border-b border-border/50 bg-slate-50/30">
                              <td colSpan={5} className="px-4 pb-4 pt-0">
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="overflow-hidden"
                                >
                                  <div className="flex items-start gap-3 p-4 rounded-lg bg-slate-100/50 text-sm mt-2">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 rounded-full bg-white shadow-sm text-primary hover:text-primary hover:bg-white mt-1 shrink-0"
                                      onClick={() =>
                                        playAudio(word.example.zh, true)
                                      }
                                      title="播放例句"
                                    >
                                      <Volume2 className="w-4 h-4" />
                                    </Button>
                                    <div className="flex flex-col gap-1">
                                      <span className="text-primary/80 font-serif-chinese text-sm">
                                        {word.example.pinyin}
                                      </span>
                                      <span className="font-bold text-lg text-slate-800 font-serif-chinese leading-relaxed">
                                        {word.example.zh}
                                      </span>
                                      <span className="text-slate-500 italic border-t border-slate-200/60 pt-1 mt-1 block">
                                        {word.example.en}
                                      </span>
                                    </div>
                                  </div>
                                </motion.div>
                              </td>
                            </tr>
                          )}
                        </AnimatePresence>
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Grammar Points Section */}
          <div className="mb-12">
            <div className="mb-6">
              <Badge className="mb-2 bg-primary/10 text-primary border-primary/20">
                <BookOpen className="w-3 h-3 mr-1" />
                {content.grammar.title}
              </Badge>
              <h2 className="text-3xl font-bold font-serif-chinese">
                {content.grammar.subtitle}
              </h2>
            </div>
{/*                      <div className="bg-primary/5 p-4 border-b border-border/50 flex items-center gap-3 relative z-10">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <span className="text-lg">📱</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg font-serif-chinese">
                            APP 約時間見面
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            應用練習
                          </p>
                        </div>
                      </div>*/}

            {GRAMMAR_POINTS.map((point) => (
              <Fragment key={point.id}>
                <GrammarPointCard point={point} playAudio={playAudio} />
                {point.id === 4 && (
                  <div className="space-y-12">
                    <Card className="overflow-hidden border-2 border-border/50 shadow-sm bg-slate-50 dark:bg-slate-900 mb-12 relative">
                      <div
                        className="absolute inset-0 z-0 opacity-40 pointer-events-none bg-cover bg-center"
                        style={{ backgroundImage: `url(${chatBackground})` }}
                      />
                      <div className="bg-primary/5 p-4 border-b border-border/50 flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <span className="text-lg">📱</span>
                        </div>                          
                          <div>
                            <h3 className="font-bold text-lg font-serif-chinese">
                              {lang === "zh" ? "APP 約時間見面" : "Making Plans on an APP"}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {lang === "zh" ? "有些回答，可能會讓小雨心跳加快" : "Some of your replies might make Xiaoyu’s heart beat faster"}
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

                      <div className="p-6 space-y-6 relative z-10">
                        {/* Part 1 - Common Start */}
                        <div className="space-y-4">
                          <AppMessageBubble
                            msg={APP_MESSAGES[0]}
                            messageStates={messageStates}
                            toggleMessageEn={toggleMessageEn}
                            toggleMessagePinyin={toggleMessagePinyin}
                            playAudio={playAudio}
                          />
                          <AppMessageBubble
                            msg={APP_MESSAGES[1]}
                            messageStates={messageStates}
                            toggleMessageEn={toggleMessageEn}
                            toggleMessagePinyin={toggleMessagePinyin}
                            playAudio={playAudio}
                          />
                        </div>

                        {/* Part 2 - Choice Scenario */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-sm mx-4 mb-4 relative"
                        >
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-sm font-medium text-slate-700">
                              請選擇瑞迪的回答：
                            </span>
                            {appScenario && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setAppScenario(null)}
                                className="text-primary hover:text-primary/80 gap-1 h-6 px-2 text-xs"
                              >
                                <RotateCcw className="w-3 h-3" />
                                重新選擇
                              </Button>
                            )}
                          </div>
                          <div className="space-y-3">
                            <button
                              onClick={() => setAppScenario("dining")}
                              className={`w-full text-left p-4 rounded-xl bg-white border shadow-sm transition-all group relative overflow-hidden ${
                                appScenario === "dining"
                                  ? "border-red-500 ring-1 ring-red-500 shadow-md"
                                  : "border-slate-200 hover:border-primary/50 hover:shadow-md"
                              }`}
                            >
                              <div className="flex items-start gap-3 relative z-10">
                                <div
                                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                                    appScenario === "dining"
                                      ? "bg-red-600 text-white"
                                      : "bg-slate-100 text-slate-500 group-hover:bg-primary group-hover:text-white"
                                  }`}
                                >
                                  1
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium text-slate-800 text-lg mb-1">
                                    我也是，那我們一起出去吃飯吧。
                                  </p>
                                  <p className="text-xs text-slate-500">
                                    Me too, let's go eat together.
                                  </p>
                                </div>
                              </div>
                            </button>

                            <button
                              onClick={() => setAppScenario("movie")}
                              className={`w-full text-left p-4 rounded-xl bg-white border shadow-sm transition-all group relative overflow-hidden ${
                                appScenario === "movie"
                                  ? "border-red-500 ring-1 ring-red-500 shadow-md"
                                  : "border-slate-200 hover:border-primary/50 hover:shadow-md"
                              }`}
                            >
                              <div className="flex items-start gap-3 relative z-10">
                                <div
                                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                                    appScenario === "movie"
                                      ? "bg-red-600 text-white"
                                      : "bg-slate-100 text-slate-500 group-hover:bg-primary group-hover:text-white"
                                  }`}
                                >
                                  2
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium text-slate-800 text-lg mb-1">
                                    我喜歡看電影，你要不要跟我去看電影？
                                  </p>
                                  <p className="text-xs text-slate-500">
                                    I like watching movies, do you want to go
                                    watch a movie with me?
                                  </p>
                                </div>
                              </div>
                            </button>
                          </div>
                        </motion.div>

                        {/* Part 3 - Scenario Content (Only shown when selected) */}
                        {appScenario && (
                          <motion.div
                            key={appScenario}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-4"
                          >
                            {/* The User's Choice rendered as a message */}
                            <AppMessageBubble
                              msg={
                                appScenario === "dining"
                                  ? APP_MESSAGES[2]
                                  : APP_MESSAGES[4]
                              }
                              messageStates={messageStates}
                              toggleMessageEn={toggleMessageEn}
                              toggleMessagePinyin={toggleMessagePinyin}
                              playAudio={playAudio}
                            />

                            {/* Xiaoyu's Response based on choice */}
                            <AppMessageBubble
                              msg={
                                appScenario === "dining"
                                  ? APP_MESSAGES[3]
                                  : APP_MESSAGES[5]
                              }
                              messageStates={messageStates}
                              toggleMessageEn={toggleMessageEn}
                              toggleMessagePinyin={toggleMessagePinyin}
                              playAudio={playAudio}
                            />
                          </motion.div>
                        )}

                        {/* Part 4 - Closing (Only shown when selected) */}
                        {appScenario && (
                          <div className="space-y-4">
                            <AppMessageBubble
                              msg={APP_MESSAGES[6]}
                              messageStates={messageStates}
                              toggleMessageEn={toggleMessageEn}
                              toggleMessagePinyin={toggleMessagePinyin}
                              playAudio={playAudio}
                            />

                            <AppMessageBubble
                              msg={APP_MESSAGES[7]}
                              messageStates={messageStates}
                              toggleMessageEn={toggleMessageEn}
                              toggleMessagePinyin={toggleMessagePinyin}
                              playAudio={playAudio}
                            />

                            <AppMessageBubble
                              msg={APP_MESSAGES[8]}
                              messageStates={messageStates}
                              toggleMessageEn={toggleMessageEn}
                              toggleMessagePinyin={toggleMessagePinyin}
                              playAudio={playAudio}
                            />

                            <AppMessageBubble
                              msg={APP_MESSAGES[9]}
                              messageStates={messageStates}
                              toggleMessageEn={toggleMessageEn}
                              toggleMessagePinyin={toggleMessagePinyin}
                              playAudio={playAudio}
                            />
                          </div>
                        )}
                      </div>
                    </Card>

                    {/* APP Vocabulary List */}
                    <div className="mb-12">
                      <Card className="overflow-hidden border-2 border-border/50 shadow-sm bg-white dark:bg-slate-900">
                        <div className="bg-primary/5 p-4 border-b border-border/50 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <List className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg font-serif-chinese">
                              生詞列表
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              APP 練習生詞
                            </p>
                          </div>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-slate-50/50 border-b border-border">
                                <th className="p-4 font-semibold text-sm text-muted-foreground w-auto min-w-[80px] border-r border-border/50 whitespace-nowrap">
                                  {content.vocabulary.columns.word}
                                </th>
                                <th className="p-4 font-semibold text-sm text-muted-foreground w-[20%] min-w-[150px] border-r border-border/50">
                                  {content.vocabulary.columns.pinyin}
                                </th>
                                <th className="p-4 font-semibold text-sm text-muted-foreground w-[40%] min-w-[200px] border-r border-border/50">
                                  {content.vocabulary.columns.english}
                                </th>
                                <th className="p-4 font-semibold text-sm text-muted-foreground w-[15%] min-w-[80px] border-r border-border/50 text-center">
                                  {content.vocabulary.columns.partOfSpeech}
                                </th>
                                <th className="p-4 font-semibold text-sm text-muted-foreground w-[15%] min-w-[80px] text-center">
                                  {content.vocabulary.columns.tbcl}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {APP_VOCABULARY_LIST.map((word, index) => (
                                <Fragment key={index}>
                                  <tr
                                    className="border-b-0 hover:bg-slate-50/50 transition-colors group cursor-pointer"
                                    onClick={() => toggleAppVocabExample(index)}
                                  >
                                    <td className="p-4 border-r border-border/50 whitespace-nowrap w-min">
                                      <div className="flex items-center gap-2">
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-6 w-6 rounded-full text-slate-400 hover:text-primary shrink-0"
                                        >
                                          <ChevronDown
                                            className={`w-4 h-4 transition-transform duration-200 ${appVocabStates[index] ? "rotate-180" : ""}`}
                                          />
                                        </Button>
                                        <div className="flex flex-col">
                                          <span className="font-bold text-lg font-serif-chinese text-slate-800">
                                            {word.traditional}
                                          </span>
                                          <span className="text-sm text-muted-foreground font-serif-chinese">
                                            {word.simplified}
                                          </span>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="p-4 border-r border-border/50 font-medium text-primary">
                                      <div className="flex items-center gap-3">
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-8 w-8 rounded-full opacity-70 hover:opacity-100 hover:bg-primary/10 hover:text-primary shrink-0"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            playAudio(word.traditional, true);
                                          }}
                                          title="播放"
                                        >
                                          <Volume2 className="w-4 h-4" />
                                        </Button>
                                        <span>{word.pinyin}</span>
                                      </div>
                                    </td>
                                    <td className="p-4 border-r border-border/50 text-slate-600">
                                      {word.english}
                                    </td>
                                    <td className="p-4 border-r border-border/50 text-center">
                                      <Badge
                                        variant="secondary"
                                        className="font-normal text-xs"
                                      >
                                        {word.partOfSpeech}
                                      </Badge>
                                    </td>
                                    <td className="p-4 text-center">
                                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                                        {word.tbcl}
                                      </span>
                                    </td>
                                  </tr>
                                  {/* Example sentence row */}
                                  <AnimatePresence>
                                    {appVocabStates[index] && (
                                      <tr className="border-b border-border/50 bg-slate-50/30">
                                        <td
                                          colSpan={5}
                                          className="px-4 pb-4 pt-0"
                                        >
                                          <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{
                                              opacity: 1,
                                              height: "auto",
                                            }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="overflow-hidden"
                                          >
                                            <div className="flex items-start gap-3 p-4 rounded-lg bg-slate-100/50 text-sm mt-2">
                                              <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 rounded-full bg-white shadow-sm text-primary hover:text-primary hover:bg-white mt-1 shrink-0"
                                                onClick={() =>
                                                  playAudio(
                                                    word.example.zh,
                                                    true,
                                                  )
                                                }
                                                title="播放例句"
                                              >
                                                <Volume2 className="w-4 h-4" />
                                              </Button>
                                              <div className="flex flex-col gap-1">
                                                <span className="text-primary/80 font-serif-chinese text-sm">
                                                  {word.example.pinyin}
                                                </span>
                                                <span className="font-bold text-lg text-slate-800 font-serif-chinese leading-relaxed">
                                                  {word.example.zh}
                                                </span>
                                                <span className="text-slate-500 italic border-t border-slate-200/60 pt-1 mt-1 block">
                                                  {word.example.en}
                                                </span>
                                              </div>
                                            </div>
                                          </motion.div>
                                        </td>
                                      </tr>
                                    )}
                                  </AnimatePresence>
                                </Fragment>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </Card>
                    </div>
                  </div>
                )}
              </Fragment>
            ))}
          </div>

          {/* Interactive Practice Tabs */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold font-serif-chinese mb-6 text-slate-800 dark:text-slate-200">
              綜合練習 Practice
            </h3>
            <Tabs defaultValue="listening" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8 h-auto p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <TabsTrigger
                  value="listening"
                  className="py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary transition-all gap-2"
                >
                  <Headphones className="w-4 h-4" />
                  <span className="hidden sm:inline">聽力練習</span>
                  <span className="sm:hidden">聽力</span>
                </TabsTrigger>
                <TabsTrigger
                  value="reading"
                  className="py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary transition-all gap-2"
                >
                  <BookOpenText className="w-4 h-4" />
                  <span className="hidden sm:inline">閱讀練習</span>
                  <span className="sm:hidden">閱讀</span>
                </TabsTrigger>
                <TabsTrigger
                  value="speaking"
                  className="py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary transition-all gap-2"
                >
                  <Mic className="w-4 h-4" />
                  <span className="hidden sm:inline">說話練習</span>
                  <span className="sm:hidden">說話</span>
                </TabsTrigger>
                <TabsTrigger
                  value="grammar"
                  className="py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary transition-all gap-2"
                >
                  <PenTool className="w-4 h-4" />
                  <span className="hidden sm:inline">文法練習</span>
                  <span className="sm:hidden">文法</span>
                </TabsTrigger>
              </TabsList>

              {/* Listening Tab */}
              <TabsContent
                value="listening"
                className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500"
              >
                <Card className="p-6 border-2 border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Headphones className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">聽力練習 Listening Practice</h4>
                      <p className="text-slate-500 text-sm">
                        請聽音檔並回答問題 &nbsp;Please listen to the audio and answer the questions
                      </p>
                    </div>
                  </div>
                </Card>
                {LISTENING_PRACTICE.map((practice) => (
                  <Card
                    key={practice.id}
                    className="p-6 border-2 border-border/50"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                          {practice.id}
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 gap-2 text-primary"
                          onClick={() => {
                            if (practice.id === 1) {
                              // Play actual audio file for listening practice 1
                              const audio = new Audio("/c1l1.mp3");
                              audio.play().catch((err) => {
                                console.error("Error playing audio:", err);
                                playAudio(
                                  "This is a placeholder for audio content. In a real app, this would play the actual listening exercise audio.",
                                  false,
                                );
                              });
                            } else if (practice.id === 2) {
                              // Play actual audio file for listening practice 2
                              const audio = new Audio("/c1l2.mp3");
                              audio.play().catch((err) => {
                                console.error("Error playing audio:", err);
                                playAudio(
                                  "This is a placeholder for audio content. In a real app, this would play the actual listening exercise audio.",
                                  false,
                                );
                              });
                            } else {
                              // Mock audio play for other practices
                              playAudio(
                                "This is a placeholder for audio content. In a real app, this would play the actual listening exercise audio.",
                                false,
                              );
                            }
                          }}
                        >
                          <Play className="w-3 h-3" />
                          播放音檔
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-6 pl-4 border-l-2 border-slate-100 dark:border-slate-800 ml-5">
                      {practice.questions.map((q) => {
                        const answerKey = `${practice.id}-${q.id}`;
                        const selected = listeningAnswers[answerKey];
                        const isCorrect = selected === q.answer;

                        return (
                          <div key={q.id} className="space-y-3">
                            <p className="font-medium text-lg">
                              {q.id}. {q.question}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {q.options.map((option, idx) => (
                                <button
                                  key={idx}
                                  onClick={() =>
                                    handleListeningAnswer(
                                      practice.id,
                                      q.id,
                                      idx,
                                    )
                                  }
                                  className={`text-left p-3 rounded-lg border transition-all flex items-center justify-between ${
                                    selected === idx
                                      ? isCorrect
                                        ? "bg-green-50 border-green-200 text-green-800"
                                        : "bg-red-50 border-red-200 text-red-800"
                                      : "bg-white hover:bg-slate-50 border-slate-200"
                                  }`}
                                >
                                  <span>{option}</span>
                                  {selected === idx &&
                                    (isCorrect ? (
                                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                                    ) : (
                                      <X className="w-4 h-4 text-red-600" />
                                    ))}
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Card>
                ))}
              </TabsContent>

              {/* Reading Tab */}
              <TabsContent
                value="reading"
                className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500"
              >
                <Card className="p-6 border-2 border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                      <BookOpenText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">閱讀練習 Reading Practice</h4>
                      <p className="text-slate-500 text-sm">
                        請閱讀短文並回答問題 &nbsp;Please read the passage and answer the questions
                      </p>
                    </div>
                  </div>
                </Card>
                {READING_PRACTICE.map((practice) => (
                  <Card
                    key={practice.id}
                    className="p-6 border-2 border-border/50"
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-full">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                            {practice.id}
                          </div>
                          <div className="flex-1 p-6 bg-orange-50/50 rounded-xl border border-orange-100 text-lg leading-relaxed font-serif-chinese text-slate-800">
                            {practice.content}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6 pl-4 border-l-2 border-slate-100 dark:border-slate-800 ml-5">
                      {practice.questions.map((q) => {
                        const answerKey = `${practice.id}-${q.id}`;
                        const selected = readingAnswers[answerKey];
                        const isCorrect = selected === q.answer;

                        return (
                          <div key={q.id} className="space-y-3">
                            <p className="font-medium text-lg">
                              {q.id}. {q.question}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {q.options.map((option, idx) => (
                                <button
                                  key={idx}
                                  onClick={() =>
                                    handleReadingAnswer(practice.id, q.id, idx)
                                  }
                                  className={`text-left p-3 rounded-lg border transition-all flex items-center justify-between ${
                                    selected === idx
                                      ? isCorrect
                                        ? "bg-green-50 border-green-200 text-green-800"
                                        : "bg-red-50 border-red-200 text-red-800"
                                      : "bg-white hover:bg-slate-50 border-slate-200"
                                  }`}
                                >
                                  <span>{option}</span>
                                  {selected === idx &&
                                    (isCorrect ? (
                                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                                    ) : (
                                      <X className="w-4 h-4 text-red-600" />
                                    ))}
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Card>
                ))}
              </TabsContent>

              {/* Speaking Tab */}
              <TabsContent
                value="speaking"
                className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
              >
                <Card className="rounded-xl bg-card text-card-foreground shadow p-6 border-2 border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <Mic className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">說話練習 Speaking Practice</h4>
                      <p className="text-slate-500 text-sm">
                        請唸出下列句子 &nbsp;Please read the following sentences aloud
                      </p>
                    </div>
                  </div>
                </Card>

                <div className="grid gap-6">
                  {SPEAKING_SENTENCES.map((sentence) => (
                    <SpeakingPracticeItem
                      key={sentence.id}
                      sentence={sentence}
                    />
                  ))}
                </div>
              </TabsContent>

              {/* Grammar Tab */}
              <TabsContent
                value="grammar"
                className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
              >
                <Card className="p-6 border-2 border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                      <PenTool className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">文法練習 Grammar Practice</h4>
                      <p className="text-slate-500 text-sm">
                        請用中文作答並參考答案練習 &nbsp;Please write your answer in Chinese and check the reference
                      </p>
                    </div>
                  </div>
                </Card>
                <div className="grid gap-6">
                  {GRAMMAR_PRACTICE.map((item) => (
                    <Card
                      key={item.id}
                      className="p-6 border-2 border-border/50 hover:border-primary/20 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm shrink-0">
                          {item.id}
                        </div>
                        <div className="space-y-4 w-full">
                          <div>
                            <h4 className="font-bold text-lg text-slate-800">
                              {item.title}
                            </h4>
                            <p className="text-slate-600 mt-1 bg-slate-50 p-3 rounded-lg border border-slate-200">
                              {item.scenario}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`grammar-${item.id}`}>
                              你的回答 Your Answer:
                            </Label>
                            <Textarea
                              id={`grammar-${item.id}`}
                              placeholder="請在這裡輸入中文..."
                              value={grammarInputs[item.id] || ""}
                              onChange={(e) =>
                                setGrammarInputs((prev) => ({
                                  ...prev,
                                  [item.id]: e.target.value,
                                }))
                              }
                              className="font-serif-chinese text-lg min-h-[80px]"
                            />
                          </div>

                          <div className="pt-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                setShowGrammarAnswers((prev) => ({
                                  ...prev,
                                  [item.id]: !prev[item.id],
                                }))
                              }
                              className="text-slate-500 hover:text-purple-600"
                            >
                              {showGrammarAnswers[item.id]
                                ? "隱藏參考答案 Hide Answer"
                                : "顯示參考答案 Show Answer"}
                            </Button>

                            {showGrammarAnswers[item.id] && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="mt-3 p-3 bg-purple-50 text-purple-800 rounded-lg text-lg font-medium font-serif-chinese"
                              >
                                {item.answer}
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
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
                  說中文吧：約會篇
                </span>
              </div>
              <span>
                Let’s Speak Chinese: Dating Edition
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
              chatState.affinity === "green"
                ? "bg-jade/90 border-jade text-white shadow-jade/20"
                : "bg-red-500/90 border-red-500 text-white shadow-red-500/20"
            }`}
          >
            {chatState.affinity === "green" ? (
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
                {chatState.affinity === "green" ? "小雨的心跳普通" : "小雨的心跳加速"}
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
