import { useState } from 'react';
import Content from './components/Content.jsx';
import Input from './components/Input.jsx';
import { analyzePromptStrength } from '../../core/strengthAnalyzer.js';
import styles from './modules/Prompt.module.css';

export default function Prompt() {
  const [submitted, setSubmitted] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [submittedPrompt, setSubmittedPrompt] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleSend = () => {
    if (prompt.trim()) {
      const currentPrompt = prompt;
      
      // Save the submitted prompt
      setSubmittedPrompt(currentPrompt);
      
      // Analyze the prompt
      const strengthAnalysis = analyzePromptStrength(currentPrompt);
      setAnalysis(strengthAnalysis);
      
      setPrompt('');
      
      if (!submitted) {
        setIsAnimating(true);
        setTimeout(() => {
          setSubmitted(true);
          setIsAnimating(false);
        }, 1500);
      }
    }
  };

  return (
    <div className={styles.container}>
      <Content 
        submitted={submitted}
        isAnimating={isAnimating}
        analysis={analysis}
        submittedPrompt={submittedPrompt}
      />
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