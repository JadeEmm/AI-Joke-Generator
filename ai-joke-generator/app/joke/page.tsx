// app/joke/page.tsx
'use client'; // Client-side interactivity

import { useState } from 'react';
import styles from '../../styles/Joke.module.css';

export default function JokePage() {
  const [topic, setTopic] = useState('work');
  const [tone, setTone] = useState('witty');
  const [type, setType] = useState('pun');
  const [temperature, setTemperature] = useState(0.7);
  const [joke, setJoke] = useState('');
  const [evaluation, setEvaluation] = useState('');

  const generateJoke = async () => {
    const response = await fetch('/api/generate-joke', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic, tone, type, temperature }),
    });
    const data = await response.json();
    setJoke(data.joke);
    setEvaluation('');
  };

  const evaluateJoke = async () => {
    const response = await fetch('/api/evaluate-joke', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ joke }),
    });
    const data = await response.json();
    setEvaluation(data.evaluation);
  };

  return (
    <div className={styles.container}>
      <h2>Generate a Joke</h2>
      <p>Customize the joke by selecting your preferences below.</p>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="topic">
          Topic:
          <select
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className={styles.select}
          >
            <option value="work">Work</option>
            <option value="people">People</option>
            <option value="animals">Animals</option>
            <option value="food">Food</option>
            <option value="television">Television</option>
          </select>
        </label>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="tone">
          Tone:
          <select
            id="tone"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className={styles.select}
          >
            <option value="witty">Witty</option>
            <option value="sarcastic">Sarcastic</option>
            <option value="silly">Silly</option>
            <option value="dark">Dark</option>
            <option value="goofy">Goofy</option>
          </select>
        </label>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="type">
          Type:
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={styles.select}
          >
            <option value="pun">Pun</option>
            <option value="knock-knock">Knock-Knock</option>
            <option value="story">Story</option>
          </select>
        </label>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="temperature">
          Temperature:
          <input
            id="temperature"
            type="number"
            step="0.1"
            min="0"
            max="1"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className={styles.input}
            placeholder="0.0 - 1.0"
          />
        </label>
      </div>
      <button onClick={generateJoke} className={styles.button}>
        Generate Joke
      </button>

      {joke && (
        <div className={styles.result}>
          <h3>Your Joke:</h3>
          <p>{joke}</p>
          <button onClick={evaluateJoke} className={styles.button}>
            Evaluate Joke
          </button>
        </div>
      )}

      {evaluation && (
        <div className={styles.result}>
          <h3>Joke Evaluation:</h3>
          <p>{evaluation}</p>
        </div>
      )}
    </div>
  );
}
