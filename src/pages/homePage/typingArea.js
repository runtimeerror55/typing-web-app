import {
      forwardRef,
      useCallback,
      useEffect,
      useMemo,
      useReducer,
      useRef,
      useState,
} from "react";
import styles from "./typingParagraph.module.css";
import { TestStats } from "./testStats";
import { typingParagraphReducer } from "../../reducers/typingParagraphReducer";
import { postTestStats } from "../../actions/actions";
import { useLoaderData } from "react-router-dom";
import wipe from "../../assets/sounds/wipe.mp3";
import { Howl, Howler } from "howler";

const x = new Howl({
      src: [wipe],
});

const initialTypingState = {
      paragraphCurrentIndex: -1,
      paragraphNextIndex: 0,
      currentLetterClass: "typing-letter",
      started: false,
      finished: false,
};

const updateCharactersStats = (action, testStats, currentCharacter) => {
      if (action.type === "right hit") {
            if (testStats["charactersStats"][currentCharacter] === undefined) {
                  testStats["charactersStats"][currentCharacter] = {
                        totalNumberOfRightHits: 1,
                        totalNumberOfWrongHits: 0,
                  };
            } else {
                  testStats["charactersStats"][currentCharacter]
                        .totalNumberOfRightHits++;
            }
            testStats["totalNumberOfRightHits"]++;
      } else {
            if (testStats["charactersStats"][currentCharacter] === undefined) {
                  testStats["charactersStats"][currentCharacter] = {
                        totalNumberOfRightHits: 0,
                        totalNumberOfWrongHits: 1,
                  };
            } else {
                  testStats["charactersStats"][currentCharacter]
                        .totalNumberOfWrongHits++;
            }
            testStats["totalNumberOfWrongHits"]++;
      }
};

const updateWpmAndAccuracy = (timerState, testStats) => {
      testStats.wpm =
            Math.floor(
                  (testStats.totalNumberOfRightHits / 5) *
                        (60 / timerState.elapsedTime)
            ) || 0;
      testStats.accuracy =
            Math.floor(
                  (testStats.totalNumberOfRightHits /
                        (testStats.totalNumberOfRightHits +
                              testStats.totalNumberOfWrongHits)) *
                        100
            ) || 0;
};

const createtypingParagraphJsx = (words, typingState, wordRef) => {
      const paragraph = [];
      let index = -1;
      for (let i = 0; i < words.length; i++) {
            const word = words[i];
            const temporary = [];
            for (let j = 0; j < word.length; j++) {
                  let className = "";
                  index++;
                  if (index === typingState.paragraphCurrentIndex) {
                        className = styles[typingState.currentLetterClass];
                  } else if (index < typingState.paragraphCurrentIndex) {
                        className = styles["active-right"];
                  }
                  if (index === typingState.paragraphNextIndex) {
                        if (className === "") {
                              className = styles["active-next-character"];
                        } else {
                              className +=
                                    " " + styles["active-next-character"];
                        }
                  }
                  if (word[j] === " ") {
                        temporary.push(
                              <span
                                    className={
                                          styles["letter"] + " " + className
                                    }
                              >
                                    &nbsp;
                              </span>
                        );
                  } else {
                        temporary.push(
                              <span
                                    //
                                    className={
                                          styles["letter"] + " " + className
                                    }
                              >
                                    {word[j]}
                              </span>
                        );
                  }
            }
            if (
                  typingState.paragraphNextIndex <= index &&
                  typingState.paragraphNextIndex > index - word.length
            ) {
                  paragraph.push(
                        <div ref={wordRef} className={styles["word"]}>
                              {temporary}
                        </div>
                  );
            } else {
                  paragraph.push(
                        <div className={styles["word"]}>{temporary}</div>
                  );
            }
      }

      return paragraph;
};

export const TypingArea = forwardRef((props, ref) => {
      const words = useLoaderData();

      const [timerState, setTimerState] = useState({
            elapsedTime: 0,
            timerId: undefined,
      });
      const [typingState, dispatch] = useReducer(
            typingParagraphReducer,
            initialTypingState
      );

      const letters = useMemo(() => {
            const letters = [];
            for (let i = 0; i < words.length; i++) {
                  letters.push(...words[i]);
            }
            return letters;
      }, []);
      const testStats = useMemo(() => {
            return {
                  totalNumberOfRightHits: 0,
                  totalNumberOfWrongHits: 0,
                  wpm: 0,
                  accuracy: 0,
                  charactersStats: {},
            };
      }, [timerState.timerId]);

      const typingParagraphRef = useRef();
      const wordRef = useRef(null);

      const paragraph = createtypingParagraphJsx(words, typingState, wordRef);

      if (timerState.elapsedTime === props.timer && !typingState.finished) {
            clearInterval(timerState.timerId);
            updateWpmAndAccuracy(timerState, testStats);
            console.log(testStats);
            dispatch({ type: "finished test" });
      }

      const keyDownHandler = (event) => {
            x.play();

            if (!typingState.finished) {
                  if (event.key === letters[typingState.paragraphNextIndex]) {
                        dispatch({ type: "right hit" });
                        updateCharactersStats(
                              { type: "right hit" },
                              testStats,
                              letters[typingState.paragraphNextIndex],
                              timerState
                        );
                  } else {
                        dispatch({ type: "wrong hit" });
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

      const restartHandler = () => {
            dispatch({ type: "reset" });
            clearInterval(timerState.timerId);
            setTimerState({
                  elapsedTime: 0,
                  timerId: undefined,
            });
      };

      const focusHandler = (event) => {
            event.target.style.backgroundColor = "grey";
      };

      const restartKeyDownHandler = (event) => {
            console.log(event.key);

            if (event.key === "Enter") {
                  event.target.click();
                  typingParagraphRef.current.focus();
                  ref.current.blur();
            }
      };

      const restartOnBlurHandler = (event) => {
            event.target.style.backgroundColor = "white";
      };

      useEffect(() => {
            if (
                  wordRef.current.offsetTop >= 120 ||
                  wordRef.current.offsetTop % 40 === 0
            ) {
                  wordRef.current.scrollIntoView(false);
            }
      }, [wordRef.current]);

      useEffect(() => {
            typingParagraphRef.current.focus();
      }, []);
      useEffect(() => {
            if (typingState.finished) {
                  postTestStats(testStats);
            }
      }, [typingState.finished]);

      return (
            <>
                  <TestStats
                        testStats={testStats}
                        typingState={typingState}
                        timerState={timerState}
                  ></TestStats>

                  <div
                        className={styles["typing-paragraph"]}
                        onKeyDown={keyDownHandler}
                        ref={typingParagraphRef}
                        tabIndex={0}
                  >
                        {paragraph}
                  </div>
                  <button
                        ref={ref}
                        className={styles["restart-button"]}
                        onClick={restartHandler}
                        onFocus={focusHandler}
                        onKeyDown={restartKeyDownHandler}
                        onBlur={restartOnBlurHandler}
                  >
                        Restart
                  </button>
            </>
      );
});
