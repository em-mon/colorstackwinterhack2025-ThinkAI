import styles from '../modules/Content.module.css';

export default function Content({ submitted, submittedPrompt, needAnalysis, strengthAnalysis, resourceAnalysis, isAnimating }) {
  return (
    <div className={styles.container}>
      {!submitted && !isAnimating ? (
        <div className={styles["text-area"]}>
          <h1 className={styles.title}>THINK AI</h1>
          <p className={styles.slogan}>Teaching users to THINK before they prompt</p>
        </div>
      ) : submitted ? (
        <div className={styles.results}>
          <div className={`${styles.bubble} ${styles.bubbleBurst}`}>
            <p className={styles.submitted}>{submittedPrompt}</p>
          </div>
          <div className={`${styles["rectangle-container"]} ${styles.fadeIn}`}>
            <div className={styles.rectangle}>
              <h3 className={styles["rectangle-title"]}>AI Need Detector</h3>
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
              <h3 className={styles["rectangle-title"]}>Prompt Quality</h3>
              {strengthAnalysis ? (
                <div className={styles["analysis-content"]}>
                  <p><strong>Overall Score:</strong> {strengthAnalysis.overallScore}/10</p>
                  
                  <div className={styles["score-breakdown"]}>
                    <p><strong>Breakdown:</strong></p>
                    <ul>
                      <li>Clarity: {strengthAnalysis.breakdown.clarity}/10</li>
                      <li>Specificity: {strengthAnalysis.breakdown.specificity}/10</li>
                      <li>Structure: {strengthAnalysis.breakdown.structure}/10</li>
                      <li>Context: {strengthAnalysis.breakdown.context}/10</li>
                    </ul>
                  </div>
                  
                  {strengthAnalysis.goodPoints.length > 0 && (
                    <div>
                      <strong>✓ Good Points:</strong>
                      <ul>
                        {strengthAnalysis.goodPoints.map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {strengthAnalysis.improvements.length > 0 && (
                    <div>
                      <strong>⚠ Can Improve:</strong>
                      <ul>
                        {strengthAnalysis.improvements.map((improvement, idx) => (
                          <li key={idx}>{improvement}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {strengthAnalysis.tips.length > 0 && (
                    <div>
                      <strong>💡 Tips:</strong>
                      <ul>
                        {strengthAnalysis.tips.map((tip, idx) => (
                          <li key={idx}>{tip}</li>
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
              <h3 className={styles["rectangle-title"]}>Resource Analysis</h3>
              {resourceAnalysis ? (
                <div className={styles["analysis-content"]}>
                  {/* Token Information */}
                  <div>
                    <p><strong>Estimated Tokens:</strong> {resourceAnalysis.tokens.estimated}</p>
                    <p className={styles["small-text"]}>
                      ({resourceAnalysis.tokens.breakdown.words} words, 
                      {resourceAnalysis.tokens.breakdown.characters} characters)
                    </p>
                  </div>
                  
                  {/* Efficiency Score */}
                  <p><strong>Efficiency Score:</strong> {resourceAnalysis.efficiency.score}/10</p>
                  
                  {/* Efficiency Strengths */}
                  {resourceAnalysis.efficiency.strengths.length > 0 && (
                    <div>
                      <strong>✓ Efficient:</strong>
                      <ul>
                        {resourceAnalysis.efficiency.strengths.map((strength, idx) => (
                          <li key={idx}>{strength}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Efficiency Issues */}
                  {resourceAnalysis.efficiency.issues.length > 0 && (
                    <div>
                      <strong>⚠ Inefficiencies:</strong>
                      <ul>
                        {resourceAnalysis.efficiency.issues.map((issue, idx) => (
                          <li key={idx}>{issue}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Model Comparison */}
                  <div>
                    <strong>💰 Cost Comparison (per query):</strong>
                    <ul className={styles["model-list"]}>
                      <li>Claude Haiku 4: ${resourceAnalysis.costs['Claude Haiku 4'].totalCost}</li>
                      <li>Claude Sonnet 4: ${resourceAnalysis.costs['Claude Sonnet 4'].totalCost}</li>
                      <li>GPT-3.5 Turbo: ${resourceAnalysis.costs['GPT-3.5 Turbo'].totalCost}</li>
                    </ul>
                  </div>
                  
                  {/* Environmental Impact */}
                  <div>
                    <strong>🌍 Environmental Impact (Claude Sonnet 4):</strong>
                    <ul>
                      <li>Energy: {resourceAnalysis.environmental['Claude Sonnet 4'].energy}</li>
                      <li>CO₂: {resourceAnalysis.environmental['Claude Sonnet 4'].co2}</li>
                      <li>Water: {resourceAnalysis.environmental['Claude Sonnet 4'].water}</li>
                      <li className={styles["small-text"]}>
                        {resourceAnalysis.environmental['Claude Sonnet 4'].equivalent}
                      </li>
                    </ul>
                  </div>
                  
                  {/* Recommendations */}
                  {resourceAnalysis.recommendations.length > 0 && (
                    <div>
                      <strong>💡 Recommendations:</strong>
                      <ul>
                        {resourceAnalysis.recommendations.map((rec, idx) => (
                          <li key={idx}>{rec.message}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <p>No analysis available</p>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}