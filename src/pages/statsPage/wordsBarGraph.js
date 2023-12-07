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

      //   scales: {
      //         y: {
      //               ticks: { color: "white", beginAtZero: true },
      //         },
      //         x: {
      //               ticks: { color: "white", beginAtZero: true },
      //         },
      //   },
      barPercentage: 0.4,
      scales: {
            y: {
                  zeroLineColor: "#ffcc33",
                  ticks: { color: "white", beginAtZero: true },
                  grid: {},
                  border: {
                        color: "black",
                  },
            },
            x: {
                  ticks: { color: "white", beginAtZero: true },
                  grid: {},
                  border: {
                        color: "black",
                  },
            },
      },
};

export const WordsBarGraph = ({ loaderData, theme, lastTenTestsIndex }) => {
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
                        barWidth: "10px",
                  },
            ],
      };

      let array = Object.entries(
            loaderData.payload[lastTenTestsIndex]?.testMode?.speedDistribution
      );
      console.log(array);
      array.sort((a, b) => {
            return +a[0] - +b[0];
      });

      data.labels = array.map(([key, value]) => {
            return key + "-" + (+key + 9);
      });
      data.datasets[0].data = array.map(([key, value]) => {
            return value;
      });

      console.log(data);
      return <Bar options={options} data={data} />;
};
