import React, { useState, useEffect, useRef, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronDown,
  Languages,
  BookOpen,
  Heart,
  ArrowDown,
  Type,
  Volume2,
  RotateCcw,
  List,
  Mic,
  MicOff,
  Headphones,
  BookOpenText,
  PenTool,
  Play,
  CheckCircle2,
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
import diningChatBackground from "@/assets/generated_images/chapter2_dining_chat_bg.png";
import movieChatBackground from "@/assets/generated_images/chapter2_movie_chat_bg.png";

const chapterContent = {
  zh: {
    title: "第二章",
    subtitle: "第一次約會｜First Date",
    description: "兩個人一起吃飯或是看電影",
    backToHome: "返回首頁",
    chat: {
      title: "第二次聊天",
      subtitle: "有些回答，會影響小雨的想法",
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
    vocabulary: {
      title: "生詞列表",
      subtitle: "手機觀看往右滑動可以看到完整資訊",
      columns: {
        word: "生詞",
        pinyin: "拼音",
        english: "英文翻譯",
        partOfSpeech: "詞性",
        tbcl: "TBCL",
      },
    },
    grammar: {
      title: "語法點",
      subtitle: "重點語法解析",
    },
  },
  en: {
    title: "Chapter 2",
    subtitle: "First Date",
    description: "Two people eating together or watching a movie",
    backToHome: "Back to Home",
    chat: {
      title: "Second Chat",
      subtitle: "Some answers may influence what Xiaoyu thinks",
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
    vocabulary: {
      title: "Vocabulary List",
      subtitle: "Key words for this chapter",
      columns: {
        word: "Word",
        pinyin: "Pinyin",
        english: "Meaning",
        partOfSpeech: "Part of Speech",
        tbcl: "TBCL",
      },
    },
    grammar: {
      title: "Grammar Points",
      subtitle: "Key Grammar Explanations",
    },
  },
};

type DiningMessage = {
  id: number;
  sender: "randy" | "xiaoyu" | "narrator";
  text: string;
  en: string;
  pinyin: string;
};

const DINING_MESSAGES: DiningMessage[] = [
  {
    id: 1,
    sender: "xiaoyu",
    text: "吃飽了嗎？",
    en: "Are you full?",
    pinyin: "Chī bǎo le ma?",
  },
  {
    id: 2,
    sender: "randy",
    text: "已經吃飽了，真的太好吃了！我沒想到台灣菜這麼好吃。",
    en: "I'm already full, it's really delicious! I didn't expect Taiwanese food to be so good.",
    pinyin: "Yǐjīng chī bǎo le, zhēn de tài hǎo chī le! Wǒ méi xiǎngdào Táiwān cài zhème hǎo chī.",
  },
  {
    id: 3,
    sender: "xiaoyu",
    text: "太好了！台灣還有很多不一樣的菜，以後一起去吃吃看。",
    en: "Great! Taiwan has many different dishes, let's go try them together in the future.",
    pinyin: "Tài hǎo le! Táiwān hái yǒu hěn duō bù yīyàng de cài, yǐhòu yīqǐ qù chī chī kàn.",
  },
  {
    id: 4,
    sender: "randy",
    text: "好啊，如果你有時間，下次我們一定要去。",
    en: "Sure, if you have time, we must go next time.",
    pinyin: "Hǎo a, rúguǒ nǐ yǒu shíjiān, xiàcì wǒmen yīdìng yào qù.",
  },
  {
    id: 5,
    sender: "xiaoyu",
    text: "今天我請你吃晚餐，不要客氣。",
    en: "Today I'm treating you to the dinner, don't be polite.",
    pinyin: "Jīntiān wǒ qǐng nǐ wǎncān, bùyào kèqì.",
  },
];

type DiningChoice = {
  id: number;
  text: string;
  en: string;
  pinyin: string;
  response: string;
  responseEn: string;
  responsePinyin: string;
  affinityChange: "green" | "red";
};

const DINING_CHOICES: DiningChoice[] = [
  {
    id: 1,
    text: "不用，把帳單給我。",
    en: "No need, give me the bill.",
    pinyin: "Bùyòng, bǎ zhàngdān gěi wǒ.",
    response: "哇，真的嗎？好，謝謝你，你人很好。",
    responseEn: "Wow, really? OK, thank you, you're very nice.",
    responsePinyin: "Wa, zhēn de ma? Hǎo, xièxiè nǐ, nǐ rén hěn hǎo.",
    affinityChange: "red",
  },
  {
    id: 2,
    text: "好啊，謝謝小雨。",
    en: "OK, thank you Xiaoyu.",
    pinyin: "Hǎo a, xièxiè Xiǎoyǔ.",
    response: "不客氣。",
    responseEn: "You're welcome.",
    responsePinyin: "Bù kèqì.",
    affinityChange: "green",
  },
];

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

const DINING_VOCABULARY_LIST: VocabWord[] = [
  {
    traditional: "真的",
    simplified: "真的",
    pinyin: "zhēn de",
    english: "really / truly",
    partOfSpeech: "Vs",
    tbcl: "1*",
    example: {
      zh: "這真的很好吃。",
      pinyin: "Zhè zhēn de hěn hǎochī.",
      en: "This is really delicious.",
    },
  },
  {
    traditional: "菜",
    simplified: "菜",
    pinyin: "cài",
    english: "dish / vegetable",
    partOfSpeech: "N",
    tbcl: "1*",
    example: {
      zh: "台灣菜很好吃。",
      pinyin: "Táiwān cài hěn hǎochī.",
      en: "Taiwanese food is very delicious.",
    },
  },
  {
    traditional: "老闆",
    simplified: "老板",
    pinyin: "lǎobǎn",
    english: "boss / owner",
    partOfSpeech: "N",
    tbcl: "2",
    example: {
      zh: "老闆，結帳。",
      pinyin: "Lǎobǎn, jiézhàng.",
      en: "Boss, check please.",
    },
  },
  {
    traditional: "客氣",
    simplified: "客气",
    pinyin: "kèqì",
    english: "polite / courteous",
    partOfSpeech: "Vs",
    tbcl: "2*",
    example: {
      zh: "不客氣。",
      pinyin: "Bù kèqì.",
      en: "You're welcome.",
    },
  },
  {
    traditional: "一定",
    simplified: "一定",
    pinyin: "yīdìng",
    english: "definitely / certainly",
    partOfSpeech: "Adv",
    tbcl: "1*",
    example: {
      zh: "下次我們一定要去。",
      pinyin: "Xià cì wǒmen yīdìng yào qù.",
      en: "Next time we must definitely go.",
    },
  },
  {
    traditional: "還",
    simplified: "还",
    pinyin: "hái",
    english: "still / also",
    partOfSpeech: "Adv",
    tbcl: "1*",
    example: {
      zh: "台灣還有很多不一樣的菜。",
      pinyin: "Táiwān hái yǒu hěnduō bù yīyàng de cài.",
      en: "Taiwan also has many different dishes.",
    },
  },
  {
    traditional: "以後",
    simplified: "以后",
    pinyin: "yǐhòu",
    english: "in the future / later",
    partOfSpeech: "N",
    tbcl: "1*",
    example: {
      zh: "以後一起去吃吃看。",
      pinyin: "Yǐhòu yīqǐ qù chī chī kàn.",
      en: "Let's go try it together in the future.",
    },
  },
  {
    traditional: "一樣",
    simplified: "一样",
    pinyin: "yīyàng",
    english: "same / alike",
    partOfSpeech: "Vs",
    tbcl: "1*",
    example: {
      zh: "還有很多不一樣的菜。",
      pinyin: "Hái yǒu hěnduō bù yīyàng de cài.",
      en: "There are also many different dishes.",
    },
  },
  {
    traditional: "已經",
    simplified: "已经",
    pinyin: "yǐjīng",
    english: "already",
    partOfSpeech: "Adv",
    tbcl: "2",
    example: {
      zh: "已經吃飽了。",
      pinyin: "Yǐjīng chī bǎo le.",
      en: "I'm already full.",
    },
  },
  {
    traditional: "這麼",
    simplified: "这么",
    pinyin: "zhème",
    english: "so / this",
    partOfSpeech: "Adv",
    tbcl: "2",
    example: {
      zh: "我沒想到台灣菜這麼好吃。",
      pinyin: "Wǒ méi xiǎngdào Táiwān cài zhème hǎochī.",
      en: "I didn't expect Taiwanese food to be so delicious.",
    },
  },
  {
    traditional: "次",
    simplified: "次",
    pinyin: "cì",
    english: "time / instance",
    partOfSpeech: "M",
    tbcl: "2*",
    example: {
      zh: "下次我們一定要去。",
      pinyin: "Xià cì wǒmen yīdìng yào qù.",
      en: "Next time we must definitely go.",
    },
  },
  {
    traditional: "帳單",
    simplified: "账单",
    pinyin: "zhàngdān",
    english: "bill / check",
    partOfSpeech: "N",
    tbcl: "4*",
    example: {
      zh: "把帳單給我。",
      pinyin: "Bǎ zhàngdān gěi wǒ.",
      en: "Give me the bill.",
    },
  },
  {
    traditional: "結帳",
    simplified: "结账",
    pinyin: "jiézhàng",
    english: "to pay the bill / to check out",
    partOfSpeech: "V-sep",
    tbcl: "6",
    example: {
      zh: "老闆，結帳。",
      pinyin: "Lǎobǎn, jiézhàng.",
      en: "Boss, check please.",
    },
  },
  {
    traditional: "晚餐",
    simplified: "晚餐",
    pinyin: "wǎncān",
    english: "dinner / evening meal",
    partOfSpeech: "N",
    tbcl: "1*",
    example: {
      zh: "我們一起去吃晚餐。",
      pinyin: "Wǒmen yīqǐ qù chī wǎncān.",
      en: "Let's go have dinner together.",
    },
  },
  {
    traditional: "付",
    simplified: "付",
    pinyin: "fù",
    english: "to pay",
    partOfSpeech: "V",
    tbcl: "2*",
    example: {
      zh: "我來付錢。",
      pinyin: "Wǒ lái fùqián.",
      en: "I'll pay.",
    },
  },
];

type DiningChatState = {
  messages: DiningMessage[];
  completed: boolean;
  selectedChoiceId: number | null;
};

type MovieMessage = {
  id: number;
  sender: "randy" | "xiaoyu" | "narrator";
  text: string;
  en: string;
  pinyin: string;
};

const MOVIE_MESSAGES: MovieMessage[] = [
  {
    id: 1,
    sender: "xiaoyu",
    text: "你想看浪漫電影還是動作電影？",
    en: "Do you want to watch a romantic movie or an action movie?",
    pinyin: "Nǐ xiǎng kàn làngmàn diànyǐng háishì dòngzuò diànyǐng?",
  },
  {
    id: 2,
    sender: "randy",
    text: "我們看浪漫的電影！",
    en: "Let's watch a romantic movie!",
    pinyin: "Wǒmen kàn làngmàn de diànyǐng!",
  },
  {
    id: 3,
    sender: "xiaoyu",
    text: "我剛剛想說你應該不喜歡這一種電影。",
    en: "I just wanted to say that you probably don’t like this kind of movie.",
    pinyin: "Wǒ gānggāng xiǎng shuō nǐ yīnggāi bù xǐhuān zhè yì zhǒng diànyǐng.",
  },
  {
    id: 4,
    sender: "randy",
    text: "浪漫電影和動作電影我都喜歡，但我覺得你想看浪漫的。",
    en: "I like both romantic movies and action movies, but I think you want to watch a romantic one.",
    pinyin: "Làngmàn diànyǐng hé dòngzuò diànyǐng wǒ dōu xǐhuān, dàn wǒ juéde nǐ xiǎng kàn làngmàn de.",
  },
  {
    id: 5,
    sender: "xiaoyu",
    text: "你很懂我的想法，哈哈。",
    en: "You really understand what I'm thinking, haha.",
    pinyin: "Nǐ hěn dǒng wǒ de xiǎngfǎ, hāhā.",
  },
  {
    id: 6,
    sender: "randy",
    text: "那我們去買票吧！",
    en: "Then let's go buy tickets!",
    pinyin: "Nà wǒmen qù mǎi piào ba!",
  },
  {
    id: 7,
    sender: "xiaoyu",
    text: "今天我請客。",
    en: "Today I'm treating.",
    pinyin: "Jīntiān wǒ qǐngkè.",
  },
];

type MovieChoice = {
  id: number;
  text: string;
  en: string;
  pinyin: string;
  response: string;
  responseEn: string;
  responsePinyin: string;
  affinityChange: "green" | "red";
};

const MOVIE_CHOICES: MovieChoice[] = [
  {
    id: 1,
    text: "不用，我來付錢。",
    en: "No need, I'll pay.",
    pinyin: "Bùyòng, wǒ lái fùqián.",
    response: "哇，真的嗎？謝謝你，太好了。",
    responseEn: "Wow, really? Thank you, that's great.",
    responsePinyin: "Wa, zhēn de ma? Xièxiè nǐ, tài hǎo le.",
    affinityChange: "red",
  },
  {
    id: 2,
    text: "好啊，謝謝小雨。",
    en: "OK, thank you Xiaoyu.",
    pinyin: "Hǎo a, xièxiè Xiǎoyǔ.",
    response: "不客氣。",
    responseEn: "You're welcome.",
    responsePinyin: "Bù kèqì.",
    affinityChange: "green",
  },
];

const MOVIE_VOCABULARY_LIST: VocabWord[] = [
  {
    traditional: "浪漫",
    simplified: "浪漫",
    pinyin: "làngmàn",
    english: "romantic",
    partOfSpeech: "Vs",
    tbcl: "4*",
    example: {
      zh: "你想看浪漫電影還是動作電影？",
      pinyin: "Nǐ xiǎng kàn làngmàn diànyǐng háishì dòngzuò diànyǐng?",
      en: "Do you want to watch a romantic movie or an action movie?",
    },
  },
  {
    traditional: "動作",
    simplified: "动作",
    pinyin: "dòngzuò",
    english: "action / movement",
    partOfSpeech: "N",
    tbcl: "4",
    example: {
      zh: "動作電影很好看。",
      pinyin: "Dòngzuò diànyǐng hěn hǎokàn.",
      en: "Action movies are very entertaining.",
    },
  },
  {
    traditional: "應該",
    simplified: "应该",
    pinyin: "yīnggāi",
    english: "should / ought to",
    partOfSpeech: "Vaux",
    tbcl: "1*",
    example: {
      zh: "我應該去看電影。",
      pinyin: "Wǒ yīnggāi qù kàn diànyǐng.",
      en: "I should go watch a movie.",
    },
  },
  {
    traditional: "種",
    simplified: "种",
    pinyin: "zhǒng",
    english: "kind / type (measure word)",
    partOfSpeech: "M",
    tbcl: "2",
    example: {
      zh: "浪漫電影和動作電影我都喜歡。",
      pinyin: "Làngmàn diànyǐng hé dòngzuò diànyǐng wǒ dōu xǐhuān.",
      en: "I like both romantic movies and action movies.",
    },
  },
  {
    traditional: "懂",
    simplified: "懂",
    pinyin: "dǒng",
    english: "to understand / to know",
    partOfSpeech: "Vst",
    tbcl: "1*",
    example: {
      zh: "你很懂我的想法。",
      pinyin: "Nǐ hěn dǒng wǒ de xiǎngfǎ.",
      en: "You really understand what I'm thinking.",
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
      zh: "我覺得你想看浪漫的。",
      pinyin: "Wǒ juédé nǐ xiǎng kàn làngmàn de.",
      en: "I think you want to watch a romantic one.",
    },
  },
  {
    traditional: "但",
    simplified: "但",
    pinyin: "dàn",
    english: "but / however",
    partOfSpeech: "Conj",
    tbcl: "2",
    example: {
      zh: "浪漫電影和動作電影我都喜歡，但我覺得你想看浪漫的。",
      pinyin: "Làngmàn diànyǐng hé dòngzuò diànyǐng wǒ dōu xǐhuān, dàn wǒ juédé nǐ xiǎng kàn làngmàn de.",
      en: "I like both romantic movies and action movies, but I think you want to watch a romantic one.",
    },
  },
  {
    traditional: "想法",
    simplified: "想法",
    pinyin: "xiǎngfǎ",
    english: "thought / idea",
    partOfSpeech: "N",
    tbcl: "2",
    example: {
      zh: "你很懂我的想法。",
      pinyin: "Nǐ hěn dǒng wǒ de xiǎngfǎ.",
      en: "You really understand what I'm thinking.",
    },
  },
  {
    traditional: "票",
    simplified: "票",
    pinyin: "piào",
    english: "ticket",
    partOfSpeech: "N",
    tbcl: "2",
    example: {
      zh: "那我們去買票吧！",
      pinyin: "Nà wǒmen qù mǎi piào ba!",
      en: "Then let's go buy tickets!",
    },
  },
  {
    traditional: "請客",
    simplified: "请客",
    pinyin: "qǐngkè",
    english: "to treat / to pay for someone",
    partOfSpeech: "V-sep",
    tbcl: "5",
    example: {
      zh: "今天我請客。",
      pinyin: "Jīntiān wǒ qǐngkè.",
      en: "Today I'm treating.",
    },
  },
];

// Practice Data（複製自 chapter1，之後你可在這裡改內容）
const LISTENING_PRACTICE = [
  {
    id: 1,
    title: "聽力練習 1",
    audioSrc: "/c2l1.mp3",
    questions: [
      { id: 1, question: "這個人說些什麼？", options: ["介紹一家新的餐廳", "教大家怎麼自己做菜", "覺得餐廳太多人", "比較不同城市的餐廳"], answer: 0 },
      { id: 2, question: "他們在餐廳裡可能要做什麼？", options: ["點浪漫的晚餐或簡單的晚餐", "跟老闆一起做菜", "看電影和聊天", "幫朋友找餐廳"], answer: 0 },
      { id: 3, question: "從這些話可以知道，說話的人對這家餐廳的感覺是？", options: ["不太開心", "沒什麼特別的感覺", "很喜歡，也願意推薦", "覺得價錢太貴"], answer: 2 },
    ],
  },
  {
    id: 2,
    title: "聽力練習 2",
    audioSrc: "/c2l2.mp3",
    questions: [
      { id: 1, question: "這個人說些什麼？", options: ["說話的人不想跟朋友出去", "說話的人和朋友明天要去爬山", "說話的人在抱怨天氣太熱", "說話的人已經去過山頂了"], answer: 1 },
      { id: 2, question: "為什麼說話的人願意去爬山？", options: ["因為朋友請他吃飯", "因為天氣不熱", "因為覺得這樣的體驗很特別", "因為山頂很近"], answer: 2 },
      { id: 3, question: "如果覺得太累，他們可能會怎麼做？", options: ["回家", "下個月再去爬山", "在山頂休息一下", "請別人幫忙"], answer: 2 },
    ],
  },
];

const READING_PRACTICE = [
  {
    id: 1,
    title: "閱讀測驗 1",
    content:
      "昨天，我跟朋友已經約好一起去看一部電影。他的動作很快，把票先買好給我。我覺得他的想法不錯，因為想看這部電影的人很多。不過電影院真的太多人，我有一點緊張。他說如果覺得緊張，就在外面休息一下再進去。我也懂他的意思，因為這樣的安排很輕鬆。",
    questions: [
      { id: 1, question: "這個人想說什麼？", options: ["一個人去看電影", "這個人跟朋友一起去看電影", "這個人不喜歡看電影", "這個人在電影院工作"], answer: 1 },
      { id: 2, question: "為什麼這個人覺得朋友的想法不錯？", options: ["因為電影很短", "因為電影院很安靜", "因為想看這部電影的人很多", "因為票很便宜"], answer: 2 },
      { id: 3, question: "如果這個人覺得緊張，他們可能會怎麼做？", options: ["回家", "不看電影", "在外面休息一下", "請別人幫忙買票"], answer: 2 },
    ],
  },
  {
    id: 2,
    title: "閱讀測驗 2",
    content:
      "下午，有幾個學生在教室上課。天氣太熱了，大家有一點不認真。老師把書和紙放在桌上，請學生一起看。上課的時候，有人覺得有點累，就不小心睡著了。下課前，大家把東西收進包包，要離開教室。雖然上課有一點累，但學生都很開心。",
    questions: [
      { id: 1, question: "這段短文主要在說什麼？", options: ["學生在家裡學習", "學生下午在教室上課", "老師在準備考試", "學生放學後去玩"], answer: 1 },
      { id: 2, question: "為什麼學生上課時不太認真？", options: ["因為老師不在", "因為功課太難", "因為天氣太熱", "因為下課了"], answer: 2 },
      { id: 3, question: "下課前，學生做了什麼？", options: ["在教室睡覺", "把書和紙放在桌上", "把東西收進包包", "跟老師聊天"], answer: 2 },
    ],
  },
];

const SPEAKING_SENTENCES = [
  { id: 1, text: "你想看浪漫電影還是動作電影？", pinyin: "Nǐ xiǎng kàn làngmàn diànyǐng háishì dòngzuò diànyǐng?" },
  { id: 2, text: "浪漫電影和動作電影我都喜歡。", pinyin: "Làngmàn diànyǐng hé dòngzuò diànyǐng wǒ dōu xǐhuān." },
  { id: 3, text: "我覺得你想看浪漫的。", pinyin: "Wǒ juéde nǐ xiǎng kàn làngmàn de." },
  { id: 4, text: "那我們去買票吧！", pinyin: "Nà wǒmen qù mǎi piào ba!" },
  { id: 5, text: "不用，把帳單給我。", pinyin: "Bùyòng, bǎ zhàngdān gěi wǒ." },
  { id: 6, text: "哇，真的嗎？好，謝謝你，你人很好。", pinyin: "Wa, zhēn de ma? Hǎo, xièxiè nǐ, nǐ rén hěn hǎo." },
];

const GRAMMAR_PRACTICE = [
  {
    id: 1,
    title: "練習 1｜VV 看",
    scenario: "你想請朋友試試看一杯新的奶茶，你會怎麼說？",
    answer: "這杯奶茶，你喝喝看。",
  },
  {
    id: 2,
    title: "練習 2｜如果…",
    scenario: "請..錢..用造一個句子",
    answer: "如果我有錢，我想去日本",
  },
  {
    id: 3,
    title: "練習 3｜太…了",
    scenario: "你覺得今天很熱，你會怎麼說？",
    answer: "今天天氣太熱了。",
  },
  {
    id: 4,
    title: "練習 4｜把",
    scenario: "你想叫小明給你籃球，你怎麼說？",
    answer: "把籃球給我。",
  },
  {
    id: 5,
    title: "練習 5｜還是",
    scenario: "你到便利商店買咖啡，店員想知道你喝多大杯的咖啡，你覺得他會怎麼說",
    answer: "大杯還是中杯？",
  },
  {
    id: 6,
    title: "練習 6｜都",
    scenario: "你想說你喜歡蘋果和香蕉，你會怎麼說？",
    answer: "蘋果和香蕉，我都喜歡。",
  },
];

type MovieChatState = {
  messages: MovieMessage[];
  completed: boolean;
  selectedChoiceId: number | null;
};

type MessageState = {
  [key: number]: {
    showEn: boolean;
    showPinyin: boolean;
  };
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

const CHAPTER2_GRAMMAR_POINTS: GrammarPoint[] = [
  {
    id: 1,
    title: "VV 看",
    function: {
      zh: "表示嘗試做某個動作，帶有試試看的意思。",
      en: "Indicates trying to do an action, with the meaning of 'give it a try'.",
    },
    structure: {
      zh: "單音節動詞 + 單音節動詞 + 看",
      en: "Monosyllabic Verb + Monosyllabic Verb + 看 (kàn)",
    },
    explanation: {
      zh: "重複單音節動詞後加上「看」，表示「試試看」的意思。因為用了「看」，整個句子帶有嘗試性的語氣。",
      en: "Reduplicating a monosyllabic verb and adding '看' indicates 'try and see'. The use of '看' gives the sentence a tentative tone.",
    },
    examples: [
      {
        zh: "這道菜看起來不錯，你嚐嚐看。",
        pinyin: "Zhè dào cài kàn qǐlái bùcuò, nǐ cháng cháng kàn.",
        en: "This dish looks good, try tasting it.",
      },
      {
        zh: "這件衣服很漂亮，你要不要試試看？",
        pinyin: "Zhè jiàn yīfú hěn piàoliang, nǐ yào bù yào shì shì kàn?",
        en: "This piece of clothing is very beautiful, do you want to try it on?",
      },
      {
        zh: "這杯奶茶，我想喝喝看。",
        pinyin: "Zhè bēi nǎichá, wǒ xiǎng hē hē kàn.",
        en: "This cup of milk tea, I want to try drinking it.",
      },
    ],
  },
  {
    id: 2,
    title: "如果...",
    function: {
      zh: "表示條件關係，用來提出假設的情況。",
      en: "Indicates a conditional relationship, used to introduce a hypothetical situation.",
    },
    structure: {
      zh: "如果 + 條件句，結果句",
      en: "如果 (rúguǒ) + Condition, Result",
    },
    explanation: {
      zh: "「如果」用來提出條件或假設，後面接結果。結果句前可以加上「就」，但也可以省略。",
      en: "'如果' introduces a condition or hypothesis, followed by a result. The result clause can optionally include '就' before it, but it can also be omitted.",
    },
    examples: [
      {
        zh: "如果下雨，我們不去公園。",
        pinyin: "Rúguǒ xià yǔ, wǒmen bù qù gōngyuán.",
        en: "If it rains, we won't go to the park.",
      },
      {
        zh: "如果你有空，我們可以一起去看電影。",
        pinyin: "Rúguǒ nǐ yǒu kòng, wǒmen kěyǐ yīqǐ qù kàn diànyǐng.",
        en: "If you're free, we can go watch a movie together.",
      },
      {
        zh: "如果這家餐廳好吃，我們下次再來。",
        pinyin: "Rúguǒ zhè jiā cāntīng hǎochī, wǒmen xià cì zài lái.",
        en: "If this restaurant is good, we'll come again next time.",
      },
    ],
  },
  {
    id: 3,
    title: "太...了",
    function: {
      zh: "表示程度過度，帶有負面評價的語氣。",
      en: "Indicates excessive degree, with a tone of negative evaluation.",
    },
    structure: {
      zh: "太 + 形容詞/動詞 + 了",
      en: "太 (tài) + Adjective/Verb + 了 (le)",
    },
    explanation: {
      zh: "「太...了」表示「太...」或「過於...」，是說話者給出的負面觀察。可以只用「太 + 形容詞」，但加上「了」會更主觀，表示說話者覺得過度。",
      en: "'太...了' indicates 'too' or 'overly', expressing a negative observation by the speaker. '太 + adjective' can be used alone, but adding '了' makes it more subjective, indicating the speaker feels it's excessive.",
    },
    examples: [
      {
        zh: "這家餐廳的菜太好吃了。",
        pinyin: "Zhè jiā cāntīng de cài tài hǎochī le.",
        en: "The food at this restaurant is too delicious.",
      },
      {
        zh: "今天天氣太熱了。",
        pinyin: "Jīntiān tiānqì tài rè le.",
        en: "The weather today is too hot.",
      },
      {
        zh: "這件衣服太小了，我穿不下。",
        pinyin: "Zhè jiàn yīfú tài xiǎo le, wǒ chuān bù xià.",
        en: "This piece of clothing is too small, I can't wear it.",
      },
    ],
  },
  {
    id: 4,
    title: "把",
    function: {
      zh: "表示將物體移動或放置到某個位置，說明主語對賓語進行了位置上的改變。",
      en: "Indicates moving or placing an object to a specific location, expressing that the subject changes the position of the object.",
    },
    structure: {
      zh: "把 + 賓語 + 動詞 + 位置/結果",
      en: "把 (bǎ) + Object + Verb + Location/Result",
    },
    explanation: {
      zh: "「把字句」最典型的用法是將物體移動到某個位置。賓語必須是確定的（如「這個」、「那個」、「我的」等），動詞通常是表示移動或放置的動詞（如「放」、「拿」、「搬」、「帶」等），後面接位置詞或結果補語。這種結構強調物體位置的改變。",
      en: "The most typical use of the '把' construction is to move an object to a specific location. The object must be definite (such as 'this', 'that', 'my', etc.), the verb is usually a verb indicating movement or placement (such as 'put', 'take', 'move', 'bring', etc.), followed by a location word or resultative complement. This structure emphasizes the change in the object's position.",
    },
    examples: [
      {
        zh: "我把帳單放在桌子上了。",
        pinyin: "Wǒ bǎ zhàngdān fàng zài zhuōzi shàng le.",
        en: "I put the bill on the table.",
      },
      {
        zh: "他把那杯奶茶拿到我面前。",
        pinyin: "Tā bǎ nà bēi nǎichá ná dào wǒ miànqián.",
        en: "He brought that cup of milk tea to me.",
      },
      {
        zh: "我們把椅子搬到餐廳外面。",
        pinyin: "Wǒmen bǎ yǐzi bān dào cāntīng wàimiàn.",
        en: "We moved the chairs outside the restaurant.",
      },
    ],
  },
  {
    id: 5,
    title: "還是",
    function: {
      zh: "用於疑問句中表達選擇關係，詢問對方在兩個或多個選項中的偏好或事實。",
      en: "Used in interrogative sentences to express alternative choices, asking about preferences or facts among two or more options.",
    },
    structure: {
      zh: "選項A + 還是 + 選項B？",
      en: "Option A + 還是 (háishì) + Option B?",
    },
    explanation: {
      zh: "「還是」主要用於疑問句，連接兩個或多個選項，讓對方選擇。選項A和選項B必須是相同類型的詞語（都是名詞、都是動詞短語、或都是形容詞）。與「或者」不同，「還是」用於疑問句，而「或者」用於陳述句。",
      en: "'還是' is primarily used in interrogative sentences to connect two or more options for the listener to choose from. Option A and Option B must be the same type of word (both nouns, both verb phrases, or both adjectives). Unlike '或者', '還是' is used in questions, while '或者' is used in declarative sentences.",
    },
    examples: [
      {
        zh: "你想看浪漫電影還是動作電影？",
        pinyin: "Nǐ xiǎng kàn làngmàn diànyǐng háishì dòngzuò diànyǐng?",
        en: "Do you want to watch a romantic movie or an action movie?",
      },
      {
        zh: "你要喝茶還是咖啡？",
        pinyin: "Nǐ yào hē chá háishì kāfēi?",
        en: "Do you want to drink tea or coffee?",
      },
      {
        zh: "我們今天去餐廳還是明天去？",
        pinyin: "Wǒmen jīntiān qù cāntīng háishì míngtiān qù?",
        en: "Should we go to the restaurant today or tomorrow?",
      },
    ],
  },
  {
    id: 6,
    title: "都",
    function: {
      zh: "表示全部、總括的意思，用來強調主語或賓語所指的所有人或事物都具有某種共同特徵或行為。",
      en: "Indicates totality or inclusiveness, used to emphasize that all people or things referred to by the subject or object share a common characteristic or action.",
    },
    structure: {
      zh: "名詞 + 都 + 動詞短語",
      en: "Noun + 都 (dōu) + Verb Phrase",
    },
    explanation: {
      zh: "「都」是副詞，放在它所修飾的名詞後面、主要動詞前面。當主語是複數或包含多個項目時，「都」表示這些項目全部都進行了某個動作或具有某種特質。在否定句中，「都」要放在「不」或「沒」的前面，形成「都 + 不/沒 + 動詞」的結構。",
      en: "'都' is an adverb placed after the noun it modifies and before the main verb. When the subject is plural or contains multiple items, '都' indicates that all of these items perform an action or share a characteristic. In negative sentences, '都' comes before '不' or '沒', forming the structure '都 + 不/沒 + verb'.",
    },
    examples: [
      {
        zh: "浪漫電影和動作電影我都喜歡。",
        pinyin: "Làngmàn diànyǐng hé dòngzuò diànyǐng wǒ dōu xǐhuān.",
        en: "I like both romantic movies and action movies.",
      },
      {
        zh: "我們都是台灣人。",
        pinyin: "Wǒmen dōu shì Táiwān rén.",
        en: "We are all Taiwanese.",
      },
      {
        zh: "這些菜都很好吃。",
        pinyin: "Zhèxiē cài dōu hěn hǎochī.",
        en: "All of these dishes are very delicious.",
      },
    ],
  },
];

function BaPractice({
  dogImage,
  personImage,
}: {
  dogImage: string;
  personImage: string;
}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [bananaMoved, setBananaMoved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bananaRef = useRef<HTMLDivElement>(null);

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

        // Check if the sentence contains "把香蕉給我"
        const targetPhrase = "把香蕉給我";
        if (sessionTranscript.includes(targetPhrase) && !bananaMoved) {
          setBananaMoved(true);
          setIsListening(false);
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
  }, [isListening, bananaMoved]);

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setTranscript("");
      setIsListening(true);
      setError(null);
    }
  };

  const resetPractice = () => {
    setIsListening(false);
    setTranscript("");
    setBananaMoved(false);
    setError(null);
  };

  return (
    <div className="mt-6 pt-6 border-t border-dashed border-border/50">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm text-muted-foreground">請跟著唸：</span>
        <span className="text-sm font-bold font-serif-chinese">
          把香蕉給我
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 relative">
        {/* Left Image: Dog with banana */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-full relative aspect-square bg-slate-50 rounded-xl overflow-hidden border border-border/50">
            <div className="w-full h-full flex items-center justify-center p-4 relative">
              <div className="text-6xl">🐕</div>
              <AnimatePresence>
                {!bananaMoved && (
                  <motion.div
                    key="banana-left"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute text-4xl"
                    style={{ top: "20%", right: "10%" }}
                  >
                    🍌
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="absolute bottom-2 left-0 right-0 text-center">
              <span className="text-xs font-bold px-2 py-1 rounded-full bg-slate-200 text-slate-500">
                小狗
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg font-serif-chinese">小狗</span>
            <span className="text-sm text-muted-foreground">Dog</span>
          </div>
        </div>

        {/* Right Image: Person (Me) */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-full relative aspect-square bg-slate-50 rounded-xl overflow-hidden border border-border/50">
            <div className="w-full h-full flex items-center justify-center p-4 relative">
              <img
                src={personImage}
                alt="Me"
                className="w-full h-full object-contain"
              />
              <AnimatePresence>
                {bananaMoved && (
                  <motion.div
                    key="banana-right"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="absolute text-4xl"
                    style={{ top: "20%", left: "10%" }}
                  >
                    🍌
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="absolute bottom-2 left-0 right-0 text-center">
              <span
                className={`text-xs font-bold px-2 py-1 rounded-full ${
                  bananaMoved ? "bg-jade text-white" : "bg-slate-200 text-slate-500"
                }`}
              >
                我
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg font-serif-chinese">我</span>
            <span className="text-sm text-muted-foreground">Me</span>
          </div>
        </div>

        {/* Flying banana animation */}
        <AnimatePresence>
          {bananaMoved && (
            <motion.div
              key="flying-banana"
              initial={{ 
                position: "absolute",
                left: "12.5%",
                top: "30%",
                opacity: 1,
                scale: 1,
                x: 0,
                y: 0,
              }}
              animate={{ 
                left: "62.5%",
                opacity: [1, 1, 0],
                scale: [1, 0.8, 0.6],
                x: 0,
                y: 0,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="text-4xl pointer-events-none z-10"
              style={{ transform: "translateX(-50%)" }}
            >
              🍌
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center justify-center gap-2">
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

        {bananaMoved && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center p-3 rounded-lg bg-jade/10 border border-jade/20 max-w-md w-full"
          >
            <p className="text-sm font-bold text-jade font-serif-chinese">
              太好了！香蕉已經移動到我這裡了！
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Great! The banana has moved to me!
            </p>
          </motion.div>
        )}

        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    </div>
  );
}

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

        // Simple matching logic
        // Remove punctuation for easier matching
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
            例句 Examples
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

        {/* Ba Practice for '把' (ID 4) */}
        {point.id === 4 && (
          <BaPractice
            dogImage={randyProfile}
            personImage={randyProfile}
          />
        )}
      </div>
    </Card>
  );
}

export default function Chapter2() {
  const [lang, setLang] = useState<Language>("zh");
  const [showDiningTranslation, setShowDiningTranslation] = useState(false);
  const [showMovieTranslation, setShowMovieTranslation] = useState(false);
  
  // Independent translation states for each Chat Interface
  const [diningChatLang, setDiningChatLang] = useState<Language>("zh");
  const [movieChatLang, setMovieChatLang] = useState<Language>("zh");
  
  // Message states for dining chat
  const [diningMessageStates, setDiningMessageStates] = useState<MessageState>({});
  
  // Message states for movie chat
  const [movieMessageStates, setMovieMessageStates] = useState<MessageState>({});
  
  // Vocabulary list states
  const [diningVocabStates, setDiningVocabStates] = useState<{ [key: number]: boolean }>({});
  const [movieVocabStates, setMovieVocabStates] = useState<{ [key: number]: boolean }>({});
  
  const toggleDiningVocabExample = (index: number) => {
    setDiningVocabStates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  
  const toggleMovieVocabExample = (index: number) => {
    setMovieVocabStates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  
  // Dining chat state
  const [diningChatState, setDiningChatState] = useState<DiningChatState>(() => {
    const saved = localStorage.getItem("chapter2_dining_chat_state");
    return saved ? JSON.parse(saved) : { messages: DINING_MESSAGES, completed: false, selectedChoiceId: null };
  });
  
  // Movie chat state
  const [movieChatState, setMovieChatState] = useState<MovieChatState>(() => {
    const saved = localStorage.getItem("chapter2_movie_chat_state");
    return saved ? JSON.parse(saved) : { messages: MOVIE_MESSAGES, completed: false, selectedChoiceId: null };
  });
  
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
  
  const toggleDiningChatLang = () => {
    setDiningChatLang((prev) => (prev === "zh" ? "en" : "zh"));
  };
  
  const toggleMovieChatLang = () => {
    setMovieChatLang((prev) => (prev === "zh" ? "en" : "zh"));
  };
  
  const toggleDiningMessageEn = (id: number) => {
    setDiningMessageStates((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        showEn: !prev[id]?.showEn,
      },
    }));
  };
  
  const toggleDiningMessagePinyin = (id: number) => {
    setDiningMessageStates((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        showPinyin: !prev[id]?.showPinyin,
      },
    }));
  };
  
  const toggleMovieMessageEn = (id: number) => {
    setMovieMessageStates((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        showEn: !prev[id]?.showEn,
      },
    }));
  };
  
  const toggleMovieMessagePinyin = (id: number) => {
    setMovieMessageStates((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        showPinyin: !prev[id]?.showPinyin,
      },
    }));
  };
  
  const handleMovieChoice = (choiceId: number) => {
    const choice = MOVIE_CHOICES.find((c) => c.id === choiceId);
    if (!choice) return;

    // Update affinity state based on choice
    setAffinity(choice.affinityChange);

    const newMessages: MovieMessage[] = [
      ...MOVIE_MESSAGES,
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

    setMovieChatState({
      messages: newMessages,
      completed: true,
      selectedChoiceId: choiceId,
    });
  };
  
  const resetMovieChat = () => {
    setMovieChatState({
      messages: MOVIE_MESSAGES,
      completed: false,
      selectedChoiceId: null,
    });
    setMovieMessageStates({});
  };
  
  const handleDiningChoice = (choiceId: number) => {
    const choice = DINING_CHOICES.find((c) => c.id === choiceId);
    if (!choice) return;

    // Update affinity state based on choice
    setAffinity(choice.affinityChange);

    const newMessages: DiningMessage[] = [
      ...DINING_MESSAGES,
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
      {
        id: Date.now() + 2,
        sender: "narrator",
        text: "瑞迪叫老闆過來，他們要付錢。",
        en: "Randy called the boss over, they were going to pay.",
        pinyin: "Ruìdí jiào lǎobǎn guòlái, tāmen yào fùqián.",
      },
      {
        id: Date.now() + 3,
        sender: "randy",
        text: "老闆，結帳。",
        en: "Boss, check please.",
        pinyin: "Lǎobǎn, jiézhàng.",
      },
    ];

    setDiningChatState({
      messages: newMessages,
      completed: true,
      selectedChoiceId: choiceId,
    });
  };

  const resetDiningChat = () => {
    setDiningChatState({
      messages: DINING_MESSAGES,
      completed: false,
      selectedChoiceId: null,
    });
    setDiningMessageStates({});
  };

  useEffect(() => {
    localStorage.setItem("chapter2_dining_chat_state", JSON.stringify(diningChatState));
  }, [diningChatState]);
  
  useEffect(() => {
    localStorage.setItem("chapter2_movie_chat_state", JSON.stringify(movieChatState));
  }, [movieChatState]);

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
  
  const diningScenarioRef = useRef<HTMLDivElement>(null);
  const movieScenarioRef = useRef<HTMLDivElement>(null);
  const diningChatRef = useRef<HTMLDivElement>(null);
  const movieChatRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);
  
  const scrollToDiningScenario = () => {
    diningScenarioRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  
  const scrollToMovieScenario = () => {
    movieScenarioRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  
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
      
      // Auto-scroll to corresponding scenario block when scenario changes (but not on initial mount)
      if (!isInitialMount.current) {
        if (appScenario === "dining") {
          setTimeout(() => {
            scrollToDiningScenario();
          }, 100);
        } else if (appScenario === "movie") {
          setTimeout(() => {
            scrollToMovieScenario();
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
          <div ref={diningScenarioRef} className="mb-12 relative scroll-mt-20">
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
                    <span className="text-2xl">🍽️</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg font-serif-chinese">
                      {chapterContent[diningChatLang].chat.title} - {diningChatLang === "zh" ? "餐廳情境" : "Restaurant"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {chapterContent[diningChatLang].chat.subtitle}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  onClick={toggleDiningChatLang}
                  className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 border border-transparent min-h-8 rounded-md px-3 text-xs gap-2 text-primary hover:text-primary hover:bg-primary/10"
                >
                  <Languages className="w-4 h-4" />
                </Button>
              </div>

              <div className="overflow-visible p-8 space-y-6 bg-slate-100/50 dark:bg-slate-950/50 relative">
                {diningChatState.messages.map((msg, index) => (
                  <div key={msg.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={msg.sender === "narrator" ? "flex items-start gap-4" : "flex items-start gap-4"}
                    >
                      {msg.sender === "narrator" ? (
                        <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-md border-2 border-slate-300 bg-slate-50">
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
                            🙋🏼
                          </motion.div>
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
                      <div className={msg.sender === "narrator" ? "flex-1" : "flex-1"}>
                        {msg.sender !== "narrator" && (
                          <div className="mb-1">
                            <span className="text-xs text-muted-foreground font-medium">
                              {msg.sender === "randy" ? "瑞迪" : "小雨"}
                            </span>
                          </div>
                        )}
                        <div className={`space-y-2 ${msg.sender === "narrator" ? "" : "mb-2"}`}>
                          {diningMessageStates[msg.id]?.showPinyin && (
                            <p className="text-sm text-primary font-medium border-b border-primary/10 pb-1 font-serif-chinese">
                              {msg.pinyin}
                            </p>
                          )}
                          <p className={`${msg.sender === "narrator" ? "text-sm italic text-slate-600" : "text-base font-medium"} leading-relaxed`}>
                            {msg.text}
                          </p>
                          {diningMessageStates[msg.id]?.showEn && (
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
                              diningMessageStates[msg.id]?.showEn
                                ? "bg-primary/10 text-primary hover:bg-primary/20"
                                : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                            }`}
                            onClick={() => toggleDiningMessageEn(msg.id)}
                          >
                            <Languages className="w-3.5 h-3.5" />
                            <span>翻譯</span>
                          </Button>
                          <div className="w-px h-3 bg-slate-200" />
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`h-7 px-2 rounded-full gap-1 text-xs font-medium transition-colors ${
                              diningMessageStates[msg.id]?.showPinyin
                                ? "bg-primary/10 text-primary hover:bg-primary/20"
                                : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                            }`}
                            onClick={() => toggleDiningMessagePinyin(msg.id)}
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
                                className="h-7 px-2 rounded-full gap-1 text-xs font-medium text-slate-400 hover:text-primary hover:bg-primary/5 transition-colors"
                                onClick={() => playAudio(msg.text, msg.sender === "randy")}
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                                <span>朗讀</span>
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </motion.div>

                    {/* Show choices after message 5 */}
                    {index === 4 && (
                      <div className="ml-16 my-6 space-y-3 bg-slate-50/50 p-4 rounded-xl border border-dashed border-border/60">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium text-muted-foreground">
                            請選擇瑞迪的回答：
                          </p>
                          {diningChatState.completed && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={resetDiningChat}
                              className="h-6 text-xs text-primary hover:text-primary hover:bg-primary/10 px-2"
                            >
                              <RotateCcw className="w-3 h-3 mr-1" />
                              重新選擇
                            </Button>
                          )}
                        </div>
                        {DINING_CHOICES.map((choice) => (
                          <button
                            key={choice.id}
                            onClick={() => handleDiningChoice(choice.id)}
                            className={`w-full p-4 text-left shadow-sm transition-all rounded-xl border-2 ${
                              diningChatState.completed &&
                              diningChatState.messages.find(
                                (m) => m.text === choice.text,
                              )
                                ? "bg-primary/5 border-primary ring-2 ring-primary/20"
                                : "bg-white border-border hover:border-primary/50 hover:shadow-md"
                            }`}
                          >
                            <span className="flex items-center gap-4">
                              <span
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                                  diningChatState.completed &&
                                  diningChatState.messages.find(
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
              </div>
            </Card>
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
                    {DINING_VOCABULARY_LIST.map((word, index) => (
                      <Fragment key={index}>
                        <tr
                          className="border-b-0 hover:bg-slate-50/50 transition-colors group cursor-pointer"
                          onClick={() => toggleDiningVocabExample(index)}
                        >
                          <td className="p-4 border-r border-border/50 whitespace-nowrap w-min">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 rounded-full text-slate-400 hover:text-primary shrink-0"
                              >
                                <ChevronDown
                                  className={`w-4 h-4 transition-transform duration-200 ${diningVocabStates[index] ? "rotate-180" : ""}`}
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
                          {diningVocabStates[index] && (
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

            {CHAPTER2_GRAMMAR_POINTS.filter((point) => point.id === 1 || point.id === 2 || point.id === 3 || point.id === 4 ).map((point) => (
                <Fragment key={point.id}>
                  <GrammarPointCard point={point} playAudio={playAudio} />
                </Fragment>
              ))}
          </div>

          {/* Movie Theater Scenario */}
          <div ref={movieScenarioRef} className="mb-12 relative scroll-mt-20">
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
                className="absolute inset-0 z-0 opacity-100 pointer-events-none bg-cover bg-center"
                style={{ backgroundImage: `url(${movieChatBackground})` }}
              />
              <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-purple-600/10 via-transparent to-purple-800/10" />
              <div className="absolute inset-0 z-0 pointer-events-none bg-white/40 mix-blend-screen" />
              <div className="absolute inset-0 z-0 pointer-events-none bg-purple-300/18 mix-blend-soft-light" />
              <div className="bg-purple-100/50 p-4 border-b border-purple-200 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🍿</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg font-serif-chinese">
                      {chapterContent[movieChatLang].chat.title} - {movieChatLang === "zh" ? "電影院情境" : "Movie Theater"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {chapterContent[movieChatLang].chat.subtitle}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  onClick={toggleMovieChatLang}
                  className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 border border-transparent min-h-8 rounded-md px-3 text-xs gap-2 text-primary hover:text-primary hover:bg-primary/10"
                >
                  <Languages className="w-4 h-4" />
                </Button>
              </div>

              <div className="overflow-visible p-8 space-y-4 bg-slate-100/50 dark:bg-slate-950/50 relative">
                {movieChatState.messages.map((msg, index) => (
                  <div key={msg.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={msg.sender === "narrator" ? "flex items-start gap-4" : "flex items-start gap-4"}
                    >
                      {msg.sender === "narrator" ? (
                        <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-md border-2 border-slate-300 bg-slate-50">
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
                            👋
                          </motion.div>
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
                      <div className={msg.sender === "narrator" ? "flex-1" : "flex-1"}>
                        {msg.sender !== "narrator" && (
                          <div className="mb-1">
                            <span className="text-xs text-muted-foreground font-medium">
                              {msg.sender === "randy" ? "瑞迪" : "小雨"}
                            </span>
                          </div>
                        )}
                        <div className={`space-y-2 ${msg.sender === "narrator" ? "" : "mb-2"}`}>
                          {movieMessageStates[msg.id]?.showPinyin && (
                            <p className="text-sm text-primary font-medium border-b border-primary/10 pb-1 font-serif-chinese">
                              {msg.pinyin}
                            </p>
                          )}
                          <p className={`${msg.sender === "narrator" ? "text-sm italic text-slate-600" : "text-base font-medium"} leading-relaxed`}>
                            {msg.text}
                          </p>
                          {movieMessageStates[msg.id]?.showEn && (
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
                              movieMessageStates[msg.id]?.showEn
                                ? "bg-primary/10 text-primary hover:bg-primary/20"
                                : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                            }`}
                            onClick={() => toggleMovieMessageEn(msg.id)}
                          >
                            <Languages className="w-3.5 h-3.5" />
                            <span>翻譯</span>
                          </Button>
                          <div className="w-px h-3 bg-slate-200" />
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`h-7 px-2 rounded-full gap-1 text-xs font-medium transition-colors ${
                              movieMessageStates[msg.id]?.showPinyin
                                ? "bg-primary/10 text-primary hover:bg-primary/20"
                                : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                            }`}
                            onClick={() => toggleMovieMessagePinyin(msg.id)}
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
                                className="h-7 px-2 rounded-full gap-1 text-xs font-medium text-slate-400 hover:text-primary hover:bg-primary/5 transition-colors"
                                onClick={() => playAudio(msg.text, msg.sender === "randy")}
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                                <span>朗讀</span>
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </motion.div>

                    {/* Show choices after message 7 (index 6) */}
                    {index === 6 && (
                      <div className="ml-16 my-6 space-y-3 bg-slate-50/50 p-4 rounded-xl border border-dashed border-border/60">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium text-muted-foreground">
                            請選擇瑞迪的回答：
                          </p>
                          {movieChatState.completed && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={resetMovieChat}
                              className="h-6 text-xs text-primary hover:text-primary hover:bg-primary/10 px-2"
                            >
                              <RotateCcw className="w-3 h-3 mr-1" />
                              重新選擇
                            </Button>
                          )}
                        </div>
                        {MOVIE_CHOICES.map((choice) => (
                          <button
                            key={choice.id}
                            onClick={() => handleMovieChoice(choice.id)}
                            className={`w-full p-4 text-left shadow-sm transition-all rounded-xl border-2 ${
                              movieChatState.completed &&
                              movieChatState.messages.find(
                                (m) => m.text === choice.text,
                              )
                                ? "bg-primary/5 border-primary ring-2 ring-primary/20"
                                : "bg-white border-border hover:border-primary/50 hover:shadow-md"
                            }`}
                          >
                            <span className="flex items-center gap-4">
                              <span
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                                  movieChatState.completed &&
                                  movieChatState.messages.find(
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
              </div>
            </Card>
          </div>

          {/* Movie Vocabulary List */}
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
                    {MOVIE_VOCABULARY_LIST.map((word, index) => (
                      <Fragment key={index}>
                        <tr
                          className="border-b-0 hover:bg-slate-50/50 transition-colors group cursor-pointer"
                          onClick={() => toggleMovieVocabExample(index)}
                        >
                          <td className="p-4 border-r border-border/50 whitespace-nowrap w-min">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 rounded-full text-slate-400 hover:text-primary shrink-0"
                              >
                                <ChevronDown
                                  className={`w-4 h-4 transition-transform duration-200 ${movieVocabStates[index] ? "rotate-180" : ""}`}
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
                          {movieVocabStates[index] && (
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
                                        playAudio(word.example.zh, true)
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

          {/* Movie Grammar Points Section */}
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
              {CHAPTER2_GRAMMAR_POINTS.filter((point) => point.id === 5 || point.id === 6).map((point) => (
                <Fragment key={point.id}>
                  <GrammarPointCard point={point} playAudio={playAudio} />
                </Fragment>
              ))}
            </div>
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
                            if (practice.id === 1) {
                              const audio = new Audio("/c2l1.mp3");
                              audio.play().catch((err) => {
                                console.error("Error playing audio:", err);
                                playAudio(
                                  "This is a placeholder for audio content. In a real app, this would play the actual listening exercise audio.",
                                  false,
                                );
                              });
                            } else if (practice.id === 2) {
                              const audio = new Audio("/c2l2.mp3");
                              audio.play().catch((err) => {
                                console.error("Error playing audio:", err);
                                playAudio(
                                  "This is a placeholder for audio content. In a real app, this would play the actual listening exercise audio.",
                                  false,
                                );
                              });
                            } else {
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
                    <SpeakingPracticeItem key={sentence.id} sentence={sentence} />
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
