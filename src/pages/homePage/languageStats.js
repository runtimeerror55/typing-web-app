import styles from "./languageStats.module.css";
export const LanguageStats = ({
      languageAndRange,
      theme,
      statsData,
      classOne,
      serialNumber,
      testStarted,
}) => {
      const testMode = statsData?.payload?.testMode;

      const lastTwentyTestsAverages = (testMode) => {
            const [wpmSum, accuracySum] = testMode.lastTwentyTests.reduce(
                  (total, current) => {
                        return [
                              total[0] + current.wpm,
                              total[1] + current.accuracy,
                        ];
                  },
                  [0, 0]
            );
            testMode.lastTwentyTestsAverageWpm =
                  wpmSum / testMode.lastTwentyTests.length;
            testMode.lastTwentyTestsAverageAccuracy =
                  accuracySum / testMode.lastTwentyTests.length;
      };

      if (testMode) {
            lastTwentyTestsAverages(statsData.payload.testMode);
      }

      return (
            <div
                  className={styles["word"] + " " + styles["word-" + theme]}
                  style={testStarted ? { opacity: 0 } : null}
            >
                  <h3 className={styles["serial-number"]}>{serialNumber}</h3>
                  <h4 className={styles["word-title"]}>
                        {languageAndRange.fullName}
                  </h4>
                  <div
                        className={
                              classOne
                                    ? styles["word-stats"] + " " + classOne
                                    : styles["word-stats"]
                        }
                  >
                        <table>
                              {/* <tr>
                                    <th colspan="3">Test mode</th>
                              </tr> */}
                              <tr>
                                    <th>all tests averages</th>
                                    {/* <th>all tests avg accuracy</th> */}
                                    <th>last 20 tests averages</th>
                                    {/* <th>last 20 tests avg accuracy</th> */}
                                    <th>highest speed of a test</th>
                                    <th>total tests</th>
                              </tr>
                              <tr>
                                    {/* <th>speed</th> */}
                                    <td>
                                          {testMode ? (
                                                <>
                                                      {Math.floor(
                                                            testMode.averageWpm
                                                      )}{" "}
                                                      wpm /{" "}
                                                      {Math.floor(
                                                            testMode.averageAccuracy
                                                      )}{" "}
                                                      %
                                                </>
                                          ) : (
                                                "not attempted"
                                          )}
                                    </td>
                                    {/* <td>
                                          {" "}
                                          {testMode ? (
                                                <>
                                                      {Math.floor(
                                                            testMode.averageAccuracy
                                                      )}{" "}
                                                      %
                                                </>
                                          ) : (
                                                "not attempted"
                                          )}
                                    </td> */}
                                    <td>
                                          {testMode ? (
                                                <>
                                                      {Math.floor(
                                                            testMode.lastTwentyTestsAverageWpm
                                                      )}{" "}
                                                      wpm /{" "}
                                                      {Math.floor(
                                                            testMode.lastTwentyTestsAverageAccuracy
                                                      )}{" "}
                                                      %
                                                </>
                                          ) : (
                                                "not attempted"
                                          )}
                                    </td>
                                    {/* <td>
                                          {testMode ? (
                                                <>
                                                      {Math.floor(
                                                            testMode.lastTwentyTestsAverageAccuracy
                                                      )}{" "}
                                                      %
                                                </>
                                          ) : (
                                                "not attempted"
                                          )}
                                    </td> */}
                                    <td>
                                          {testMode ? (
                                                <>
                                                      {Math.floor(
                                                            testMode.highestWpmOfATest
                                                      )}{" "}
                                                      wpm
                                                </>
                                          ) : (
                                                "not attempted"
                                          )}
                                    </td>
                                    <td>
                                          {testMode ? (
                                                <>
                                                      {Math.floor(
                                                            testMode.totalNumberOfFinishedTests
                                                      )}
                                                </>
                                          ) : (
                                                "not attempted"
                                          )}
                                    </td>
                              </tr>
                        </table>
                  </div>
            </div>
      );
};
