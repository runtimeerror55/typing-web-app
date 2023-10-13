import styles from "./practiseWord.module.css";
export const PracticeWord = ({ allWords, wordIndex, theme, statsData }) => {
      console.log(statsData);
      const wordStats = statsData.wordsStats?.[allWords[wordIndex]];

      return (
            <section className={styles["words-stats-section"]}>
                  <div
                        className={
                              styles["word"] + " " + styles["word-" + theme]
                        }
                  >
                        <h2 className={styles["letter-title"]}>
                              {allWords[wordIndex]}
                        </h2>
                        <div className={styles["letter-stats"]}>
                              <h3>practise</h3>
                              {wordStats ? (
                                    <>
                                          <span>
                                                speed:
                                                {Math.floor(
                                                      wordStats.wpm
                                                )}wpm,{" "}
                                          </span>
                                          <span>
                                                accuracy:
                                                {wordStats.rightHitsCount
                                                      ? Math.floor(
                                                              (wordStats.rightHitsCount /
                                                                    (wordStats.rightHitsCount +
                                                                          wordStats.wrongHitsCount)) *
                                                                    100
                                                        )
                                                      : 0}
                                                %
                                          </span>
                                    </>
                              ) : (
                                    "not attempted"
                              )}

                              <h3>test</h3>
                              {wordStats ? (
                                    <>
                                          <span>
                                                speed:
                                                {Math.floor(
                                                      wordStats.wpm
                                                )} wpm,{" "}
                                          </span>
                                          <span>
                                                {wordStats.rightHitsCount
                                                      ? Math.floor(
                                                              (wordStats.rightHitsCount /
                                                                    (wordStats.rightHitsCount +
                                                                          wordStats.wrongHitsCount)) *
                                                                    100
                                                        )
                                                      : 0}
                                                %
                                          </span>
                                    </>
                              ) : (
                                    "not attempted"
                              )}
                        </div>
                  </div>
            </section>
      );
};
