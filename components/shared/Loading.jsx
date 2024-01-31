import React from "react";
import styles from "./Loading.module.css";

export default function Loading({ desktop }) {
  return (
    <span
      style={{ rotate: desktop && "scale(0.4)", padding: desktop && "10px !important" }}
      className={styles.loader}
    ></span>
  );
}
