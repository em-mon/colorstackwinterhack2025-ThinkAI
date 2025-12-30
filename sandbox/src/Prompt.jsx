import { useState } from 'react';
import Menu from './components/Menu.jsx';
import Content from './components/Content.jsx';
import Input from './components/Input.jsx';
import styles from './modules/Prompt.module.css';

export default function Prompt() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedPrompt, setSubmittedPrompt] = useState('');
  const [prompt, setPrompt] = useState('');

  const handleSend = () => {
    console.info("Entered handleSend")
    // send error if empty message ???
    if (prompt.trim()) {
      setSubmittedPrompt(prompt);
      setSubmitted(true);
    }
  };

  return (
    <div className={styles.container}>
      <Menu />
      <Content 
        submitted={submitted} 
        submittedPrompt={submittedPrompt} 
      />
      <Input 
        prompt={prompt}
        setPrompt={setPrompt}
        handleSend={handleSend}
      />
    </div>
  );
}