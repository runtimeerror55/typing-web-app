import { useState } from "react";
import styles from "./typingParagraph.module.css";
import { TestStats } from "./testStats";

const data = [
      ..."south africa may not be getting as many international fixtures as other teams but their players are being exposed to a higher level of competition at the franchise level",
];
export const TypingParagraph = () => {
      const [typingState, setTypingState] = useState({
            paragraphCurrentIndex: -1,
            paragraphNextIndex: 0,
            currentLetterClass: "typing-letter",
            started: false,
      });
      const [testStats, setTestStats] = useState({
            elapsedTime: 0,
            timerId: undefined,
            numberOfRightCharacters: 0,
            numberOfWrongCharacters: 0,
      });
      if (testStats.elapsedTime === 15) {
            clearInterval(testStats.timerId);
      }
      const keyDownHandler = (event) => {
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
                              paragraphNextIndex: previous.paragraphNextIndex,
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
            if (!typingState.started) {
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
      };
      return (
            <>
                  <TestStats testStats={testStats}></TestStats>

                  <div
                        className={styles["typing-paragraph"]}
                        onKeyDown={keyDownHandler}
                        tabIndex={0}
                  >
                        {data.map((letter, index) => {
                              let className = "";
                              if (index === typingState.paragraphCurrentIndex) {
                                    className = typingState.currentLetterClass;
                              } else if (
                                    index < typingState.paragraphCurrentIndex
                              ) {
                                    className = "active-right";
                              }
                              return (
                                    <span className={styles[className]}>
                                          {letter}
                                    </span>
                              );
                        })}
                  </div>
            </>
      );
};
