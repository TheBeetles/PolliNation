import styles from '../components/BackButton.module.css';

export default function ArrowButton({ onClick, children }) {
  return (
    <button className={styles.backButton} onClick={onClick}>
      <span className={styles.arrow}>&larr;</span> {children}
    </button>
  );
}
