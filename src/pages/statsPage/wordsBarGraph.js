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

      maxBarThickness: 30,
      scales: {
            y: {
                  zeroLineColor: "#ffcc33",
                  ticks: { color: "white", beginAtZero: true },
                  grid: {},
                  border: {
                        color: "black",
                  },
                  title: {
                        text: "count",
                        display: "true",
                        color: "white",
                  },
            },
            x: {
                  ticks: { color: "white", beginAtZero: true },
                  grid: {},
                  border: {
                        color: "black",
                  },
                  title: {
                        text: "ranges",
                        display: "true",
                        color: "white",
                  },
            },
      },
      plugins: {
            legend: {
                  labels: {
                        color: "white",
                        font: {
                              size: "16",
                        },
                  },
                  position: "top",
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
            labels: [],
            datasets: [
                  {
                        label: "count",
                        data: [],

                        backgroundColor: themes[theme],
                        barWidth: "10px",
                  },
            ],
      };
      const speedDistribution =
            loaderData.payload[lastTenTestsIndex]?.testMode?.speedDistribution;

      let array = speedDistribution ? Object.entries(speedDistribution) : [];
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
