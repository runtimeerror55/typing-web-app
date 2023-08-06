import { useState } from "react";
import styles from "./typingParagraph.module.css";

const data = [
      ..."south africa may not be getting as many international fixtures as other teams but their players are being exposed to a higher level of competition at the franchise level",
];
export const TypingParagraph = () => {
      const [currentIndex, setCurrentIndex] = useState(-1);
      const [currentKey, setCurrentKey] = useState("abcdef");
      console.log(currentIndex, currentKey);
      const keyDownHandler = (event) => {
            setCurrentIndex((previous) => {
                  return previous + 1;
            });
            setCurrentKey(event.key);
      };
      return (
            <div
                  className={styles["typing-paragraph"]}
                  onKeyDown={keyDownHandler}
                  tabIndex={0}
            >
                  {data.map((letter, index) => {
                        return (
                              <span
                                    className={
                                          data[currentIndex] === currentKey &&
                                          index === currentIndex
                                                ? styles["typing-letter"] +
                                                  " " +
                                                  styles["active-right"]
                                                : styles["typing-letter"]
                                    }
                              >
                                    {letter}
                              </span>
                        );
                  })}
            </div>
      );
};
