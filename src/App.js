import { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';

import wordsToNumbers from 'words-to-numbers';

import classes from './App.module.css';

const alanKey = 'de31ae2ad56c3e95d60f5889526aecda2e956eca572e1d8b807a3e2338fdd0dc/stage';

function App() {

  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);

  useEffect(() => {
    alanBtn({ 
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === 'newHeadlines') {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if(command === 'highlight') {
          setActiveArticle((prevValue => prevValue + 1))
        } else if (command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > articles.length) {
            alanBtn().playText('Please try that again...');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          } else {
            alanBtn().playText('Please try that again...');
          }

          window.open(articles[number].url, '_blank')
        }
      }
     })
  }, [])

  return (
    <div className={classes.mainContainer}>
      <div className={classes.logoContainer}>
        <h1 style={{
          color: '#fff',
          padding: '0 90px'
        }}>You can search news by categories, by terms & by Sources. Each of them have many options. User is capable of go back to the main page with the command - 'Go back' ! </h1>
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
}

export default App;
