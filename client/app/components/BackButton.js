import styles from '../components/BackButton.module.css';

export default function BackButton({ onClick }) {
  return (
    <button className={styles.backButton} onClick={onClick}>Back</button>
  );
}
