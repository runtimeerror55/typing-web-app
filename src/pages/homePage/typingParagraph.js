import { forwardRef, useEffect, useRef, useState } from "react";
import styles from "./typingParagraph.module.css";
import { TestStats } from "./testStats";

const data = [
      ..."south africa may not be getting as many international fixtures as other teams but their players are being exposed to a higher level of competition at the franchise level",
];
export const TypingParagraph = forwardRef((props, ref) => {
      const typingParagraphRef = useRef();
      useEffect(() => {
            typingParagraphRef.current.focus();
      }, []);
      const [typingState, setTypingState] = useState({
            paragraphCurrentIndex: -1,
            paragraphNextIndex: 0,
            currentLetterClass: "typing-letter",
            started: false,
            finished: false,
      });
      const [testStats, setTestStats] = useState({
            elapsedTime: 0,
            timerId: undefined,
            numberOfRightCharacters: 0,
            numberOfWrongCharacters: 0,
      });
      console.log(typeof props.timer, typeof testStats.elapsedTime);
      if (testStats.elapsedTime === props.timer && !typingState.finished) {
            clearInterval(testStats.timerId);
            setTypingState((previous) => {
                  return { ...previous, finished: true };
            });
      }

      const keyDownHandler = (event) => {
            if (!typingState.finished) {
                  if (event.key === data[typingState.paragraphNextIndex]) {
                        setTypingState((previous) => {
                              return {
                                    paragraphCurrentIndex:
                                          previous.paragraphNextIndex,
                                    paragraphNextIndex:
                                          previous.paragraphNextIndex + 1,
                                    currentLetterClass: "active-right",
                                    started: true,
                              };
                        });

                        setTestStats((previous) => {
                              return {
                                    ...previous,
                                    numberOfRightCharacters:
                                          previous.numberOfRightCharacters + 1,
                              };
                        });
                  } else {
                        setTypingState((previous) => {
                              return {
                                    paragraphCurrentIndex:
                                          previous.paragraphNextIndex,
                                    paragraphNextIndex:
                                          previous.paragraphNextIndex,
                                    currentLetterClass: "active-wrong",
                                    started: true,
                              };
                        });
                        setTestStats((previous) => {
                              return {
                                    ...previous,
                                    numberOfWrongCharacters:
                                          previous.numberOfWrongCharacters + 1,
                              };
                        });
                  }

                  if (testStats.timerId === undefined) {
                        const timerId = setInterval(() => {
                              setTestStats((previous) => {
                                    return {
                                          ...previous,
                                          elapsedTime: previous.elapsedTime + 1,
                                    };
                              });
                        }, 1000);
                        setTestStats((previous) => {
                              return { ...previous, timerId };
                        });
                  }
            }
      };

      const restartHandler = () => {
            setTypingState({
                  paragraphCurrentIndex: -1,
                  paragraphNextIndex: 0,
                  currentLetterClass: "typing-letter",
                  started: false,
                  finished: false,
            });
            clearInterval(testStats.timerId);
            setTestStats({
                  elapsedTime: 0,
                  timerId: undefined,
                  numberOfRightCharacters: 0,
                  numberOfWrongCharacters: 0,
            });
      };

      const focusHandler = (event) => {
            console.log(event.curretTarget, event.target);

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
