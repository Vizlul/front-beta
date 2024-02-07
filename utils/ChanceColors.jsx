export const ColorCalc = (chance) => {
  console.log(chance);
  return chance > 0 && chance < 20
    ? { color: "#FF0000", bg: "rgba(255, 0, 0, 0.2)" }
    : chance >= 20 && chance < 40
    ? { color: "#FF5C00", bg: "rgba(255, 92, 0, 0.2)" }
    : chance >= 40 && chance < 60
    ? { color: "#FFB800", bg: "rgba(255, 184, 0, 0.2)" }
    : chance >= 60 && chance < 80
    ? { color: "#6E8000", bg: "rgba(110, 128, 0, 0.2)" }
    : chance >= 80 && chance < 100
    ? { color: "#008000", bg: "rgba(0, 128, 0, 0.2)" }
    : "";
};
