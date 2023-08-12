import {
      forwardRef,
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

const data = [
      ..."south africa may not be getting as many international fixtures as other teams but their players are being exposed to a higher level of competition at the franchise level",
];
export const TypingParagraph = forwardRef((props, ref) => {
      const paragraph = useLoaderData();
      const data = [...paragraph];
      console.log(data);
      const typingParagraphRef = useRef();

      const [typingState, dispatch] = useReducer(
            typingParagraphReducer,
            initialTypingState
      );

      const [timerState, setTimerState] = useState({
            elapsedTime: 0,
            timerId: undefined,
      });

      const testStats = useMemo(() => {
            return {
                  totalNumberOfRightHits: 0,
                  totalNumberOfWrongHits: 0,
                  wpm: 0,
                  accuracy: 0,
                  charactersStats: {},
            };
      }, [timerState.timerId]);

      useEffect(() => {
            typingParagraphRef.current.focus();
      }, []);
      useEffect(() => {
            if (typingState.finished) {
                  postTestStats(testStats);
            }
      }, [typingState.finished]);

      if (timerState.elapsedTime === props.timer && !typingState.finished) {
            console.log(testStats);
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
            clearInterval(timerState.timerId);
            dispatch({ type: "finished test" });
      }

      const keyDownHandler = (event) => {
            if (!typingState.finished) {
                  if (event.key === data[typingState.paragraphNextIndex]) {
                        dispatch({ type: "right hit" });
                        updateCharactersStats(
                              { type: "right hit" },
                              testStats,
                              data[typingState.paragraphNextIndex]
                        );
                  } else {
                        dispatch({ type: "wrong hit" });
                        updateCharactersStats(
                              { type: "wrong hit" },
                              testStats,
                              data[typingState.paragraphNextIndex]
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
                        {data.map((letter, index) => {
                              let className = "";
                              if (index === typingState.paragraphCurrentIndex) {
                                    className =
                                          styles[
                                                typingState.currentLetterClass
                                          ];
                              } else if (
                                    index < typingState.paragraphCurrentIndex
                              ) {
                                    className = styles["active-right"];
                              }
                              if (index === typingState.paragraphNextIndex) {
                                    if (className === "") {
                                          className =
                                                styles["active-next-character"];
                                    } else {
                                          className +=
                                                " " +
                                                styles["active-next-character"];
                                    }
                              }
                              return (
                                    <span
                                          className={
                                                styles["letter"] +
                                                " " +
                                                className
                                          }
                                    >
                                          {letter}
                                    </span>
                              );
                        })}
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
