import styles from "./practiseWord.module.css";
export const PracticeWord = ({ allWords, wordIndex, theme, statsData }) => {
      console.log(statsData);
      const practiseModeWordStats =
            statsData.practiseMode?.wordsStats?.[allWords[wordIndex]];
      const testModeWordStats =
            statsData.testMode?.wordsStats?.[allWords[wordIndex]];

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
                              {practiseModeWordStats ? (
                                    <>
                                          <span>
                                                speed:{" "}
                                                {Math.floor(
                                                      practiseModeWordStats.averageWpm
                                                )}
                                                wpm,{" "}
                                          </span>
                                          <span>
                                                accuracy:{" "}
                                                {Math.floor(
                                                      practiseModeWordStats.averageAccuracy
                                                )}
                                                %
                                          </span>
                                    </>
                              ) : (
                                    "not attempted"
                              )}

                              <h3>test</h3>
                              {testModeWordStats ? (
                                    <>
                                          <span>
                                                speed:{" "}
                                                {Math.floor(
                                                      testModeWordStats.averageWpm
                                                )}
                                                wpm,{" "}
                                          </span>
                                          <span>
                                                accuracy:{" "}
                                                {Math.floor(
                                                      testModeWordStats.averageAccuracy
                                                )}
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
