import React, { useState, useEffect, useRef, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Languages,
  BookOpen,
  Heart,
  Play,
  CheckCircle2,
  X,
  Volume2,
  Type,
  List,
  ChevronDown,
  Mic,
  MicOff,
  RotateCcw,
  Headphones,
  BookOpenText,
  PenTool,
  Check,
  BicepsFlexed,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
// @ts-ignore
import barChatBackground from "@/assets/generated_images/chapter3_bar_chat_bg.png";
// @ts-ignore
import summitChatBackground from "@/assets/generated_images/chapter3_summit_chat_bg.png";
// @ts-ignore
import personEatingImg from "@/assets/generated_images/chapter3_person_eating_drinking.jpg";
// @ts-ignore
import personEatingDrinkingImg from "@/assets/generated_images/chapter3_person_eating.jpg";

const chapterContent = {
  zh: {
    title: "第三章",
    subtitle: "第三次見面：感覺與選擇｜Third Meeting: Feelings & Choices",
    description: "內容即將推出",
    backToHome: "返回首頁",
    chat: {
      title: "第三次聊天",
      subtitle: "有些選擇，會改變故事的發展",
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
    endingVideo: {
      title: "心跳結局 · 獨家影片",
      badge: "僅在心跳加速時解鎖",
      heartbeatLabel: "心跳加速結局",
    },
    endingVideoGreen: {
      title: "普通結局 · 獨家影片",
      badge: "心跳普通時的解鎖內容",
      heartbeatLabel: "普通結局",
    },
  },
  en: {
    title: "Chapter 3",
    subtitle: "Third Meeting",
    description: "Content coming soon",
    backToHome: "Back to Home",
    chat: {
      title: "Third Chat",
      subtitle: "Some choices will change how the story develops",
      randy: "Randy",
      xiaoyu: "Xiao Yu",
      affinity: "Xiao Yu's Affinity",
    },
    vocabulary: {
      title: "Vocabulary List",
      subtitle: "Swipe right on mobile to see full information",
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
    endingVideo: {
      title: "Special Ending · Exclusive Video",
      badge: "Unlocked when Xiaoyu's heart beats faster",
      heartbeatLabel: "Heartbeat Ending",
    },
    endingVideoGreen: {
      title: "Normal Ending · Exclusive Video",
      badge: "Unlocked when Xiaoyu's heart is calm",
      heartbeatLabel: "Normal Ending",
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

const CHAPTER3_GRAMMAR_POINTS: GrammarPoint[] = [
  {
    id: 1,
    title: "第一次",
    function: {
      zh: "表示某件事情是第一次發生。",
      en: "Used to say that something happens for the first time.",
    },
    structure: {
      zh: "主語 + 第一次 + 動詞",
      en: "Subject + 第一次 + Verb",
    },
    explanation: {
      zh: "用來說明某個行為或經驗是第一次。",
      en: "Used to talk about doing something for the first time.",
    },
    examples: [
      { zh: "這是我第一次來台北。", pinyin: "Zhè shì wǒ dì yī cì lái Táiběi.", en: "This is my first time coming to Taipei." },
      { zh: "他第一次跟朋友一起出去吃飯。", pinyin: "Tā dì yī cì gēn péngyǒu yìqǐ chūqù chī fàn.", en: "It's his first time going out to eat with friends." },
      { zh: "我第一次跟新朋友聊天，有一點緊張。", pinyin: "Wǒ dì yī cì gēn xīn péngyǒu liáotiān, yǒu yìdiǎn jǐnzhāng.", en: "It's my first time chatting with a new friend, so I'm a bit nervous." },
    ],
  },
  {
    id: 2,
    title: "比",
    function: {
      zh: "用來比較兩個人或兩件事情。",
      en: "Used to compare two people or things.",
    },
    structure: {
      zh: "A + 比 + B + 形容詞",
      en: "A + 比 + B + Adjective",
    },
    explanation: {
      zh: "表示 A 在某方面超過 B。",
      en: "Used to say that A is more (adjective) than B.",
    },
    examples: [
      { zh: "聊天比喝酒重要。", pinyin: "Liáotiān bǐ hējiǔ zhòngyào.", en: "Chatting is more important than drinking." },
      { zh: "今天比昨天冷。", pinyin: "Jīntiān bǐ zuótiān lěng.", en: "Today is colder than yesterday." },
      { zh: "他覺得認識新朋友比吃飯有意思。", pinyin: "Tā juéde rènshi xīn péngyǒu bǐ chīfàn yǒu yìsi.", en: "He thinks meeting new friends is more interesting than eating." },
    ],
  },
  {
    id: 3,
    title: "一邊⋯⋯一邊⋯⋯",
    function: {
      zh: "表示同時做兩個動作。",
      en: "Used to describe doing two actions at the same time.",
    },
    structure: {
      zh: "一邊 + 動作一，一邊 + 動作二",
      en: "一邊 + Action 1, 一邊 + Action 2",
    },
    explanation: {
      zh: "用來說明兩個動作同時進行。",
      en: "Used when two actions happen at the same time.",
    },
    examples: [
      { zh: "他們一邊走，一邊聊天。", pinyin: "Tāmen yìbiān zǒu, yìbiān liáotiān.", en: "They walk and chat at the same time." },
      { zh: "我一邊吃飯，一邊看電視。", pinyin: "Wǒ yìbiān chīfàn, yìbiān kàn diànshì.", en: "I eat and watch TV at the same time." },
      { zh: "她一邊喝咖啡，一邊跟朋友說話。", pinyin: "Tā yìbiān hē kāfēi, yìbiān gēn péngyǒu shuōhuà.", en: "She drinks coffee and talks with her friend at the same time." },
    ],
  },
];

// 語法點（最下面區塊）— 放在第二個生詞列表下方
const CHAPTER3_GRAMMAR_POINTS_BOTTOM: GrammarPoint[] = [
  {
    id: 4,
    title: "更",
    function: {
      zh: "表示程度更高。",
      en: "Used to express a higher degree.",
    },
    structure: {
      zh: "更 + 形容詞",
      en: "更 + Adjective",
    },
    explanation: {
      zh: "用來比較，表示比之前或比另一個更高的程度。",
      en: "Used to say that something is even more (adjective).",
    },
    examples: [
      { zh: "我很喜歡台北，但我更喜歡你。", pinyin: "Wǒ hěn xǐhuān Táiběi, dàn wǒ gèng xǐhuān nǐ.", en: "I like Taipei, but I like you more." },
      { zh: "今天很忙，明天會更忙。", pinyin: "Jīntiān hěn máng, míngtiān huì gèng máng.", en: "Today is busy; tomorrow will be even busier." },
      { zh: "這家店很好吃，那一家更好吃。", pinyin: "Zhè jiā diàn hěn hǎochī, nà yì jiā gèng hǎochī.", en: "This restaurant is good, but that one is even better." },
    ],
  },
  {
    id: 5,
    title: "跟⋯⋯一樣",
    function: {
      zh: "表示兩個人或事物相同。",
      en: "Used to say that two people or things are the same.",
    },
    structure: {
      zh: "A + 跟 + B + 一樣",
      en: "A + 跟 + B + 一樣",
    },
    explanation: {
      zh: "用來表示想法、感覺或情況相同。",
      en: "Used to express having the same idea or feeling.",
    },
    examples: [
      { zh: "我也跟你一樣。", pinyin: "Wǒ yě gēn nǐ yíyàng.", en: "I'm the same as you." },
      { zh: "她跟朋友一樣喜歡看電影。", pinyin: "Tā gēn péngyǒu yíyàng xǐhuān kàn diànyǐng.", en: "She likes watching movies just like her friend." },
      { zh: "我們的想法跟老師一樣。", pinyin: "Wǒmen de xiǎngfǎ gēn lǎoshī yíyàng.", en: "Our ideas are the same as the teacher's." },
    ],
  },
  {
    id: 6,
    title: "一⋯⋯就⋯⋯",
    function: {
      zh: "表示一個動作發生後，馬上發生另一個動作。",
      en: "Used to show that one action happens immediately after another.",
    },
    structure: {
      zh: "一 + 動作一，就 + 動作二",
      en: "一 + Action 1, 就 + Action 2",
    },
    explanation: {
      zh: "用來表示很快、立刻發生的結果。",
      en: "Used to express an immediate result.",
    },
    examples: [
      { zh: "我一看到你，就很開心。", pinyin: "Wǒ yí kàndào nǐ, jiù hěn kāixīn.", en: "As soon as I see you, I feel happy." },
      { zh: "她一下課，就回家。", pinyin: "Tā yí xià kè, jiù huí jiā.", en: "As soon as class ends, she goes home." },
      { zh: "我一聽到這個消息，就想告訴朋友。", pinyin: "Wǒ yí tīngdào zhège xiāoxi, jiù xiǎng gàosu péngyǒu.", en: "As soon as I hear this news, I want to tell my friend." },
    ],
  },
];

function GrammarPointCard({
  point,
  playAudio,
}: {
  point: GrammarPoint;
  playAudio: (text: string) => void;
}) {
  const [showFunctionEn, setShowFunctionEn] = useState(false);
  const [showStructureEn, setShowStructureEn] = useState(false);
  const [showExplanationEn, setShowExplanationEn] = useState(false);
  const [exampleStates, setExampleStates] = useState<{
    [key: number]: { showPinyin: boolean; showEn: boolean };
  }>({});
  // 語音辨識練習（用在第 6 個文法點的第 3 個例句下）
  const [oneJiuSpeakSuccess, setOneJiuSpeakSuccess] = useState(false);
  const [oneJiuListening, setOneJiuListening] = useState(false);
  const [oneJiuTranscript, setOneJiuTranscript] = useState("");
  const [oneJiuError, setOneJiuError] = useState<string | null>(null);

  const toggleExample = (index: number, type: "pinyin" | "en") => {
    setExampleStates((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        showPinyin: type === "pinyin" ? !prev[index]?.showPinyin : prev[index]?.showPinyin ?? false,
        showEn: type === "en" ? !prev[index]?.showEn : prev[index]?.showEn ?? false,
      },
    }));
  };

  // 請跟著唸「他一吃飯就想喝水」— 語音辨識成功後切換圖片
  useEffect(() => {
    if (!oneJiuListening) return;
    let recognition: any = null;
    if ("webkitSpeechRecognition" in window) {
      recognition = new (window as any).webkitSpeechRecognition();
    } else if ("SpeechRecognition" in window) {
      recognition = new (window as any).SpeechRecognition();
    } else {
      setOneJiuError("您的瀏覽器不支援語音辨識。");
      setOneJiuListening(false);
      return;
    }
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "zh-TW";
    recognition.onresult = (event: any) => {
      let t = "";
      for (let i = 0; i < event.results.length; ++i) t += event.results[i][0].transcript;
      setOneJiuTranscript(t);
      const target = "他一吃飯就想喝水";
      if (t.includes(target) || (t.includes("一吃飯") && t.includes("想喝水"))) {
        setOneJiuSpeakSuccess(true);
        setOneJiuListening(false);
      }
    };
    recognition.onerror = () => setOneJiuListening(false);
    recognition.onend = () => setOneJiuListening(false);
    recognition.start();
    return () => {
      try { recognition?.stop(); } catch {}
    };
  }, [oneJiuListening]);

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
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
              功能 Function
            </h4>
            <Button variant="ghost" size="sm" className="h-6 text-xs gap-1 text-primary" onClick={() => setShowFunctionEn(!showFunctionEn)}>
              <Languages className="w-3 h-3" />
              English
            </Button>
          </div>
          <p className="text-lg font-medium">{point.function.zh}</p>
          {showFunctionEn && (
            <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="text-slate-500 text-sm">
              {point.function.en}
            </motion.p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
              結構 Structure
            </h4>
            <Button variant="ghost" size="sm" className="h-6 text-xs gap-1 text-primary" onClick={() => setShowStructureEn(!showStructureEn)}>
              <Languages className="w-3 h-3" />
              English
            </Button>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 font-mono text-base whitespace-pre-line text-slate-700">
            {point.structure.zh}
          </div>
          {showStructureEn && (
            <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="text-slate-500 text-sm whitespace-pre-line">
              {point.structure.en}
            </motion.p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
              解釋 Explanation
            </h4>
            <Button variant="ghost" size="sm" className="h-6 text-xs gap-1 text-primary" onClick={() => setShowExplanationEn(!showExplanationEn)}>
              <Languages className="w-3 h-3" />
              English
            </Button>
          </div>
          <p className="text-base whitespace-pre-line leading-relaxed">{point.explanation.zh}</p>
          {showExplanationEn && (
            <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="text-slate-500 text-sm whitespace-pre-line mt-1">
              {point.explanation.en}
            </motion.p>
          )}
        </div>

        <div className="space-y-4 pt-4 border-t border-border/50">
          <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
            例句 Examples
          </h4>
          <div className="grid gap-3">
            {point.examples.map((ex, idx) => (
              <div key={idx} className="bg-slate-50/50 p-4 rounded-xl border border-border/50 hover:border-primary/20 transition-colors">
                <div className="flex flex-col gap-2">
                  {exampleStates[idx]?.showPinyin && (
                    <p className="text-sm text-primary font-medium font-serif-chinese">{ex.pinyin}</p>
                  )}
                  <p className="text-lg font-medium text-slate-800">{ex.zh}</p>
                  {exampleStates[idx]?.showEn && <p className="text-sm text-slate-500">{ex.en}</p>}
                </div>
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-dashed border-border/50">
                  <Button variant="ghost" size="sm" className={`h-7 px-2 text-xs gap-1.5 ${exampleStates[idx]?.showPinyin ? "bg-primary/10 text-primary" : "text-slate-500"}`} onClick={() => toggleExample(idx, "pinyin")}>
                    <Type className="w-3 h-3" />
                    拼音
                  </Button>
                  <Button variant="ghost" size="sm" className={`h-7 px-2 text-xs gap-1.5 ${exampleStates[idx]?.showEn ? "bg-primary/10 text-primary" : "text-slate-500"}`} onClick={() => toggleExample(idx, "en")}>
                    <Languages className="w-3 h-3" />
                    英文
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1.5 text-slate-500 hover:text-primary" onClick={() => playAudio(ex.zh)}>
                    <Volume2 className="w-3 h-3" />
                    朗讀
                  </Button>
                </div>
                {point.id === 6 && idx === 2 && (
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm text-muted-foreground">請跟著唸：</span>
                      <span className="text-sm font-bold font-serif-chinese">他一吃飯就想喝水</span>
                    </div>

                    <div className="grid grid-cols-1 max-w-[240px] sm:max-w-sm mx-auto gap-4 mb-4 relative">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-full relative aspect-square bg-slate-50 rounded-xl overflow-hidden border border-border/50 transition-all duration-500">
                          <AnimatePresence mode="wait">
                            <motion.img
                              key={oneJiuSpeakSuccess ? "kid2" : "kid1"}
                              src={oneJiuSpeakSuccess ? personEatingDrinkingImg : personEatingImg}
                              alt={oneJiuSpeakSuccess ? "他吃飯喝水" : "他吃飯"}
                              initial={{ opacity: 0, scale: 0.98 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.35 }}
                              className="w-full h-full object-contain p-2"
                            />
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>

                    {oneJiuTranscript && (
                      <p className="text-center text-sm text-muted-foreground mb-3 font-serif-chinese">
                        偵測到：{oneJiuTranscript}
                      </p>
                    )}
                    {oneJiuError && (
                      <p className="text-center text-sm text-destructive mb-3">{oneJiuError}</p>
                    )}

                    <div className="flex flex-col items-center gap-3">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          size="lg"
                          className={`rounded-full px-8 transition-all duration-300 ${oneJiuListening ? "bg-primary/80" : "bg-primary hover:bg-primary/90"}`}
                          onClick={() => {
                            if (oneJiuListening) return;
                            setOneJiuTranscript("");
                            setOneJiuError(null);
                            setOneJiuListening(true);
                          }}
                          disabled={oneJiuSpeakSuccess}
                        >
                          <Mic className="w-5 h-5 mr-2" aria-hidden />
                          開始 Start
                        </Button>
                        <Button
                          variant="outline"
                          size="lg"
                          className="rounded-full px-6 gap-2"
                          onClick={() => {
                            setOneJiuSpeakSuccess(false);
                            setOneJiuListening(false);
                            setOneJiuTranscript("");
                            setOneJiuError(null);
                          }}
                        >
                          <RotateCcw className="w-5 h-5" aria-hidden />
                          重新 Reset
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

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

// 象山山頂對話：前半段共用，後半段依 affinity 顯示
type SummitMessage = {
  id: number;
  sender: "randy" | "xiaoyu" | "narrator";
  text: string;
  en: string;
  pinyin: string;
};

const SUMMIT_MESSAGES_COMMON: SummitMessage[] = [
  { id: 1, sender: "xiaoyu", text: "瑞迪，你喜歡台北的風景嗎？", en: "Randy, do you like the view of Taipei?", pinyin: "Ruìdí, nǐ xǐhuān Táiběi de fēngjǐng ma?" },
  { id: 2, sender: "randy", text: "我很喜歡，但我更喜歡的是你。", en: "I like it very much, but what I like more is you.", pinyin: "Wǒ hěn xǐhuān, dàn wǒ gèng xǐhuān de shì nǐ." },
  { id: 3, sender: "narrator", text: "小雨的臉變紅了。", en: "(Xiaoyu's face turned red.)", pinyin: "(Xiǎoyǔ de liǎn biàn hóng le.)" },
  { id: 4, sender: "xiaoyu", text: "真的嗎？", en: "Really?", pinyin: "Zhēn de ma?" },
  { id: 5, sender: "randy", text: "其實我第一次看到你，就愛上你了。", en: "Actually, the first time I saw you, I fell in love with you.", pinyin: "Qíshí wǒ dì yī cì kàn dào nǐ, jiù àishàng nǐ le." },
];

const SUMMIT_MESSAGES_RED: SummitMessage[] = [
  { id: 101, sender: "xiaoyu", text: "我也跟你一樣，我一見到你，就很喜歡你。", en: "I'm the same as you—I liked you as soon as I met you.", pinyin: "Wǒ yě gēn nǐ yīyàng, wǒ yī jiàn dào nǐ, jiù hěn xǐhuān nǐ." },
  { id: 102, sender: "randy", text: "你願意當我的女朋友嗎？", en: "Will you be my girlfriend?", pinyin: "Nǐ yuànyì dāng wǒ de nǚ péngyǒu ma?" },
  { id: 103, sender: "xiaoyu", text: "我願意。", en: "I do.", pinyin: "Wǒ yuànyì." },
  { id: 104, sender: "randy", text: "謝謝你給我機會，我愛你！", en: "Thank you for giving me a chance, I love you!", pinyin: "Xièxiè nǐ gěi wǒ jīhuì, wǒ ài nǐ!" },
];

const SUMMIT_MESSAGES_GREEN: SummitMessage[] = [
  { id: 201, sender: "xiaoyu", text: "謝謝你這樣說，但我認為這樣太快了。", en: "Thank you for saying that, but I think this is too fast.", pinyin: "Xièxiè nǐ zhèyàng shuō, dàn wǒ rènwéi zhèyàng tài kuài le." },
  { id: 202, sender: "randy", text: "很快嗎？我們不是已經認識兩個月了嗎？", en: "Too fast? Haven't we known each other for two months already?", pinyin: "Hěn kuài ma? Wǒmen bù shì yǐjīng rènshí liǎng gè yuè le ma?" },
  { id: 203, sender: "xiaoyu", text: "我們先當朋友比較好。", en: "It's better if we're just friends first.", pinyin: "Wǒmen xiān dāng péngyǒu bǐjiào hǎo." },
  { id: 204, sender: "randy", text: "好的，那我當你最好的朋友。", en: "Okay, then I'll be your best friend.", pinyin: "Hǎo de, nà wǒ dāng nǐ zuì hǎo de péngyǒu." },
];

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
  /** 選用：例句下方顯示的 Language Tip（中文 + 英文） */
  languageTip?: { zh: string; en: string };
};

const BAR_VOCABULARY_LIST: VocabWord[] = [
  {
    traditional: "吃完",
    simplified: "吃完",
    pinyin: "chī wán",
    english: "finish eating",
    partOfSpeech: "V",
    tbcl: "X",
    example: { zh: "吃完晚餐以後，我們去喝酒。", pinyin: "Chī wán wǎncān yǐhòu, wǒmen qù hējiǔ.", en: "After finishing dinner, we went to drink." },
  },
  {
    traditional: "之後",
    simplified: "之后",
    pinyin: "zhīhòu",
    english: "after",
    partOfSpeech: "N / Adv",
    tbcl: "4",
    example: { zh: "看完電影之後，他們一起聊天。", pinyin: "Kàn wán diànyǐng zhīhòu, tāmen yīqǐ liáotiān.", en: "After watching the movie, they chatted together." },
  },
  {
    traditional: "看完",
    simplified: "看完",
    pinyin: "kàn wán",
    english: "finish watching",
    partOfSpeech: "V",
    tbcl: "X",
    example: { zh: "看完電影以後，我們走到酒吧。", pinyin: "Kàn wán diànyǐng yǐhòu, wǒmen zǒu dào jiǔbā.", en: "After watching the movie, we walked to the bar." },
  },
  {
    traditional: "喝",
    simplified: "喝",
    pinyin: "hē",
    english: "to drink",
    partOfSpeech: "V",
    tbcl: "1",
    example: { zh: "我們一起喝酒吧。", pinyin: "Wǒmen yīqǐ hējiǔ ba.", en: "Let's drink together." },
  },
  {
    traditional: "酒",
    simplified: "酒",
    pinyin: "jiǔ",
    english: "alcohol",
    partOfSpeech: "N",
    tbcl: "1*",
    example: { zh: "我不常喝酒。", pinyin: "Wǒ bù cháng hējiǔ.", en: "I don't drink often." },
  },
  {
    traditional: "台北101",
    simplified: "台北101",
    pinyin: "Táiběi 101",
    english: "Taipei 101",
    partOfSpeech: "PN（專有名詞）",
    tbcl: "X",
    example: { zh: "台北101附近有很多酒吧。", pinyin: "Táiběi 101 fùjìn yǒu hěn duō jiǔbā.", en: "There are many bars near Taipei 101." },
  },
  {
    traditional: "附近",
    simplified: "附近",
    pinyin: "fùjìn",
    english: "nearby",
    partOfSpeech: "N / Vs",
    tbcl: "1*",
    example: { zh: "這裡附近有一間酒吧。", pinyin: "Zhèlǐ fùjìn yǒu yī jiān jiǔbā.", en: "There is a bar nearby here." },
  },
  {
    traditional: "酒吧",
    simplified: "酒吧",
    pinyin: "jiǔbā",
    english: "bar",
    partOfSpeech: "N",
    tbcl: "4*",
    example: { zh: "我們晚上去酒吧聊天。", pinyin: "Wǒmen wǎnshàng qù jiǔbā liáotiān.", en: "We go to the bar to chat at night." },
  },
  {
    traditional: "聊天",
    simplified: "聊天",
    pinyin: "liáotiān",
    english: "to chat",
    partOfSpeech: "V-sep",
    tbcl: "2",
    example: { zh: "他們一邊喝酒，一邊聊天。", pinyin: "Tāmen yībiān hējiǔ, yībiān liáotiān.", en: "They drink and chat at the same time." },
  },
  {
    traditional: "進入",
    simplified: "进入",
    pinyin: "jìnrù",
    english: "to enter",
    partOfSpeech: "V",
    tbcl: "4",
    example: { zh: "他們進入了一間酒吧。", pinyin: "Tāmen jìnrù le yī jiān jiǔbā.", en: "They entered a bar." },
  },
  {
    traditional: "間",
    simplified: "间",
    pinyin: "jiān",
    english: "(Measure word for rooms)",
    partOfSpeech: "M",
    tbcl: "2",
    example: { zh: "這是一間小酒吧。", pinyin: "Zhè shì yī jiān xiǎo jiǔbā.", en: "This is a small bar." },
  },
  {
    traditional: "又",
    simplified: "又",
    pinyin: "yòu",
    english: "again / once more",
    partOfSpeech: "Adv",
    tbcl: "1*",
    example: { zh: "進入酒吧以後，他們又開始聊天了。", pinyin: "Jìnrù jiǔbā yǐhòu, tāmen yòu kāishǐ liáotiān le.", en: "After entering the bar, they started chatting again." },
  },
  {
    traditional: "開始",
    simplified: "开始",
    pinyin: "kāishǐ",
    english: "to start",
    partOfSpeech: "V",
    tbcl: "2",
    example: { zh: "他們坐下來，開始聊天。", pinyin: "Tāmen zuò xiàlái, kāishǐ liáotiān.", en: "They sat down and started chatting." },
  },
  {
    traditional: "不一定",
    simplified: "不一定",
    pinyin: "bù yídìng",
    english: "not necessarily",
    partOfSpeech: "Adv",
    tbcl: "X",
    example: { zh: "第一次見面，不一定要喝酒。", pinyin: "Dì yī cì jiànmiàn, bù yídìng yào hējiǔ.", en: "The first time meeting, you don't necessarily have to drink." },
  },
  {
    traditional: "但",
    simplified: "但",
    pinyin: "dàn",
    english: "but",
    partOfSpeech: "Conj",
    tbcl: "2",
    example: { zh: "我想喝酒，但不想喝太多。", pinyin: "Wǒ xiǎng hējiǔ, dàn bù xiǎng hē tài duō.", en: "I want to drink, but I don't want to drink too much." },
  },
  {
    traditional: "想要",
    simplified: "想要",
    pinyin: "xiǎngyào",
    english: "want to",
    partOfSpeech: "Vaux",
    tbcl: "2",
    example: { zh: "我想要跟你聊天。", pinyin: "Wǒ xiǎngyào gēn nǐ liáotiān.", en: "I want to chat with you." },
  },
  {
    traditional: "聊",
    simplified: "聊",
    pinyin: "liáo",
    english: "to chat",
    partOfSpeech: "V",
    tbcl: "2",
    example: { zh: "我想再跟你聊一聊。", pinyin: "Wǒ xiǎng zài gēn nǐ liáo yī liáo.", en: "I want to chat with you a bit more." },
  },
  {
    traditional: "認識",
    simplified: "认识",
    pinyin: "rènshí",
    english: "to get to know",
    partOfSpeech: "Vst",
    tbcl: "2",
    example: { zh: "我想多認識你一點。", pinyin: "Wǒ xiǎng duō rènshí nǐ yīdiǎn.", en: "I want to get to know you a bit more." },
  },
  {
    traditional: "更",
    simplified: "更",
    pinyin: "gèng",
    english: "more",
    partOfSpeech: "Adv",
    tbcl: "2",
    example: { zh: "認識你比喝酒更重要。", pinyin: "Rènshí nǐ bǐ hējiǔ gèng zhòngyào.", en: "Getting to know you is more important than drinking." },
  },
  {
    traditional: "重要",
    simplified: "重要",
    pinyin: "zhòngyào",
    english: "important",
    partOfSpeech: "Vs",
    tbcl: "2",
    example: { zh: "對我來說，朋友很重要。", pinyin: "Duì wǒ lái shuō, péngyǒu hěn zhòngyào.", en: "To me, friends are very important." },
  },
  {
    traditional: "乾杯",
    simplified: "干杯",
    pinyin: "gānbēi",
    english: "cheers",
    partOfSpeech: "V-sep",
    tbcl: "X",
    example: { zh: "我們一起喝酒，乾杯！", pinyin: "Wǒmen yīqǐ hējiǔ, gānbēi!", en: "Let's drink together, cheers!" },
  },
];

// 象山／結局生詞列表（依順序，格式同上；TBCL 為等級數字；例句依使用者提供）
const SUMMIT_VOCABULARY_LIST: VocabWord[] = [
  { traditional: "後來", simplified: "后来", pinyin: "hòulái", english: "later / afterwards", partOfSpeech: "N / Adv", tbcl: "2", example: { zh: "後來，他們常常一起出去。", pinyin: "Hòulái, tāmen chángcháng yīqǐ chūqù.", en: "Later, they often went out together." } },
  { traditional: "約好", simplified: "约好", pinyin: "yuē hǎo", english: "to make an appointment", partOfSpeech: "V (短語)", tbcl: "X", example: { zh: "他們約好週末一起爬山。", pinyin: "Tāmen yuē hǎo zhōumò yīqǐ pá shān.", en: "They made plans to go hiking together on the weekend." } },
  { traditional: "爬山", simplified: "爬山", pinyin: "pá shān", english: "to go hiking", partOfSpeech: "V-sep", tbcl: "3", example: { zh: "週末我們去爬山吧。", pinyin: "Zhōumò wǒmen qù pá shān ba.", en: "Let's go hiking this weekend." } },
  { traditional: "象山", simplified: "象山", pinyin: "Xiàngshān", english: "Elephant Mountain", partOfSpeech: "PN", tbcl: "X", example: { zh: "他們一起去爬象山。", pinyin: "Tāmen yīqǐ qù pá Xiàngshān.", en: "They went to climb Elephant Mountain together." } },
  { traditional: "山頂", simplified: "山顶", pinyin: "shān dǐng", english: "mountaintop", partOfSpeech: "N", tbcl: "X", example: { zh: "他們走到山頂，看風景。", pinyin: "Tāmen zǒu dào shān dǐng, kàn fēngjǐng.", en: "They walked to the mountaintop and looked at the scenery." } },
  { traditional: "風景", simplified: "风景", pinyin: "fēngjǐng", english: "scenery / view", partOfSpeech: "N", tbcl: "2*", example: { zh: "山頂的風景很漂亮。", pinyin: "Shān dǐng de fēngjǐng hěn piàoliang.", en: "The scenery at the mountaintop is very beautiful." } },
  { traditional: "臉", simplified: "脸", pinyin: "liǎn", english: "face", partOfSpeech: "N", tbcl: "2", example: { zh: "她的臉有一點紅。", pinyin: "Tā de liǎn yǒu yīdiǎn hóng.", en: "Her face is a little red." } },
  { traditional: "紅", simplified: "红", pinyin: "hóng", english: "red", partOfSpeech: "Vs", tbcl: "1*", example: { zh: "她的臉紅了。", pinyin: "Tā de liǎn hóng le.", en: "Her face turned red." } },
  { traditional: "變", simplified: "变", pinyin: "biàn", english: "to become", partOfSpeech: "Vp", tbcl: "2", example: { zh: "她的臉變紅了。", pinyin: "Tā de liǎn biàn hóng le.", en: "Her face turned red." }, languageTip: { zh: "🌱 Language Tip｜變 + 形容詞\n變 用來表示「狀態的改變」。\n例如：\n她的臉紅了。\n她的臉變紅了。\n「變 + 形容詞」表示從一個狀態，變成另一個狀態。", en: "🌱 Language Tip | 變 + Adjective\n變 is used to express \"a change of state.\"\nFor example:\nHer face is red.\nHer face turned red.\n\"變 + adjective\" indicates a change from one state to another." } },
  { traditional: "其實", simplified: "其实", pinyin: "qíshí", english: "actually", partOfSpeech: "Adv", tbcl: "3*", example: { zh: "其實，我有一點緊張。", pinyin: "Qíshí, wǒ yǒu yīdiǎn jǐnzhāng.", en: "Actually, I'm a little nervous." } },
  { traditional: "愛上", simplified: "爱上", pinyin: "ài shàng", english: "to fall in love with", partOfSpeech: "Vst", tbcl: "X", example: { zh: "他慢慢愛上了她。", pinyin: "Tā mànmàn ài shàng le tā.", en: "He gradually fell in love with her." } },
  { traditional: "見到", simplified: "见到", pinyin: "jiàn dào", english: "to see / to meet", partOfSpeech: "V", tbcl: "4", example: { zh: "每次見到她，他都很開心。", pinyin: "Měi cì jiàn dào tā, tā dōu hěn kāixīn.", en: "Every time he sees her, he's very happy." } },
  { traditional: "願意", simplified: "愿意", pinyin: "yuànyì", english: "to be willing to", partOfSpeech: "Vaux", tbcl: "2", example: { zh: "我願意跟你一起去。", pinyin: "Wǒ yuànyì gēn nǐ yīqǐ qù.", en: "I'm willing to go with you." } },
  { traditional: "當", simplified: "当", pinyin: "dāng", english: "to be / to act as", partOfSpeech: "V", tbcl: "2", example: { zh: "我想先當你的朋友。", pinyin: "Wǒ xiǎng xiān dāng nǐ de péngyǒu.", en: "I want to be your friend first." } },
  { traditional: "好朋友", simplified: "好朋友", pinyin: "hǎo péngyǒu", english: "good friend", partOfSpeech: "N", tbcl: "X", example: { zh: "他們現在是好朋友。", pinyin: "Tāmen xiànzài shì hǎo péngyǒu.", en: "They are good friends now." } },
  { traditional: "機會", simplified: "机会", pinyin: "jīhuì", english: "opportunity / chance", partOfSpeech: "N", tbcl: "2", example: { zh: "這是一個很好的機會。", pinyin: "Zhè shì yī gè hěn hǎo de jīhuì.", en: "This is a very good opportunity." } },
  { traditional: "這樣", simplified: "这样", pinyin: "zhèyàng", english: "like this / in this way", partOfSpeech: "Adv / Det", tbcl: "3", example: { zh: "這樣說比較清楚。", pinyin: "Zhèyàng shuō bǐjiào qīngchu.", en: "It's clearer to say it this way." } },
  { traditional: "認為", simplified: "认为", pinyin: "rènwéi", english: "to think / to consider", partOfSpeech: "Vst", tbcl: "2", example: { zh: "我認為他是一個好人。", pinyin: "Wǒ rènwéi tā shì yī gè hǎo rén.", en: "I think he is a good person." } },
];

// Practice Data（複製自 chapter1，之後可在這裡改內容）
const LISTENING_PRACTICE = [
  {
    id: 1,
    title: "聽力練習 1",
    audioSrc: "/c1l1.mp3",
    questions: [
      { id: 1, question: "說話的人在哪裡？", options: ["教室", "圖書館", "咖啡店", "電影院"], answer: 1 },
      { id: 2, question: "大部分人在做什麼", options: ["聊天", "看電影", "看書或用電腦學習", "睡覺"], answer: 2 },
      { id: 3, question: "說話的人覺得今天怎麼樣？", options: ["不喜歡", "覺得很吵", "沒什麼感覺", "很喜歡"], answer: 3 },
    ],
  },
  {
    id: 2,
    title: "聽力練習 2",
    audioSrc: "/c1l2.wav",
    questions: [
      { id: 1, question: "「我」覺得學中文怎麼樣？", options: ["學中文很難", "學中文沒意思", "學中文很好，也很重要", "學中文不用練習"], answer: 2 },
      { id: 2, question: "短文中，「我」現在可以做什麼？", options: ["跟老師學中文", "跟朋友一起旅行", "跟台灣人聊天", "看中文電影"], answer: 2 },
      { id: 3, question: "為什麼「我」要多一點練習？", options: ["因為我很忙", "因為我說得還不太好", "因為我不喜歡中文", "因為我不想聊天"], answer: 1 },
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
      { id: 1, question: "旅行的時候，跟人聊天可以做什麼？", options: ["看電影", "了解文化", "聽音樂", "買東西"], answer: 1 },
      { id: 2, question: "短文中提到，路上大家在做什麼？", options: ["在看風景", "在聽音樂", "在問路和買東西", "在吃飯"], answer: 2 },
      { id: 3, question: "為什麼旅行會變得很方便？", options: ["因為有很多朋友", "因為常常看電影", "因為慢慢習慣生活中的用法", "因為去了很多地方"], answer: 2 },
    ],
  },
  {
    id: 2,
    title: "閱讀測驗 2",
    content:
      "剛剛在車站跟朋友見面，一起去吃飯。這家店看起來很特別，人不多，但是大家都在聊天。菜不多，做法也很簡單，但是味道怎麼樣？因為用的東西很新鮮，所以吃起來不錯。吃完飯以後，跟朋友一起走一走，看看附近的店。這家店很好，那家呢？平常這裡很熱鬧，很多人喜歡來這裡見面。",
    questions: [
      { id: 1, question: "短文一開始，事情發生在哪裡？", options: ["在餐廳", "在車站", "在家裡", "在學校"], answer: 1 },
      { id: 2, question: "這家店的食物為什麼吃起來不錯？", options: ["因為菜很多", "因為人很多", "因為用的東西很新鮮", "因為做法很特別"], answer: 2 },
      { id: 3, question: "「這家店很好，那家呢？」這句話想做什麼？", options: ["問價錢", "想知道不同的店怎麼樣", "問路", "找朋友"], answer: 1 },
    ],
  },
];

const SPEAKING_SENTENCES = [
  { id: 1, text: "我喜歡跟朋友出去吃飯。", pinyin: "Wǒ xǐhuān gēn péngyǒu chūqù chīfàn." },
  { id: 2, text: "明天下午六點怎麼樣？", pinyin: "Míngtiān xiàwǔ liù diǎn zěnmeyàng?" },
  { id: 3, text: "我們在捷運站見面。", pinyin: "Wǒmen zài jiéyùn zhàn jiànmiàn." },
  { id: 4, text: "你平常喜歡做什麼？", pinyin: "Nǐ píngcháng xǐhuān zuò shénme?" },
  { id: 5, text: "這部電影很好看。", pinyin: "Zhè bù diànyǐng hěn hǎokàn." },
];

const GRAMMAR_PRACTICE = [
  {
    id: 1,
    title: "練習 1｜第一次",
    scenario: "你第一次跟新朋友出去，會喝酒嗎？",
    answer: "不一定，要看跟誰。\n我第一次跟新朋友出去，就會聊天。",
  },
  {
    id: 2,
    title: "練習 2｜比",
    scenario: "你覺得聊天重要，還是喝酒重要？",
    answer: "我覺得聊天比喝酒重要。\n認識朋友比喝酒重要。",
  },
  {
    id: 3,
    title: "練習 3｜一邊⋯⋯一邊⋯⋯",
    scenario: "你們現在在走去酒吧，你們在做什麼？",
    answer: "我們一邊走，一邊聊天。",
  },
  {
    id: 4,
    title: "練習 4｜更",
    scenario: "你喜歡台北的風景嗎？",
    answer: "我很喜歡，但我更喜歡的是你。\n我喜歡風景，但更喜歡聊天。",
  },
  {
    id: 5,
    title: "練習 5｜跟⋯⋯一樣",
    scenario: "我很喜歡爬山，你呢？",
    answer: "我也跟你一樣。\n我跟你一樣，很喜歡爬山。",
  },
  {
    id: 6,
    title: "練習 6｜跟⋯⋯一樣",
    scenario: "你第一次看到喜歡的人，會怎麼樣？",
    answer: "我一看到你，就很開心。\n我一見到你，就很喜歡你。",
  },
];

function SpeakingPracticeItem({
  sentence,
}: {
  sentence: { id: number; text: string; pinyin: string };
}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [matchState, setMatchState] = useState<"none" | "partial" | "full">("none");
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

        // Simple matching logic (remove punctuation)
        const cleanTranscript = sessionTranscript.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()。，？]/g, "");
        const cleanTarget = sentence.text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()。，？]/g, "");

        if (cleanTranscript.includes(cleanTarget)) {
          setMatchState("full");
        } else if (
          cleanTranscript.length > 0 &&
          cleanTarget.includes(cleanTranscript.substring(0, Math.min(cleanTranscript.length, 2)))
        ) {
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
      if (recognition) recognition.stop();
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
        <Button variant={isListening ? "destructive" : "default"} size="sm" onClick={toggleListening} className="gap-2">
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

export default function Chapter3() {
  const [lang, setLang] = useState<Language>("zh");
  const [showStoryTranslation, setShowStoryTranslation] = useState(false);
  const [showStory2Translation, setShowStory2Translation] = useState(false);
  const [showLoveChoiceTranslation, setShowLoveChoiceTranslation] = useState(false);
  const [xiaoyuThoughtToastOpen, setXiaoyuThoughtToastOpen] = useState(false);
  const [xiaoyuThoughtToastShowEn, setXiaoyuThoughtToastShowEn] = useState(false);
  const [xiaoyuThoughtToastAffinity, setXiaoyuThoughtToastAffinity] = useState<"green" | "red">("green");
  const [barChatLang, setBarChatLang] = useState<Language>("zh");
  
  // Message states for bar chat
  const [barMessageStates, setBarMessageStates] = useState<MessageState>({});
  // Message states for summit chat
  const [summitMessageStates, setSummitMessageStates] = useState<MessageState>({});
  const [summitChatLang, setSummitChatLang] = useState<Language>("zh");
  const [endingVideoLang, setEndingVideoLang] = useState<Language>("zh");
  const [endingVideoLangGreen, setEndingVideoLangGreen] = useState<Language>("zh");
  // Vocabulary list states for bar
  const [barVocabStates, setBarVocabStates] = useState<{ [key: number]: boolean }>({});
  // Vocabulary list states for summit/ending
  const [summitVocabStates, setSummitVocabStates] = useState<{ [key: number]: boolean }>({});
  // Language Tip 顯示語言（依生詞列 index）；不分成兩區塊，用按鈕切換
  const [summitTipLangByIndex, setSummitTipLangByIndex] = useState<Record<number, "zh" | "en">>({});

  // Practice States（複製自 chapter1）
  const [listeningAnswers, setListeningAnswers] = useState<{ [key: string]: number }>({});
  const [readingAnswers, setReadingAnswers] = useState<{ [key: string]: number }>({});
  const [grammarInputs, setGrammarInputs] = useState<{ [key: number]: string }>({});
  const [showGrammarAnswers, setShowGrammarAnswers] = useState<{ [key: number]: boolean }>({});
  
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
  const endingVideoRef = useRef<HTMLDivElement>(null);
  const [endingVideoRevealed, setEndingVideoRevealed] = useState(false);

  // Save scenario to localStorage when it changes
  useEffect(() => {
    if (appScenario) {
      localStorage.setItem("app_scenario", appScenario);
    }
  }, [appScenario]);
  
  // Save affinity to localStorage when it changes（切換狀態時不重置 endingVideoRevealed，避免影片區塊消失）
  useEffect(() => {
    localStorage.setItem("affinity_state", affinity);
  }, [affinity]);

  // 滑到影片區塊時才慢慢顯示（捲動觸發；普通／加速兩種結局皆觸發）
  useEffect(() => {
    const el = endingVideoRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setEndingVideoRevealed(true);
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

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

  const toggleSummitMessageEn = (id: number) => {
    setSummitMessageStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], showEn: !prev[id]?.showEn },
    }));
  };

  const toggleSummitMessagePinyin = (id: number) => {
    setSummitMessageStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], showPinyin: !prev[id]?.showPinyin },
    }));
  };

  const toggleSummitChatLang = () => {
    setSummitChatLang((prev) => (prev === "zh" ? "en" : "zh"));
  };

  const toggleBarVocabExample = (index: number) => {
    setBarVocabStates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleSummitVocabExample = (index: number) => {
    setSummitVocabStates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleListeningAnswer = (practiceId: number, qId: number, answer: number) => {
    setListeningAnswers((prev) => ({
      ...prev,
      [`${practiceId}-${qId}`]: answer,
    }));
  };

  const handleReadingAnswer = (practiceId: number, qId: number, answer: number) => {
    setReadingAnswers((prev) => ({
      ...prev,
      [`${practiceId}-${qId}`]: answer,
    }));
  };

  const playBarAudio = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-TW";
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
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
            {/* Floating Characters (Desktop only, same as chapter2) */}
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
              className="overflow-hidden border-2 border-primary/50 shadow-lg bg-slate-50 dark:bg-slate-900 z-10 relative w-full"
            >
              <div
                className="absolute inset-0 z-0 opacity-90 pointer-events-none bg-cover bg-center"
                style={{ backgroundImage: `url(${barChatBackground})` }}
              />
              <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-violet-50/50 via-transparent to-violet-50/30" />
              <div className="bg-primary/5 p-4 border-b border-border/50 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🍷</span>
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
                              💭
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

          {/* Bar Vocabulary List */}
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
                    {BAR_VOCABULARY_LIST.map((word, index) => (
                      <Fragment key={index}>
                        <tr
                          className="border-b-0 hover:bg-slate-50/50 transition-colors group cursor-pointer"
                          onClick={() => toggleBarVocabExample(index)}
                        >
                          <td className="p-4 border-r border-border/50 whitespace-nowrap w-min">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 rounded-full text-slate-400 hover:text-primary shrink-0"
                              >
                                <ChevronDown
                                  className={`w-4 h-4 transition-transform duration-200 ${barVocabStates[index] ? "rotate-180" : ""}`}
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
                                  playBarAudio(word.traditional);
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
                          {barVocabStates[index] && (
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
                                      className="h-6 w-6 rounded-full opacity-70 hover:opacity-100 hover:bg-primary/10 hover:text-primary shrink-0"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        playBarAudio(word.example.zh);
                                      }}
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
                                      <span className="text-slate-600 text-sm mt-1">
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
            <div className="space-y-6">
              {CHAPTER3_GRAMMAR_POINTS.map((point) => (
                <GrammarPointCard key={point.id} point={point} playAudio={playBarAudio} />
              ))}
            </div>
          </div>

          {/* 故事背景（後續）— 放在最下面 */}
          <div className="mb-12">
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-2 border-primary/20 shadow-sm relative">
              <div className="absolute top-4 right-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-primary hover:text-primary hover:bg-primary/10"
                  onClick={() => setShowStory2Translation(!showStory2Translation)}
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
                    {showStory2Translation ? "Story Background" : "故事背景"}
                  </h2>
                  <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-line font-serif-chinese">
                    {showStory2Translation
                      ? "Later, the two of them chatted every day and had meals together.\nTwo months later, they made plans to go hiking together.\nWhen they reached the top of Elephant Mountain, they started chatting."
                      : "後來，他們兩個人每天都聊天、一起吃飯。\n兩個月以後，他們約好一起去爬山。\n到了象山的山頂，他們開始聊天。"
                    }
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* 象山山頂對話框 — 依 affinity 顯示不同後續 */}
          <div className="mb-12 relative max-w-4xl mx-auto">
            <Card className="overflow-hidden border-2 border-primary/50 shadow-lg bg-slate-50 dark:bg-slate-900 z-10 relative w-full">
              <div
                className="absolute inset-0 z-0 opacity-90 pointer-events-none bg-cover bg-center"
                style={{ backgroundImage: `url(${summitChatBackground})` }}
              />
              <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-violet-100/40 via-transparent to-violet-100/30" />
              <div className="bg-primary/5 p-4 border-b border-border/50 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">💞</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg font-serif-chinese">
                      {content.chat.title} - {summitChatLang === "zh" ? "象山情境" : "Elephant Mountain"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {content.chat.subtitle}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  onClick={toggleSummitChatLang}
                  className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 border border-transparent min-h-8 rounded-md px-3 text-xs gap-2 text-primary hover:text-primary hover:bg-primary/10"
                >
                  <Languages className="w-4 h-4" />
                </Button>
              </div>

              <div className="overflow-visible p-8 space-y-6 bg-slate-100/50 dark:bg-slate-950/50 relative">
                {[...SUMMIT_MESSAGES_COMMON, ...(affinity === "red" ? SUMMIT_MESSAGES_RED : SUMMIT_MESSAGES_GREEN)].map((msg) => {
                  const summitBtnLight = [103, 104, 203, 204].includes(msg.id);
                  return (
                  <div key={msg.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-4"
                    >
                      {msg.sender === "narrator" ? (
                        <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-md border-2 border-slate-300 bg-slate-50">
                          <span className="text-2xl">🤭</span>
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
                          {summitMessageStates[msg.id]?.showPinyin && (
                            <p className="text-sm text-primary font-medium border-b border-primary/10 pb-1 font-serif-chinese">
                              {msg.pinyin}
                            </p>
                          )}
                          <p className={`${msg.sender === "narrator" ? "text-sm italic text-slate-600" : "text-base font-medium"} leading-relaxed`}>
                            {msg.text}
                          </p>
                          {summitMessageStates[msg.id]?.showEn && (
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
                              summitBtnLight
                                ? "text-[#FAFAFA] hover:text-[#FAFAFA] hover:bg-white/20"
                                : summitMessageStates[msg.id]?.showEn
                                  ? "bg-primary/10 text-primary hover:bg-primary/20"
                                  : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                            }`}
                            onClick={() => toggleSummitMessageEn(msg.id)}
                          >
                            <Languages className="w-3.5 h-3.5" />
                            <span>翻譯</span>
                          </Button>
                          <div className="w-px h-3 bg-slate-200" />
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`h-7 px-2 rounded-full gap-1 text-xs font-medium transition-colors ${
                              summitBtnLight
                                ? "text-[#FAFAFA] hover:text-[#FAFAFA] hover:bg-white/20"
                                : summitMessageStates[msg.id]?.showPinyin
                                  ? "bg-primary/10 text-primary hover:bg-primary/20"
                                  : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                            }`}
                            onClick={() => toggleSummitMessagePinyin(msg.id)}
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
                                className={summitBtnLight ? "h-7 px-2 rounded-full gap-1 text-xs font-medium text-[#FAFAFA] hover:text-[#FAFAFA] hover:bg-white/20 transition-colors" : "h-7 px-2 rounded-full gap-1 text-xs font-medium text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"}
                                onClick={() => playBarAudio(msg.text)}
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                                <span>朗讀</span>
                              </Button>
                            </>
                          )}
                        </div>
                        {msg.id === 5 && msg.sender === "randy" && (
                          <div className="mt-3 rounded-2xl border border-white/40 bg-white/70 dark:bg-slate-900/70 backdrop-blur p-4 shadow-sm relative">
                            <div className="absolute top-3 right-3">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-primary hover:text-primary hover:bg-primary/10 dark:text-slate-100 dark:hover:bg-slate-800/60"
                                onClick={() => setShowLoveChoiceTranslation((prev) => !prev)}
                                aria-label={showLoveChoiceTranslation ? "切換回中文" : "翻譯"}
                              >
                                <Languages className="w-4 h-4" />
                              </Button>
                            </div>
                            <p className="font-bold font-serif-chinese text-slate-800 dark:text-slate-100 mb-3 pr-10">
                              {showLoveChoiceTranslation ? "Do you want Randy and Xiaoyu to be together?" : "你希望瑞迪和小雨在一起嗎？"}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-2">
                              <Button
                                size="sm"
                                className="rounded-full border border-primary/20 bg-primary/10 text-primary hover:bg-primary/15 shadow-sm hover:shadow-md transition-all duration-150 active:scale-[0.97] active:translate-y-[1px] dark:border-slate-700/60 dark:bg-slate-800/70 dark:text-slate-100 dark:hover:bg-slate-800/90"
                                onClick={() => setAffinity("red")}
                              >
                                {showLoveChoiceTranslation ? "💖 Be together" : "💖 在一起"}
                              </Button>
                              <Button
                                size="sm"
                                className="rounded-full border border-primary/20 bg-primary/10 text-primary hover:bg-primary/15 shadow-sm hover:shadow-md transition-all duration-150 active:scale-[0.97] active:translate-y-[1px] dark:border-slate-700/60 dark:bg-slate-800/70 dark:text-slate-100 dark:hover:bg-slate-800/90"
                                onClick={() => setAffinity("green")}
                              >
                                {showLoveChoiceTranslation ? "💔 Just be friends" : "💔 當朋友就好"}
                              </Button>
                              {/* 🔮看小雨的想法（暫時隱藏） */}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* 結局影片區 — 第二個對話框下方；依 floating 小雨心跳顯示不同影片，滑到才慢慢浮現；僅渲染當前狀態的影片以利手機播放 */}
          <div
            ref={endingVideoRef}
            className="mb-16 max-w-3xl mx-auto min-h-[200px]"
            aria-hidden={false}
          >
            {affinity === "green" ? (
              <motion.div
                key="ending-green"
                initial={{ opacity: 0, y: 28 }}
                animate={{
                  opacity: endingVideoRevealed ? 1 : 0,
                  y: endingVideoRevealed ? 0 : 28,
                }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                className="w-full"
              >
                <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-400/60 dark:border-emerald-500/50 bg-gradient-to-b from-emerald-50/80 to-teal-50/80 dark:from-emerald-950/40 dark:to-teal-950/30 shadow-2xl shadow-emerald-500/15 dark:shadow-emerald-500/10">
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-emerald-200/20 via-transparent to-teal-200/20 rounded-2xl" />
                  <div className="relative z-10 p-6 sm:p-8">
                    <div className="absolute top-4 right-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2 rounded-full border border-[#ffebeb] bg-[#fffafa]/90 hover:bg-[#ffebeb]/50 text-red-600 hover:text-red-700 dark:border-red-200/60 dark:bg-red-950/20 dark:text-red-400 dark:hover:text-red-300"
                        onClick={() => setEndingVideoLangGreen((prev) => (prev === "zh" ? "en" : "zh"))}
                        aria-label={endingVideoLangGreen === "zh" ? "Switch to English" : "切換至中文"}
                      >
                        <Languages className="w-4 h-4" />
                        <span className="text-xs font-medium">{endingVideoLangGreen === "zh" ? "EN" : "中文"}</span>
                      </Button>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
                      <Badge className="bg-emerald-500/90 text-white border-emerald-400/50 shadow-md px-3 py-1 text-sm font-serif-chinese">
                        {chapterContent[endingVideoLangGreen].endingVideoGreen.badge}
                      </Badge>
                      <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                        <Heart className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">{chapterContent[endingVideoLangGreen].endingVideoGreen.heartbeatLabel}</span>
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-serif-chinese text-center text-emerald-800 dark:text-emerald-200 mb-6">
                      {chapterContent[endingVideoLangGreen].endingVideoGreen.title}
                    </h3>
                    <div className="relative rounded-xl overflow-hidden bg-black/20 ring-2 ring-emerald-300/30 dark:ring-emerald-600/30 aspect-video max-h-[60vh] min-h-[200px]">
                      <video
                        className="w-full h-full object-contain"
                        src="/chapter3_ending2.mp4"
                        controls
                        playsInline
                        preload="auto"
                        disablePictureInPicture
                        disableRemotePlayback
                        aria-label={chapterContent[endingVideoLangGreen].endingVideoGreen.title}
                        {...({ "webkit-playsinline": "true", "x5-playsinline": "true" } as React.VideoHTMLAttributes<HTMLVideoElement>)}
                      >
                        <track kind="captions" />
                        您的瀏覽器不支援影片播放。
                      </video>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="ending-red"
                initial={{ opacity: 0, y: 28 }}
                animate={{
                  opacity: endingVideoRevealed ? 1 : 0,
                  y: endingVideoRevealed ? 0 : 28,
                }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                className="w-full"
              >
                <div className="relative rounded-2xl overflow-hidden border-2 border-red-400/60 dark:border-red-500/50 bg-gradient-to-b from-red-50/80 to-pink-50/80 dark:from-red-950/40 dark:to-pink-950/30 shadow-2xl shadow-red-500/15 dark:shadow-red-500/10">
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-red-200/20 via-transparent to-pink-200/20 rounded-2xl" />
                  <div className="relative z-10 p-6 sm:p-8">
                    <div className="absolute top-4 right-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2 rounded-full border border-[#ffebeb] bg-[#fffafa]/90 hover:bg-[#ffebeb]/50 text-red-600 hover:text-red-700 dark:border-red-200/60 dark:bg-red-950/20 dark:text-red-400 dark:hover:text-red-300"
                        onClick={() => setEndingVideoLang((prev) => (prev === "zh" ? "en" : "zh"))}
                        aria-label={endingVideoLang === "zh" ? "Switch to English" : "切換至中文"}
                      >
                        <Languages className="w-4 h-4" />
                        <span className="text-xs font-medium">{endingVideoLang === "zh" ? "EN" : "中文"}</span>
                      </Button>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
                      <Badge className="bg-red-500/90 text-white border-red-400/50 shadow-md px-3 py-1 text-sm font-serif-chinese">
                        {chapterContent[endingVideoLang].endingVideo.badge}
                      </Badge>
                      <span className="flex items-center gap-1.5 text-red-600 dark:text-red-400">
                        <Heart className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">{chapterContent[endingVideoLang].endingVideo.heartbeatLabel}</span>
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-serif-chinese text-center text-red-800 dark:text-red-200 mb-6">
                      {chapterContent[endingVideoLang].endingVideo.title}
                    </h3>
                    <div className="relative rounded-xl overflow-hidden bg-black/20 ring-2 ring-red-300/30 dark:ring-red-600/30 aspect-video max-h-[60vh] min-h-[200px]">
                      <video
                        className="w-full h-full object-contain"
                        src="/chapter3_ending.mp4"
                        controls
                        playsInline
                        preload="auto"
                        disablePictureInPicture
                        disableRemotePlayback
                        aria-label={chapterContent[endingVideoLang].endingVideo.title}
                        {...({ "webkit-playsinline": "true", "x5-playsinline": "true" } as React.VideoHTMLAttributes<HTMLVideoElement>)}
                      >
                        <track kind="captions" />
                        您的瀏覽器不支援影片播放。
                      </video>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* 象山／結局生詞列表 — 格式同上區塊 */}
          <div className="mb-12">
            <Card className="overflow-hidden border-2 border-border/50 shadow-sm bg-white dark:bg-slate-900">
              <div className="bg-primary/5 p-4 border-b border-border/50 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <List className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg font-serif-chinese">
                    {content.vocabulary.title}
                    <span className="text-sm font-normal text-muted-foreground ml-2">（象山／結局）</span>
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
                      <th className="p-4 font-semibold text-sm text-muted-foreground w-[25%] min-w-[120px] text-center">
                        {content.vocabulary.columns.tbcl}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {SUMMIT_VOCABULARY_LIST.map((word, index) => (
                      <Fragment key={index}>
                        <tr
                          className="border-b-0 hover:bg-slate-50/50 transition-colors group cursor-pointer"
                          onClick={() => toggleSummitVocabExample(index)}
                        >
                          <td className="p-4 border-r border-border/50 whitespace-nowrap w-min">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 rounded-full text-slate-400 hover:text-primary shrink-0"
                              >
                                <ChevronDown
                                  className={`w-4 h-4 transition-transform duration-200 ${summitVocabStates[index] ? "rotate-180" : ""}`}
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
                                  playBarAudio(word.traditional);
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
                        <AnimatePresence>
                          {summitVocabStates[index] && (
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
                                      className="h-6 w-6 rounded-full opacity-70 hover:opacity-100 hover:bg-primary/10 hover:text-primary shrink-0"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        playBarAudio(word.example.zh);
                                      }}
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
                                      <span className="text-slate-600 text-sm mt-1">
                                        {word.example.en}
                                      </span>
                                    </div>
                                  </div>
                                  {word.languageTip && (
                                    <div className="mt-3 p-4 rounded-lg border border-emerald-200/60 bg-emerald-50/50 dark:border-emerald-800/50 dark:bg-emerald-950/30 text-sm relative">
                                      <div className="absolute top-3 right-3">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-7 px-2 rounded-full gap-1.5 text-xs font-medium text-emerald-700 hover:text-emerald-800 hover:bg-emerald-100 dark:text-emerald-400 dark:hover:bg-emerald-900/50 border border-emerald-200/60 dark:border-emerald-700/50"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setSummitTipLangByIndex((prev) => ({ ...prev, [index]: (prev[index] ?? "zh") === "zh" ? "en" : "zh" }));
                                          }}
                                          aria-label={summitTipLangByIndex[index] === "en" ? "切換至中文" : "Switch to English"}
                                        >
                                          <Languages className="w-3.5 h-3.5" />
                                          <span>{summitTipLangByIndex[index] === "en" ? "中文" : "EN"}</span>
                                        </Button>
                                      </div>
                                      <p className={`pr-24 font-serif-chinese whitespace-pre-line leading-relaxed ${summitTipLangByIndex[index] === "en" ? "text-slate-600 dark:text-slate-400 text-sm" : "text-slate-800 dark:text-slate-200"}`}>
                                        {summitTipLangByIndex[index] === "en" ? word.languageTip.en : word.languageTip.zh}
                                      </p>
                                    </div>
                                  )}
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

          {/* 語法點（最下面區塊）— 第二個生詞列表下方 */}
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
            <div className="space-y-6">
              {CHAPTER3_GRAMMAR_POINTS_BOTTOM.map((point) => (
                <GrammarPointCard key={point.id} point={point} playAudio={playBarAudio} />
              ))}
            </div>
          </div>

          {/* Interactive Practice Tabs（複製自 chapter1，之後可在這裡改內容） */}
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
              <TabsContent value="listening" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
                  <Card key={practice.id} className="p-6 border-2 border-border/50">
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
                            const audio = new Audio(practice.audioSrc);
                            audio.play().catch((err) => {
                              console.error("Error playing audio:", err);
                              // fallback: TTS
                              playBarAudio("播放音檔失敗，請稍後再試。");
                            });
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
                                  onClick={() => handleListeningAnswer(practice.id, q.id, idx)}
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
              <TabsContent value="reading" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
                  <Card key={practice.id} className="p-6 border-2 border-border/50">
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
                                  onClick={() => handleReadingAnswer(practice.id, q.id, idx)}
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
              <TabsContent value="speaking" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
                    <SpeakingPracticeItem key={sentence.id} sentence={sentence} />
                  ))}
                </div>
              </TabsContent>

              {/* Grammar Tab */}
              <TabsContent value="grammar" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
                    <Card key={item.id} className="p-6 border-2 border-border/50 hover:border-primary/20 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm shrink-0">
                          {item.id}
                        </div>
                        <div className="space-y-4 w-full">
                          <div>
                            <h4 className="font-bold text-lg text-slate-800">{item.title}</h4>
                            <p className="text-slate-600 mt-1 bg-slate-50 p-3 rounded-lg border border-slate-200">
                              {item.scenario}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`chapter3-grammar-${item.id}`}>你的回答 Your Answer:</Label>
                            <Textarea
                              id={`chapter3-grammar-${item.id}`}
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
                              {showGrammarAnswers[item.id] ? "隱藏參考答案 Hide Answer" : "顯示參考答案 Show Answer"}
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

      {/* 右上角提示：看小雨的想法（依當下心跳顯示文字，含翻譯/關閉） */}
      <AnimatePresence>
        {xiaoyuThoughtToastOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed top-6 right-6 z-[90] w-[min(92vw,460px)]"
            role="status"
            aria-live="polite"
          >
            <div className="relative rounded-2xl border border-primary/20 bg-white/90 dark:bg-slate-950/80 backdrop-blur shadow-2xl p-4">
              <div className="absolute top-2 right-2 flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-primary hover:text-primary hover:bg-primary/10 dark:text-slate-100 dark:hover:bg-slate-800/60"
                  onClick={() => setXiaoyuThoughtToastShowEn((prev) => !prev)}
                  aria-label={xiaoyuThoughtToastShowEn ? "切換回中文" : "翻譯"}
                >
                  <Languages className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800/60"
                  onClick={() => setXiaoyuThoughtToastOpen(false)}
                  aria-label="關閉"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <p className="font-bold font-serif-chinese text-slate-800 dark:text-slate-100 pr-16">
                {xiaoyuThoughtToastShowEn ? "What Xiaoyu thinks" : "小雨的想法"}
              </p>

              <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200 pr-2">
                {xiaoyuThoughtToastShowEn ? (
                  xiaoyuThoughtToastAffinity === "green"
                    ? "Because Randy didn’t pay for Xiaoyu and the conversation was too boring, Xiaoyu doesn’t want to be with Randy."
                    : "Because Randy paid for Xiaoyu and the conversation was interesting, Xiaoyu wants to be with Randy."
                ) : xiaoyuThoughtToastAffinity === "green" ? (
                  "因為沒幫小雨付錢，而且說話太無聊，所以小雨不想跟瑞迪在一起"
                ) : (
                  "因為有幫小雨付錢，而且說話很有意思，所以小雨想跟瑞迪在一起"
                )}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
              affinity === "green"
                ? "bg-jade/90 border-jade text-white shadow-jade/20"
                : "bg-red-500/90 border-red-500 text-white shadow-red-500/20"
            }`}
          >
            {affinity === "green" ? (
              <div>
                <Heart className="w-6 h-6 fill-current" />
              </div>
            ) : (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart className="w-6 h-6 fill-current" />
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
