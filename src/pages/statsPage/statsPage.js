import {
      useLoaderData,
      useAsyncValue,
      Link,
      useFetcher,
} from "react-router-dom";
import { useState } from "react";
import { NavBar } from "../../components/navBar/navBar";
import { CharactersBartGraph } from "../statsPage/charactersBarGraph";
import { WordsBarGraph } from "./wordsBarGraph";
import styles from "./statsPage.module.css";
import { PracticeWord } from "../homePage/practiseWord";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { toastOptions } from "../../utilities/utilities";
const commonWords = [
      "as",
      "i",
      "his",
      "that",
      "he",
      "was",
      "for",
      "on",
      "are",
      "with",
      "they",
      "be",
      "at",
      "one",
      "have",
      "this",
      "from",
      "by",
      "hot",
      "word",
      "but",
      "what",
      "some",
      "is",
      "it",
      "you",
      "or",
      "had",
      "the",
      "of",
      "to",
      "and",
      "a",
      "in",
      "we",
      "can",
      "out",
      "other",
      "were",
      "which",
      "do",
      "their",
      "time",
];

const letters = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
];
export const StatsPage = () => {
      const [loaderData, setLoaderData] = useState(useAsyncValue());
      let { settingsData } = useLoaderData();
      if (settingsData.status === "error") {
            settingsData = {
                  payload: {
                        settings: {
                              theme: "blue-theme",
                              sound: "confettiEdited",
                              timer: 15,
                        },
                  },
            };
      }

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

      const highestAverageSpeedOfAWord = () => {
            loaderData.payload.testMode.highestAverageSpeedOfAWord =
                  Object.entries(loaderData.payload.testMode.wordsStats).reduce(
                        (total, current) => {
                              if (total.speed < current[1].averageWpm) {
                                    total.speed = current[1].averageWpm;
                                    total.word = current[0];
                                    return total;
                              } else {
                                    return total;
                              }
                        },
                        {
                              word: undefined,
                              speed: -1,
                        }
                  );
      };
      const highestAverageAcuuracyOfAWord = () => {
            loaderData.payload.testMode.highestAverageAccuracyOfAWord =
                  Object.entries(loaderData.payload.testMode.wordsStats).reduce(
                        (total, current) => {
                              if (total.accuracy < current[1].averageWpm) {
                                    total.accuracy = current[1].averageAccuracy;
                                    total.word = current[0];
                                    return total;
                              } else {
                                    return total;
                              }
                        },
                        {
                              word: undefined,
                              accuracy: -1,
                        }
                  );
      };
      if (loaderData.payload?.testMode) {
            lastTwentyTestsAverages(loaderData.payload.testMode);
      }
      if (loaderData.payload?.testMode) {
            highestAverageSpeedOfAWord();
      }
      if (loaderData.payload?.testMode) {
            highestAverageAcuuracyOfAWord();
      }

      const languageStatsFetcher = useFetcher();
      const languageStatsFetcherStatus =
            languageStatsFetcher.data && languageStatsFetcher.state === "idle";
      const languageFilterHandler = (event) => {
            const value = JSON.parse(event.target.value);
            languageStatsFetcher.submit(value, {
                  method: "GET",
                  action: "/stats",
            });
      };

      useEffect(() => {
            if (languageStatsFetcherStatus) {
                  const data = languageStatsFetcher.data;
                  if (data.status === "success") {
                        setLoaderData(data);
                        toast.success("fetched successfully", toastOptions);
                  } else {
                        toast.error(data.message, toastOptions);
                  }
            }
      }, [languageStatsFetcher]);

      //   if (loaderData.status === "error") {
      //         return (
      //               <div
      //                     className={
      //                           styles["page"] +
      //                           " " +
      //                           styles[`home-page-green-theme`]
      //                     }
      //               >
      //                     {loaderData.message}
      //               </div>
      //         );
      //   } else {
      return (
            <>
                  <div
                        className={
                              styles["page"] +
                              " " +
                              styles[settingsData.payload.settings.theme]
                        }
                  >
                        <NavBar></NavBar>
                        <ToastContainer></ToastContainer>
                        <main className={styles["main"]}>
                              <section>
                                    <table
                                          className={
                                                styles[
                                                      "language-overall-stats-table"
                                                ]
                                          }
                                    >
                                          <tr>
                                                <th
                                                      colspan="7"
                                                      className={
                                                            styles[
                                                                  "language-overall-stats-table-head"
                                                            ]
                                                      }
                                                >
                                                      english
                                                </th>
                                          </tr>
                                          <tr>
                                                <th
                                                      className={
                                                            styles[
                                                                  "language-overall-stats-table-head"
                                                            ]
                                                      }
                                                >
                                                      sub-type
                                                </th>
                                                <th
                                                      className={
                                                            styles[
                                                                  "language-overall-stats-table-head"
                                                            ]
                                                      }
                                                >
                                                      all tests average speed
                                                </th>
                                                <th
                                                      className={
                                                            styles[
                                                                  "language-overall-stats-table-head"
                                                            ]
                                                      }
                                                >
                                                      all tests average accuracy
                                                </th>
                                                <th
                                                      className={
                                                            styles[
                                                                  "language-overall-stats-table-head"
                                                            ]
                                                      }
                                                >
                                                      last 20 tests average
                                                      speed
                                                </th>
                                                <th
                                                      className={
                                                            styles[
                                                                  "language-overall-stats-table-head"
                                                            ]
                                                      }
                                                >
                                                      last 20 tests average
                                                      accuracy
                                                </th>
                                                <th
                                                      className={
                                                            styles[
                                                                  "language-overall-stats-table-head"
                                                            ]
                                                      }
                                                >
                                                      highest speed in a test
                                                </th>
                                                <th
                                                      className={
                                                            styles[
                                                                  "language-overall-stats-table-head"
                                                            ]
                                                      }
                                                >
                                                      highest accuracy in a test
                                                </th>
                                          </tr>
                                          <tr>
                                                <th
                                                      className={
                                                            styles[
                                                                  "language-overall-stats-table-head"
                                                            ]
                                                      }
                                                >
                                                      1- 100
                                                </th>
                                                <td
                                                      className={
                                                            styles[
                                                                  "language-overall-stats-table-data"
                                                            ]
                                                      }
                                                ></td>
                                                <td
                                                      className={
                                                            styles[
                                                                  "language-overall-stats-table-data"
                                                            ]
                                                      }
                                                ></td>
                                                <td
                                                      className={
                                                            styles[
                                                                  "language-overall-stats-table-data"
                                                            ]
                                                      }
                                                ></td>
                                                <td
                                                      className={
                                                            styles[
                                                                  "language-overall-stats-table-data"
                                                            ]
                                                      }
                                                ></td>
                                                <td
                                                      className={
                                                            styles[
                                                                  "language-overall-stats-table-data"
                                                            ]
                                                      }
                                                ></td>
                                                <td
                                                      className={
                                                            styles[
                                                                  "language-overall-stats-table-data"
                                                            ]
                                                      }
                                                ></td>
                                          </tr>
                                          <tr>
                                                <th
                                                      className={
                                                            styles[
                                                                  "language-overall-stats-table-head"
                                                            ]
                                                      }
                                                >
                                                      101-200
                                                </th>
                                                <td
                                                      className={
                                                            styles[
                                                                  "language-overall-stats-table-data"
                                                            ]
                                                      }
                                                ></td>
                                                <td
                                                      className={
                                                            styles[
                                                                  "language-overall-stats-table-data"
                                                            ]
                                                      }
                                                ></td>
                                                <td
                                                      className={
                                                            styles[
                                                                  "language-overall-stats-table-data"
                                                            ]
                                                      }
                                                ></td>
                                                <td
                                                      className={
                                                            styles[
                                                                  "language-overall-stats-table-data"
                                                            ]
                                                      }
                                                ></td>
                                                <td
                                                      className={
                                                            styles[
                                                                  "language-overall-stats-table-data"
                                                            ]
                                                      }
                                                ></td>
                                                <td
                                                      className={
                                                            styles[
                                                                  "language-overall-stats-table-data"
                                                            ]
                                                      }
                                                ></td>
                                          </tr>
                                    </table>
                              </section>
                              <section
                                    className={
                                          styles["language-filter-section"]
                                    }
                              >
                                    <select
                                          className={styles["language-filter"]}
                                          onChange={languageFilterHandler}
                                    >
                                          <option disabled>
                                                languages and ranges
                                          </option>
                                          <option
                                                value={JSON.stringify({
                                                      language: "english",
                                                      startIndex: 0,
                                                      endIndex: 99,
                                                      optionIndex: 0,
                                                })}
                                          >
                                                english (1-100)
                                          </option>
                                          <option
                                                value={JSON.stringify({
                                                      language: "english",
                                                      startIndex: 100,
                                                      endIndex: 199,
                                                      optionIndex: 1,
                                                })}
                                          >
                                                english (101-200)
                                          </option>
                                          <option
                                                value={JSON.stringify({
                                                      language: "english",
                                                      startIndex: 200,
                                                      endIndex: 299,
                                                      optionIndex: 2,
                                                })}
                                          >
                                                english (201-300)
                                          </option>
                                          <option
                                                value={JSON.stringify({
                                                      language: "english",
                                                      startIndex: 0,
                                                      endIndex: 299,
                                                      optionIndex: 3,
                                                })}
                                          >
                                                english (1-300)
                                          </option>
                                          <option
                                                value={JSON.stringify({
                                                      language: "english",
                                                      startIndex: 0,
                                                      endIndex: 9,
                                                      numbers: true,
                                                      optionIndex: 4,
                                                })}
                                          >
                                                english (1-9 words + all
                                                numbers(1-30))
                                          </option>
                                          <option
                                                value={JSON.stringify({
                                                      language: "english",
                                                      numbers: true,
                                                      optionIndex: 5,
                                                })}
                                          >
                                                english (all numbers(1-30))
                                          </option>
                                          <option
                                                value={JSON.stringify({
                                                      language: "english",
                                                      specialWords: true,
                                                      optionIndex: 6,
                                                })}
                                          >
                                                english (1-9 words + all special
                                                words(1-20))
                                          </option>
                                          <option
                                                value={JSON.stringify({
                                                      language: "english",
                                                      startIndex: 0,
                                                      endIndex: 299,
                                                      specialWords: true,
                                                      optionIndex: 7,
                                                })}
                                          >
                                                english (1-300 words + all
                                                special characters(1-20))
                                          </option>
                                          <option
                                                value={JSON.stringify({
                                                      language: "english",
                                                      startIndex: 0,
                                                      endIndex: 299,
                                                      numbers: true,
                                                      optionIndex: 8,
                                                })}
                                          >
                                                english (1-300 words + all
                                                numbers(90))
                                          </option>
                                          <option
                                                value={JSON.stringify({
                                                      language: "english",
                                                      startIndex: 0,
                                                      endIndex: 299,
                                                      numbers: true,
                                                      specialWords: true,
                                                      optionIndex: 9,
                                                })}
                                          >
                                                english (1-300 words + all
                                                special characters(90)+all
                                                numbers(90))
                                          </option>
                                          <option
                                                value={JSON.stringify({
                                                      language: "javascript",
                                                      optionIndex: 0,
                                                })}
                                          >
                                                javascript (1-100)
                                          </option>
                                    </select>
                              </section>
                              {loaderData.status === "success" ? (
                                    <section
                                          className={
                                                styles["all-time-stats-section"]
                                          }
                                    >
                                          <div
                                                className={
                                                      styles["all-time-stat"] +
                                                      " " +
                                                      styles[
                                                            settingsData.payload
                                                                  .settings
                                                                  .theme
                                                      ]
                                                }
                                          >
                                                <h5>All tests average speed</h5>
                                                <h1>
                                                      {/* {loaderData.averageWpm} */}
                                                      {Math.floor(
                                                            loaderData.payload
                                                                  .testMode
                                                                  .averageWpm
                                                      )}{" "}
                                                      wpm
                                                </h1>
                                          </div>
                                          <div
                                                className={
                                                      styles["all-time-stat"] +
                                                      " " +
                                                      styles[
                                                            settingsData.payload
                                                                  .settings
                                                                  .theme
                                                      ]
                                                }
                                          >
                                                <h5>
                                                      All tests average accuracy
                                                </h5>
                                                <h1>
                                                      {/* {
                                                            loaderData.averageAccuracy
                                                      } */}
                                                      {Math.floor(
                                                            loaderData.payload
                                                                  .testMode
                                                                  .averageAccuracy
                                                      )}{" "}
                                                      %
                                                </h1>
                                          </div>

                                          <div
                                                className={
                                                      styles["all-time-stat"] +
                                                      " " +
                                                      styles[
                                                            settingsData.payload
                                                                  .settings
                                                                  .theme
                                                      ]
                                                }
                                          >
                                                <h5>
                                                      Last 20 tests average
                                                      speed
                                                </h5>
                                                <h1>
                                                      {Math.floor(
                                                            loaderData.payload
                                                                  .testMode
                                                                  .lastTwentyTestsAverageWpm
                                                      )}{" "}
                                                      wpm
                                                </h1>
                                          </div>
                                          <div
                                                className={
                                                      styles["all-time-stat"] +
                                                      " " +
                                                      styles[
                                                            settingsData.payload
                                                                  .settings
                                                                  .theme
                                                      ]
                                                }
                                          >
                                                <h5>
                                                      Last 20 tests average
                                                      accuracy
                                                </h5>
                                                <h1>
                                                      {Math.floor(
                                                            loaderData.payload
                                                                  .testMode
                                                                  .lastTwentyTestsAverageAccuracy
                                                      )}{" "}
                                                      %
                                                </h1>
                                          </div>
                                          <div
                                                className={
                                                      styles["all-time-stat"] +
                                                      " " +
                                                      styles[
                                                            settingsData.payload
                                                                  .settings
                                                                  .theme
                                                      ]
                                                }
                                          >
                                                <h5>highest speed of a test</h5>
                                                <h1>
                                                      {Math.floor(
                                                            loaderData.payload
                                                                  .testMode
                                                                  .highestWpmOfATest
                                                      )}{" "}
                                                      wpm
                                                </h1>
                                          </div>
                                          <div
                                                className={
                                                      styles["all-time-stat"] +
                                                      " " +
                                                      styles[
                                                            settingsData.payload
                                                                  .settings
                                                                  .theme
                                                      ]
                                                }
                                          >
                                                <h5>
                                                      highest accuracy of a test
                                                </h5>
                                                <h1>
                                                      {Math.floor(
                                                            loaderData.payload
                                                                  .testMode
                                                                  .highestAccuracyOfATest
                                                      )}{" "}
                                                      %
                                                </h1>
                                          </div>
                                          <div
                                                className={
                                                      styles["all-time-stat"] +
                                                      " " +
                                                      styles[
                                                            settingsData.payload
                                                                  .settings
                                                                  .theme
                                                      ]
                                                }
                                          >
                                                <h5>
                                                      highest average speed of a
                                                      word
                                                </h5>
                                                <h1>
                                                      {Math.floor(
                                                            loaderData.payload
                                                                  .testMode
                                                                  .highestAverageSpeedOfAWord
                                                                  .speed
                                                      )}{" "}
                                                      wpm(
                                                      {
                                                            loaderData.payload
                                                                  .testMode
                                                                  .highestAverageSpeedOfAWord
                                                                  .word
                                                      }
                                                      )
                                                </h1>
                                          </div>
                                          <div
                                                className={
                                                      styles["all-time-stat"] +
                                                      " " +
                                                      styles[
                                                            settingsData.payload
                                                                  .settings
                                                                  .theme
                                                      ]
                                                }
                                          >
                                                <h5>
                                                      highest average speed of a
                                                      word
                                                </h5>
                                                <h1>
                                                      {Math.floor(
                                                            loaderData.payload
                                                                  .testMode
                                                                  .highestAverageAccuracyOfAWord
                                                                  .accuracy
                                                      )}{" "}
                                                      %(
                                                      {
                                                            loaderData.payload
                                                                  .testMode
                                                                  .highestAverageAccuracyOfAWord
                                                                  .word
                                                      }
                                                      )
                                                </h1>
                                          </div>
                                    </section>
                              ) : null}

                              {/* <section
                                          className={styles["letters-section"]}
                                    >
                                          {letters.map((letter) => {
                                                return (
                                                      <PracticeWord
                                                            allWords={[letter]}
                                                            wordIndex={0}
                                                            statsData={
                                                                  loaderData.payload
                                                            }
                                                            theme={
                                                                  settingsData
                                                                        .payload
                                                                        .settings
                                                                        .theme
                                                            }
                                                      ></PracticeWord>
                                                );
                                          })}
                                    </section>
                                    <section
                                          className={styles["words-section"]}
                                    >
                                          {commonWords.map((word) => {
                                                return (
                                                      <Link
                                                            to={`/?mode=practise&word=${word}`}
                                                            className={
                                                                  styles["word"]
                                                            }
                                                      >
                                                            <h2
                                                                  className={
                                                                        styles[
                                                                              "word-title"
                                                                        ]
                                                                  }
                                                            >
                                                                  {word}
                                                            </h2>
                                                            <div
                                                                  className={
                                                                        styles[
                                                                              "word-stats"
                                                                        ]
                                                                  }
                                                            >
                                                                  <h3>
                                                                        practise
                                                                  </h3>
                                                                  <span>
                                                                        speed:
                                                                        75wpm,{" "}
                                                                  </span>
                                                                  <span>
                                                                        accuracy:
                                                                        85%
                                                                  </span>
                                                                  <h3>test</h3>
                                                                  <span>
                                                                        speed:
                                                                        60wpm,{" "}
                                                                  </span>
                                                                  <span>
                                                                        accuracy:
                                                                        80%
                                                                  </span>
                                                            </div>
                                                      </Link>
                                                );
                                          })}
                                    </section> */}
                              {/* <section
                                          className={
                                                styles[
                                                      "characters-bar-graph-section"
                                                ]
                                          }
                                    >
                                          <CharactersBartGraph
                                                loaderData={loaderData}
                                                theme={
                                                      settingsData.payload
                                                            .settings.theme
                                                }
                                          ></CharactersBartGraph>
                                    </section>
                                    <section
                                          className={
                                                styles[
                                                      "characters-bar-graph-section"
                                                ]
                                          }
                                    >
                                          <WordsBarGraph
                                                loaderData={loaderData}
                                                theme={
                                                      settingsData.payload
                                                            .settings.theme
                                                }
                                          ></WordsBarGraph>
                                    </section> */}
                              <section
                                    className={styles["last-ten-tests-section"]}
                              >
                                    <table
                                          className={
                                                styles["last-ten-tests-table"] +
                                                " " +
                                                styles[
                                                      settingsData.payload
                                                            .settings.theme
                                                ]
                                          }
                                    >
                                          <tr>
                                                <th>Wpm</th>
                                                <th>Accuracy</th>
                                                <th>Time</th>
                                                <th>Date</th>
                                          </tr>
                                          {loaderData.payload.testMode.lastTwentyTests
                                                .slice(-10)
                                                .map((test) => {
                                                      return (
                                                            <tr>
                                                                  <td>
                                                                        {
                                                                              test.wpm
                                                                        }
                                                                  </td>
                                                                  <td>
                                                                        {
                                                                              test.accuracy
                                                                        }
                                                                  </td>
                                                                  <td>30s</td>
                                                                  <td>
                                                                        12/9/2023
                                                                  </td>
                                                            </tr>
                                                      );
                                                })}
                                    </table>
                              </section>
                        </main>
                  </div>
            </>
      );
};
