import { useLoaderData, Await, defer } from "react-router-dom";
import { Suspense } from "react";
import { NavBar } from "../../components/navBar/navBar";
import { CharactersBartGraph } from "../statsPage/charactersBarGraph";
import styles from "./statsPage.module.css";
import { ColorRing } from "react-loader-spinner";
import { getToken } from "../../utilities/authentication";

export const StatsPage = () => {
      const { loaderData } = useLoaderData();
      const theme = "green-theme";
      const lastTenTestsStats = { wpm: 0, accuracy: 0 };

      console.log(lastTenTestsStats);
      return (
            <Suspense
                  fallback={
                        <div className={styles["page"]}>
                              <NavBar></NavBar>
                              <div className={styles["loader"]}>
                                    <ColorRing
                                          visible={true}
                                          height="80"
                                          width="80"
                                          ariaLabel="blocks-loading"
                                          wrapperStyle={{}}
                                          wrapperClass="blocks-wrapper"
                                          colors={[
                                                "#e15b64",
                                                "#f47e60",
                                                "#f8b26a",
                                                "#abbd81",
                                                "#849b87",
                                          ]}
                                    />
                              </div>
                        </div>
                  }
            >
                  <Await resolve={loaderData}>
                        {(loaderData) => {
                              lastTenTestsStats.wpm = loaderData.tests.reduce(
                                    (total, current, currentIndex) => {
                                          return (
                                                (current.wpm +
                                                      total * currentIndex) /
                                                (currentIndex + 1)
                                          );
                                    },
                                    0
                              );
                              return (
                                    <>
                                          <div
                                                className={
                                                      styles["page"] +
                                                      " " +
                                                      styles[
                                                            loaderData.settings
                                                                  .theme
                                                      ]
                                                }
                                          >
                                                <NavBar></NavBar>

                                                <main
                                                      className={styles["main"]}
                                                >
                                                      <section
                                                            className={
                                                                  styles[
                                                                        "all-time-stats-section"
                                                                  ]
                                                            }
                                                      >
                                                            <div
                                                                  className={
                                                                        styles[
                                                                              "all-time-stat"
                                                                        ] +
                                                                        " " +
                                                                        styles[
                                                                              loaderData
                                                                                    .settings
                                                                                    .theme
                                                                        ]
                                                                  }
                                                            >
                                                                  <h4>
                                                                        Average
                                                                        Accuray
                                                                  </h4>
                                                                  <h1>
                                                                        {Math.floor(
                                                                              loaderData.averageAccuracy
                                                                        )}
                                                                  </h1>
                                                            </div>
                                                            <div
                                                                  className={
                                                                        styles[
                                                                              "all-time-stat"
                                                                        ] +
                                                                        " " +
                                                                        styles[
                                                                              loaderData
                                                                                    .settings
                                                                                    .theme
                                                                        ]
                                                                  }
                                                            >
                                                                  <h4>
                                                                        Average
                                                                        Wpm
                                                                  </h4>
                                                                  <h1>
                                                                        {Math.floor(
                                                                              loaderData.averageWpm
                                                                        )}
                                                                  </h1>
                                                            </div>
                                                            <div
                                                                  className={
                                                                        styles[
                                                                              "all-time-stat"
                                                                        ] +
                                                                        " " +
                                                                        styles[
                                                                              loaderData
                                                                                    .settings
                                                                                    .theme
                                                                        ]
                                                                  }
                                                            >
                                                                  <h4>
                                                                        Average
                                                                        Wpm
                                                                  </h4>
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
                                                                  loaderData={
                                                                        loaderData
                                                                  }
                                                                  theme={
                                                                        loaderData
                                                                              .settings
                                                                              .theme
                                                                  }
                                                            ></CharactersBartGraph>
                                                      </section>
                                                      <section
                                                            className={
                                                                  styles[
                                                                        "last-ten-tests-section"
                                                                  ]
                                                            }
                                                      >
                                                            <table
                                                                  className={
                                                                        styles[
                                                                              "last-ten-tests-table"
                                                                        ] +
                                                                        " " +
                                                                        styles[
                                                                              loaderData
                                                                                    .settings
                                                                                    .theme
                                                                        ]
                                                                  }
                                                            >
                                                                  <tr>
                                                                        <th>
                                                                              Wpm
                                                                        </th>
                                                                        <th>
                                                                              Accuracy
                                                                        </th>
                                                                        <th>
                                                                              Time
                                                                        </th>
                                                                        <th>
                                                                              Date
                                                                        </th>
                                                                  </tr>
                                                                  {loaderData.tests.map(
                                                                        (
                                                                              test
                                                                        ) => {
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
                        }}
                  </Await>
            </Suspense>
      );
};

const loader = async () => {
      const response = await fetch("http://localhost:8080/stats", {
            headers: {
                  authorization: "Bearer " + getToken(),
            },
      });
      const data = await response.json();
      return data;
};

export const statsPageLoader = async () => {
      return defer({
            loaderData: loader(),
      });
};
