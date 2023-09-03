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

export const CharactersBartGraph = ({ loaderData, theme }) => {
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

      data.labels = Object.keys(loaderData.charactersStats).map((character) => {
            return character.toUpperCase();
      });
      data.datasets[0].data = Object.values(loaderData.charactersStats).map(
            (character) => {
                  return Math.floor(character.averageAccuracy);
            }
      );
      console.log(data);
      return <Bar options={options} data={data} />;
};
