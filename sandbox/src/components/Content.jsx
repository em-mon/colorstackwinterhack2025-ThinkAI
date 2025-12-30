import styles from '../modules/Content.module.css';

export default function Content({ submitted, submittedPrompt, needAnalysis }) {
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
              <h3 className={styles["rectangle-title"]}>AI Need Analysis</h3>
              {needAnalysis ? (
                <div className={styles["analysis-content"]}>
                  <p><strong>Needs AI:</strong> {needAnalysis.needsAI ? 'Yes' : 'No'}</p>
                  <p><strong>Confidence:</strong> {needAnalysis.confidence}</p>
                  <p><strong>Reason:</strong> {needAnalysis.reason}</p>
                  
                  {!needAnalysis.needsAI && needAnalysis.alternatives && (
                    <div>
                      <strong>Try instead:</strong>
                      <ul>
                        {needAnalysis.alternatives.map((alt, idx) => (
                          <li key={idx}>{alt}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {needAnalysis.needsAI && needAnalysis.recommendedModels && (
                    <div>
                      <strong>Recommended models:</strong>
                      <ul>
                        {needAnalysis.recommendedModels.map((model, idx) => (
                          <li key={idx}>{model}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <p>No analysis available</p>
              )}
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