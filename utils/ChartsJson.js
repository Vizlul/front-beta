export const areaData = (chanceHistory) => {
  return {
    series: [
      {
        name: "درصد شانس شما برای هر سوال",
        data: chanceHistory.map((item) => item.chance),
      },
    ],
    options: {
      chart: {
        id: "area",
        toolbar: {
          show: false,
        },
      },
      colors: ["#00E396"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      yaxis: {},
    },
  };
};

export const barNegativeData = (chanceHistory, questionCounter, responseExplain) => {
  console.log(chanceHistory);
  console.log(responseExplain);
  return {
    series: [
      {
        name: "تغییرات پاسخ فعلی",
        data:
          chanceHistory.length > 0 && questionCounter >= 2
            ? chanceHistory[questionCounter - 2].chartData
            : [0, 0, 0, 0, 0],
      },
    ],
    options: {
      chart: {
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      colors: ["#00E396", "#2E93FA"],
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "80%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },

      grid: {
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      yaxis: {
        min: -5,
        max: 5,
        title: {
          // text: 'Age',
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
        x: {
          formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
            let test = chanceHistory;
            console.log(test);
            return (
              `<div style="direction: rtl; display: flex; flex-direction: column; gap: 8px; font-size: 14px;" class="apexcharts-tooltip-title">` +
              `<p>` +
              `<span> 1- </span>` +
              `</p>` +
              `<p>` +
              `<span> 2- </span>` +
              `</p>` +
              `<p>` +
              `<span> 3- </span>` +
              `</p>` +
              `<p>` +
              `<span> 4- </span>` +
              `</p>` +
              `<p style="font-weight: bold;">` +
              `<span> گزینه درست </span>` +
              `</p>` +
              `</div>`
            );
          },
        },
      },
      xaxis: {
        categories: ["هدف", "عاطفی", "شغلی", "اقتصادی"],
        labels: {
          formatter: function (val) {
            return Math.abs(Math.round(val)) + "%";
          },
        },
      },
      yaxis: {},
    },
  };
};

export const radarData = (chanceHistory, questionCounter) => {
  return {
    series: [
      {
        name: "تغییرات پاسخ فعلی",
        data:
          chanceHistory.length > 0 && questionCounter >= 2
            ? chanceHistory[questionCounter - 2].chartData
            : [0, 0, 0, 0, 0],
      },
      {
        name: "تغییرات پاسخ قبلی نسبت فعلی",
        data:
          chanceHistory.length > 0 && questionCounter >= 3
            ? chanceHistory[questionCounter - 3].chartData
            : [0, 0, 0, 0, 0],
      },
    ],
    options: {
      chart: {
        id: "radar",
        toolbar: {
          show: false,
        },
      },
      colors: ["#00E396", "#2E93FA"],
      yaxis: {},
    },
  };
};

export const columnData = (chanceHistory) => {
  return {
    series: [
      {
        name: "درصد شناخت ویزارد",
        data: chanceHistory.map((item) => item.potential),
      },
    ],
    options: {
      chart: {
        id: "column",
        toolbar: {
          show: false,
        },
      },
      colors: ["#00E396", "#2E93FA"],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "20%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      yaxis: {},
    },
  };
};
