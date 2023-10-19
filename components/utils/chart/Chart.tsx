import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function MyChart() {
  const chartRef = useRef(null);
  let chart: any = null;

  const chartFunction = () => {
    if (chartRef.current) {
      if (chart) {
        chart.destroy();
        chart = new Chart(chartRef.current, {
          type: "radar",
          data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [
              {
                label: "# of Votes",
                data: [12, 19, 3, 5, 2, 3],
                borderWidth: 1,
              },
            ],
          },
        });
      } else {
        chart = new Chart(chartRef.current, {
          type: "radar",
          data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [
              {
                label: "# of Votes",
                data: [12, 19, 3, 5, 2, 3],
                borderWidth: 1,
              },
            ],
          },
        });
      }
    }
  };

  useEffect(() => {
    chartFunction();
  }, []);

  return <canvas ref={chartRef} />;
}
