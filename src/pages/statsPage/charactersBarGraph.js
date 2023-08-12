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

const data = {
      labels: ["a", "a", "a", "a", "a", "a", "a"],
      datasets: [
            {
                  label: "accuracy",
                  data: [
                        60, 70, 80, 90, 60, 70, 80, 90, 55, 45, 72, 53, 98, 12,
                        19,
                  ],

                  borderColor: "#FF6384",
                  backgroundColor: "darkcyan",
            },
      ],
};

export const CharactersBartGraph = () => {
      const loaderData = useLoaderData();
      console.log(loaderData);
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
