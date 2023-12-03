import styles from "./wordsQueue.module.css";
import { PracticeWord } from "./practiseWord";
import { ClosingButton } from "../../components/buttons/closingButton";
export const WordsQueue = ({
      words,
      statsData,
      theme,
      setWordIndex,
      setShowWordsQueue,
}) => {
      const closingButtonClickHandler = () => {
            setShowWordsQueue(false);
      };
      return (
            <aside className={styles["words-queue"]}>
                  <ClosingButton
                        clickHandler={closingButtonClickHandler}
                  ></ClosingButton>
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
                                    setWordIndex={setWordIndex}
                                    index={index}
                                    setShowWordsQueue={setShowWordsQueue}
                                    isWordsQueue={false}
                              ></PracticeWord>
                        );
                  })}
            </aside>
      );
};
