import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from '../modules/Variations.module.css';

export default function Variations({ className, submittedPrompt, strengthLevel }) {
  const [showCarousel, setShowCarousel] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(strengthLevel - 1); // Start at user's level
  const [variations, setVariations] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateVariations = async () => {
    setIsGenerating(true);
    
    // Simulate API call (replace with actual API later)
    setTimeout(() => {
      const mockVariations = {
        level1: {
          prompt: generateLevel1Variation(submittedPrompt),
          reason: "This is a vague, basic version with minimal detail and no specific constraints.",
          expectedRetries: 3.5,
          co2Impact: "35g CO₂"
        },
        level2: {
          prompt: generateLevel2Variation(submittedPrompt),
          reason: "This version has some structure and context but could be more specific.",
          expectedRetries: 1.8,
          co2Impact: "18g CO₂"
        },
        level3: {
          prompt: generateLevel3Variation(submittedPrompt),
          reason: "This is a comprehensive, well-structured prompt with clear specifications.",
          expectedRetries: 1.0,
          co2Impact: "10g CO₂"
        }
      };
      
      setVariations(mockVariations);
      setShowCarousel(true);
      setIsGenerating(false);
    }, 2000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? 2 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === 2 ? 0 : prev + 1));
  };

  const levels = ['level1', 'level2', 'level3'];
  const levelNames = ['Weak', 'Moderate', 'Strong'];
  const currentLevel = levels[currentIndex];
  const currentVariation = variations?.[currentLevel];

  // Get the original prompt for the user's level
  const getPromptForLevel = (level) => {
    const levelNum = level.replace('level', '');
    if (parseInt(levelNum) === strengthLevel) {
      return submittedPrompt; // User's original prompt
    }
    return variations[level].prompt; // Generated variation
  };

  if (!showCarousel) {
    return (
      <div className={`${styles.card} ${className}`}>
        <div className={styles.placeholder}>
          <h2>Your Prompt Variations</h2>
          <p>See how different quality levels affect AI responses and environmental impact</p>
          <button 
            className={styles.generateButton}
            onClick={handleGenerateVariations}
            disabled={isGenerating}
          >
            {isGenerating ? '🔄 Generating...' : '✨ Generate Variations'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.carouselContainer} ${className}`}>
      {/* Left Arrow */}
      <button 
        className={`${styles.arrow} ${styles.arrowLeft}`}
        onClick={goToPrevious}
        aria-label="Previous variation"
      >
        <ChevronLeft size={32} />
      </button>

      {/* Card */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.levelBadge} data-level={currentIndex + 1}>
            Level {currentIndex + 1}: {levelNames[currentIndex]}
          </span>
          {parseInt(currentLevel.replace('level', '')) === strengthLevel && (
            <span className={styles.originalBadge}>Your Prompt</span>
          )}
        </div>

        <div className={styles.cardContent}>
          {/* Prompt Display */}
          <div className={styles.promptSection}>
            <h3>Prompt:</h3>
            <div className={styles.promptBox}>
              {getPromptForLevel(currentLevel)}
            </div>
          </div>

          {/* Reasoning */}
          <div className={styles.reasoningSection}>
            <h3>Why Level {currentIndex + 1}?</h3>
            <p>{currentVariation.reason}</p>
          </div>

          {/* Environmental Impact */}
          <div className={styles.impactSection}>
            <h3>🌍 Environmental Impact:</h3>
            <div className={styles.impactGrid}>
              <div className={styles.impactStat}>
                <span className={styles.impactLabel}>Expected Retries:</span>
                <span className={styles.impactValue}>{currentVariation.expectedRetries}×</span>
              </div>
              <div className={styles.impactStat}>
                <span className={styles.impactLabel}>Total CO₂:</span>
                <span className={styles.impactValue}>{currentVariation.co2Impact}</span>
              </div>
            </div>
          </div>

          {/* Mock Response Preview */}
          <div className={styles.responseSection}>
            <h3>AI Response Preview:</h3>
            <div className={styles.responseBox}>
              {getMockResponse(currentIndex + 1)}
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className={styles.indicators}>
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              className={`${styles.indicator} ${currentIndex === index ? styles.active : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to level ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Right Arrow */}
      <button 
        className={`${styles.arrow} ${styles.arrowRight}`}
        onClick={goToNext}
        aria-label="Next variation"
      >
        <ChevronRight size={32} />
      </button>
    </div>
  );
}

// Helper functions to generate variations (simplified - replace with AI API later)
function generateLevel1Variation(prompt) {
  // Strip details, make vague
  const firstFewWords = prompt.split(' ').slice(0, 5).join(' ');
  return firstFewWords + "...";
}

function generateLevel2Variation(prompt) {
  // Add moderate structure
  return `Please ${prompt.split(' ').slice(0, 15).join(' ')}...`;
}

function generateLevel3Variation(prompt) {
  // Add comprehensive details
  return `${prompt} Please provide a detailed response with specific examples, structured in clear sections, and cite relevant sources where appropriate.`;
}

function getMockResponse(level) {
  const responses = {
    1: "Here's some basic information about that topic. [Generic, surface-level response that lacks depth and specificity...]",
    2: "Here's a more detailed explanation. [Moderate response with some structure and examples, but could be more comprehensive...]",
    3: "Here's a comprehensive analysis: [Well-structured response with specific examples, clear organization, and detailed information that directly addresses the prompt...]"
  };
  return responses[level];
}