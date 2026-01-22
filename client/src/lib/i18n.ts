export type Language = "zh" | "en";

export const translations = {
  zh: {
    nav: {
      home: "首頁",
      philosophy: "編寫理念",
      chapter1: "第一章",
      chapter2: "第二章",
      chapter3: "第三章",
      getStarted: "開始學習",
    },
    philosophy: {
      title: "編寫理念",
      subtitle: "以學習者為中心的數位華語教材設計",
      section1: {
        title: "符合 TBCL 標準與真實語料應用",
        content: "臺灣華語文能力基準為漢字、生詞與語法點提供明確的等級分級標準，有助於教材編寫者在內容設計過程中掌握語言難度與學習目標。本教材在課文與對話完成後，透過教材編輯輔助系統檢視生詞與語法點在 TBCL 中之分布情形，其中生詞等級多落在 TBCL 1.5 至 2.5 級，語法點則主要集中於 TBCL 2 至 3 級，整體難度符合第二級學習者之理解與使用能力。\n\n此外，教材內容亦參考華語語料庫中之常見詞彙搭配與實際語言使用情境，作為語言自然度與真實性的參照依據，使教材不僅符合能力基準要求，也貼近真實語言使用狀況，提升學習者在實際溝通中的可遷移性。"
      },
      section2: {
        title: "數位教材形式對華語教材編寫與學習體驗之優勢",
        content: "相較於傳統紙本教材，本數位教材可在既有課文架構下，彈性呈現多元學習內容。教材編寫者可依教學設計需求，於相同主題中延伸不同情境與語言使用方式，並透過數位平台呈現，使教材內容更具層次與廣度。\n\n在教材設計過程中，編寫者可先以核心課文與語言重點為主軸，再逐步延伸補充內容與替代說法，形成具結構性的數位教材模組。此種設計方式不僅有助於教材後續擴充與更新，也能因應不同學習者程度與學習節奏進行彈性調整，提升教材實際使用效益。"
      },
      section3: {
        title: "分支式章節設計與多模態互動於數位華語教材之實踐",
        content: "本教材每一章節皆設計多條分支學習路徑，學習者可依不同選擇進入不同對話發展與語言表現情境，在相同主題下接觸多樣化的說話方式與表達策略。此分支式設計不僅增加教材內容的廣度，也提升學習歷程的趣味性與參與感。\n\n此外，部分語法點結合語音辨識與動畫呈現方式，讓學習者透過實際朗讀與互動操作，觀察不同語法形式在語意與語用功能上的差異。透過視覺、聽覺與語言輸出之整合，協助學習者更直觀地理解語法功能，並促進語言理解與產出能力的發展。整體而言，本教材嘗試建構一套以能力基準為依據、以數位互動為特色的華語教材編寫模式，展現數位教材於華語教學上的應用潛力。"
      }
    },
    hero: {
      badge: "互動學習",
      title1: "學習",
      title2: "中文",
      subtitle: "一步一步",
      description: "透過互動式閃卡、聲調練習和筆順教學來精通中文。",
      descriptionHighlight: "您的學習之旅從這裡開始。",
      randyIntro: "大家好！\n我叫 Randy（瑞迪）。\n我是 美國人，剛來台灣。\n我學中文 三個多月了，\n現在住在 台北。\n我喜歡認識新朋友，\n也想多了解 台灣的生活。\n這一次，我遇到了一個特別的人。\n你願意 跟我一起學中文，\n幫助我一步一步認識她嗎？",
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
    chapter1Page: {
      background: {
        title: "背景故事",
        content: "瑞迪是一位剛來台灣的美國人。\n他在一個交朋友的 Facebook 社團裡認識了小雨。\n\n瑞迪想先跟小雨聊天，慢慢認識她，\n之後一起吃飯、一起看電影。\n\n兩個月之後，他希望可以跟小雨一起到象山，\n在看風景的時候向小雨告白。\n\n他會不會成功，就要靠你來幫助他。\n在幫助瑞迪的過程中，你也可以學習跟台灣女生約會時\n常用的中文，讓我們一起學習吧。"
      }
    },
    footer: {
      copyright: "© 2026 HanYu. 用愛學中文。",
    },
  },
  en: {
    nav: {
      home: "Home",
      philosophy: "Philosophy",
      chapter1: "Chapter 1",
      chapter2: "Chapter 2",
      chapter3: "Chapter 3",
      getStarted: "Get Started",
    },
    philosophy: {
      title: "Teaching Philosophy",
      subtitle: "Learner-Centered Digital Chinese Material Design",
      section1: {
        title: "Alignment with TBCL Standards and Authentic Corpus Application",
        content: "The Taiwan Benchmarks for the Chinese Language (TBCL) provide clear grading standards for characters, vocabulary, and grammar points, helping material developers control language difficulty and learning objectives during the content design process. After completing the texts and dialogues, this material uses an editing support system to examine the distribution of vocabulary and grammar points within the TBCL framework. The vocabulary levels mostly fall between TBCL 1.5 to 2.5, and grammar points are concentrated between TBCL 2 to 3, making the overall difficulty suitable for Level 2 learners' comprehension and usage abilities.\n\nIn addition, the content references common collocations and actual language usage contexts from Chinese corpora as a basis for naturalness and authenticity. This ensures that the material not only meets benchmark requirements but also reflects real-life language usage, enhancing learners' transferability in actual communication."
      },
      section2: {
        title: "Advantages of Digital Formats for Chinese Material Development and Learning Experience",
        content: "Compared to traditional printed materials, this digital material can flexibly present diverse learning content within the existing text structure. Developers can extend different contexts and language usages within the same theme according to instructional design needs and present them through a digital platform, adding depth and breadth to the content.\n\nIn the design process, developers can focus on core texts and language points as the main axis, then gradually extend supplementary content and alternative expressions to form structured digital material modules. This design approach not only facilitates future expansion and updates but also allows for flexible adjustments based on different learner levels and paces, enhancing the practical effectiveness of the material."
      },
      section3: {
        title: "Implementation of Branching Chapter Design and Multimodal Interaction",
        content: "Each chapter of this material is designed with multiple branching learning paths. Learners can choose different options to enter different dialogue developments and language expression contexts, encountering diverse ways of speaking and expression strategies under the same theme. This branching design not only increases the breadth of the content but also enhances the fun and engagement of the learning process.\n\nFurthermore, some grammar points are combined with speech recognition and animation, allowing learners to observe differences in semantic and pragmatic functions of different grammatical forms through actual reading and interactive operations. Through the integration of visual, auditory, and language output, this assists learners in intuitively understanding grammatical functions and promoting the development of language comprehension and production abilities. Overall, this material attempts to construct a Chinese material development model based on competency benchmarks and characterized by digital interaction, demonstrating the potential of digital materials in Chinese language teaching."
      }
    },
    hero: {
      badge: "Interactive Learning",
      title1: "Learn",
      title2: "Chinese",
      subtitle: "一步一步",
      description: "Master Mandarin with interactive flashcards, tone practice, and stroke-by-stroke character writing.",
      descriptionHighlight: "Your journey starts here.",
      randyIntro: "Hello everyone!\nMy name is Randy.\nI am American and just arrived in Taiwan.\nI have been learning Chinese for over three months,\nand I currently live in Taipei.\nI like meeting new friends,\nand I also want to learn more about life in Taiwan.\nThis time, I met a special person.\nAre you willing to learn Chinese with me,\nand help me get to know her step by step?",
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
    chapter1Page: {
      background: {
        title: "Background Story",
        content: "Reddy is an American who has just arrived in Taiwan.\nHe met Xiao Yu in a Facebook group for making friends.\n\nReddy wants to chat with Xiao Yu first to get to know her slowly,\nthen have meals and watch movies together.\n\nTwo months later, he hopes to go to Elephant Mountain with Xiao Yu\nand confess his feelings to her while enjoying the scenery.\n\nWhether he succeeds or not depends on your help.\nIn the process of helping Reddy, you can also learn the Chinese commonly used\nwhen dating Taiwanese girls. Let's learn together!"
      }
    },
    footer: {
      copyright: "© 2026 HanYu. Learn Chinese with love.",
    },
  },
};

export function getTranslations(lang: Language) {
  return translations[lang];
}
