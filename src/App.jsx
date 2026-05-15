import React, { useMemo, useState } from "react";
import { Volume2, Square, Search, RotateCcw } from "lucide-react";

const words = [
  {
    word: "afford",
    ipa: "/əˈfɔːrd/",
    pos: "v.",
    forms: "afforded – afforded",
    meaning:
      "To afford something is to be able to buy or do something because you have enough money or time.",
    example: "She can’t afford to shop anymore.",
    zh: "买得起；负担得起",
  },
  {
    word: "around",
    ipa: "/əˈraʊnd/",
    pos: "prep.",
    meaning:
      "To go around an area is to move to many places or parts of it.",
    example: "They’re walking around the mall.",
    zh: "到处；围绕；在周围",
  },
  {
    word: "bookstore",
    ipa: "/ˈbʊkstɔːr/",
    pos: "n.",
    meaning: "A bookstore is a store that sells books.",
    example: "She’s shopping at a bookstore.",
    zh: "书店",
  },
  {
    word: "card",
    ipa: "/kɑːrd/",
    pos: "n.",
    meaning:
      "A card is a small piece of plastic from a bank that you use to pay for things or get money.",
    example: "He’s paying with a card.",
    zh: "银行卡；卡片",
  },
  {
    word: "chain",
    ipa: "/tʃeɪn/",
    pos: "n.",
    meaning:
      "A chain is a number of stores or hotels owned by the same company or person.",
    example: "Most fast-food restaurants are chains.",
    zh: "连锁店；连锁企业",
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
  },
  {
    word: "discount",
    ipa: "/ˈdɪskaʊnt/",
    pos: "n.",
    meaning: "A discount is a special lower price for something.",
    example: "This store is offering big discounts.",
    zh: "折扣",
  },
  {
    word: "dress",
    ipa: "/dres/",
    pos: "n.",
    meaning:
      "A dress is a piece of clothing usually for women or girls that covers the top of the body and hangs down over the legs.",
    example: "She’s wearing a new pink dress.",
    zh: "连衣裙；裙子",
  },
  {
    word: "fashionable",
    ipa: "/ˈfæʃənəbəl/",
    pos: "adj.",
    meaning:
      "If something is fashionable, it is popular at a certain time.",
    example: "You can see fashionable clothes at a fashion show.",
    zh: "流行的；时髦的",
  },
];

function getEnglishVoice() {
  const voices = window.speechSynthesis?.getVoices?.() || [];

  return (
    voices.find((voice) => /en-US/i.test(voice.lang)) ||
    voices.find((voice) => /^en/i.test(voice.lang)) ||
    null
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [playing, setPlaying] = useState(null);
  const [rate, setRate] = useState(0.82);

  const filteredWords = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return words;

    return words.filter((item) => {
      return (
        item.word.toLowerCase().includes(q) ||
        item.example.toLowerCase().includes(q) ||
        item.meaning.toLowerCase().includes(q) ||
        item.zh.includes(q)
      );
    });
  }, [query]);

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
          <div>
            <div style={styles.unit}>UNIT 11</div>
            <h1 style={styles.title}>SHOPPING</h1>
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
                stop();
              }}
              style={styles.headerButton}
            >
              <RotateCcw size={16} />
              重置
            </button>
          </div>
        </header>

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
            <article key={item.word} style={styles.wordCard}>
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
                <p style={styles.zh}>中文：{item.zh}</p>
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
    borderRadius: "28px",
    padding: "28px",
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    flexWrap: "wrap",
    boxShadow: "0 16px 40px rgba(2, 132, 199, 0.25)",
  },
  unit: {
    color: "#fde047",
    fontWeight: 900,
    letterSpacing: "2px",
    fontSize: "14px",
  },
  title: {
    fontSize: "52px",
    margin: "4px 0",
    fontWeight: 900,
    letterSpacing: "-1px",
  },
  subtitle: {
    margin: 0,
    color: "#e0f2fe",
    fontSize: "17px",
  },
  headerButtons: {
    display: "flex",
    gap: "10px",
    alignItems: "flex-end",
  },
  headerButton: {
    border: "none",
    borderRadius: "16px",
    padding: "12px 16px",
    color: "white",
    background: "rgba(255,255,255,0.18)",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    gap: "8px",
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
    justifyContent: "space-between",
    gap: "16px",
    flexWrap: "wrap",
  },
  wordContent: {
    flex: "1 1 560px",
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
  zh: {
    color: "#64748b",
    fontWeight: 700,
    margin: "4px 0 0",
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