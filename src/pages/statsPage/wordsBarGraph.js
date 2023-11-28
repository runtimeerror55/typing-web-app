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
      //   indexAxis: "y",
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
};

export const WordsBarGraph = ({ loaderData, theme }) => {
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

      let array = Object.entries(loaderData.payload.testMode.wordsStats);
      console.log(array);
      array.sort((a, b) => {
            return Math.floor(a[1].averageWpm) - Math.floor(b[1].averageWpm);
      });

      data.labels = array.map(([key, value]) => {
            return key;
      });
      data.datasets[0].data = array.map(([key, value]) => {
            return Math.floor(value.averageWpm);
      });

      console.log(data);
      return <Bar options={options} data={data} />;
};
