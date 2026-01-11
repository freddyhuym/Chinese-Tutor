export type Language = "zh" | "en";

export const translations = {
  zh: {
    nav: {
      home: "首頁",
      chapter1: "第一章",
      chapter2: "第二章",
      chapter3: "第三章",
      getStarted: "開始學習",
    },
    hero: {
      badge: "互動學習",
      title1: "學習",
      title2: "中文",
      subtitle: "一步一步",
      description: "透過互動式閃卡、聲調練習和筆順教學來精通中文。",
      descriptionHighlight: "您的學習之旅從這裡開始。",
      startLearning: "開始學習",
    },
    stats: {
      charactersLearned: "已學習字符",
      dayStreak: "連續天數",
      xpEarned: "獲得經驗值",
    },
    tools: {
      title: "互動學習工具",
      description: "學習中文所需的一切，盡在一處",
      flashcards: "閃卡",
      tones: "聲調",
      writing: "書寫",
      lessons: "課程",
    },
    flashcard: {
      title: "每日練習",
      subtitle: "點擊翻轉查看意思",
      reset: "重置",
      next: "下一張",
    },
    tones: {
      title: "掌握聲調",
      subtitle: "中文有四個主要聲調，會改變詞義",
      tone1: { name: "第一聲（陰平）", description: "高而平，像唱一個音符" },
      tone2: { name: "第二聲（陽平）", description: "上揚，像問「什麼？」" },
      tone3: { name: "第三聲（上聲）", description: "先降後升" },
      tone4: { name: "第四聲（去聲）", description: "急降，像說「不！」" },
    },
    writing: {
      title: "書寫練習",
      subtitle: "練習筆順",
      stroke: "筆畫",
      of: "/",
      restart: "重新開始",
      nextStroke: "下一筆",
    },
    lessons: {
      title: "學習路徑",
      subtitle: "為初學者設計的結構化課程",
      viewAll: "查看全部",
      inProgress: "進行中",
      characters: "個字符",
    },
    features: {
      personalized: {
        title: "個人化學習",
        description: "AI驅動的課程，根據您的節奏和學習風格進行調整",
      },
      gamified: {
        title: "遊戲化進度",
        description: "學習時賺取經驗值、保持連續紀錄並解鎖成就",
      },
      pronunciation: {
        title: "母語發音",
        description: "母語者的音頻幫助您完善聲調和口音",
      },
    },
    cta: {
      title: "準備好開始您的中文之旅了嗎？",
      description: "加入數千名學習者，以有趣且有效的方式掌握中文。",
      button: "開始學習",
    },
    footer: {
      copyright: "© 2026 HanYu. 用愛學中文。",
    },
  },
  en: {
    nav: {
      home: "Home",
      chapter1: "Chapter 1",
      chapter2: "Chapter 2",
      chapter3: "Chapter 3",
      getStarted: "Get Started",
    },
    hero: {
      badge: "Interactive Learning",
      title1: "Learn",
      title2: "Chinese",
      subtitle: "一步一步",
      description: "Master Mandarin with interactive flashcards, tone practice, and stroke-by-stroke character writing.",
      descriptionHighlight: "Your journey starts here.",
      startLearning: "Start Learning",
    },
    stats: {
      charactersLearned: "Characters Learned",
      dayStreak: "Day Streak",
      xpEarned: "XP Earned",
    },
    tools: {
      title: "Interactive Learning Tools",
      description: "Everything you need to master Mandarin Chinese, all in one place",
      flashcards: "Flashcards",
      tones: "Tones",
      writing: "Writing",
      lessons: "Lessons",
    },
    flashcard: {
      title: "Daily Practice",
      subtitle: "Tap to reveal meaning",
      reset: "Reset",
      next: "Next",
    },
    tones: {
      title: "Master the Tones",
      subtitle: "Chinese has 4 main tones that change meaning",
      tone1: { name: "High level", description: "High and flat, like singing a note" },
      tone2: { name: "Rising", description: "Rising up, like asking 'what?'" },
      tone3: { name: "Falling-rising", description: "Dips down then rises" },
      tone4: { name: "Falling", description: "Sharp drop, like saying 'no!'" },
    },
    writing: {
      title: "Character Writing",
      subtitle: "Practice stroke order",
      stroke: "Stroke",
      of: "of",
      restart: "Restart",
      nextStroke: "Next Stroke",
    },
    lessons: {
      title: "Learning Path",
      subtitle: "Structured lessons for beginners",
      viewAll: "View All",
      inProgress: "In Progress",
      characters: "characters",
    },
    features: {
      personalized: {
        title: "Personalized Learning",
        description: "AI-powered curriculum that adapts to your pace and learning style",
      },
      gamified: {
        title: "Gamified Progress",
        description: "Earn XP, maintain streaks, and unlock achievements as you learn",
      },
      pronunciation: {
        title: "Native Pronunciation",
        description: "Audio from native speakers helps perfect your tones and accent",
      },
    },
    cta: {
      title: "Ready to start your Chinese journey?",
      description: "Join thousands of learners who are mastering Mandarin the fun and effective way.",
      button: "Start Learning",
    },
    footer: {
      copyright: "© 2026 HanYu. Learn Chinese with love.",
    },
  },
};

export function getTranslations(lang: Language) {
  return translations[lang];
}
