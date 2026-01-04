import styles from '../modules/Content.module.css';
import StrengthResults from './StrengthResults.jsx';
import Variations from './Variations.jsx';

export default function Content({ submitted, isAnimating, analysis, submittedPrompt }) {
  return (
    <div className={styles.container}>
      {!submitted && !isAnimating ? (
        <div className={styles["title-section"]}>
          <h1 className={styles.title}>THINK AI</h1>
          <p className={styles.slogan}>Teaching users to think before they prompt</p>
        </div>
      ) : submitted ? (
        <>
          <StrengthResults className={styles.strength} analysis={analysis} />

          <div className={styles.variationSlot}>
            <Variations
              submittedPrompt={submittedPrompt}
              strengthLevel={analysis?.level}
            />
          </div>
        </>
      ) : null}
    </div>
  );
}