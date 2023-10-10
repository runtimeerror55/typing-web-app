import styles from "./testStats.module.css";
import { useLoaderData } from "react-router-dom";
import {
      Chart as ChartJS,
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend,
      elements,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend
);
const options = {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      scales: {
            y: {
                  ticks: { color: "white", beginAtZero: true },
            },
            x: {
                  ticks: { color: "white", beginAtZero: true },
            },
      },
      plugins: {
            legend: {
                  position: "right",
            },
            title: {
                  display: true,
                  text: "speed of correct words",
            },
      },
};

export const TestStats = ({ testStats, theme }) => {
      const themes = {
            "green-theme": "#5fdc72",
            "blue-theme": "#5facdc",
            "violet-theme": "#c280f1",
      };

      const data = {
            labels: ["a", "a", "a", "a", "a", "a", "a"],
            datasets: [
                  {
                        label: "accuracy",
                        data: [
                              60, 70, 80, 90, 60, 70, 80, 90, 55, 45, 72, 53,
                              98, 12, 19,
                        ],

                        backgroundColor: themes[theme],
                  },
            ],
      };

      data.labels = Object.keys(testStats.wordsStats).map((character) => {
            return character;
      });
      data.datasets[0].data = Object.entries(testStats.wordsStats).map(
            ([key, value]) => {
                  console.log(
                        Math.floor(
                              (key.length / 5) * (60 / (value.speed / 1000))
                        )
                  );
                  return Math.floor(
                        (key.length / 5) * (60 / (value.speed / 1000))
                  );
            }
      );
      console.log(data);
      return (
            <div className={styles["test-stats"]}>
                  {/* <div className={styles["test-stat"]}>
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
                  )} */}
                  <div className={styles["all-time-stats-section"]}>
                        <div
                              className={
                                    styles["all-time-stat"] +
                                    " " +
                                    styles[theme]
                              }
                        >
                              <h4>Accuray</h4>
                              <h1>{testStats.accuracy}</h1>
                        </div>
                        <div
                              className={
                                    styles["all-time-stat"] +
                                    " " +
                                    styles[theme]
                              }
                        >
                              <h4>Wpm</h4>
                              <h1>{testStats.wpm}</h1>
                        </div>
                  </div>
                  <Bar options={options} data={data} />
            </div>
      );
};
