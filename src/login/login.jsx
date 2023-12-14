import React from 'react';

import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';

import './login.css';

export function Login({ userName, authState, onAuthChange }) {
  const [quote, setQuote] = React.useState('Loading...');
  const [quoteAuthor, setQuoteAuthor] = React.useState('unknown');

  React.useEffect(() => {
    fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.content);
        setQuoteAuthor(data.author);
      })
      .catch();
  }, []);

  return (
    <main className='container-fluid bg-secondary text-center'>
      <div>
        {authState !== AuthState.Unknown && <h1>Welcome to Priority</h1>}
        {authState === AuthState.Authenticated && (
          <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
        )}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            userName={userName}
            onLogin={(loginUserName) => {
              onAuthChange(loginUserName, AuthState.Authenticated);
            }}
          />
        )}
      </div>
      
      <div id="quote-of-day-box" className="quote-box bg-light text-dark">
        <h4 className="quote-of-day">
          Quote of the Day: 
        </h4>
        <p className="quote" id="loginQuote">
          {quote}
        </p>
        <p className="quote-source" id="loginQuoteSource">
            {quoteAuthor}
        </p>
      </div>

    </main>
  );

  // don't forget to insert the quote above, after we get to that
}