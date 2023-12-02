import styles from "./practiseWord.module.css";
export const PracticeWord = ({
      allWords,
      wordIndex,
      theme,
      statsData,
      classOne,
      serialNumber,
      setShowWordsQueue,
      setWordIndex,
      index,
      isWordsQueue,
}) => {
      const practiseModeWordStats =
            statsData.payload?.practiseMode?.wordsStats?.[allWords[wordIndex]];
      const testModeWordStats =
            statsData.payload?.testMode?.wordsStats?.[allWords[wordIndex]];

      const lastTwentyTestsAverages = (wordStats) => {
            const [wpmSum, accuracySum] = wordStats.lastTwentyTests.reduce(
                  (total, current) => {
                        return [
                              total[0] + current.wpm,
                              total[1] + current.accuracy,
                        ];
                  },
                  [0, 0]
            );
            wordStats.lastTwentyTestsAverageWpm =
                  wpmSum / wordStats.lastTwentyTests.length;
            wordStats.lastTwentyTestsAverageAccuracy =
                  accuracySum / wordStats.lastTwentyTests.length;
      };
      if (practiseModeWordStats) {
            lastTwentyTestsAverages(practiseModeWordStats);
      }
      if (testModeWordStats) {
            lastTwentyTestsAverages(testModeWordStats);
      }

      const WordsQueueOpenButtonClickHandler = () => {
            setShowWordsQueue((previous) => {
                  return !previous;
            });
      };
      return (
            <div
                  className={styles["word"] + " " + styles["word-" + theme]}
                  onClick={
                        setWordIndex
                              ? () => {
                                      console.log(index);
                                      setWordIndex(index);
                                      setShowWordsQueue(false);
                                }
                              : null
                  }
            >
                  <h2 className={styles["word-title"]}>
                        {allWords[wordIndex]}
                  </h2>
                  <div className={styles["container"]}>
                        {isWordsQueue ? (
                              <button
                                    className={
                                          styles["words-queue-open-button"]
                                    }
                                    onClick={WordsQueueOpenButtonClickHandler}
                              >
                                    show queue
                              </button>
                        ) : null}
                        <h3 className={styles["serial-number"]}>
                              {serialNumber}
                        </h3>
                  </div>

                  <div
                        className={
                              classOne
                                    ? styles["word-stats"] + " " + classOne
                                    : styles["word-stats"]
                        }
                  >
                        <table>
                              <tr>
                                    <th colspan="3">Practise mode</th>
                              </tr>
                              <tr>
                                    <th></th>
                                    <th>all tests</th>
                                    <th>last 20 tests</th>
                              </tr>
                              <tr>
                                    <th>speed</th>
                                    <td>
                                          {practiseModeWordStats ? (
                                                <>
                                                      {Math.round(
                                                            practiseModeWordStats.averageWpm
                                                      )}{" "}
                                                      wpm
                                                </>
                                          ) : (
                                                "not attempted"
                                          )}
                                    </td>
                                    <td>
                                          {practiseModeWordStats ? (
                                                <>
                                                      {Math.round(
                                                            practiseModeWordStats.lastTwentyTestsAverageWpm
                                                      )}{" "}
                                                      wpm
                                                </>
                                          ) : (
                                                "not attempted"
                                          )}
                                    </td>
                              </tr>
                              <tr>
                                    <th>accuracy</th>
                                    <td>
                                          {" "}
                                          {practiseModeWordStats ? (
                                                <>
                                                      {Math.round(
                                                            practiseModeWordStats.averageAccuracy
                                                      )}{" "}
                                                      %
                                                </>
                                          ) : (
                                                "not attempted"
                                          )}
                                    </td>
                                    <td>
                                          {practiseModeWordStats ? (
                                                <>
                                                      {Math.round(
                                                            practiseModeWordStats.lastTwentyTestsAverageAccuracy
                                                      )}{" "}
                                                      %
                                                </>
                                          ) : (
                                                "not attempted"
                                          )}
                                    </td>
                              </tr>
                        </table>

                        <table>
                              <tr>
                                    <th colspan="3">Test mode</th>
                              </tr>
                              <tr>
                                    <th></th>
                                    <th>all tests</th>
                                    <th>last 20 tests</th>
                              </tr>
                              <tr>
                                    <th>speed</th>
                                    <td>
                                          {testModeWordStats ? (
                                                <>
                                                      {Math.round(
                                                            testModeWordStats.averageWpm
                                                      )}{" "}
                                                      wpm
                                                </>
                                          ) : (
                                                "not attempted"
                                          )}
                                    </td>
                                    <td>
                                          {testModeWordStats ? (
                                                <>
                                                      {Math.round(
                                                            testModeWordStats.lastTwentyTestsAverageWpm
                                                      )}{" "}
                                                      wpm
                                                </>
                                          ) : (
                                                "not attempted"
                                          )}
                                    </td>
                              </tr>
                              <tr>
                                    <th>accuracy</th>
                                    <td>
                                          {" "}
                                          {testModeWordStats ? (
                                                <>
                                                      {Math.round(
                                                            testModeWordStats.averageAccuracy
                                                      )}{" "}
                                                      %
                                                </>
                                          ) : (
                                                "not attempted"
                                          )}
                                    </td>
                                    <td>
                                          {testModeWordStats ? (
                                                <>
                                                      {Math.round(
                                                            testModeWordStats.lastTwentyTestsAverageAccuracy
                                                      )}{" "}
                                                      %
                                                </>
                                          ) : (
                                                "not attempted"
                                          )}
                                    </td>
                              </tr>
                        </table>

                        {/* {practiseModeWordStats ? (
                                    <>
                                          <div>
                                                all tests speed:{" "}
                                                {Math.floor(
                                                      practiseModeWordStats.averageWpm
                                                )}
                                                wpm,{" "}
                                          </div>
                                          <div>
                                                last 20 tests speed:{" "}
                                                {Math.floor(
                                                      practiseModeWordStats.lastTwentyTestsAverageWpm
                                                )}
                                                wpm,{" "}
                                          </div>
                                          <div>
                                                all tests accuracy:{" "}
                                                {Math.floor(
                                                      practiseModeWordStats.averageAccuracy
                                                )}
                                                %
                                          </div>
                                          <div>
                                                last 20 tests accuracy:{" "}
                                                {Math.floor(
                                                      practiseModeWordStats.lastTwentyTestsAverageAccuracy
                                                )}
                                                %
                                          </div>
                                    </>
                              ) : (
                                    "not attempted"
                              )}

                              <h3>test mode</h3>
                              {testModeWordStats ? (
                                    <>
                                          <div>
                                                all tests speed:{" "}
                                                {Math.floor(
                                                      testModeWordStats.averageWpm
                                                )}
                                                wpm,{" "}
                                          </div>
                                          <div>
                                                last 20 tests speed:{" "}
                                                {Math.floor(
                                                      testModeWordStats.lastTwentyTestsAverageWpm
                                                )}
                                                wpm,{" "}
                                          </div>
                                          <div>
                                                all tests accuracy:{" "}
                                                {Math.floor(
                                                      testModeWordStats.averageAccuracy
                                                )}
                                                %
                                          </div>
                                          <div>
                                                last 20 tests accuracy:{" "}
                                                {Math.floor(
                                                      testModeWordStats.lastTwentyTestsAverageAccuracy
                                                )}
                                                %
                                          </div>
                                    </>
                              ) : (
                                    "not attempted"
                              )} */}
                  </div>
            </div>
      );
};
