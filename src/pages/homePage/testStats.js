import styles from "./testStats.module.css";
export const TestStats = ({ testStats, typingState, timerState }) => {
      return (
            <div className={styles["test-stats"]}>
                  <div className={styles["test-stat"]}>
                        {timerState.elapsedTime}
                  </div>
                  {!typingState.finished ? (
                        ""
                  ) : (
                        <div className={styles["test-stat"]}>
                              wpm: {testStats.wpm}
                        </div>
                  )}
                  {!typingState.finished ? (
                        ""
                  ) : (
                        <div className={styles["test-stat"]}>
                              accuracy: {testStats.accuracy}
                        </div>
                  )}
            </div>
      );
};
