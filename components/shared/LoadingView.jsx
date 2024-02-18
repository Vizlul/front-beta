import styles from "./LoadingView.module.css";

export default function LoadingView() {
  return (
    <div className={styles.loadingView}>
      <span className={styles.loader}></span>
    </div>
  );
}
