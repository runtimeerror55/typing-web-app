import styles from "./testStats.module.css";
export const TestStats = ({ testStats, typingState }) => {
      const wpm =
            Math.floor(
                  (testStats.numberOfRightCharacters / 5) *
                        (60 / testStats.elapsedTime)
            ) || 0;
      const accuracy =
            Math.floor(
                  (testStats.numberOfRightCharacters /
                        (testStats.numberOfRightCharacters +
                              testStats.numberOfWrongCharacters)) *
                        100
            ) || 0;
      return (
            <div className={styles["test-stats"]}>
                  <div className={styles["test-stat"]}>
                        {testStats.elapsedTime}
                  </div>
                  {!typingState.finished ? (
                        ""
                  ) : (
                        <div className={styles["test-stat"]}>wpm: {wpm}</div>
                  )}
                  {!typingState.finished ? (
                        ""
                  ) : (
                        <div className={styles["test-stat"]}>
                              accuracy: {accuracy}
                        </div>
                  )}
            </div>
      );
};
