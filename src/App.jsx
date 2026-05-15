import { useMemo, useState } from "react";
import { Volume2, Square, Search, RotateCcw } from "lucide-react";

const categories = [
  { id: "shopping", label: "Shopping", unit: "UNIT 11", title: "SHOPPING" },
  { id: "food", label: "Food", unit: "UNIT 09", title: "FOOD" },
  {
    id: "workplace",
    label: "workplace-May 12th(twelfth)",
    unit: "WORK",
    title: "workplace-May 12th(twelfth)",
  },
];

const categoryGroups = [
  { label: "生活区单词", categoryIds: ["shopping", "food"] },
  { label: "工作区单词", categoryIds: ["workplace"] },
];

const shoppingWords = [
  {
    word: "afford",
    ipa: "/əˈfɔːrd/",
    pos: "v.",
    forms: "afforded – afforded",
    meaning:
      "To afford something is to be able to buy or do something because you have enough money or time.",
    example: "She can’t afford to shop anymore.",
    zh: "买得起；负担得起",
    emoji: "💰",
  },
  {
    word: "around",
    ipa: "/əˈraʊnd/",
    pos: "prep.",
    meaning:
      "To go around an area is to move to many places or parts of it.",
    example: "They’re walking around the mall.",
    zh: "到处；围绕；在周围",
    emoji: "🚶‍♀️",
  },
  {
    word: "bookstore",
    ipa: "/ˈbʊkstɔːr/",
    pos: "n.",
    meaning: "A bookstore is a store that sells books.",
    example: "She’s shopping at a bookstore.",
    zh: "书店",
    emoji: "📚",
  },
  {
    word: "card",
    ipa: "/kɑːrd/",
    pos: "n.",
    meaning:
      "A card is a small piece of plastic from a bank that you use to pay for things or get money.",
    example: "He’s paying with a card.",
    zh: "银行卡；卡片",
    emoji: "💳",
  },
  {
    word: "chain",
    ipa: "/tʃeɪn/",
    pos: "n.",
    meaning:
      "A chain is a number of stores or hotels owned by the same company or person.",
    example: "Most fast-food restaurants are chains.",
    zh: "连锁店；连锁企业",
    emoji: "🏬",
  },
  {
    word: "choose",
    ipa: "/tʃuːz/",
    pos: "v.",
    forms: "chose – chosen",
    meaning: "To choose is to pick something from a group of things.",
    example: "He’s trying to choose a shirt.",
    zh: "选择",
    note: "SYN. pick",
    emoji: "✅",
  },
  {
    word: "closed",
    ipa: "/kloʊzd/",
    pos: "adj.",
    meaning:
      "If a store or other building is closed, it is not open, and people cannot enter it.",
    example: "The café is closed today.",
    zh: "关门的；关闭的",
    note: "ANT. open",
    emoji: "🔒",
  },
  {
    word: "discount",
    ipa: "/ˈdɪskaʊnt/",
    pos: "n.",
    meaning: "A discount is a special lower price for something.",
    example: "This store is offering big discounts.",
    zh: "折扣",
    emoji: "🏷️",
  },
  {
    word: "dress",
    ipa: "/dres/",
    pos: "n.",
    meaning:
      "A dress is a piece of clothing usually for women or girls that covers the top of the body and hangs down over the legs.",
    example: "She’s wearing a new pink dress.",
    zh: "连衣裙；裙子",
    emoji: "👗",
  },
  {
    word: "fashionable",
    ipa: "/ˈfæʃənəbəl/",
    pos: "adj.",
    meaning:
      "If something is fashionable, it is popular at a certain time.",
    example: "You can see fashionable clothes at a fashion show.",
    zh: "流行的；时髦的",
    emoji: "👠",
  },
  {
    word: "neat",
    ipa: "/niːt/",
    pos: "adj.",
    meaning: "If something is neat, it is tidy and clean.",
    example: "The store's shelves are very neat.",
    zh: "整洁的；干净的",
    emoji: "🧼",
  },
  {
    word: "parking lot",
    ipa: "/ˈpɑːrkɪŋ lɑːt/",
    pos: "n.",
    meaning: "A parking lot is an open area for cars to park in.",
    example: "There are a lot of cars in the parking lot.",
    zh: "停车场",
    emoji: "🅿️",
  },
  {
    word: "pick",
    ipa: "/pɪk/",
    pos: "v.",
    meaning: "To pick something is to choose it.",
    example: "He picks a gray T-shirt.",
    zh: "挑选；选择",
    note: "SYN. choose",
    emoji: "👆",
  },
  {
    word: "price",
    ipa: "/praɪs/",
    pos: "n.",
    meaning: "The price of something is how much you have to pay for it.",
    example: "She's checking the price.",
    zh: "价格；价钱",
    emoji: "💲",
  },
  {
    word: "sell",
    ipa: "/sel/",
    pos: "v.",
    forms: "sold – sold",
    meaning: "To sell something is to offer it for people to buy.",
    example: "She sells makeup.",
    zh: "卖；出售",
    emoji: "🛍️",
  },
  {
    word: "shop",
    ipa: "/ʃɑːp/",
    pos: "n.",
    meaning: "A shop is a place where you can buy goods or services.",
    example: "He works at a bike shop.",
    zh: "商店；店铺",
    emoji: "🏪",
  },
  {
    word: "shopper",
    ipa: "/ˈʃɑːpər/",
    pos: "n.",
    meaning: "A shopper is someone who buys things in stores.",
    example: "The store is filled with shoppers.",
    zh: "购物者；顾客",
    emoji: "🛒",
  },
  {
    word: "supermarket",
    ipa: "/ˈsuːpərmɑːrkɪt/",
    pos: "n.",
    meaning:
      "A supermarket is a large store that sells food, drinks, and other things people need in their homes.",
    example: "This supermarket is huge.",
    zh: "超市",
    emoji: "🛒",
  },
  {
    word: "try",
    ipa: "/traɪ/",
    pos: "v.",
    forms: "tried – tried",
    meaning: "To try is to attempt to do something.",
    example: "She is trying to decide what to buy.",
    zh: "尝试；试图",
    emoji: "🤔",
  },
  {
    word: "wonderful",
    ipa: "/ˈwʌndərfəl/",
    pos: "adj.",
    meaning: "If something is wonderful, it is very good.",
    example: "He thinks this store is wonderful.",
    zh: "极好的；精彩的",
    emoji: "🌟",
  },
];

const foodWords = [
  {
    word: "lemon",
    ipa: "/ˈlemən/",
    pos: "n.",
    meaning:
      "A lemon is a fruit with a hard, yellow skin and sour juice.",
    example: "We have fresh lemon juice.",
    zh: "柠檬",
    emoji: "🍋",
  },
  {
    word: "melon",
    ipa: "/ˈmelən/",
    pos: "n.",
    meaning: "A melon is a large, round fruit with sweet, juicy flesh.",
    example: "I'd like a slice of melon, please.",
    zh: "瓜；甜瓜",
    emoji: "🍈",
  },
  {
    word: "milkshake",
    ipa: "/ˈmɪlkʃeɪk/",
    pos: "n.",
    meaning:
      "A milkshake is a sweet drink made of milk and chocolate or fruit.",
    example: "They're enjoying their milkshakes.",
    zh: "奶昔",
    emoji: "🥤",
  },
  {
    word: "orange",
    ipa: "/ˈɔːrɪndʒ/",
    pos: "n.",
    meaning:
      "An orange is a round, sweet fruit with a thick skin and is divided into parts inside.",
    example: "I cut an orange in half.",
    zh: "橙子",
    emoji: "🍊",
  },
  {
    word: "pasta",
    ipa: "/ˈpɑːstə/",
    pos: "n.",
    meaning:
      "Pasta is an Italian food made from flour, eggs, and water, and cut into different shapes.",
    example: "Today's lunch is pasta with tomato sauce.",
    zh: "意大利面",
    emoji: "🍝",
  },
  {
    word: "salad",
    ipa: "/ˈsæləd/",
    pos: "n.",
    meaning:
      "Salad is a mix of raw vegetables, especially lettuce and tomato.",
    example: "That salad looks delicious.",
    zh: "沙拉",
    emoji: "🥗",
  },
  {
    word: "shrimp",
    ipa: "/ʃrɪmp/",
    pos: "n.",
    meaning:
      "A shrimp is a small sea animal with a shell and legs that you can eat.",
    example: "You can cook shrimp in a pan.",
    zh: "虾",
    note: "SYN. prawn",
    emoji: "🦐",
  },
  {
    word: "snack",
    ipa: "/snæk/",
    pos: "n.",
    meaning:
      "A snack is a small amount of food that is eaten between main meals.",
    example: "An apple is a healthy snack.",
    zh: "点心；小吃",
    emoji: "🍪",
  },
  {
    word: "supper",
    ipa: "/ˈsʌpər/",
    pos: "n.",
    meaning: "Supper is a meal that you eat in the evening.",
    example: "The family is eating supper together.",
    zh: "晚餐",
    note: "SYN. dinner",
    emoji: "🍽️",
  },
  {
    word: "thirsty",
    ipa: "/ˈθɜːrsti/",
    pos: "adj.",
    meaning: "If someone is thirsty, they want or need a drink.",
    example: "Hot weather makes people thirsty.",
    zh: "口渴的",
    emoji: "💧",
  },
];

const workplaceWords = [
  {
    word: "a copy of",
    ipa: "",
    pos: "phr.",
    meaning: "A copy of something is one reproduced version of it.",
    example: "Please send me a copy of the report.",
    zh: "一份……副本 / 复印件",
    emoji: "📄",
  },
  {
    word: "complete tasks",
    ipa: "",
    pos: "phr.",
    meaning: "To complete tasks is to finish assigned pieces of work.",
    example: "I need to complete these tasks before the end of the sprint.",
    zh: "完成任务",
    emoji: "✅",
  },
  {
    word: "capacity",
    ipa: "/kəˈpæsɪti/",
    pos: "n.",
    meaning:
      "Capacity is the amount of work, load, or volume that someone or something can handle.",
    example: "We need to check the team's current capacity.",
    zh: "能力；容量；处理能力",
    emoji: "📊",
  },
  {
    word: "capacity in days",
    ipa: "",
    pos: "phr.",
    meaning: "Capacity in days describes how much work can be handled by day.",
    example: "The report shows our capacity in days.",
    zh: "日均任务处理能力",
    emoji: "📅",
  },
  {
    word: "at full capacity",
    ipa: "",
    pos: "phr.",
    meaning: "At full capacity means using all available ability or resources.",
    example: "The team is currently working at full capacity.",
    zh: "全负荷；满负载",
    emoji: "🔋",
  },
  {
    word: "over capacity",
    ipa: "/ˌoʊvər kəˈpæsɪti/",
    pos: "phr.",
    meaning: "Over capacity means having more work or load than can be handled.",
    example: "We are over capacity this sprint.",
    zh: "超负荷；超过容量",
    emoji: "⚠️",
  },
  {
    word: "per sprint",
    ipa: "/pər sprɪnt/",
    pos: "phr.",
    meaning: "Per sprint means for each sprint or iteration.",
    example: "We usually complete ten tasks per sprint.",
    zh: "每轮迭代",
    emoji: "🏃",
  },
  {
    word: "period",
    ipa: "/ˈpɪriəd/",
    pos: "n.",
    meaning: "A period is a length of time, a stage, or a punctuation mark.",
    example: "This issue happened during the testing period.",
    zh: "阶段；周期；时期；句号",
    emoji: "⏳",
  },
  {
    word: "quick glance",
    ipa: "/kwɪk ɡlæns/",
    pos: "phr.",
    meaning: "A quick glance is a brief look at something.",
    example: "I took a quick glance at the test results.",
    zh: "快速浏览；扫一眼；粗略查看",
    emoji: "👀",
  },
  {
    word: "system availability",
    ipa: "/ˈsɪstəm əˌveɪləˈbɪləti/",
    pos: "phr.",
    meaning: "System availability is how reliably a system is ready for use.",
    example: "System availability is critical for production stability.",
    zh: "系统可用性",
    emoji: "🟢",
  },
  {
    word: "version compatibility",
    ipa: "/ˈvɝːʒən kəmˌpætəˈbɪləti/",
    pos: "phr.",
    meaning:
      "Version compatibility means different software versions can work together correctly.",
    example: "We need to verify version compatibility before release.",
    zh: "版本兼容性",
    emoji: "🔄",
  },
  {
    word: "cider",
    ipa: "/ˈsaɪdɚ/",
    pos: "n.",
    meaning: "Cider is a drink made from apples.",
    example: "She ordered a glass of cider.",
    zh: "苹果酒",
    emoji: "🍎",
  },
  {
    word: "piper",
    ipa: "/ˈpaɪpɚ/",
    pos: "n.",
    meaning: "A piper is a person who plays a pipe or flute-like instrument.",
    example: "The piper played music in the street.",
    zh: "吹笛者；管道工；派珀",
    emoji: "🎶",
  },
  {
    word: "critique",
    ipa: "/krɪˈtik/",
    pos: "n.",
    meaning: "A critique is a careful review, comment, or evaluation.",
    example: "The team gave a detailed critique of the design.",
    zh: "批评；评论；评审",
    emoji: "📝",
  },
  {
    word: "git fetch",
    ipa: "/ɡɪt fetʃ/",
    pos: "cmd.",
    meaning: "Git fetch downloads remote updates without merging them.",
    example: "Run git fetch before checking the remote branch.",
    zh: "拉取远程更新，但不合并",
    emoji: "⬇️",
  },
  {
    word: "git pull",
    ipa: "/ɡɪt pʊl/",
    pos: "cmd.",
    meaning: "Git pull downloads remote updates and merges them automatically.",
    example: "Run git pull to update your local branch.",
    zh: "拉取 + 自动合并",
    emoji: "🔀",
  },
  {
    word: "The following is the breakdown of devices across different dimensions.",
    ipa: "/ðə ˈfɑːloʊɪŋ ɪz ðə ˈbreɪkdaʊn əv dɪˈvaɪsɪz əˈkrɔːs ˈdɪfrənt daɪˈmenʃənz/",
    pos: "sent.",
    meaning:
      "This sentence introduces a detailed breakdown of devices by different dimensions.",
    example: "The following is the breakdown of devices across different dimensions.",
    zh: "以下是不同维度下设备情况的明细拆解。",
    emoji: "📊",
  },
  {
    word: "device",
    ipa: "/dɪˈvaɪs/",
    pos: "n.",
    meaning: "A device is a piece of equipment or technology.",
    example: "Please check the device status.",
    zh: "设备",
    emoji: "📱",
  },
  {
    word: "batch",
    ipa: "/bætʃ/",
    pos: "n.",
    meaning: "A batch is a group of items handled together.",
    example: "We tested the first batch of devices.",
    zh: "批量；批次",
    emoji: "📦",
  },
  {
    word: "integration",
    ipa: "/ˌɪntɪˈɡreɪʃən/",
    pos: "n.",
    meaning: "Integration is the process of combining parts so they work together.",
    example: "This issue appeared during integration testing.",
    zh: "集成；联调；整合",
    emoji: "🧩",
  },
  {
    word: "auxiliary",
    ipa: "/ɔːɡˈzɪliəri/",
    pos: "adj.",
    meaning: "Auxiliary means helping or supporting the main thing.",
    example: "This is an auxiliary tool for log analysis.",
    zh: "辅助；辅助的",
    emoji: "🛠️",
  },
  {
    word: "extension",
    ipa: "/ɪkˈstɛnʃən/",
    pos: "n.",
    meaning: "An extension is an added length, expansion, or extra time.",
    example: "We requested an extension for the deadline.",
    zh: "延长；扩展；延期",
    emoji: "➕",
  },
  {
    word: "an unacceptable extension of the construction period",
    ipa: "",
    pos: "phr.",
    meaning:
      "This phrase describes a delay in the construction period that cannot be accepted.",
    example: "This caused an unacceptable extension of the construction period.",
    zh: "一个不可接受的工期延长",
    emoji: "🚧",
  },
  {
    word: "carry out",
    ipa: "/ˈkæri aʊt/",
    pos: "phr.",
    meaning: "To carry out something is to perform, conduct, or implement it.",
    example: "We need to carry out the test plan tomorrow.",
    zh: "执行；开展；实施",
    emoji: "🚀",
  },
  {
    word: "top page",
    ipa: "",
    pos: "phr.",
    meaning: "Top page means the first page or the page at the very top.",
    example: "Click top page to go back to the first page.",
    zh: "最上面一页；首页",
    emoji: "⏫",
  },
  {
    word: "previous",
    ipa: "/ˈpriːviəs/",
    pos: "adj.",
    meaning: "Previous means the one before the current one.",
    example: "Click previous to go back to the last page.",
    zh: "上一页；以前的",
    emoji: "⬅️",
  },
  {
    word: "next",
    ipa: "/nekst/",
    pos: "adj.",
    meaning: "Next means the one after the current one.",
    example: "Click next to open the following page.",
    zh: "下一页；下一个",
    emoji: "➡️",
  },
  {
    word: "last",
    ipa: "/læst/",
    pos: "adj.",
    meaning: "Last means the final one in a list or sequence.",
    example: "Click last to jump to the final page.",
    zh: "最后一页；最后的",
    emoji: "⏭️",
  },
  {
    word: "pre-",
    ipa: "/priː/",
    pos: "prefix",
    meaning: "Pre- is a prefix that means before.",
    example: "Preview means to view something before it is final.",
    zh: "前缀：在……之前；预先",
    emoji: "🔤",
  },
  {
    word: "per-",
    ipa: "/pɜːr/",
    pos: "prefix",
    meaning: "Per- can mean through, throughout, or by each unit.",
    example: "Per sprint means for each sprint.",
    zh: "前缀：每；通过；贯穿",
    emoji: "🔡",
  },
];

const vocabularyByCategory = {
  shopping: shoppingWords,
  food: foodWords,
  workplace: workplaceWords,
};

const emptyWords = [];

function getWordImagePath(categoryId, word) {
  const imageName = word.toLowerCase().replace(/\s+/g, "-");
  return `/images/${categoryId}/${imageName}.jpg`;
}

function getEnglishVoice() {
  const voices = window.speechSynthesis?.getVoices?.() || [];

  return (
    voices.find((voice) => /en-US/i.test(voice.lang)) ||
    voices.find((voice) => /^en/i.test(voice.lang)) ||
    null
  );
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState("shopping");
  const [query, setQuery] = useState("");
  const [playing, setPlaying] = useState(null);
  const [rate, setRate] = useState(0.82);
  const [visibleZh, setVisibleZh] = useState({});

  const activeCategoryInfo =
    categories.find((category) => category.id === activeCategory) ||
    categories[0];
  const categoryWords = vocabularyByCategory[activeCategory] || emptyWords;

  const filteredWords = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return categoryWords;

    return categoryWords.filter((item) => {
      return (
        item.word.toLowerCase().includes(q) ||
        item.ipa.toLowerCase().includes(q) ||
        item.pos.toLowerCase().includes(q) ||
        item.example.toLowerCase().includes(q) ||
        item.meaning.toLowerCase().includes(q) ||
        item.zh.includes(q)
      );
    });
  }, [categoryWords, query]);

  const speak = (text, key) => {
    if (!window.speechSynthesis) {
      alert("当前浏览器不支持语音播放，建议用 Chrome / Edge / Safari 打开。");
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = rate;
    utterance.pitch = 1;
    utterance.volume = 1;

    const voice = getEnglishVoice();
    if (voice) utterance.voice = voice;

    utterance.onstart = () => setPlaying(key);
    utterance.onend = () => setPlaying(null);
    utterance.onerror = () => setPlaying(null);

    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    window.speechSynthesis?.cancel?.();
    setPlaying(null);
  };

  const playWord = (item) => {
    speak(item.word, `${item.word}-word`);
  };

  const playMeaning = (item) => {
    speak(`${item.word}. ${item.meaning}`, `${item.word}-meaning`);
  };

  const playExample = (item) => {
    speak(`${item.word}. ${item.example}`, `${item.word}-example`);
  };

  const toggleChinese = (item) => {
    const key = `${activeCategory}-${item.word}`;

    setVisibleZh((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  return (
    <div style={styles.page}>
      <style>
        {`
          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
            background: #eef8ff;
          }

          button {
            cursor: pointer;
          }

          button:active {
            transform: scale(0.98);
          }
        `}
      </style>

      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.headerContent}>
            <div style={styles.unit}>{activeCategoryInfo.unit}</div>
            <h1 style={styles.title}>{activeCategoryInfo.title}</h1>
            <p style={styles.subtitle}>
              点击单词、释义、例句按钮，即可播放美式英语读音。
            </p>
          </div>

          <div style={styles.headerButtons}>
            <button onClick={stop} style={styles.headerButton}>
              <Square size={16} />
              停止
            </button>

            <button
              onClick={() => {
                setQuery("");
                setRate(0.82);
                setVisibleZh({});
                stop();
              }}
              style={styles.headerButton}
            >
              <RotateCcw size={16} />
              重置
            </button>
          </div>
        </header>

        <nav style={styles.categoryGroups} aria-label="Vocabulary categories">
          {categoryGroups.map((group) => (
            <div key={group.label} style={styles.categoryGroup}>
              <div style={styles.categoryGroupLabel}>{group.label}</div>
              <div style={styles.categoryTabs}>
                {group.categoryIds.map((categoryId) => {
                  const category = categories.find(
                    (item) => item.id === categoryId,
                  );
                  const isActive = activeCategory === category?.id;

                  if (!category) return null;

                  return (
                    <button
                      key={category.id}
                      onClick={() => {
                        setActiveCategory(category.id);
                        setQuery("");
                        setVisibleZh({});
                        stop();
                      }}
                      style={{
                        ...styles.categoryTab,
                        ...(isActive ? styles.activeCategoryTab : {}),
                      }}
                    >
                      {category.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <section style={styles.toolbar}>
          <div style={styles.searchBox}>
            <Search size={20} color="#64748b" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索单词 / 释义 / 例句 / 中文"
              style={styles.input}
            />
          </div>

          <div style={styles.rateBox}>
            <div style={styles.rateLabel}>
              <span>语速</span>
              <strong>{rate.toFixed(2)}x</strong>
            </div>
            <input
              type="range"
              min="0.55"
              max="1.15"
              step="0.05"
              value={rate}
              onChange={(event) => setRate(Number(event.target.value))}
              style={{ width: "100%" }}
            />
          </div>
        </section>

        <main style={styles.cardList}>
          {filteredWords.map((item) => (
            <article key={`${activeCategory}-${item.word}`} style={styles.wordCard}>
              <div style={styles.wordImageFrame}>
                <div style={styles.wordImageFallback}>
                  <span style={item.emoji ? styles.wordEmoji : styles.wordInitial}>
                    {item.emoji || item.word.slice(0, 1).toUpperCase()}
                  </span>
                  <span style={styles.wordImageMeta}>
                    {activeCategoryInfo.label} · {item.pos}
                  </span>
                </div>
                <img
                  src={getWordImagePath(activeCategory, item.word)}
                  alt={item.word}
                  style={styles.wordImage}
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              </div>

              <div style={styles.wordContent}>
                <div style={styles.wordTop}>
                  <h2 style={styles.word}>{item.word}</h2>
                  <span style={styles.ipa}>{item.ipa}</span>
                  <span style={styles.pos}>{item.pos}</span>
                  {item.forms && <span style={styles.forms}>{item.forms}</span>}
                  {item.note && <span style={styles.note}>{item.note}</span>}
                </div>

                <p style={styles.meaning}>{item.meaning}</p>
                <p style={styles.example}>{item.example}</p>
                <button
                  onClick={() => toggleChinese(item)}
                  style={{
                    ...styles.zhToggle,
                    ...(visibleZh[`${activeCategory}-${item.word}`]
                      ? styles.zhVisible
                      : {}),
                  }}
                >
                  {visibleZh[`${activeCategory}-${item.word}`]
                    ? `中文：${item.zh}`
                    : "显示中文"}
                </button>
              </div>

              <div style={styles.audioButtons}>
                <button
                  onClick={() => playWord(item)}
                  style={{
                    ...styles.audioButton,
                    ...(playing === `${item.word}-word`
                      ? styles.activeButton
                      : styles.wordButton),
                  }}
                >
                  <Volume2 size={18} />
                  单词
                </button>

                <button
                  onClick={() => playMeaning(item)}
                  style={{
                    ...styles.audioButton,
                    ...(playing === `${item.word}-meaning`
                      ? styles.activeButton
                      : styles.meaningButton),
                  }}
                >
                  <Volume2 size={18} />
                  释义
                </button>

                <button
                  onClick={() => playExample(item)}
                  style={{
                    ...styles.audioButton,
                    ...(playing === `${item.word}-example`
                      ? styles.activeButton
                      : styles.exampleButton),
                  }}
                >
                  <Volume2 size={18} />
                  例句
                </button>
              </div>
            </article>
          ))}
        </main>

        <footer style={styles.footer}>
          当前版本使用浏览器自带 Web Speech API。后续正式版可以升级为母语者
          MP3 音频，读音会更稳定、更自然。
        </footer>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "24px",
    background: "#eef8ff",
    color: "#0f172a",
  },
  container: {
    maxWidth: "1080px",
    margin: "0 auto",
  },
  header: {
    background: "linear-gradient(135deg, #0369a1, #0891b2)",
    color: "white",
    borderRadius: "20px",
    padding: "18px 22px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "18px",
    textAlign: "left",
    boxShadow: "0 16px 40px rgba(2, 132, 199, 0.25)",
    flexWrap: "wrap",
  },
  headerContent: {
    flex: "1 1 520px",
  },
  unit: {
    color: "#fde047",
    fontWeight: 900,
    letterSpacing: "2px",
    fontSize: "13px",
    lineHeight: 1,
  },
  title: {
    fontSize: "34px",
    lineHeight: 1,
    margin: "5px 0 6px",
    fontWeight: 900,
    letterSpacing: "0",
  },
  subtitle: {
    margin: 0,
    color: "#e0f2fe",
    fontSize: "15px",
    lineHeight: 1.45,
  },
  headerButtons: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    justifyContent: "flex-end",
    flexWrap: "wrap",
  },
  headerButton: {
    border: "none",
    borderRadius: "12px",
    padding: "10px 13px",
    color: "white",
    background: "rgba(255,255,255,0.18)",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  categoryGroups: {
    display: "flex",
    gap: "18px",
    marginTop: "18px",
    flexWrap: "wrap",
    alignItems: "flex-end",
  },
  categoryGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  categoryGroupLabel: {
    color: "#475569",
    fontSize: "14px",
    fontWeight: 900,
    letterSpacing: "0",
    paddingLeft: "4px",
  },
  categoryTabs: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  categoryTab: {
    border: "2px solid transparent",
    borderRadius: "16px",
    padding: "12px 18px",
    background: "white",
    color: "#0369a1",
    fontSize: "16px",
    fontWeight: 900,
    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
  },
  activeCategoryTab: {
    background: "#fde047",
    borderColor: "#f59e0b",
    color: "#111827",
  },
  toolbar: {
    display: "grid",
    gridTemplateColumns: "1fr 260px",
    gap: "16px",
    marginTop: "18px",
  },
  searchBox: {
    background: "white",
    borderRadius: "18px",
    padding: "0 16px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
  },
  input: {
    width: "100%",
    height: "56px",
    border: "none",
    outline: "none",
    fontSize: "16px",
  },
  rateBox: {
    background: "white",
    borderRadius: "18px",
    padding: "12px 16px",
    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
  },
  rateLabel: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
    color: "#475569",
    marginBottom: "8px",
  },
  cardList: {
    marginTop: "20px",
    background: "white",
    borderRadius: "28px",
    padding: "18px",
    boxShadow: "0 16px 40px rgba(15, 23, 42, 0.08)",
  },
  wordCard: {
    border: "1px solid #e2e8f0",
    borderRadius: "22px",
    padding: "18px",
    marginBottom: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    flexWrap: "wrap",
  },
  wordImageFrame: {
    width: "150px",
    height: "112px",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #e0f2fe, #fef3c7)",
    border: "1px solid #e2e8f0",
    overflow: "hidden",
    position: "relative",
    display: "grid",
    placeItems: "center",
    flex: "0 0 auto",
  },
  wordImageFallback: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "7px",
    color: "#0369a1",
    padding: "12px",
    textAlign: "center",
  },
  wordEmoji: {
    fontSize: "42px",
    lineHeight: 1,
  },
  wordInitial: {
    fontSize: "42px",
    fontWeight: 900,
    lineHeight: 1,
  },
  wordImageMeta: {
    color: "#475569",
    fontSize: "12px",
    fontWeight: 800,
    lineHeight: 1.2,
  },
  wordImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "absolute",
    inset: 0,
  },
  wordContent: {
    flex: "1 1 420px",
  },
  wordTop: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexWrap: "wrap",
  },
  word: {
    margin: 0,
    fontSize: "30px",
    fontWeight: 900,
  },
  ipa: {
    background: "#f1f5f9",
    color: "#475569",
    borderRadius: "999px",
    padding: "5px 10px",
    fontWeight: 700,
  },
  pos: {
    background: "#ffedd5",
    color: "#ea580c",
    borderRadius: "999px",
    padding: "5px 10px",
    fontWeight: 800,
  },
  forms: {
    color: "#64748b",
    fontWeight: 700,
  },
  note: {
    background: "#e0f2fe",
    color: "#0369a1",
    borderRadius: "999px",
    padding: "5px 10px",
    fontWeight: 800,
  },
  meaning: {
    fontSize: "16px",
    lineHeight: 1.6,
    color: "#334155",
    margin: "10px 0 4px",
  },
  example: {
    fontSize: "20px",
    lineHeight: 1.5,
    fontWeight: 700,
    margin: "4px 0",
  },
  zhToggle: {
    border: "1px solid #cbd5e1",
    borderRadius: "999px",
    background: "#f8fafc",
    color: "#64748b",
    fontSize: "15px",
    fontWeight: 800,
    margin: "8px 0 0",
    padding: "8px 14px",
    minWidth: "96px",
  },
  zhVisible: {
    background: "#fef3c7",
    borderColor: "#f59e0b",
    color: "#475569",
  },
  audioButtons: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    alignItems: "center",
  },
  audioButton: {
    border: "none",
    borderRadius: "16px",
    padding: "12px 14px",
    color: "white",
    fontWeight: 800,
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  wordButton: {
    background: "#0284c7",
  },
  meaningButton: {
    background: "#f97316",
  },
  exampleButton: {
    background: "#111827",
  },
  activeButton: {
    background: "#fde047",
    color: "#111827",
  },
  footer: {
    marginTop: "18px",
    background: "white",
    borderRadius: "22px",
    padding: "18px",
    color: "#475569",
    lineHeight: 1.7,
    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
  },
};
