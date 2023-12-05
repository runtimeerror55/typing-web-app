import styles from "./lastTenTests.module.css";
import { ClosingButton } from "../../components/buttons/closingButton";
export const LastTenTests = ({ statsData, theme, setShowLastTenTests }) => {
      const closingButtonClickHandler = () => {
            setShowLastTenTests(false);
      };
      return (
            <section className={styles["last-ten-tests-section"]}>
                  <ClosingButton
                        clickHandler={closingButtonClickHandler}
                  ></ClosingButton>
                  <h2>Last ten tests</h2>
                  <table
                        className={
                              styles["last-ten-tests-table"] +
                              " " +
                              styles[theme]
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
                        {statsData.payload?.testMode?.lastTwentyTests
                              .slice(-10)
                              .toReversed()
                              .map((test, index) => {
                                    return (
                                          <tbody key={index}>
                                                <tr>
                                                      <td>{index + 1}</td>
                                                      <td>{test.wpm} wpm</td>
                                                      <td>{test.accuracy} %</td>
                                                      <td>{test.timer} s</td>
                                                      <td>{test.date}</td>
                                                </tr>
                                          </tbody>
                                    );
                              })}
                  </table>
            </section>
      );
};
