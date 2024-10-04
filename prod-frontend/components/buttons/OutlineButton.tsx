import styles from "./outlinebutton.module.scss";

interface Props {
  children: string[];
  onClick?: () => void;
}

export const OutlineButton = ({ children, onClick }: Props) => {
  return (
    <button onMouseEnter={onClick} className={styles.outlineButton}>
      {children}
    </button>
  );
};
