import { useState } from 'react';
import { Menu } from 'lucide-react';
import styles from '../modules/Menu.module.css';

export default function Prompt() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
      <div className={styles.container}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={styles.button}
        >
          <Menu className={styles.icon} />
        </button>
        
        {menuOpen && (
          <div className={styles.menu}>
            <div className={styles.content}>Menu content goes here...</div>
          </div>
        )}
      </div>
  )
}