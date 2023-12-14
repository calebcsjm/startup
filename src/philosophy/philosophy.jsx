import React from 'react';

import './philosophy.css';
import essImage from "../../public/essentialism.png";

export function Philosophy() {
  return (
    <main className="container-fluid bg-secondary text-center">

      <div id="picture" className="picture-box"><img src={essImage} alt="essentialism photo" /></div>


      <p className="attribution">Source: Image created by ReadingGraphics, drawn from ideas in "Essentialism," by Greg Mckeown </p>

      <p>
        Much is said and written about habits. We are usually trying to develop too many at once. 
      </p>

      <p>
        "The word priority came into the English language in the 1400s. It was singular. It meant the very first 
        or prior thing. It stayed singular for the next five hundred years. Only in the 1900s did we pluralize 
        the term and start talking about priorities." - Greg Mckeown
      </p>

    </main>
  );
}