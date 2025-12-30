import { useState } from 'react';
import styles from '../modules/Input.module.css';
import { Send } from 'lucide-react';

export default function Input({ prompt, setPrompt, handleSend, isAnimating, shouldAnimate }) {
  const [showBubble, setShowBubble] = useState(false);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      triggerAnimation();
    }
  };

  const triggerAnimation = () => {
    // Only create bubble if title is visible (first submit)
    if (shouldAnimate) {
      setShowBubble(true);
      
      // Clear bubble after animation
      setTimeout(() => setShowBubble(false), 1500);
    }
    
    handleSend();
  };

  return (
    <div className={styles.container}>
      {showBubble && (
        <div className={styles.floatingBubble}>
          <div className={styles.bubbleText}>
            {prompt}
          </div>
        </div>
      )}
      
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Enter your prompt here..."
        className={`${styles["text-box"]} ${isAnimating ? styles.animating : ''}`}
        rows="2"
        disabled={isAnimating}
      />
      <button 
        onClick={triggerAnimation} 
        className={styles["send-button"]}
        disabled={isAnimating}
      >
        <Send/>
      </button>
    </div>
  );
}