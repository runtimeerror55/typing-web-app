import {
      forwardRef,
      useCallback,
      useContext,
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
      wordsMixer,
      wordsMixerOne,
} from "../../utilities/utilities";
import { authContext } from "../../context/auth";

export const TypingArea = forwardRef((props, ref) => {
      const [allWords, setAllWords] = useState(props.allWords);
      const { decodedToken } = useContext(authContext);
      const [showParagraphFocusOverlay, setShowParagraphFocusOverlay] =
            useState(false);
      const [restart, setRestart] = useState({});
      const [timerState, setTimerState] = useState({
            elapsedTime: 0,
            timerId: undefined,
      });

      //   const [showParagraphLoader, setShowParagraphLoader] = useState(false);
      const words = useMemo(() => {
            return wordsMixerOne(props);
      }, [restart]);

      const letters = useMemo(() => {
            const letters = [];
            console.log(words);
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
                  languageAndRange: props.languageAndRange,
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
            console.log(testStats);
            clearInterval(timerState.timerId);
            updateWpmAndAccuracy(timerState, testStats);

            dispatch({ type: "finished test" });
            props.setShowTestStarted(false);
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
                                    props.setShowTestStarted(true);
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

      const paragraph = createtypingParagraphJsx(
            words,
            typingState,
            wordRef,
            props.theme
      );

      const restartHandler = (event) => {
            if (
                  (props.wordIndex === props.allWords.length - 1 &&
                        props.mode === "test") ||
                  (props.mode === "practise" &&
                        props.wordIndex ===
                              props.practiseModeAllWords.length - 1)
            ) {
                  props.setWordIndex(0);
            } else {
                  props.setWordIndex((previous) => {
                        return previous + 1;
                  });
            }

            dispatch({ type: "reset" });
            setRestart({});
            props.setShowTestStarted(false);
            clearInterval(timerState.timerId);
            setTimerState({
                  elapsedTime: 0,
                  timerId: undefined,
            });
            typingParagraphRef.current.focus();
            typingParagraphRef.current.scrollTo(0, 0);
            event.target.blur();
      };

      const reloadWordPractise = (event) => {
            dispatch({ type: "reset" });
            setRestart({});
            props.setShowTestStarted(false);
            clearInterval(timerState.timerId);
            setTimerState({
                  elapsedTime: 0,
                  timerId: undefined,
            });
            typingParagraphRef.current.focus();
            event.target.blur();
      };

      const reloadWordPractiseKeyDownHandler = (event) => {
            if (event.key === "Enter") {
                  event.target.click();
            }
      };
      const goBackButtonClickHandler = (event) => {
            typingParagraphRef.current.focus();
            event.target.blur();
            if (props.wordIndex === 0) {
                  return;
            } else {
                  props.setWordIndex((previous) => {
                        return previous - 1;
                  });
            }

            dispatch({ type: "reset" });
            setRestart({});
            props.setShowTestStarted(false);
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
            }
      };
      const goBackButtonKeyDownHandler = (event) => {
            if (event.key === "Enter") {
                  event.target.click();
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
                  console.log(data);
                  if (data.status === "success") {
                        props.setStatsData(data);
                        toast.success(
                              "stats fetched successfully",
                              toastOptions
                        );
                  } else {
                        toast.error(data.message, toastOptions);
                  }
            }
      }, [statsFetcher]);
      useEffect(() => {
            if (typingState.finished && decodedToken) {
                  const api = async () => {
                        const data = await postTestStats(testStats);
                        if (data.status === "success") {
                              statsFetcher.submit(props.languageAndRange, {
                                    action: "/stats",
                                    method: "GET",
                              });
                        } else {
                              toast.error(data.message, toastOptions);
                        }
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
                                                        props
                                                              .practiseModeAllWords[
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
                                    <>
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
                                                      onBlur={
                                                            restartOnBlurHandler
                                                      }
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

                                          <div
                                                className={
                                                      styles[
                                                            "load-next-paragraph-form"
                                                      ]
                                                }
                                          >
                                                <button
                                                      tabIndex={0}
                                                      className={
                                                            styles[
                                                                  "load-next-paragraph-button"
                                                            ] +
                                                            " " +
                                                            styles[
                                                                  `icon-${props.theme}`
                                                            ]
                                                      }
                                                      onClick={
                                                            reloadWordPractise
                                                      }
                                                      onFocus={focusHandler}
                                                      onKeyDown={
                                                            reloadWordPractiseKeyDownHandler
                                                      }
                                                      onBlur={
                                                            restartOnBlurHandler
                                                      }
                                                >
                                                      <FontAwesomeIcon
                                                            icon={faRotate}
                                                      />
                                                </button>
                                          </div>
                                    </>
                              ) : null}

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
                        onBlur={() => {
                              setShowParagraphFocusOverlay(true);
                        }}
                        onFocus={(event) => {
                              event.stopPropagation();
                              setShowParagraphFocusOverlay(false);
                        }}
                        ref={typingParagraphRef}
                        tabIndex={-1}
                  >
                        {props.showParagraphLoader ? (
                              <div className={styles["paragraph-loader"]}>
                                    <ColorRing {...colorRingOptions} />
                              </div>
                        ) : (
                              paragraph
                        )}
                        {showParagraphFocusOverlay ? (
                              <div
                                    className={
                                          styles["paragraph-on-blur-overlay"]
                                    }
                                    onFocus={(event) => {
                                          event.stopPropagation();
                                    }}
                              >
                                    click here to focus
                              </div>
                        ) : null}
                  </div>
                  {props.mode === "practise" && props.showWordsQueue ? (
                        <WordsQueue
                              words={props.practiseModeAllWords}
                              statsData={props.statsData}
                              theme={props.theme}
                        ></WordsQueue>
                  ) : null}
            </>
      );
});
