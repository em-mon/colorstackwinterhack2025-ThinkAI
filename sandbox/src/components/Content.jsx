import styles from '../modules/Content.module.css';

import StrengthResults from './StrengthResults.jsx';
import Variations from './Variations.jsx';

export default function Content() {
  return (
    <div className={styles.container}>
      <StrengthResults className={styles.strength}></StrengthResults>
      <div className={styles.variation}>
        <h1>Click through to see how the variations on your prompt change the response given:</h1>
        <Variations></Variations>
      </div>
    </div>
  );
}