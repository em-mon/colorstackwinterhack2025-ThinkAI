import { useState, useEffect } from 'react';
import styles from '../modules/StrengthResults.module.css';

export default function StrengthResults({ className, analysis }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  // Animate score counting up
  useEffect(() => {
    if (analysis) {
      let current = 0;
      const target = analysis.score;
      const increment = target / 50; // 50 steps
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setAnimatedScore(target);
          clearInterval(timer);
        } else {
          setAnimatedScore(Math.floor(current));
        }
      }, 20);
      return () => clearInterval(timer);
    }
  }, [analysis]);
  
  if (!analysis) {
    return null;
  }
  
  const { score, level, levelName, breakdown, feedback, overallAssessment } = analysis;
  
  // Calculate circle stroke
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  
  // Color based on score
  const getColor = (score) => {
    if (score < 40) return '#e74c3c'; // Red
    if (score < 70) return '#f39c12'; // Orange
    return '#19b35c'; // Green
  };
  
  return (
    <div className={`${styles.container} ${className}`}>
      <h2 className={styles.title}>Prompt Strength Analysis</h2>
      
      {/* Circular Meter */}
      <div className={styles.meterSection}>
        <svg className={styles.circularMeter} width="200" height="200">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="#e0e0e0"
            strokeWidth="15"
          />
          {/* Progress circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={getColor(score)}
            strokeWidth="15"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={styles.progressCircle}
            transform="rotate(-90 100 100)"
          />
          {/* Score text */}
          <text
            x="100"
            y="95"
            textAnchor="middle"
            className={styles.scoreText}
            fill={getColor(score)}
          >
            {animatedScore}
          </text>
          <text
            x="100"
            y="115"
            textAnchor="middle"
            className={styles.scoreLabel}
            fill="#666"
          >
            / 100
          </text>
        </svg>
        
        <div className={styles.levelBadge} style={{ backgroundColor: getColor(score) }}>
          Level {level}: {levelName}
        </div>
      </div>
      
      {/* Overall Assessment */}
      <div className={styles.assessment}>
        <h3>Overall Assessment</h3>
        <p>{overallAssessment}</p>
      </div>
      
      {/* Breakdown */}
      <div className={styles.breakdown}>
        <h3>Score Breakdown</h3>
        <div className={styles.breakdownItem}>
          <span>Length & Detail</span>
          <div className={styles.barContainer}>
            <div 
              className={styles.bar}
              style={{ width: `${(breakdown.length / 20) * 100}%` }}
            />
          </div>
          <span>{breakdown.length}/20</span>
        </div>
        
        <div className={styles.breakdownItem}>
          <span>Clarity & Structure</span>
          <div className={styles.barContainer}>
            <div 
              className={styles.bar}
              style={{ width: `${(breakdown.clarity / 25) * 100}%` }}
            />
          </div>
          <span>{breakdown.clarity}/25</span>
        </div>
        
        <div className={styles.breakdownItem}>
          <span>Specificity</span>
          <div className={styles.barContainer}>
            <div 
              className={styles.bar}
              style={{ width: `${(breakdown.specificity / 25) * 100}%` }}
            />
          </div>
          <span>{breakdown.specificity}/25</span>
        </div>
        
        <div className={styles.breakdownItem}>
          <span>Context & Constraints</span>
          <div className={styles.barContainer}>
            <div 
              className={styles.bar}
              style={{ width: `${(breakdown.context / 20) * 100}%` }}
            />
          </div>
          <span>{breakdown.context}/20</span>
        </div>
        
        <div className={styles.breakdownItem}>
          <span>Actionability</span>
          <div className={styles.barContainer}>
            <div 
              className={styles.bar}
              style={{ width: `${(breakdown.actionability / 10) * 100}%` }}
            />
          </div>
          <span>{breakdown.actionability}/10</span>
        </div>
      </div>
      
      {/* Feedback */}
      <div className={styles.feedback}>
        {feedback.strengths.length > 0 && (
          <div className={styles.feedbackSection}>
            <h3>✅ Strengths</h3>
            <ul>
              {feedback.strengths.map((strength, idx) => (
                <li key={idx}>{strength}</li>
              ))}
            </ul>
          </div>
        )}
        
        {feedback.weaknesses.length > 0 && (
          <div className={styles.feedbackSection}>
            <h3>⚠️ Weaknesses</h3>
            <ul>
              {feedback.weaknesses.map((weakness, idx) => (
                <li key={idx}>{weakness}</li>
              ))}
            </ul>
          </div>
        )}
        
        {feedback.suggestions.length > 0 && (
          <div className={styles.feedbackSection}>
            <h3>💡 Suggestions</h3>
            <ul>
              {feedback.suggestions.map((suggestion, idx) => (
                <li key={idx}>{suggestion}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}