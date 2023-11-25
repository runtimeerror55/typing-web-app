import { useRef, useState, useMemo, useEffect, useContext } from "react";
import { useAsyncValue, useFetcher } from "react-router-dom";
import { NavBar } from "../../components/navBar/navBar";
import { TypingArea } from "./typingArea";
import { QuickSettings } from "./quickSettings";
import styles from "./homePage.module.css";
import soundA from "../../assets/sounds/a.mp3";
import soundB from "../../assets/sounds/b.mp3";
import { Howl } from "howler";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PracticeWord } from "./practiseWord";
import { wordsMixer } from "../../utilities/utilities";
import { toastOptions } from "../../utilities/utilities";
import { authContext } from "../../context/auth";
import { LanguageStats } from "./languageStats";

const sounds = {
      soundA,
      soundB,
};

const defaultSettings = {
      theme: "green-theme",
      sound: "soundA",
      timer: 15,
      "language and range": {
            language: "english",
            optionIndex: 0,
      },
};

const allLetters = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
];

export const HomePage = () => {
      const [showParagraphLoader, setShowParagraphLoader] = useState(false);
      const wordsData = {
            status: "success",
            payload: [
                  "as",
                  "wrong",
                  "his",
                  "that",
                  "he",
                  "was",
                  "for",
                  "on",
                  "are",
                  "with",
                  "they",
                  "be",
                  "at",
                  "one",
                  "have",
                  "this",
                  "from",
                  "by",
                  "hot",
                  "word",
                  "but",
                  "what",
                  "some",
                  "is",
                  "it",
                  "you",
                  "or",
                  "had",
                  "the",
                  "of",
                  "to",
                  "and",
                  "in",
                  "we",
                  "can",
                  "out",
                  "other",
                  "were",
                  "which",
                  "do",
                  "their",
                  "time",
                  "if",
                  "will",
                  "how",
                  "said",
                  "an",
                  "each",
                  "tell",
                  "does",
                  "set",
                  "three",
                  "want",
                  "air",
                  "well",
                  "also",
                  "play",
                  "small",
                  "end",
                  "put",
                  "home",
                  "read",
                  "hand",
                  "port",
                  "large",
                  "spell",
                  "add",
                  "even",
                  "land",
                  "here",
                  "must",
                  "big",
                  "high",
                  "such",
                  "follow",
                  "act",
                  "why",
                  "ask",
                  "men",
                  "change",
                  "went",
                  "light",
                  "kind",
                  "off",
                  "need",
                  "house",
                  "picture",
                  "try",
                  "us",
                  "again",
                  "animal",
                  "point",
                  "mother",
                  "world",
                  "near",
                  "build",
                  "self",
                  "earth",
                  "father",
                  "any",
            ],
      };
      const [statsData, setStatsData] = useState({
            payload: {},
      });
      let [settingsData, setSettingsData] = useState({
            payload: defaultSettings,
      });

      const { token } = useContext(authContext);
      const [allWords, setAllWords] = useState(wordsData.payload);
      const [wordIndex, setWordIndex] = useState(0);
      const [timer, setTimer] = useState(settingsData.payload.timer);
      const [mode, setMode] = useState("test");
      const [modeOne, setModeOne] = useState("words");
      const [modeTwo, setModeTwo] = useState("0");
      const [modeThree, setModeThree] = useState(500);
      const [typingSoundPath, setTypingSoundPath] = useState(
            settingsData.payload.sound
      );
      const [showWordsQueue, setShowWordsQueue] = useState(false);
      const typingSound = useMemo(() => {
            return new Howl({
                  src: sounds[typingSoundPath],
            });
      }, [typingSoundPath]);
      const [theme, setTheme] = useState(settingsData.payload.theme);
      const [languageAndRange, setLanguageAndRange] = useState({
            language: "english",
            optionIndex: 0,
            fullName: "english (1-100)",
      });

      const practiseModeAllWords = useMemo(() => {
            let newWords = [];
            if (
                  statsData.status === "success" &&
                  statsData.payload.testMode &&
                  mode === "practise"
            ) {
                  Object.entries(statsData.payload.testMode.wordsStats).forEach(
                        ([key, value]) => {
                              if (
                                    value.averageWpm < +modeThree &&
                                    key !== " "
                              ) {
                                    newWords.push(key);
                              }
                        }
                  );
            } else {
                  newWords = [...allWords];
            }
            return newWords;
      }, [mode, languageAndRange, modeThree]);

      const restartButtonRef = useRef();

      const pageKeyDownHandler = (event) => {
            event.preventDefault();
            event.stopPropagation();
            if (event.key === "Tab") {
                  if (
                        focusableElements.index ===
                        focusableElements.elements.length - 1
                  ) {
                        focusableElements.index = 0;
                  } else {
                        focusableElements.index++;
                  }

                  focusableElements.elements[focusableElements.index].focus();
            } else if (event.key === "Enter") {
                  focusableElements.index = -1;
            }
      };

      const focusableElements = useMemo(() => {
            return { elements: null, index: -1 };
      }, [mode, modeOne, modeTwo, modeThree, languageAndRange]);

      useEffect(() => {
            focusableElements.elements =
                  document.querySelectorAll("[tabindex='0']");
      }, [mode, modeOne, modeTwo, modeThree, languageAndRange]);

      const wordsFetcher = useFetcher();
      const wordsFetcherStatus =
            wordsFetcher.state === "idle" && wordsFetcher.data;

      useEffect(() => {
            if (wordsFetcherStatus) {
                  const data = wordsFetcher.data;

                  if (data.status === "success") {
                        setAllWords(data.payload.words);
                        setStatsData({
                              status: "success",
                              payload: data.payload.stats,
                        });
                        setSettingsData({
                              status: "success",
                              payload: data.payload.settings,
                        });
                        console.log(data.payload.settings);
                        setLanguageAndRange(
                              data.payload.settings["language and range"]
                        );
                        setWordIndex(0);
                  } else {
                        toast.error(data.message, toastOptions);
                  }
            }
      }, [wordsFetcher]);

      useEffect(() => {
            if (token) {
                  wordsFetcher.submit(null, {
                        method: "GET",
                        action: "/previousSessionSettings",
                  });
            }
      }, []);

      useEffect(() => {
            setTimer(settingsData.payload.timer);
            setTheme(settingsData.payload.theme);
      }, [settingsData]);
      if (wordsData.status === "error") {
            return (
                  <div
                        className={
                              styles["page"] +
                              " " +
                              styles[`home-page-green-theme`]
                        }
                        onKeyDown={pageKeyDownHandler}
                        tabIndex={-1}
                  >
                        {wordsData.message}
                  </div>
            );
      } else {
            return (
                  <div
                        className={
                              styles["page"] +
                              " " +
                              styles[`home-page-${theme}`]
                        }
                        onKeyDown={pageKeyDownHandler}
                        tabIndex={-1}
                  >
                        <ToastContainer />
                        <NavBar></NavBar>
                        <main className={styles["main"]}>
                              {mode === "practise" ? (
                                    <section>
                                          <PracticeWord
                                                key={
                                                      mode +
                                                      modeOne +
                                                      modeTwo +
                                                      modeThree +
                                                      languageAndRange.language +
                                                      languageAndRange.optionIndex
                                                }
                                                theme={theme}
                                                statsData={statsData}
                                                wordIndex={wordIndex}
                                                allWords={practiseModeAllWords}
                                                serialNumber={wordIndex + 1}
                                                setShowWordsQueue={
                                                      setShowWordsQueue
                                                }
                                          ></PracticeWord>
                                    </section>
                              ) : null}

                              {mode === "test" ? (
                                    <section
                                          className={
                                                styles["language-stats-section"]
                                          }
                                    >
                                          <LanguageStats
                                                key={
                                                      mode +
                                                      modeOne +
                                                      modeTwo +
                                                      modeThree +
                                                      languageAndRange.language +
                                                      languageAndRange.optionIndex
                                                }
                                                theme={theme}
                                                statsData={statsData}
                                                languageAndRange={
                                                      languageAndRange
                                                }
                                          ></LanguageStats>
                                    </section>
                              ) : null}

                              <section className={styles["typing-section"]}>
                                    <TypingArea
                                          ref={restartButtonRef}
                                          timer={timer}
                                          typingSound={typingSound}
                                          theme={theme}
                                          allWords={allWords}
                                          mode={mode}
                                          setWordIndex={setWordIndex}
                                          wordIndex={wordIndex}
                                          key={
                                                mode +
                                                modeOne +
                                                modeTwo +
                                                modeThree +
                                                languageAndRange.language +
                                                languageAndRange.optionIndex
                                          }
                                          modeOne={modeOne}
                                          modeTwo={modeTwo}
                                          allLetters={allLetters}
                                          statsData={statsData}
                                          modeThree={modeThree}
                                          languageAndRange={languageAndRange}
                                          showParagraphLoader={
                                                showParagraphLoader
                                          }
                                          practiseModeAllWords={
                                                practiseModeAllWords
                                          }
                                          setStatsData={setStatsData}
                                          showWordsQueue={showWordsQueue}
                                    ></TypingArea>
                              </section>
                              <QuickSettings
                                    setTimer={setTimer}
                                    setTypingSoundPath={setTypingSoundPath}
                                    settings={settingsData.payload}
                                    setTheme={setTheme}
                                    theme={theme}
                                    setMode={setMode}
                                    setModeOne={setModeOne}
                                    mode={mode}
                                    modeOne={modeOne}
                                    setAllWords={setAllWords}
                                    modeTwo={modeTwo}
                                    setModeTwo={setModeTwo}
                                    allLetters={allLetters}
                                    allWords={allWords}
                                    setWordIndex={setWordIndex}
                                    statsData={statsData}
                                    setModeThree={setModeThree}
                                    setLanguageAndRange={setLanguageAndRange}
                                    languageAndRange={languageAndRange}
                                    setShowParagraphLoader={
                                          setShowParagraphLoader
                                    }
                                    setStatsData={setStatsData}
                                    key={
                                          mode +
                                          modeOne +
                                          modeTwo +
                                          modeThree +
                                          languageAndRange.language +
                                          languageAndRange.optionIndex
                                    }
                                    modeThree={modeThree}
                                    timer={timer}
                                    typingSoundPath={typingSoundPath}
                              ></QuickSettings>
                        </main>
                  </div>
            );
      }
};
