const tour = typeof window !== "undefined" && localStorage.getItem("tour");
const mobile = typeof window !== "undefined" && window.innerWidth < 768;
const primaryColors = "#06a77d";
const secondaryColor = "#ce2323";

console.log(tour);

export const areaData = (chanceHistory) => {
  return {
    series: [
      {
        name: "درصد شانس شما برای هر سوال",
        data: !tour && mobile ? [30, 40, 50, 80] : chanceHistory.map((item) => item.chance),
      },
    ],
    options: {
      chart: {
        background: "#fff",
        id: "area",
        height: "400px",
        toolbar: {
          show: false,
          tools: {
            zoom: false,
            zoomin: false,
            zoomout: false,
          },
        },
      },
      title: {
        text: "نمودار شانس اخذ ویزا شما در هر مرحله",
        floating: true,
        offsetY: 0,
        align: "center",
        style: {
          color: "#303030",
          fontWeight: "normal",
          fontSize: "14px",
        },
      },
      colors: [primaryColors],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      yaxis: {
        min: 0,
        max: 100,
        tickAmount: 5,
        labels: {
          formatter: function (val) {
            return val + "%";
          },
        },
      },
    },
  };
};

export const barNegativeData = (
  chanceHistory,
  questionCounter,
  responseExplain,
  setResponsePopup
) => {
  const mapThrough = (key) => {
    if (responseExplain[key] && Array.isArray(responseExplain[key])) {
      return responseExplain[key].map((item) => item.txt);
    }
    return [];
  };

  const seriesData =
    chanceHistory.length > 0 && questionCounter >= 2
      ? chanceHistory[questionCounter - 2].chartData
      : [0, 0, 0, 0, 0];

  const positiveData = seriesData.map((value) => (value > 0 ? value : 0));
  const negativeData = seriesData.map((value) => (value < 0 ? value : 0));

  return {
    series: [
      {
        name: "تغییرات پاسخ فعلی (مثبت)",
        data: !tour && mobile ? [40, 80, 0, 0] : positiveData,
      },
      {
        name: "تغییرات پاسخ فعلی (منفی)",
        data: !tour && mobile ? [0, 0, -30, -50] : negativeData,
      },
    ],
    options: {
      chart: {
        background: "#fff",
        stacked: true,
        toolbar: {
          show: false,
          tools: {
            zoom: false,
            zoomin: false,
            zoomout: false,
          },
        },
      },
      labels: Object.keys(responseExplain).reduce((acc, key) => {
        acc[key] = mapThrough(key);
        return acc;
      }, {}),
      colors: [primaryColors, secondaryColor], // Assuming green for positive and red for negative
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "80%",
          dataLabels: {
            formatter: function (val) {
              if (val >= 0) {
                return "+" + val + "%";
              } else {
                return "-" + Math.abs(val) + "%";
              }
            },
          },
        },
      },
      dataLabels: {
        enabled: false,
        formatter: function (val) {
          return Math.abs(val) + "%";
        },
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
        custom: function ({ series, seriesIndex, dataPointIndex, w, value }) {
          if (mobile) {
            if (dataPointIndex === 0) {
              setResponsePopup("purpose");
            } else if (dataPointIndex === 2) {
              setResponsePopup("career");
            } else if (dataPointIndex === 3) {
              setResponsePopup("financial");
            } else if (dataPointIndex === 1) {
              setResponsePopup("emotional");
            }
          }
          const emotionalData =
            responseExplain &&
            responseExplain[
              dataPointIndex === 0
                ? "purpose"
                : dataPointIndex === 2
                ? "career"
                : dataPointIndex === 3
                ? "financial"
                : "emotional"
            ]
              ? responseExplain[
                  dataPointIndex === 0
                    ? "purpose"
                    : dataPointIndex === 2
                    ? "career"
                    : dataPointIndex === 3
                    ? "financial"
                    : "emotional"
                ]
              : [];
          const emotionalContent = emotionalData
            .map((item, index) => `<p>${index + 1}- ${item.txt}</p>`)
            .join("");

          return !mobile
            ? emotionalContent.length > 0
              ? `<div style="direction: rtl; display: grid; gap: 8px; font-size: 14px; padding: 10px" margin: 0>` +
                `<div style="grid-column: span 6 / span 6;">` +
                `<p style="margin: 0;">` +
                emotionalContent +
                `</p>` +
                `</div>` +
                `</div>`
              : `<p>برای نمایش مشاوره بیشتر تمامی سوالات را پاسخ دهید</p>`
            : "";
        },
      },
      title: {
        text: "نمودار تاثیر پاسخ های شما بر وابستگی ها",
        floating: true,
        offsetY: 0,
        align: "center",
        style: {
          color: "#303030",
          fontWeight: "normal",
          fontSize: "14px",
        },
      },
      xaxis: {
        categories: ["هدف", "عاطفی", "شغلی", "اقتصادی"],
        min: -100,
        max: 100,
        tickAmount: 8,
        labels: {
          formatter: function (val) {
            return val + "%";
          },
        },
      },
    },
  };
};

export const radarData = (chanceHistory, questionCounter) => {
  return {
    series: [
      {
        name: "تغییرات پاسخ فعلی",
        data:
          !tour && mobile
            ? [40, 80, 60, 100]
            : chanceHistory.length > 0 && questionCounter >= 2
            ? chanceHistory[questionCounter - 2].chartData
            : [0, 0, 0, 0],
      },
      {
        name: "تغییرات پاسخ قبلی",
        data:
          !tour && mobile
            ? [100, 40, 40, 20]
            : chanceHistory.length > 0 && questionCounter >= 3
            ? chanceHistory[questionCounter - 3].chartData
            : [0, 0, 0, 0],
      },
    ],
    options: {
      chart: {
        background: "#fff",
        id: "radar",
        toolbar: {
          show: false,
          tools: {
            zoom: false,
            zoomin: false,
            zoomout: false,
          },
        },
      },
      colors: [primaryColors, "#008ffb"],
      xaxis: {
        categories: ["عاطفی", "شغلی", "هدف", "اقتصادی"],
      },
      yaxis: {
        min: 0,
        max: 100,
        tickAmount: 4,

        labels: {
          formatter: function (val) {
            return val + "%";
          },
        },
      },
      title: {
        text: "نمودار وابستگی های شما",
        floating: true,
        offsetY: 290,
        align: "center",
        style: {
          color: "#303030",
          fontWeight: "normal",
          fontSize: "14px",
        },
      },
    },
  };
};

export const columnData = (chanceHistory, questionCounter) => {
  return {
    series: [
      {
        name: "شناخت ویزارد از شما",
        data: !tour && mobile ? [20, 40, 60, 80] : chanceHistory.map((item) => item.potential),
      },
    ],
    options: {
      chart: {
        background: "#fff",
        type: "bar",
        toolbar: {
          show: false,
          tools: {
            zoom: false,
            zoomin: false,
            zoomout: false,
          },
          zoom: {
            enabled: false,
          },
        },
      },
      colors: [primaryColors, "#2E93FA"],
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top", // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: window.innerWidth > 768 ? true : false,
        formatter: function (val) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#303030"],
        },
      },

      xaxis: {
        min: 1,
        max: questionCounter,
        position: "top",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        min: 0,
        max: 100,
        labels: {
          formatter: function (val) {
            return val + "%";
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      title: {
        text: "شناخت ویزارد از شما در هر مرحله",
        floating: true,
        offsetY: 312,
        align: "center",
        style: {
          color: "#303030",
          fontWeight: "normal",
          fontSize: "14px",
        },
      },
      responsive: [
        {
          breakpoint: undefined,
          options: {
            interactivity: {
              enabled: false,
            },
          },
        },
      ],
    },
  };
};
