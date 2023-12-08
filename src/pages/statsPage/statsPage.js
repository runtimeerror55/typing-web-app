import { useAsyncValue, useFetcher } from "react-router-dom";
import { useState } from "react";
import { NavBar } from "../../components/navBar/navBar";

import styles from "./statsPage.module.css";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
      toastOptions,
      lastTwentyTestsAverages,
      highestAverageSpeedOfAWord,
      highestAverageAcuuracyOfAWord,
} from "../../utilities/utilities";

import { ColorRing } from "react-loader-spinner";
import { colorRingOptions } from "../../utilities/utilities";
import { WordsBarGraph } from "./wordsBarGraph";

export const StatsPage = () => {
      const [loaderTwoData, setLoaderTwoData] = useState(
            useAsyncValue()[1].value
      );
      const [settingsData] = useState(useAsyncValue()[2].value);
      const [showLoader, setShowLoader] = useState(false);
      const [lastTenTestsIndex, setLastTenTestsIndex] = useState(0);

      const languageStatsFetcherOne = useFetcher();
      const languageStatsFetcherOneStatus =
            languageStatsFetcherOne.data &&
            languageStatsFetcherOne.state === "idle";

      useEffect(() => {
            if (languageStatsFetcherOneStatus) {
                  const data = languageStatsFetcherOne.data;
                  if (data.status === "success") {
                        console.log(data.payload);
                        setLoaderTwoData(data);
                        setLastTenTestsIndex(0);
                        toast.success("fetched successfully", toastOptions);
                  } else {
                        toast.error(data.message, toastOptions);
                  }
                  setShowLoader(false);
            } else if (languageStatsFetcherOne.state !== "idle") {
                  setShowLoader(true);
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

      const languageFilterHandler = (event) => {
            const value = event.target.value;
            setLastTenTestsIndex(+value);
      };

      if (settingsData.status === "error" || loaderTwoData.status === "error") {
            return (
                  <div
                        className={
                              styles["page"] +
                              " " +
                              styles[`home-page-green-theme`]
                        }
                  >
                        <NavBar></NavBar>
                        something went wrong
                  </div>
            );
      }

      return (
            <>
                  <div
                        className={
                              styles["page"] +
                              " " +
                              styles["page-" + settingsData.payload.theme]
                        }
                  >
                        <NavBar theme={settingsData.payload.theme}></NavBar>
                        <ToastContainer></ToastContainer>

                        <main className={styles["main"]}>
                              {showLoader ? (
                                    <div className={styles["loader"]}>
                                          <ColorRing {...colorRingOptions} />
                                    </div>
                              ) : null}

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
                                                                  .theme
                                                ]
                                          }
                                    >
                                          <tr>
                                                <th
                                                      colSpan="7"
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
                                                            defaultValue="english"
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
                                                >
                                                      Total time spent in tests
                                                </th>
                                          </tr>

                                          {loaderTwoData.payload
                                                .sort((a, b) => {
                                                      return (
                                                            a.optionIndex -
                                                            b.optionIndex
                                                      );
                                                })
                                                .map((subTypeStats) => {
                                                      if (
                                                            subTypeStats.testMode
                                                      ) {
                                                            [
                                                                  subTypeStats
                                                                        .testMode
                                                                        .lastTwentyTestsAverageWpm,
                                                                  subTypeStats
                                                                        .testMode
                                                                        .lastTwentyTestsAverageAccuracy,
                                                            ] =
                                                                  lastTwentyTestsAverages(
                                                                        subTypeStats
                                                                              .testMode
                                                                              .lastTwentyTests
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
                                                                  >
                                                                        {subTypeStats.testMode
                                                                              ? subTypeStats
                                                                                      .testMode
                                                                                      .totalTimeSpentsInTests +
                                                                                " s"
                                                                              : "-"}
                                                                  </td>
                                                            </tr>
                                                      );
                                                })}
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
                                          value={lastTenTestsIndex}
                                    >
                                          <option disabled>
                                                languages and ranges
                                          </option>
                                          {loaderTwoData.payload.map(
                                                (subType) => {
                                                      return (
                                                            <option
                                                                  value={
                                                                        subType.optionIndex
                                                                  }
                                                            >
                                                                  {
                                                                        subType.subName
                                                                  }
                                                            </option>
                                                      );
                                                }
                                          )}
                                    </select>
                              </section>

                              <section
                                    className={styles["last-ten-tests-section"]}
                              >
                                    <h2>Last 20 tests</h2>
                                    <table
                                          className={
                                                styles["last-ten-tests-table"] +
                                                " " +
                                                styles[
                                                      "last-ten-tests-table-" +
                                                            settingsData.payload
                                                                  .theme
                                                ]
                                          }
                                    >
                                          <tbody>
                                                <tr>
                                                      <th>s.no</th>
                                                      <th>speed</th>
                                                      <th>Accuracy</th>
                                                      <th>Time</th>
                                                      <th>Date(mm-dd-yyyy)</th>
                                                </tr>
                                          </tbody>
                                          {(() => {
                                                let newArray = [];

                                                for (let i = 0; i < 20; i++) {
                                                      console.log(i);
                                                      if (
                                                            loaderTwoData.payload.sort(
                                                                  (a, b) => {
                                                                        return (
                                                                              a.optionIndex -
                                                                              b.optionIndex
                                                                        );
                                                                  }
                                                            )[lastTenTestsIndex]
                                                                  ?.testMode
                                                                  ?.lastTwentyTests[
                                                                  i
                                                            ]
                                                      ) {
                                                            const reversedArray =
                                                                  loaderTwoData.payload[
                                                                        lastTenTestsIndex
                                                                  ].testMode.lastTwentyTests.toReversed();
                                                            const test =
                                                                  reversedArray[
                                                                        i
                                                                  ];
                                                            newArray.push(
                                                                  <tbody>
                                                                        <tr>
                                                                              <td>
                                                                                    {i +
                                                                                          1}
                                                                              </td>
                                                                              <td>
                                                                                    {
                                                                                          test.wpm
                                                                                    }{" "}
                                                                                    wpm
                                                                              </td>
                                                                              <td>
                                                                                    {
                                                                                          test.accuracy
                                                                                    }{" "}
                                                                                    %
                                                                              </td>
                                                                              <td>
                                                                                    {
                                                                                          test.timer
                                                                                    }{" "}
                                                                                    s
                                                                              </td>
                                                                              <td>
                                                                                    {
                                                                                          test.date
                                                                                    }
                                                                              </td>
                                                                        </tr>
                                                                  </tbody>
                                                            );
                                                      } else {
                                                            newArray.push(
                                                                  <tbody>
                                                                        <tr>
                                                                              <td>
                                                                                    {i +
                                                                                          1}
                                                                              </td>
                                                                              <td>
                                                                                    -
                                                                              </td>
                                                                              <td>
                                                                                    -
                                                                              </td>
                                                                              <td>
                                                                                    -
                                                                              </td>
                                                                              <td>
                                                                                    -
                                                                              </td>
                                                                        </tr>
                                                                  </tbody>
                                                            );
                                                      }
                                                }
                                                return newArray;
                                          })()}
                                    </table>
                              </section>

                              <section
                                    className={
                                          styles["characters-bar-graph-section"]
                                    }
                              >
                                    <WordsBarGraph
                                          loaderData={loaderTwoData}
                                          lastTenTestsIndex={lastTenTestsIndex}
                                          theme={settingsData.payload.theme}
                                    ></WordsBarGraph>
                              </section>
                        </main>
                  </div>
            </>
      );
};
