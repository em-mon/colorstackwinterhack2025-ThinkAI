import { useState } from 'react';
import Content from './components/Content.jsx';
import Input from './components/Input.jsx';
import styles from './modules/Prompt.module.css';

export default function Prompt() {
  const [submitted, setSubmitted] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSend = () => {
    if (prompt.trim()) {
      // Check if title is still visible (first submission)
      if (!submitted) {
        setIsAnimating(true);
        
        // Wait for animation to complete before showing results
        setTimeout(() => {
          setSubmitted(true);
          setIsAnimating(false);
          setPrompt('');
        }, 1500); // Match animation duration
      } else {
        setPrompt('');
      }
    }
  };

  return (
    <div className={styles.container}>
      <Content />
      <Input 
        prompt={prompt}
        setPrompt={setPrompt}
        handleSend={handleSend}
        isAnimating={isAnimating}
        shouldAnimate={!submitted}
      />
    </div>
  );
}