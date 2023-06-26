import { InputHTMLAttributes } from "react";
import styles from "./TextInput.module.css";

function Select({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="text"
      className={[styles.input, className].join(" ")}
      {...props}
    />
  );
}

export default Select;
