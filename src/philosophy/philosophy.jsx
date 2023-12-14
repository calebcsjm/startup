import React from 'react';

import './philosophy.css';

export function Philosophy() {
  return (
    <main className="container-fluid bg-secondary text-center">

      <div id="picture" className="picture-box"><img src="/images/essentialism.png" alt="random" /></div>


      <p className="attribution">Source: Image created by ReadingGraphics, drawn from ideas in "Essentialism," by Greg Mckeown </p>

      <p>
        Much is said and written about habits. We are usually trying to do too many at once. 
      </p>

      <p>
        "The word priority came into the English language in the 1400s. It was singular. It meant the very first 
        or prior thing. It stayed singular for the next five hundred years. Only in the 1900s did we pluralize 
        the term and start talking about priorities." - Greg Mckeown
      </p>

    </main>
  );
}