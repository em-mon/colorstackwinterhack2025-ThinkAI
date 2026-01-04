import styles from '../modules/Variations.module.css';

export default function Variations({ className }) {
  return (
    <div className={`${styles.card} ${className}`}>
        <h1>VAR</h1>
    </div>
  );
}