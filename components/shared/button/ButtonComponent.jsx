import { Button } from "antd";
import styles from "./ButtonComponent.module.css";
import Loading from "../../shared/Loading";

export default function ButtonComponent({
  title,
  size,
  background,
  color,
  onClickFunc,
  icon,
  disabledFunc,
  loading,
  width,
  height,
}) {
  return (
    <button
      onClick={onClickFunc}
      size={size}
      className={styles.button}
      style={{
        background: background,
        color: color,
        border: `1px solid ${background}`,
        width: width && width,
        height: height && height,
      }}
      disabled={disabledFunc}
    >
      {loading ? (
        <Loading desktop={true} />
      ) : (
        <>
          {title}
          {icon}
        </>
      )}
    </button>
  );
}
