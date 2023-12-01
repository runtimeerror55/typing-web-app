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
import {
      toastOptions,
      lastTwentyTestsAverages,
      highestAverageSpeedOfAWord,
      highestAverageAcuuracyOfAWord,
} from "../../utilities/utilities";
import { getUserStatsOne } from "../../loaders/loaders";

export const StatsPage = () => {
      const [loaderData, setLoaderData] = useState(useAsyncValue());
      const [y, setY] = useState([]);
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

      if (loaderData?.payload?.testMode) {
            lastTwentyTestsAverages(loaderData.payload);
            highestAverageSpeedOfAWord(loaderData.payload);
            highestAverageAcuuracyOfAWord(loaderData.payload);
      }

      const languageStatsFetcherOne = useFetcher();
      const languageStatsFetcherOneStatus =
            languageStatsFetcherOne.data &&
            languageStatsFetcherOne.state === "idle";

      useEffect(() => {
            if (languageStatsFetcherOneStatus) {
                  const data = languageStatsFetcherOne.data;
                  if (data.status === "success") {
                        console.log(data.payload);
                        setY(
                              data.payload.sort((a, b) => {
                                    return a.optionIndex - b.optionIndex;
                              })
                        );
                        toast.success("fetched successfully", toastOptions);
                  } else {
                        toast.error(data.message, toastOptions);
                  }
            }
      }, [languageStatsFetcherOne]);

      const languageFilterHandlerOne = (event) => {
            const value = event.target.value;
            languageStatsFetcherOne.submit(
                  { language: value },
                  {
                        method: "GET",
                        action: "/statsOne",
                  }
            );
      };

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
      console.log(y);
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
                                                ] +
                                                " " +
                                                styles[
                                                      "language-overall-stats-table-" +
                                                            settingsData.payload
                                                                  .settings
                                                                  .theme
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
                                                      <select
                                                            className={
                                                                  styles[
                                                                        "language-filter"
                                                                  ]
                                                            }
                                                            onChange={
                                                                  languageFilterHandlerOne
                                                            }
                                                            defaultValue="javascript"
                                                      >
                                                            <option disabled>
                                                                  languages and
                                                                  ranges
                                                            </option>
                                                            <option value="english">
                                                                  english
                                                            </option>
                                                            <option value="javascript">
                                                                  javascript
                                                            </option>
                                                      </select>
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
                                                      all tests average
                                                </th>
                                                <th
                                                      className={
                                                            styles[
                                                                  "language-overall-stats-table-head"
                                                            ]
                                                      }
                                                >
                                                      last 20 tests average
                                                      speed/accuracy
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
                                                      total tests
                                                </th>
                                                <th
                                                      className={
                                                            styles[
                                                                  "language-overall-stats-table-head"
                                                            ]
                                                      }
                                                ></th>
                                          </tr>

                                          {y.map((subTypeStats) => {
                                                if (subTypeStats.testMode) {
                                                      lastTwentyTestsAverages(
                                                            subTypeStats
                                                      );
                                                      highestAverageSpeedOfAWord(
                                                            subTypeStats
                                                      );
                                                      highestAverageAcuuracyOfAWord(
                                                            subTypeStats
                                                      );
                                                }
                                                return (
                                                      <tr>
                                                            <th
                                                                  className={
                                                                        styles[
                                                                              "language-overall-stats-table-head"
                                                                        ]
                                                                  }
                                                            >
                                                                  {subTypeStats.subName
                                                                        ? subTypeStats.subName
                                                                        : "-"}
                                                            </th>
                                                            <td
                                                                  className={
                                                                        styles[
                                                                              "language-overall-stats-table-data"
                                                                        ]
                                                                  }
                                                            >
                                                                  {subTypeStats.testMode
                                                                        ? `${Math.round(
                                                                                subTypeStats
                                                                                      .testMode
                                                                                      .averageWpm
                                                                          )} wpm /
                                                                          ${Math.round(
                                                                                subTypeStats
                                                                                      .testMode
                                                                                      .averageAccuracy
                                                                          )} %`
                                                                        : "-"}
                                                            </td>
                                                            <td
                                                                  className={
                                                                        styles[
                                                                              "language-overall-stats-table-data"
                                                                        ]
                                                                  }
                                                            >
                                                                  {subTypeStats.testMode
                                                                        ? `${Math.round(
                                                                                subTypeStats
                                                                                      .testMode
                                                                                      .lastTwentyTestsAverageWpm
                                                                          )} wpm /
                                                                          ${Math.round(
                                                                                subTypeStats
                                                                                      .testMode
                                                                                      .lastTwentyTestsAverageAccuracy
                                                                          )} %`
                                                                        : "-"}
                                                            </td>
                                                            <td
                                                                  className={
                                                                        styles[
                                                                              "language-overall-stats-table-data"
                                                                        ]
                                                                  }
                                                            >
                                                                  {subTypeStats.testMode
                                                                        ? `${subTypeStats.testMode.highestWpmOfATest} wpm`
                                                                        : "-"}
                                                            </td>
                                                            <td
                                                                  className={
                                                                        styles[
                                                                              "language-overall-stats-table-data"
                                                                        ]
                                                                  }
                                                            >
                                                                  {" "}
                                                                  {subTypeStats.testMode
                                                                        ? subTypeStats
                                                                                .testMode
                                                                                .totalNumberOfFinishedTests
                                                                        : "-"}
                                                            </td>
                                                            <td
                                                                  className={
                                                                        styles[
                                                                              "language-overall-stats-table-data"
                                                                        ]
                                                                  }
                                                            ></td>
                                                      </tr>
                                                );
                                          })}
                                    </table>
                              </section>

                              {/* <section
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
                              </section> */}

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
                                          styles["characters-bar-graph-section"]
                                    }
                              >
                                    <CharactersBartGraph
                                          loaderData={loaderData}
                                          theme={
                                                settingsData.payload.settings
                                                      .theme
                                          }
                                    ></CharactersBartGraph>
                              </section> */}
                              {/* <section
                                    className={
                                          styles["characters-bar-graph-section"]
                                    }
                              >
                                    <WordsBarGraph
                                          loaderData={loaderData}
                                          theme={
                                                settingsData.payload.settings
                                                      .theme
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
