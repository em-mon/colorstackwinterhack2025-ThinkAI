import { useState } from 'react';
import Menu from './components/Menu.jsx';
import Content from './components/Content.jsx';
import Input from './components/Input.jsx';
import styles from './modules/Prompt.module.css';

import { aiNeedAnalyzer } from '../../core/aiNeedAnalyzer';
import { promptStrengthAnalyzer } from '../../core/promptStrengthAnalyzer';

export default function Prompt() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedPrompt, setSubmittedPrompt] = useState('');

  const [needAnalysis, setNeedAnalysis] = useState(null); 
  const [strengthAnalysis, setStrengthAnalysis] = useState(null); 



  const [prompt, setPrompt] = useState('');

  const handleSend = () => {
    console.info("Entered handleSend")
    if (prompt.trim()) {
      const firstAnalysis = aiNeedAnalyzer(prompt); 
      const secondAnalysis = promptStrengthAnalyzer(prompt);

      setSubmittedPrompt(prompt);
      setNeedAnalysis(firstAnalysis);
      setStrengthAnalysis(secondAnalysis);
      setSubmitted(true);
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
      />
      <Input 
        prompt={prompt}
        setPrompt={setPrompt}
        handleSend={handleSend}
      />
    </div>
  );
}