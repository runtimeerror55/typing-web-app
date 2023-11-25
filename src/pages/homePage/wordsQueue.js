import styles from "./wordsQueue.module.css";
import { PracticeWord } from "./practiseWord";
export const WordsQueue = ({ words, statsData, theme }) => {
      return (
            <aside className={styles["words-queue"]}>
                  {words.map((word, index) => {
                        return (
                              <PracticeWord
                                    allWords={[word]}
                                    wordIndex={0}
                                    theme={theme}
                                    statsData={statsData}
                                    classOne={styles["word-stats"]}
                                    serialNumber={index + 1}
                                    key={word}
                              ></PracticeWord>
                        );
                  })}
            </aside>
      );
};
