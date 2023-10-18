import {
      forwardRef,
      useCallback,
      useEffect,
      useMemo,
      useReducer,
      useRef,
      useState,
} from "react";
import { useFetcher, useLoaderData } from "react-router-dom";
import styles from "./typingParagraph.module.css";
import { TestStats } from "./testStats";
import { typingParagraphReducer } from "../../reducers/typingParagraphReducer";
import { postTestStats } from "../../actions/actions";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
      faRotate,
      faForward,
      faBackward,
} from "@fortawesome/free-solid-svg-icons";
import { ColorRing } from "react-loader-spinner";
import { colorRingOptions, toastOptions } from "../../utilities/utilities";
import { WordsQueue } from "./wordsQueue";

import {
      updateCharactersStats,
      updateWpmAndAccuracy,
      createtypingParagraphJsx,
      initialTypingState,
} from "../../utilities/utilities";

const commonWords = [
      "as",
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
      "new",
      "work",
      "part",
      "take",
      "get",
      "place",
      "made",
      "live",
      "where",
      "after",
      "back",
      "little",
      "only",
      "round",
      "man",
      "year",
      "came",
      "show",
      "every",
      "good",
      "me",
      "give",
      "our",
      "under",
      "name",
      "very",
      "through",
      "just",
      "form",
      "sentence",
      "great",
      "think",
      "say",
      "help",
      "low",
      "line",
      "differ",
      "turn",
      "cause",
      "much",
      "mean",
      "before",
      "move",
      "right",
      "boy",
      "old",
      "too",
      "same",
      "she",
      "all",
      "there",
      "when",
      "up",
      "use",
      "your",
      "way",
      "about",
      "many",
      "then",
      "them",
      "write",
      "would",
      "like",
      "so",
      "these",
      "her",
      "long",
      "make",
      "thing",
      "see",
      "him",
      "two",
      "has",
      "look",
      "more",
      "day",
      "could",
      "go",
      "come",
      "did",
      "number",
      "sound",
      "no",
      "most",
      "people",
      "my",
      "over",
      "know",
      "water",
      "than",
      "call",
      "first",
      "who",
      "may",
      "down",
      "side",
      "been",
      "now",
      "find",
      "head",
      "stand",
      "own",
      "page",
      "should",
      "country",
      "found",
      "answer",
      "school",
      "grow",
      "study",
      "still",
      "learn",
      "plant",
      "cover",
      "food",
      "sun",
      "four",
      "between",
      "state",
      "keep",
      "eye",
      "never",
      "last",
      "let",
      "thought",
      "city",
      "tree",
      "cross",
      "farm",
      "hard",
      "start",
      "might",
      "story",
      "saw",
      "far",
      "sea",
      "draw",
      "left",
      "late",
      "run",
      "don’t",
      "while",
      "press",
      "close",
      "night",
      "real",
      "life",
      "few",
      "north",
      "book",
      "carry",
      "took",
      "science",
      "eat",
      "room",
      "friend",
      "began",
      "idea",
      "fish",
      "mountain",
      "stop",
      "once",
      "base",
      "hear",
      "horse",
      "cut",
      "sure",
      "watch",
      "color",
      "face",
      "wood",
      "main",
      "open",
      "seem",
      "together",
      "next",
      "white",
      "children",
      "begin",
      "got",
      "walk",
      "example",
      "ease",
      "paper",
      "group",
      "always",
      "music",
      "those",
      "both",
      "mark",
      "often",
      "letter",
      "until",
      "mile",
      "river",
      "car",
      "feet",
      "care",
      "second",
      "enough",
      "plain",
      "girl",
      "usual",
      "young",
      "ready",
      "above",
      "ever",
      "red",
      "list",
      "though",
      "feel",
      "talk",
      "bird",
      "soon",
      "body",
      "dog",
      "family",
      "direct",
      "pose",
      "leave",
      "song",
      "measure",
      "door",
      "product",
      "black",
      "short",
      "numeral",
      "class",
      "wind",
      "question",
      "happen",
      "complete",
      "ship",
      "area",
      "half",
      "rock",
      "order",
      "fire",
      "south",
      "problem",
      "piece",
      "told",
      "knew",
      "pass",
      "since",
      "top",
      "whole",
      "king",
      "street",
      "inch",
      "multiply",
      "nothing",
      "course",
      "stay",
      "wheel",
      "full",
      "force",
      "blue",
      "object",
      "decide",
      "surface",
      "deep",
      "moon",
      "island",
      "foot",
      "system",
      "busy",
      "test",
      "record",
      "boat",
      "common",
      "gold",
      "possible",
      "plane",
      "stead",
      "dry",
      "wonder",
      "laugh",
      "thousand",
      "ago",
      "ran",
      "check",
      "game",
      "shape",
      "equate",
      "hot",
      "miss",
      "brought",
      "heat",
      "snow",
      "tire",
      "bring",
      "yes",
      "distant",
      "fill",
      "east",
      "paint",
      "language",
      "among",
      "unit",
      "power",
      "town",
      "fine",
      "certain",
      "fly",
      "fall",
      "lead",
      "cry",
      "dark",
      "machine",
      "note",
      "wait",
      "plan",
      "figure",
      "star",
      "box",
      "noun",
      "field",
      "rest",
      "correct",
      "able",
      "pound",
      "done",
      "beauty",
      "drive",
      "stood",
      "contain",
      "front",
      "teach",
      "week",
      "final",
      "gave",
      "green",
      "oh",
      "quick",
      "develop",
      "ocean",
      "warm",
      "free",
      "minute",
      "strong",
      "special",
      "mind",
      "behind",
      "clear",
      "tail",
      "produce",
      "fact",
      "space",
      "heard",
      "best",
      "hour",
      "better",
      "true",
      "during",
      "hundred",
      "five",
      "remember",
      "step",
      "early",
      "hold",
      "west",
      "ground",
      "interest",
      "reach",
      "fast",
      "verb",
      "sing",
      "listen",
      "six",
      "table",
      "travel",
      "less",
      "morning",
      "ten",
      "simple",
      "several",
      "vowel",
      "toward",
      "war",
      "lay",
      "against",
      "pattern",
      "slow",
      "center",
      "love",
      "person",
      "money",
      "serve",
      "appear",
      "road",
      "map",
      "rain",
      "rule",
      "govern",
      "pull",
      "cold",
      "notice",
      "voice",
      "energy",
      "hunt",
      "probable",
      "bed",
      "brother",
      "egg",
      "ride",
      "cell",
      "believe",
      "perhaps",
      "pick",
      "sudden",
      "count",
      "square",
      "reason",
      "length",
      "represent",
      "art",
      "subject",
      "region",
      "size",
      "vary",
      "settle",
      "speak",
      "weight",
      "general",
      "ice",
      "matter",
      "circle",
      "pair",
      "include",
      "divide",
      "syllable",
      "felt",
      "grand",
      "ball",
      "yet",
      "wave",
      "drop",
      "heart",
      "am",
      "present",
      "heavy",
      "dance",
      "engine",
      "position",
      "arm",
      "wide",
      "sail",
      "material",
      "fraction",
      "forest",
      "sit",
      "race",
      "window",
      "store",
      "summer",
      "train",
      "sleep",
      "prove",
      "lone",
      "leg",
      "exercise",
      "wall",
      "catch",
      "mount",
      "wish",
      "sky",
      "board",
      "joy",
      "winter",
      "sat",
      "written",
      "wild",
      "instrument",
      "kept",
      "glass",
      "grass",
      "cow",
      "job",
      "edge",
      "sign",
      "visit",
      "past",
      "soft",
      "fun",
      "bright",
      "gas",
      "weather",
      "month",
      "million",
      "bear",
      "finish",
      "happy",
      "hope",
      "flower",
      "clothe",
      "strange",
      "gone",
      "trade",
      "melody",
      "trip",
      "office",
      "receive",
      "row",
      "mouth",
      "exact",
      "symbol",
      "die",
      "least",
      "trouble",
      "shout",
      "except",
      "wrote",
      "seed",
      "tone",
      "join",
      "suggest",
      "clean",
      "break",
      "lady",
      "yard",
      "rise",
      "bad",
      "blow",
      "oil",
      "blood",
      "touch",
      "grew",
      "cent",
      "mix",
      "team",
      "wire",
      "cost",
      "lost",
      "brown",
      "wear",
      "garden",
      "equal",
      "sent",
      "choose",
      "fell",
      "fit",
      "flow",
      "fair",
      "bank",
      "collect",
      "save",
      "control",
      "decimal",
      "ear",
      "else",
      "quite",
      "broke",
      "case",
      "middle",
      "kill",
      "son",
      "lake",
      "moment",
      "scale",
      "loud",
      "spring",
      "observe",
      "child",
      "straight",
      "consonant",
      "nation",
      "dictionary",
      "milk",
      "speed",
      "method",
      "organ",
      "pay",
      "age",
      "section",
      "dress",
      "cloud",
      "surprise",
      "quiet",
      "stone",
      "tiny",
      "climb",
      "cool",
      "design",
      "poor",
      "lot",
      "experiment",
      "bottom",
      "key",
      "iron",
      "single",
      "stick",
      "flat",
      "twenty",
      "skin",
      "smile",
      "crease",
      "hole",
      "jump",
      "baby",
      "eight",
      "village",
      "meet",
      "root",
      "buy",
      "raise",
      "solve",
      "metal",
      "whether",
      "push",
      "seven",
      "paragraph",
      "third",
      "shall",
      "held",
      "hair",
      "describe",
      "cook",
      "floor",
      "either",
      "result",
      "burn",
      "hill",
      "safe",
      "cat",
      "century",
      "consider",
      "type",
      "law",
      "bit",
      "coast",
      "copy",
      "phrase",
      "silent",
      "tall",
      "sand",
      "soil",
      "roll",
      "temperature",
      "finger",
      "industry",
      "value",
      "fight",
      "lie",
      "beat",
      "excite",
      "natural",
      "view",
      "sense",
      "capital",
      "won’t",
      "chair",
      "danger",
      "fruit",
      "rich",
      "thick",
      "soldier",
      "process",
      "operate",
      "practice",
      "separate",
      "difficult",
      "doctor",
      "please",
      "protect",
      "noon",
      "crop",
      "modern",
      "element",
      "hit",
      "student",
      "corner",
      "party",
      "supply",
      "whose",
      "locate",
      "ring",
      "character",
      "insect",
      "caught",
      "period",
      "indicate",
      "radio",
      "spoke",
      "atom",
      "human",
      "history",
      "effect",
      "electric",
      "expect",
      "bone",
      "rail",
      "imagine",
      "provide",
      "agree",
      "thus",
      "gentle",
      "woman",
      "captain",
      "guess",
      "necessary",
      "sharp",
      "wing",
      "create",
      "neighbor",
      "wash",
      "bat",
      "rather",
      "crowd",
      "corn",
      "compare",
      "poem",
      "string",
      "bell",
      "depend",
      "meat",
      "rub",
      "tube",
      "famous",
      "dollar",
      "stream",
      "fear",
      "sight",
      "thin",
      "triangle",
      "planet",
      "hurry",
      "chief",
      "colony",
      "clock",
      "mine",
      "tie",
      "enter",
      "major",
      "fresh",
      "search",
      "send",
      "yellow",
      "gun",
      "allow",
      "print",
      "dead",
      "spot",
      "desert",
      "suit",
      "current",
      "lift",
      "rose",
      "arrive",
      "master",
      "track",
      "parent",
      "shore",
      "division",
      "sheet",
      "substance",
      "favor",
      "connect",
      "post",
      "spend",
      "chord",
      "fat",
      "glad",
      "original",
      "share",
      "station",
      "dad",
      "bread",
      "charge",
      "proper",
      "bar",
      "offer",
      "segment",
      "slave",
      "duck",
      "instant",
      "market",
      "degree",
      "populate",
      "chick",
      "dear",
      "enemy",
      "reply",
      "drink",
      "occur",
      "support",
      "speech",
      "nature",
      "range",
      "steam",
      "motion",
      "path",
      "liquid",
      "log",
      "meant",
      "quotient",
      "teeth",
      "shell",
      "neck",
      "oxygen",
      "sugar",
      "death",
      "pretty",
      "skill",
      "women",
      "season",
      "solution",
      "magnet",
      "silver",
      "thank",
      "branch",
      "match",
      "suffix",
      "especially",
      "fig",
      "afraid",
      "huge",
      "sister",
      "steel",
      "discuss",
      "forward",
      "similar",
      "guide",
      "experience",
      "score",
      "apple",
      "bought",
      "led",
      "pitch",
      "coat",
      "mass",
      "card",
      "band",
      "rope",
      "slip",
      "win",
      "dream",
      "evening",
      "condition",
      "feed",
      "tool",
      "total",
      "basic",
      "smell",
      "valley",
      "nor",
      "double",
      "seat",
      "continue",
      "block",
      "chart",
      "hat",
      "sell",
      "success",
      "company",
      "subtract",
      "event",
      "particular",
      "deal",
      "swim",
      "term",
      "opposite",
      "wife",
      "shoe",
      "shoulder",
      "spread",
      "arrange",
      "camp",
      "invent",
      "cotton",
      "born",
      "determine",
      "quart",
      "nine",
      "truck",
      "noise",
      "level",
      "chance",
      "gather",
      "shop",
      "stretch",
      "throw",
      "shine",
      "property",
      "column",
      "molecule",
      "select",
      "wrong",
      "gray",
      "repeat",
      "require",
      "broad",
      "prepare",
      "salt",
      "nose",
      "plural",
      "anger",
      "claim",
      "continent",
];

export const TypingArea = forwardRef((props, ref) => {
      const [allWords, setAllWords] = useState(props.allWords);

      const [restart, setRestart] = useState({});
      const [timerState, setTimerState] = useState({
            elapsedTime: 0,
            timerId: undefined,
      });

      const [showParagraphLoader, setShowParagraphLoader] = useState(false);
      const words = useMemo(() => {
            let words = [];
            if (props.mode === "test") {
                  for (let i = 0; i < 100; i++) {
                        const randomNumber = Math.floor(Math.random() * 100);
                        words.push(allWords[randomNumber]);
                        words.push(" ");
                  }
            } else {
                  if (props.modeOne === "letters") {
                        if (props.modeTwo === "1") {
                              const letter = props.allWords[props.wordIndex];
                              const randomLetter =
                                    props.allLetters[
                                          Math.floor(Math.random() * 25)
                                    ];

                              for (let i = 0; i < 100; i++) {
                                    let randomLength =
                                          Math.floor(Math.random() * 3) + 1;

                                    words.push(letter.repeat(randomLength));

                                    words.push(" ");

                                    randomLength =
                                          Math.floor(Math.random() * 3) + 1;

                                    words.push(
                                          randomLetter.repeat(randomLength)
                                    );
                                    words.push(" ");
                              }
                        } else {
                              const letter = props.allWords[props.wordIndex];
                              for (let i = 0; i < 100; i++) {
                                    const randomLength =
                                          Math.floor(Math.random() * 3) + 1;

                                    words.push(letter.repeat(randomLength));
                                    words.push(" ");
                              }
                        }
                  } else {
                        if (props.modeTwo === "1") {
                              const word = props.allWords[props.wordIndex];
                              const randomWord =
                                    commonWords[
                                          Math.floor(Math.random() * 100)
                                    ];

                              for (let i = 0; i < 100; i++) {
                                    let randomLength =
                                          Math.floor(Math.random() * 2) + 1;

                                    for (let i = 0; i < randomLength; i++) {
                                          words.push(word);
                                          words.push(" ");
                                    }

                                    randomLength =
                                          Math.floor(Math.random() * 2) + 1;

                                    for (let i = 0; i < randomLength; i++) {
                                          words.push(randomWord);
                                          words.push(" ");
                                    }
                              }
                        } else {
                              for (let i = 0; i < 100; i++) {
                                    words.push(props.allWords[props.wordIndex]);
                                    words.push(" ");
                              }
                        }
                  }
            }
            return words;
      }, [restart, props.allWords]);

      const letters = useMemo(() => {
            const letters = [];
            for (let i = 0; i < words.length; i++) {
                  letters.push(...words[i]);
            }
            return letters;
      }, [words]);

      const [typingState, dispatch] = useReducer(
            typingParagraphReducer,
            initialTypingState
      );

      const testStats = useMemo(() => {
            return {
                  mode: props.mode,
                  totalNumberOfRightHits: 0,
                  totalNumberOfWrongHits: 0,
                  wpm: 0,
                  accuracy: 0,
                  charactersStats: {},
                  wordsStats: {},
            };
      }, [restart]);

      if (timerState.elapsedTime === props.timer && !typingState.finished) {
            clearInterval(timerState.timerId);
            updateWpmAndAccuracy(timerState, testStats);
            console.log(testStats);
            dispatch({ type: "finished test" });
      }

      const keyDownHandler = (event) => {
            props.typingSound.play();

            if (!typingState.finished && event.key !== "Tab") {
                  if (event.key === letters[typingState.paragraphNextIndex]) {
                        dispatch({
                              type: "right hit",
                              payload: {
                                    words,
                                    testStats,
                              },
                        });
                        updateCharactersStats(
                              { type: "right hit" },
                              testStats,
                              letters[typingState.paragraphNextIndex],
                              timerState
                        );
                  } else {
                        dispatch({
                              type: "wrong hit",
                              payload: {
                                    words,
                                    testStats,
                              },
                        });
                        updateCharactersStats(
                              { type: "wrong hit" },
                              testStats,
                              letters[typingState.paragraphNextIndex],
                              timerState
                        );
                  }

                  if (timerState.timerId === undefined) {
                        const timerId = setInterval(() => {
                              setTimerState((previous) => {
                                    return {
                                          ...previous,
                                          elapsedTime: previous.elapsedTime + 1,
                                    };
                              });
                        }, 1000);
                        setTimerState((previous) => {
                              return { ...previous, timerId };
                        });
                  }
            }
      };

      const typingParagraphRef = useRef();
      const wordRef = useRef(null);

      const paragraph = createtypingParagraphJsx(words, typingState, wordRef);

      const restartHandler = () => {
            if (props.wordIndex === props.allWords.length - 1) {
                  props.setWordIndex(0);
            } else {
                  props.setWordIndex((previous) => {
                        return previous + 1;
                  });
            }

            dispatch({ type: "reset" });
            setRestart({});
            clearInterval(timerState.timerId);
            setTimerState({
                  elapsedTime: 0,
                  timerId: undefined,
            });
      };

      const goBackButtonClickHandler = () => {
            if (props.wordIndex === 0) {
                  return;
            } else {
                  props.setWordIndex((previous) => {
                        return previous - 1;
                  });
            }

            dispatch({ type: "reset" });
            setRestart({});
            clearInterval(timerState.timerId);
            setTimerState({
                  elapsedTime: 0,
                  timerId: undefined,
            });
      };

      const focusHandler = (event) => {
            event.target.style.border = "3px solid black";
      };

      const restartKeyDownHandler = (event) => {
            if (event.key === "Enter") {
                  event.target.click();
                  typingParagraphRef.current.focus();
                  event.target.blur();
            }
      };
      const goBackButtonKeyDownHandler = (event) => {
            if (event.key === "Enter") {
                  event.target.click();
                  typingParagraphRef.current.focus();
                  event.target.blur();
            }
      };

      const restartOnBlurHandler = (event) => {
            event.target.style.border = "none";
      };

      useEffect(() => {
            if (
                  wordRef.current &&
                  (wordRef.current.offsetTop >= 120 ||
                        wordRef.current.offsetTop % 40 === 0)
            ) {
                  wordRef.current.scrollIntoView(false);
            }
      }, [wordRef.current]);

      useEffect(() => {
            typingParagraphRef.current.focus();
      }, []);

      const statsFetcher = useFetcher();
      const statsFetcherStatus =
            statsFetcher.data && statsFetcher.state === "idle";

      useEffect(() => {
            if (statsFetcherStatus) {
                  const data = statsFetcher.data;
                  if (data.status === "success") {
                        toast.success(data.message, toastOptions);
                  } else {
                        toast.error(data.message, toastOptions);
                  }
            }
      }, [statsFetcher]);
      useEffect(() => {
            if (typingState.finished) {
                  const api = async () => {
                        statsFetcher.submit(testStats, {
                              action: "/stats",
                              method: "POST",
                              encType: "application/json",
                        });
                  };

                  api();
            }
      }, [typingState.finished]);

      return (
            <>
                  {/* {typingState.finished ? (
                        <TestStats
                              testStats={testStats}
                              theme={props.theme}
                        ></TestStats>
                  ) : null} */}
                  <div className={styles["test-stats"]}>
                        <div className={styles["test-stat"]}>
                              {timerState.elapsedTime}
                        </div>
                        {!typingState.finished ? (
                              ""
                        ) : (
                              <div className={styles["test-stat"]}>
                                    speed:{" "}
                                    {props.mode === "practise"
                                          ? Math.round(
                                                  testStats.wordsStats[
                                                        props.allWords[
                                                              props.wordIndex
                                                        ]
                                                  ].wpm
                                            )
                                          : testStats.wpm}
                                    wpm
                              </div>
                        )}
                        {!typingState.finished ? (
                              ""
                        ) : (
                              <div className={styles["test-stat"]}>
                                    accuracy: {testStats.accuracy}%
                              </div>
                        )}

                        <div>
                              {props.mode === "practise" ? (
                                    <div
                                          className={
                                                styles[
                                                      "load-next-paragraph-form"
                                                ]
                                          }
                                    >
                                          <button
                                                tabIndex={0}
                                                type="submit"
                                                ref={ref}
                                                className={
                                                      styles[
                                                            "load-next-paragraph-button"
                                                      ] +
                                                      " " +
                                                      styles[
                                                            `icon-${props.theme}`
                                                      ]
                                                }
                                                onFocus={focusHandler}
                                                onBlur={restartOnBlurHandler}
                                                onKeyDown={
                                                      goBackButtonKeyDownHandler
                                                }
                                                onClick={
                                                      goBackButtonClickHandler
                                                }
                                          >
                                                <FontAwesomeIcon
                                                      icon={faBackward}
                                                />
                                          </button>
                                    </div>
                              ) : null}

                              <button
                                    ref={ref}
                                    className={
                                          styles["load-next-paragraph-button"] +
                                          " " +
                                          styles[`icon-${props.theme}`]
                                    }
                                    // onClick={restartHandler}
                                    // onFocus={focusHandler}
                                    // onKeyDown={restartKeyDownHandler}
                                    // onBlur={restartOnBlurHandler}
                              >
                                    <FontAwesomeIcon icon={faRotate} />
                              </button>

                              <div
                                    className={
                                          styles["load-next-paragraph-form"]
                                    }
                              >
                                    <button
                                          tabIndex={0}
                                          type="submit"
                                          ref={ref}
                                          className={
                                                styles[
                                                      "load-next-paragraph-button"
                                                ] +
                                                " " +
                                                styles[`icon-${props.theme}`]
                                          }
                                          onFocus={focusHandler}
                                          onKeyDown={restartKeyDownHandler}
                                          onBlur={restartOnBlurHandler}
                                          onClick={restartHandler}
                                    >
                                          <FontAwesomeIcon icon={faForward} />
                                    </button>
                              </div>
                        </div>
                  </div>

                  <div
                        className={styles["typing-paragraph"]}
                        onKeyDown={keyDownHandler}
                        ref={typingParagraphRef}
                        tabIndex={-1}
                  >
                        {showParagraphLoader ? (
                              <div className={styles["paragraph-loader"]}>
                                    <ColorRing {...colorRingOptions} />
                              </div>
                        ) : (
                              paragraph
                        )}
                  </div>
                  {/* {props.mode === "practise" ? (
                        <WordsQueue
                              words={props.allWords}
                              statsData={props.statsData}
                        ></WordsQueue>
                  ) : null} */}
            </>
      );
});
