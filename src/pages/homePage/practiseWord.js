import styles from "./practiseWord.module.css";
export const PracticeWord = ({ allWords, wordIndex, theme, statsData }) => {
      console.log(statsData);
      const practiseModeWordStats =
            statsData.practiseMode?.wordsStats?.[allWords[wordIndex]];
      const testModeWordStats =
            statsData.testMode?.wordsStats?.[allWords[wordIndex]];

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
                                                            {Math.floor(
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
                                                            {Math.floor(
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
                                                            {Math.floor(
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
                                                            {Math.floor(
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
                                                            {Math.floor(
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
                                                            {Math.floor(
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
                                                            {Math.floor(
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
                                                            {Math.floor(
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
            </section>
      );
};
