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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import appLogo from "@/assets/generated_images/app_logo.png";
import { type Language, getTranslations, translations } from "@/lib/i18n";
import { Link } from "wouter";
import { Header } from "@/components/Header";
// @ts-ignore
import casualManImage from "@assets/generated_images/asian_man_in_casual_clothes.png";
// @ts-ignore
import teacherManImage from "@assets/generated_images/asian_male_teacher_illustration.png";
// @ts-ignore
import reddyProfile from "@/assets/generated_images/reddy_profile.png";
// @ts-ignore
import xiaoyuProfile from "@/assets/generated_images/xiaoyu_profile.png";
// @ts-ignore
import reddyFull from "@/assets/generated_images/reddy_full.png";
// @ts-ignore
import xiaoyuFull from "@/assets/generated_images/xiaoyu_full.png";
// @ts-ignore
import chatBackground from "@/assets/generated_images/chat_background_no_clouds.png";

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
      affinity: "小雨的好感度",
    },
    vocabulary: {
      title: "生詞列表",
      subtitle: "本章重點單字",
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
      title: "Dialogue Practice: First Chat",
      subtitle: "Choose the right answer to increase affinity!",
      reddy: "Reddy",
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
        <Badge
          variant="outline"
          className="text-primary border-primary/20 bg-primary/5"
        >
          <Mic className="w-3 h-3 mr-1" />
          口語練習 Speaking Practice
        </Badge>
        <span className="text-sm text-muted-foreground">請跟著唸：</span>
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
                停止錄音 Stop
              </>
            ) : (
              <>
                <Mic className="w-5 h-5 mr-2" />
                開始練習 Start
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
            重新開始 Reset
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
  sender: "reddy" | "xiaoyu";
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

const INITIAL_CHAT_STATE: ChatState = {
  messages: [
    {
      id: 1,
      sender: "reddy",
      text: "你好，我是瑞迪，美國人，我會說一點中文。",
      en: "Hello, I am Reddy, an American. I can speak a little Chinese.",
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
      sender: "reddy",
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
      sender: "reddy",
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

const CHOICES = [
  {
    id: 1,
    text: "因為我覺得中文很簡單。",
    en: "Because I think Chinese is very simple.",
    pinyin: "Yīnwèi wǒ juédé Zhōngwén hěn jiǎndān.",
    response: "哇，你很厲害！",
    responseEn: "Wow, you are amazing!",
    responsePinyin: "Wa, nǐ hěn lìhài!",
    affinityChange: "red" as const,
  },
  {
    id: 2,
    text: "因為我喜歡台灣文化，很有意思。",
    en: "Because I like Taiwanese culture, it is very interesting.",
    pinyin: "Yīnwèi wǒ xǐhuān Táiwān wénhuà, hěn yǒuyìsi.",
    response: "哇，你很特別。",
    responseEn: "Wow, you are very special.",
    responsePinyin: "Wa, nǐ hěn tèbié.",
    affinityChange: "green" as const,
  },
];

export default function Chapter1() {
  const [lang, setLang] = useState<Language>("zh");
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

  const [vocabStates, setVocabStates] = useState<{ [key: number]: boolean }>({});

  const toggleVocabExample = (index: number) => {
    setVocabStates((prev) => ({
      ...prev,
      [index]: !prev[index],
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

  const playAudio = (text: string, isMale: boolean) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel(); // Stop any current speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "zh-TW";

      // Try to find a suitable voice
      const voices = window.speechSynthesis.getVoices();

      // Simple logic to try and vary voices, though browser support varies greatly
      // We can use pitch to simulate gender differences if multiple voices aren't available
      if (isMale) {
        utterance.pitch = 0.8;
        utterance.rate = 0.9;
      } else {
        utterance.pitch = 1.2;
        utterance.rate = 1.0;
      }

      window.speechSynthesis.speak(utterance);
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
        sender: "reddy",
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
          <div className="mb-12 relative max-w-3xl mx-auto">
            {/* Floating Characters (Desktop only) */}
            <div className="hidden min-[1360px]:block fixed left-[5%] bottom-0 h-[500px] w-64 z-40 pointer-events-none">
              <img
                src={reddyFull}
                alt="Reddy Full Body"
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
                <div>
                  <h3 className="font-bold text-lg font-serif-chinese">
                    {content.chat.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {content.chat.subtitle}
                  </p>
                </div>
              </div>

              <div className="overflow-visible p-6 space-y-4 bg-slate-100/50 dark:bg-slate-950/50 relative">
                {chatState.messages.map((msg, index) => (
                  <div key={`msg-${msg.id}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start mb-4"
                    >
                      <div className="flex items-start gap-4 max-w-[90%] flex-row">
                        <div
                          className={`w-14 h-14 rounded-full overflow-hidden flex-shrink-0 shadow-md mt-8 border-2 ${
                            msg.sender === "reddy"
                              ? "border-blue-200"
                              : "border-pink-200"
                          }`}
                        >
                          <img
                            src={
                              msg.sender === "reddy"
                                ? reddyProfile
                                : xiaoyuProfile
                            }
                            alt={msg.sender === "reddy" ? "Reddy" : "Xiaoyu"}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex flex-col gap-1 w-full">
                          <span className="text-xs text-muted-foreground ml-1">
                            {msg.sender === "reddy"
                              ? content.chat.reddy
                              : content.chat.xiaoyu}
                          </span>

                          <div className="flex flex-col gap-2 max-w-[95%]">
                            {/* Message Bubble */}
                            <div
                              className={`p-5 rounded-2xl text-lg shadow-sm leading-relaxed relative group transition-all duration-200 ${
                                msg.sender === "reddy"
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
                                  playAudio(msg.text, msg.sender === "reddy")
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
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${vocabStates[index] ? 'rotate-180' : ''}`} />
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
                                            onClick={() => playAudio(word.example.zh, true)}
                                            title="播放例句"
                                          >
                                            <Volume2 className="w-4 h-4" />
                                          </Button>
                                          <div className="flex flex-col gap-1">
                                            <span className="text-primary/80 font-serif-chinese text-sm">{word.example.pinyin}</span>
                                            <span className="font-bold text-lg text-slate-800 font-serif-chinese leading-relaxed">{word.example.zh}</span>
                                            <span className="text-slate-500 italic border-t border-slate-200/60 pt-1 mt-1 block">{word.example.en}</span>
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

            {GRAMMAR_POINTS.map((point) => (
              <GrammarPointCard
                key={point.id}
                point={point}
                playAudio={playAudio}
              />
            ))}
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
                      <p className="text-sm text-muted-foreground">
                        {section.duration}
                      </p>
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
            <h3 className="text-xl font-semibold font-serif-chinese mb-2">
              {content.comingSoon}
            </h3>
            <p className="text-muted-foreground">{content.comingSoonDesc}</p>
          </Card>
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
              <span className="font-semibold font-serif-chinese">
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
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={`fixed bottom-8 right-8 z-[60] flex items-center gap-3 px-6 py-4 rounded-full shadow-2xl backdrop-blur-md border-2 cursor-pointer transition-colors duration-500 ${
            chatState.affinity === "green"
              ? "bg-jade/90 border-jade text-white shadow-jade/20"
              : "bg-red-500/90 border-red-500 text-white shadow-red-500/20"
          }`}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Heart className={`w-6 h-6 fill-current`} />
          </motion.div>
          <div className="flex flex-col">
            <span className="font-bold text-base whitespace-nowrap">
              {content.chat.affinity}
            </span>
            <span className="text-xs opacity-90 font-medium">
              {chatState.affinity === "green" ? "心情很好" : "心情普通"}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
