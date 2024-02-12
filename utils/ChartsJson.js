export const areaData = (chanceHistory, questionCounte, chanceDataChart) => {
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
        width: "100%",
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

export const barNegativeData = (chanceHistory, questionCounter) => {
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
        type: "bar",
        width: "100%",
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
        shared: false,
        x: {
          formatter: function (val) {
            return val;
          },
        },
        y: {
          formatter: function (val) {
            return Math.abs(val) + "%";
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
        width: "100%",
        toolbar: {
          show: false,
        },
      },
      colors: ["#00E396", "#2E93FA"],
      yaxis: {},
    },
  };
};

export const columnData = (chanceHistory, questionCounter) => {
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
        width: "100%",
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
