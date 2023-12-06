import styles from "./languageStats.module.css";
import { lastTwentyTestsAverages } from "../../utilities/utilities";
export const LanguageStats = ({
      languageAndRange,
      theme,
      statsData,
      classOne,
      serialNumber,
      testStarted,
      setShowLastTenTests,
}) => {
      const testMode = statsData?.payload?.testMode;

      if (testMode) {
            [
                  testMode.lastTwentyTestsAverageWpm,
                  testMode.lastTwentyTestsAverageAccuracy,
            ] = lastTwentyTestsAverages(
                  statsData.payload.testMode.lastTwentyTests
            );
      }

      return (
            <div
                  className={styles["word"] + " " + styles["word-" + theme]}
                  style={testStarted ? { opacity: 0 } : null}
            >
                  <button
                        className={styles["last-ten-test-open-button"]}
                        onClick={(event) => {
                              event.stopPropagation();
                              setShowLastTenTests((previous) => {
                                    return !previous;
                              });
                        }}
                  >
                        last 10 tests
                  </button>
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
                              <tbody>
                                    <tr>
                                          <th>all tests averages</th>
                                          {/* <th>all tests avg accuracy</th> */}
                                          <th>last 20 tests averages</th>
                                          {/* <th>last 20 tests avg accuracy</th> */}
                                          <th>highest speed of a test</th>
                                          <th>total tests</th>
                                    </tr>
                              </tbody>
                              <tbody>
                                    <tr>
                                          <td>
                                                {testMode ? (
                                                      <>
                                                            {Math.round(
                                                                  testMode.averageWpm
                                                            )}{" "}
                                                            wpm /{" "}
                                                            {Math.round(
                                                                  testMode.averageAccuracy
                                                            )}{" "}
                                                            %
                                                      </>
                                                ) : (
                                                      "not attempted"
                                                )}
                                          </td>

                                          <td>
                                                {testMode ? (
                                                      <>
                                                            {Math.round(
                                                                  testMode.lastTwentyTestsAverageWpm
                                                            )}{" "}
                                                            wpm /{" "}
                                                            {Math.round(
                                                                  testMode.lastTwentyTestsAverageAccuracy
                                                            )}{" "}
                                                            %
                                                      </>
                                                ) : (
                                                      "not attempted"
                                                )}
                                          </td>

                                          <td>
                                                {testMode ? (
                                                      <>
                                                            {Math.round(
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
                                                            {Math.round(
                                                                  testMode.totalNumberOfFinishedTests
                                                            )}
                                                      </>
                                                ) : (
                                                      "not attempted"
                                                )}
                                          </td>
                                    </tr>
                              </tbody>
                        </table>
                  </div>
            </div>
      );
};
