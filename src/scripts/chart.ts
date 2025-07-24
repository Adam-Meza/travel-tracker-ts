import Chart from "chart.js/auto";
import type Agent from "../clasess/Agent";
import { yearlyProfitChart } from "./queries";

export const displayYearlyProfitChart = (agent: Agent) => {
  const formatData = () => {
    const years = ["2019", "2020", "2021", "2022", "2023"];
    return years.map((year) => ({
      profit: agent.getTotalForYear(year),
      year: year,
    }));
  };

  const formatted = formatData();

  new Chart(yearlyProfitChart, {
    type: "line",
    data: {
      labels: formatted.map((data) => data.year),
      datasets: [
        {
          label: "Total Profits",
          data: formatted.map((data) => data.profit),
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        //@ts-ignore
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
};
