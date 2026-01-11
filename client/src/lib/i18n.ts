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
      startLearning: "教材使用教學",
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
    howToUse: {
      title: "如何使用本教材",
      description: "跟著以下步驟，輕鬆開始您的中文學習之旅",
      steps: [
        {
          title: "選擇章節",
          description: "從導覽列選擇您想學習的章節，每個章節都有不同的主題和難度。"
        },
        {
          title: "觀看教學影片",
          description: "每個章節都包含詳細的教學影片，幫助您理解發音和語法。"
        },
        {
          title: "練習互動題目",
          description: "完成每個章節後的練習題，鞏固您所學的內容。"
        },
        {
          title: "追蹤學習進度",
          description: "查看您的學習進度，確保您沒有遺漏任何重要內容。"
        }
      ],
      tip: "小提示",
      tipContent: "建議每天花15-20分鐘學習，持續練習是掌握中文的關鍵！",
      whyChooseUs: "為什麼選擇我們"
    },
    whyChooseUs: {
      title: "學習中文不僅是掌握一門語言，\n更是開啟一扇通往東方文化的大門。\n讓我們陪伴您踏上這段精彩的學習旅程。",
      paragraph1: "在這個教材中，我們深信每個人都能夠學好中文。我們的使命不僅僅是提供優質的語言課程，更是要幫助您建立對中文的信心與熱愛。從基礎發音到日常對話的練習，我們的專業團隊都會細心設計每一個學習環節，並以循序漸進的方式為基礎，為您量身打造最適合的學習方案。",
      paragraph2: "我們採用互動式的教學方法與技術，結合豐富的多媒體內容，確保每一次學習都能達到最佳效果。無論是想要掌握基本的問候語、提升閱讀能力，或是追求流利的口語表達，我們都能為您提供完整、有效、且符合您個人需求的解決方案。讓學習中文成為您生活中的自然呈現，而非遙不可及的夢想。",
      startLearning: "開始學習",
      startLearningDesc: "準備好了嗎？立即開始您的中文學習之旅！"
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
      startLearning: "How to Use",
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
    howToUse: {
      title: "How to Use This Course",
      description: "Follow these steps to start your Chinese learning journey",
      steps: [
        {
          title: "Choose a Chapter",
          description: "Select a chapter from the navigation bar. Each chapter has different topics and difficulty levels."
        },
        {
          title: "Watch Tutorial Videos",
          description: "Each chapter includes detailed tutorial videos to help you understand pronunciation and grammar."
        },
        {
          title: "Practice Interactive Exercises",
          description: "Complete the practice exercises after each chapter to reinforce what you've learned."
        },
        {
          title: "Track Your Progress",
          description: "Monitor your learning progress to ensure you haven't missed any important content."
        }
      ],
      tip: "Pro Tip",
      tipContent: "We recommend spending 15-20 minutes daily on learning. Consistent practice is the key to mastering Chinese!",
      whyChooseUs: "Why Choose Us"
    },
    whyChooseUs: {
      title: "Learning Chinese is not just about mastering a language,\nbut opening a door to Eastern culture.\nLet us accompany you on this exciting learning journey.",
      paragraph1: "In this course, we believe that everyone can learn Chinese well. Our mission is not only to provide quality language courses, but also to help you build confidence and passion for Chinese. From basic pronunciation to daily conversation practice, our professional team carefully designs every learning module, using a step-by-step approach to create the most suitable learning plan for you.",
      paragraph2: "We use interactive teaching methods and technology, combined with rich multimedia content, to ensure that every learning session achieves the best results. Whether you want to master basic greetings, improve reading skills, or pursue fluent oral expression, we can provide you with a complete, effective solution that meets your individual needs. Let learning Chinese become a natural part of your life, not an unattainable dream.",
      startLearning: "Start Learning",
      startLearningDesc: "Ready to begin? Start your Chinese learning journey now!"
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
