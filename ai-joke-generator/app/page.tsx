// app/page.tsx
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <h2>Welcome to the AI Joke Generator</h2>
      <p>
        Ready to laugh? <a href="/joke" className={styles.link}>Generate a joke</a> using AI!
      </p>
    </div>
  );
}
