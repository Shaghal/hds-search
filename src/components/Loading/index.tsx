import styles from "./Loading.module.css";

interface Props {
  size?: number;
}

export default function Loading({ size = 24 }: Props) {
  return (
    <div className={styles.hdsLoading} style={{ width: size, height: size }} />
  );
}
