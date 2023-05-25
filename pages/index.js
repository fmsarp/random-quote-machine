import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';

const IndexPage = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    getQuote();
  }, []);

  const getQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      setQuote(data.content);
      setAuthor(data.author);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    getQuote();
  };

  const tweetQuote = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `"${quote}" - ${author}`
    )}`;
    window.open(tweetUrl, '_blank');
  };

  return (
    <div className={styles.container}>
      <div id="quote-box" className={styles.quoteBox}>
        <div id="text" className={styles.text}>
          {quote}
        </div>
        <div id="author" className={styles.author}>
          - {author}
        </div>
        <button id="new-quote" className={styles.newQuote} onClick={handleClick}>
          New Quote
        </button>
        <a id="tweet-quote" className={styles.tweetQuote} href="#" onClick={tweetQuote}>
          Tweet Quote
        </a>
      </div>
    </div>
  );
};

export default IndexPage;
