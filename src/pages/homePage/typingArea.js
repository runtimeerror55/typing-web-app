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
import { faRotate, faForward } from "@fortawesome/free-solid-svg-icons";
import { ColorRing } from "react-loader-spinner";
import { colorRingOptions, toastOptions } from "../../utilities/utilities";

import {
      updateCharactersStats,
      updateWpmAndAccuracy,
      createtypingParagraphJsx,
      initialTypingState,
} from "../../utilities/utilities";

// const initialTypingState = {
//       paragraphCurrentIndex: -1,
//       paragraphNextIndex: 0,
//       currentLetterClass: "typing-letter",
//       started: false,
//       finished: false,
// };

// const updateCharactersStats = (action, testStats, currentCharacter) => {
//       if (action.type === "right hit") {
//             if (testStats["charactersStats"][currentCharacter] === undefined) {
//                   testStats["charactersStats"][currentCharacter] = {
//                         totalNumberOfRightHits: 1,
//                         totalNumberOfWrongHits: 0,
//                   };
//             } else {
//                   testStats["charactersStats"][currentCharacter]
//                         .totalNumberOfRightHits++;
//             }
//             testStats["totalNumberOfRightHits"]++;
//       } else {
//             if (testStats["charactersStats"][currentCharacter] === undefined) {
//                   testStats["charactersStats"][currentCharacter] = {
//                         totalNumberOfRightHits: 0,
//                         totalNumberOfWrongHits: 1,
//                   };
//             } else {
//                   testStats["charactersStats"][currentCharacter]
//                         .totalNumberOfWrongHits++;
//             }
//             testStats["totalNumberOfWrongHits"]++;
//       }
// };

// const updateWpmAndAccuracy = (timerState, testStats) => {
//       testStats.wpm =
//             Math.floor(
//                   (testStats.totalNumberOfRightHits / 5) *
//                         (60 / timerState.elapsedTime)
//             ) || 0;
//       testStats.accuracy =
//             Math.floor(
//                   (testStats.totalNumberOfRightHits /
//                         (testStats.totalNumberOfRightHits +
//                               testStats.totalNumberOfWrongHits)) *
//                         100
//             ) || 0;
// };

// const createtypingParagraphJsx = (words, typingState, wordRef) => {
//       const paragraph = [];
//       let index = -1;
//       for (let i = 0; i < words.length; i++) {
//             const word = words[i];
//             const temporary = [];
//             for (let j = 0; j < word.length; j++) {
//                   let className = "";
//                   index++;
//                   if (index === typingState.paragraphCurrentIndex) {
//                         className = styles[typingState.currentLetterClass];
//                   } else if (index < typingState.paragraphCurrentIndex) {
//                         className = styles["active-right"];
//                   }
//                   if (index === typingState.paragraphNextIndex) {
//                         if (className === "") {
//                               className = styles["active-next-character"];
//                         } else {
//                               className +=
//                                     " " + styles["active-next-character"];
//                         }
//                   }
//                   if (word[j] === " ") {
//                         temporary.push(
//                               <span
//                                     className={
//                                           styles["letter"] + " " + className
//                                     }
//                               >
//                                     &nbsp;
//                               </span>
//                         );
//                   } else {
//                         temporary.push(
//                               <span
//                                     //
//                                     className={
//                                           styles["letter"] + " " + className
//                                     }
//                               >
//                                     {word[j]}
//                               </span>
//                         );
//                   }
//             }
//             if (
//                   typingState.paragraphNextIndex <= index &&
//                   typingState.paragraphNextIndex > index - word.length
//             ) {
//                   paragraph.push(
//                         <div ref={wordRef} className={styles["word"]}>
//                               {temporary}
//                         </div>
//                   );
//             } else {
//                   paragraph.push(
//                         <div className={styles["word"]}>{temporary}</div>
//                   );
//             }
//       }

//       return paragraph;
// };

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
                              const letter = allWords[props.wordIndex];
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
                              console.log(words);
                        } else {
                              const letter = allWords[props.wordIndex];
                              for (let i = 0; i < 100; i++) {
                                    const randomLength =
                                          Math.floor(Math.random() * 3) + 1;

                                    words.push(letter.repeat(randomLength));
                                    words.push(" ");
                              }
                        }
                  } else {
                        if (props.modeTwo === "1") {
                              const word = allWords[props.wordIndex];
                              const randomWord =
                                    props.allWords[
                                          Math.floor(Math.random() * 100)
                                    ];

                              for (let i = 0; i < 100; i++) {
                                    let randomLength =
                                          Math.floor(Math.random() * 3) + 1;

                                    for (let i = 0; i < randomLength; i++) {
                                          words.push(word);
                                          words.push(" ");
                                    }

                                    randomLength =
                                          Math.floor(Math.random() * 3) + 1;

                                    for (let i = 0; i < randomLength; i++) {
                                          words.push(randomWord);
                                          words.push(" ");
                                    }
                              }
                        } else {
                              for (let i = 0; i < 100; i++) {
                                    words.push(allWords[props.wordIndex]);
                                    words.push(" ");
                              }
                        }
                  }
            }
            return words;
      }, [restart]);

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
            console.log("yes");
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
            props.setWordIndex((previous) => {
                  return previous + 1;
            });
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
                  ref.current.blur();
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
                  {typingState.finished ? (
                        <TestStats
                              testStats={testStats}
                              theme={props.theme}
                        ></TestStats>
                  ) : null}
                  <div className={styles["test-stats"]}>
                        <div className={styles["test-stat"]}>
                              {timerState.elapsedTime}
                        </div>
                        {!typingState.finished ? (
                              ""
                        ) : (
                              <div className={styles["test-stat"]}>
                                    wpm: {testStats.wpm}
                              </div>
                        )}
                        {!typingState.finished ? (
                              ""
                        ) : (
                              <div className={styles["test-stat"]}>
                                    accuracy: {testStats.accuracy}
                              </div>
                        )}

                        <div>
                              <button
                                    ref={ref}
                                    className={
                                          styles["load-next-paragraph-button"] +
                                          " " +
                                          styles[`icon-${props.theme}`]
                                    }
                                    onClick={restartHandler}
                                    onFocus={focusHandler}
                                    onKeyDown={restartKeyDownHandler}
                                    onBlur={restartOnBlurHandler}
                              >
                                    <FontAwesomeIcon icon={faRotate} />
                              </button>

                              <div
                                    className={
                                          styles["load-next-paragraph-form"]
                                    }
                              >
                                    <button
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
                        tabIndex={0}
                  >
                        {showParagraphLoader ? (
                              <div className={styles["paragraph-loader"]}>
                                    <ColorRing {...colorRingOptions} />
                              </div>
                        ) : (
                              paragraph
                        )}
                  </div>
            </>
      );
});
