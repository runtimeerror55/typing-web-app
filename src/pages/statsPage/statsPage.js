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

export const StatsPage = () => {
      const [loaderData, setLoaderData] = useState(useAsyncValue()[0].value);
      const [loaderTwoData, setLoaderTwoData] = useState(
            useAsyncValue()[1].value
      );
      const [settingsData] = useState(useAsyncValue()[2].value);
      const [showLoader, setShowLoader] = useState(false);
      console.log(useAsyncValue());
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
                  setShowLoader(false);
            } else if (languageStatsFetcher.state !== "idle") {
                  setShowLoader(true);
            }
      }, [languageStatsFetcher]);

      if (
            settingsData.status === "error" ||
            loaderData.status === "error" ||
            loaderTwoData.status === "error"
      ) {
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

      if (loaderData?.payload?.testMode) {
            lastTwentyTestsAverages(loaderData.payload);
            highestAverageSpeedOfAWord(loaderData.payload);
            highestAverageAcuuracyOfAWord(loaderData.payload);
      }
      console.log(settingsData.payload.settings.theme);
      return (
            <>
                  <div
                        className={
                              styles["page"] +
                              " " +
                              styles[
                                    "page-" +
                                          settingsData.payload.settings.theme
                              ]
                        }
                  >
                        <NavBar></NavBar>
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
                                                                  .settings
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

                              <section
                                    className={styles["last-ten-tests-section"]}
                              >
                                    <h2>Last ten tests</h2>
                                    <table
                                          className={
                                                styles["last-ten-tests-table"] +
                                                " " +
                                                styles[
                                                      "last-ten-tests-table-" +
                                                            settingsData.payload
                                                                  .settings
                                                                  .theme
                                                ]
                                          }
                                    >
                                          <tr>
                                                <th>speed</th>
                                                <th>Accuracy</th>
                                                <th>Time</th>
                                                <th>Date(mm-dd-yyyy)</th>
                                          </tr>
                                          {loaderData.payload.testMode.lastTwentyTests
                                                .slice(-10)
                                                .map((test) => {
                                                      return (
                                                            <tr>
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
                                                      );
                                                })}
                                    </table>
                              </section>
                        </main>
                  </div>
            </>
      );
};
