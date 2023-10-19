import { Button } from "antd";
import styles from "./ButtonComponent.module.css";

interface ButtonComponentProps {
  title: string;
  size: "small" | "middle" | "large";
  background?: string;
  color?: string;
  onClickFunc?: () => void;
  icon?: React.ReactNode
}

export default function ButtonComponent({ title, size, background, color, onClickFunc, icon }: ButtonComponentProps) {
  return (
    <Button onClick={onClickFunc} size={size} className={styles.button} style={{ background: background, color: color }}>
      {title}
      {icon}
    </Button>
  );
}
