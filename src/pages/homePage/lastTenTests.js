import styles from "./lastTenTests.module.css";
export const LastTenTests = ({ statsData, theme }) => {
      return (
            <section className={styles["last-ten-tests-section"]}>
                  <h2>Last ten tests</h2>
                  <table
                        className={
                              styles["last-ten-tests-table"] +
                              " " +
                              styles[theme]
                        }
                  >
                        <tr>
                              <th>speed</th>
                              <th>Accuracy</th>
                              <th>Time</th>
                              <th>Date(mm-dd-yyyy)</th>
                        </tr>
                        {statsData.payload?.testMode?.lastTwentyTests
                              .slice(-10)
                              .map((test) => {
                                    return (
                                          <tr>
                                                <td>{test.wpm} wpm</td>
                                                <td>{test.accuracy} %</td>
                                                <td>{test.timer} s</td>
                                                <td>{test.date}</td>
                                          </tr>
                                    );
                              })}
                  </table>
            </section>
      );
};
