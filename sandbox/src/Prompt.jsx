import { useState } from 'react';
import Menu from './components/Menu.jsx';
import Content from './components/Content.jsx';
import Input from './components/Input.jsx';
import styles from './modules/Prompt.module.css';

import { aiNeedAnalyzer } from '../../core/aiNeedAnalyzer';
import { promptStrengthAnalyzer } from '../../core/promptStrengthAnalyzer';
import { resourceAnalyzer } from '../../core/resourceAnalyzer';

export default function Prompt() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedPrompt, setSubmittedPrompt] = useState('');
  const [needAnalysis, setNeedAnalysis] = useState(null);
  const [strengthAnalysis, setStrengthAnalysis] = useState(null);
  const [resourceAnalysis, setResourceAnalysis] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSend = () => {
    if (prompt.trim()) {
      // Check if title is still visible (first submission)
      if (!submitted) {
        setIsAnimating(true);
        
        // Wait for animation to complete before showing results
        setTimeout(() => {
          const needResult = aiNeedAnalyzer(prompt);
          const strengthResult = promptStrengthAnalyzer(prompt);
          const resourceResult = resourceAnalyzer(prompt);
          
          setSubmittedPrompt(prompt);
          setNeedAnalysis(needResult);
          setStrengthAnalysis(strengthResult);
          setResourceAnalysis(resourceResult);
          setSubmitted(true);
          setIsAnimating(false);
          setPrompt('');
        }, 1500); // Match animation duration
      } else {
        // Instant update for subsequent submissions (title already hidden)
        const needResult = aiNeedAnalyzer(prompt);
        const strengthResult = promptStrengthAnalyzer(prompt);
        const resourceResult = resourceAnalyzer(prompt);
        
        setSubmittedPrompt(prompt);
        setNeedAnalysis(needResult);
        setStrengthAnalysis(strengthResult);
        setResourceAnalysis(resourceResult);
        setPrompt('');
      }
    }
  };

  return (
    <div className={styles.container}>
      <Menu />
      <Content 
        submitted={submitted} 
        submittedPrompt={submittedPrompt}
        needAnalysis={needAnalysis}
        strengthAnalysis={strengthAnalysis}
        resourceAnalysis={resourceAnalysis}
        isAnimating={isAnimating}
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