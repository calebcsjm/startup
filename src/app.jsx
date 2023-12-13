import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <body className="bg-dark text-light">
      <header className="container-fluid">
        <nav className="navbar fixed-top navbar-dark">
          <a className="navbar-brand" href="#">Priorit<s>ies</s>y</a>
          <menu className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="index.html">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="goaltracker.html">Tracker</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="scores.html">Scoreboard</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="philosophy.html">Philosophy</a>
            </li>
          </menu>
        </nav>
      </header>

      <main className="container-fluid bg-secondary text-center">App components go here</main>

    <footer>
      <div className="container-fluid"> 
        <span className="page-author">Caleb Harding</span>
        <a className="source-code" href="https://github.com/calebcsjm/startup">GitHub</a>
      </div>
    </footer>
  </body>
  );
}