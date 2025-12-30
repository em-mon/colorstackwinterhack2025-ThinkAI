import styles from '../modules/Content.module.css';

export default function Content({ submitted, submittedPrompt }) {
  return (
    <div className={styles.container}>
      {!submitted ? (
        <div className={styles["text-area"]}>
          <h1 className={styles.title}>T H I N K</h1>
          <p className={styles.slogan}>Teaching users to THINK before they prompt.</p>
        </div>
      ) : (
        <div className={styles.results}>
          <div className={styles.bubble}>
            <p className={styles.submitted}>{submittedPrompt}</p>
          </div>
          <div className={styles["rectangle-container"]}>
            <div className={styles.rectangle}>
              <p className={styles["rectangle-text"]}>One</p>
            </div>
            <div className={styles.rectangle}>
              <p className={styles["rectangle-text"]}>Two</p>
            </div>
            <div className={styles.rectangle}>
              <p className={styles["rectangle-text"]}>Three</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}