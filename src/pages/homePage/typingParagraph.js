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
      });

      const keyDownHandler = (event) => {
            if (event.key === data[typingState.paragraphNextIndex]) {
                  setTypingState((previous) => {
                        return {
                              paragraphCurrentIndex:
                                    previous.paragraphNextIndex,
                              paragraphNextIndex:
                                    previous.paragraphNextIndex + 1,
                              currentLetterClass: "active-right",
                        };
                  });
            } else {
                  setTypingState((previous) => {
                        return {
                              paragraphCurrentIndex:
                                    previous.paragraphNextIndex,
                              paragraphNextIndex: previous.paragraphNextIndex,
                              currentLetterClass: "active-wrong",
                        };
                  });
            }
      };
      return (
            <div
                  className={styles["typing-paragraph"]}
                  onKeyDown={keyDownHandler}
                  tabIndex={0}
            >
                  {data.map((letter, index) => {
                        let className = "";
                        if (index === typingState.paragraphCurrentIndex) {
                              className = typingState.currentLetterClass;
                        } else if (index < typingState.paragraphCurrentIndex) {
                              className = "active-right";
                        }
                        return (
                              <span className={styles[className]}>
                                    {letter}
                              </span>
                        );
                  })}
            </div>
      );
};
