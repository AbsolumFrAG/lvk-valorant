import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    tooltip: {
      callbacks: {
        afterBody: function (tooltipItem: any) {
          return `Elo: ${
            tooltipItem[0].dataset.data[tooltipItem[0].dataIndex].eloname
          }\nPDL: ${tooltipItem[0].dataset.data[tooltipItem[0].dataIndex].pdl}`;
        },
      },
    },
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Progression du classement par équipe",
    },
  },
};

const labels = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
];

const LineChart = ({ statistics }: { statistics: any }) => {
  const data = {
    datasets: statistics,
  };
  return <Line options={options} data={data} />;
};

export default LineChart;
