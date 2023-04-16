import Chart from "chart.js/auto";
import React, { useEffect, useRef } from "react";

function BarChart() {
  const chartContainer = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      if (chartRef.current !== null) {
        chartRef.current.destroy();
      }
      chartRef.current = new Chart(chartContainer.current, {
        type: "bar",
        data: {
          labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
          datasets: [
            {
              label: "Finance per day",
              data: [10, 20, 15, 25, 22, 30, 28],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Financial Data Per Day",
            },
          },
        },
      });
    }
  }, [chartContainer]);

  return <canvas ref={chartContainer} id="acquisitions"></canvas>;
}

export default BarChart;
