import { ReactNode } from "react";
import styles from "./checkbox.module.sass";

interface CheckboxFormProps {
  id: string;
  [key: string]: any;
  children?: ReactNode;
}

export const Checkbox = ({ children, id, ...props }: CheckboxFormProps) => {
  return (
    <form className={styles.form}>
      <input {...props} id={id} type="checkbox" className={styles.input} />
      <label htmlFor={id} className={styles.checkboxLabel}>
        {children}
      </label>
    </form>
  );
};

Checkbox.defaultProps = {
  children: null,
};
