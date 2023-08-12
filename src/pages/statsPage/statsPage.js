import { useLoaderData } from "react-router-dom";
import { NavBar } from "../../components/navBar/navBar";
import { CharactersBartGraph } from "../statsPage/charactersBarGraph";
import styles from "./statsPage.module.css";

export const StatsPage = () => {
      const loaderData = useLoaderData();
      return (
            <div className={styles["page"]}>
                  <NavBar></NavBar>
                  <main className={styles["main"]}>
                        <section className={styles["all-time-stats-section"]}>
                              <div className={styles["all-time-stat"]}>
                                    <h4>Average Accuray</h4>
                                    <h1>
                                          {Math.floor(
                                                loaderData.averageAccuracy
                                          )}
                                    </h1>
                              </div>
                              <div className={styles["all-time-stat"]}>
                                    <h4>Average Wpm</h4>
                                    <h1>{Math.floor(loaderData.averageWpm)}</h1>
                              </div>
                        </section>
                        <section
                              className={styles["characters-bar-graph-section"]}
                        >
                              <CharactersBartGraph></CharactersBartGraph>
                        </section>
                        <section className={styles["last-ten-tests-section"]}>
                              <table className={styles["last-ten-tests-table"]}>
                                    <tr>
                                          <th>Wpm</th>
                                          <th>Accuracy</th>
                                          <th>Time</th>
                                          <th>Date</th>
                                    </tr>
                                    {loaderData.tests.map((test) => {
                                          return (
                                                <tr>
                                                      <td>{test.wpm}</td>
                                                      <td>{test.accuracy}</td>
                                                      <td>30s</td>
                                                      <td>12/9/2023</td>
                                                </tr>
                                          );
                                    })}
                              </table>
                        </section>
                  </main>
            </div>
      );
};

export const statsPageLoader = async () => {
      const response = await fetch("http://localhost:8080/stats");
      const data = await response.json();
      return data;
};
