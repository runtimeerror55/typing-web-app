import { useLoaderData, useAsyncValue } from "react-router-dom";
import { NavBar } from "../../components/navBar/navBar";
import { CharactersBartGraph } from "../statsPage/charactersBarGraph";
import { WordsBarGraph } from "./wordsBarGraph";
import styles from "./statsPage.module.css";

export const StatsPage = () => {
      const loaderData = useAsyncValue();
      const { settingsData } = useLoaderData();

      if (loaderData.status === "error") {
            return (
                  <div
                        className={
                              styles["page"] +
                              " " +
                              styles[`home-page-green-theme`]
                        }
                  >
                        {loaderData.message}
                  </div>
            );
      } else {
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

                              <main className={styles["main"]}>
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
                                                <h4>Average Accuray</h4>
                                                <h1>
                                                      {Math.floor(
                                                            loaderData.averageAccuracy
                                                      )}
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
                                                <h4>Average Wpm</h4>
                                                <h1>
                                                      {Math.floor(
                                                            loaderData.averageWpm
                                                      )}
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
                                                <h4>Average Wpm</h4>
                                                <h1>
                                                      {Math.floor(
                                                            loaderData.averageWpm
                                                      )}
                                                </h1>
                                          </div>
                                    </section>
                                    <section
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
                                    </section>
                                    <section
                                          className={
                                                styles["last-ten-tests-section"]
                                          }
                                    >
                                          <table
                                                className={
                                                      styles[
                                                            "last-ten-tests-table"
                                                      ] +
                                                      " " +
                                                      styles[
                                                            settingsData.payload
                                                                  .settings
                                                                  .theme
                                                      ]
                                                }
                                          >
                                                <tr>
                                                      <th>Wpm</th>
                                                      <th>Accuracy</th>
                                                      <th>Time</th>
                                                      <th>Date</th>
                                                </tr>
                                                {loaderData.tests.map(
                                                      (test) => {
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
                                                                        <td>
                                                                              30s
                                                                        </td>
                                                                        <td>
                                                                              12/9/2023
                                                                        </td>
                                                                  </tr>
                                                            );
                                                      }
                                                )}
                                          </table>
                                    </section>
                              </main>
                        </div>
                  </>
            );
      }
};
