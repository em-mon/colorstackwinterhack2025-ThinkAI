import styles from '../modules/Input.module.css';
import { Send } from 'lucide-react';

export default function Input({ prompt, setPrompt, handleSend }) {
  const handleKeyPress = (e) => {
    console.info("Entered handleKeyPress")
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.container}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter your prompt here..."
          className={styles["text-box"]}
          rows="2"
        />
        <button onClick={handleSend} className={styles["send-button"]}>
          <Send/>
        </button>
    </div>
  );
}