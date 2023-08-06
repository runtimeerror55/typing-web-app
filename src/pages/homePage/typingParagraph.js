import { useState } from "react";
import styles from "./typingParagraph.module.css";

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
      const [timer, setTimer] = useState({
            elapsedTime: 0,
            timerId: undefined,
      });
      if (timer.elapsedTime === 15) {
            clearInterval(timer.timerId);
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
            }
            if (!typingState.started) {
                  const timerId = setInterval(() => {
                        setTimer((previous) => {
                              return {
                                    elapsedTime: previous.elapsedTime + 1,
                                    timerId: previous.timerId,
                              };
                        });
                  }, 1000);
                  setTimer({ elapsedTime: 0, timerId });
            }
      };
      return (
            <>
                  <div className={styles["timer"]}>{timer.elapsedTime}</div>
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
