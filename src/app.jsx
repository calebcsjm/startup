import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { GoalTracker } from './goaltracker/goaltracker';
import { Scores } from './scores/scores';
import { Philosophy } from './philosophy/philosophy';
import { AuthState } from './login/authState';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);  

  return (
    <BrowserRouter>
        <div className="bg-dark text-light" id="body">
        <header className="container-fluid">
            <nav className="navbar fixed-top navbar-dark">
                {authState === AuthState.Unauthenticated && (<a className="navbar-brand" href="#">Priorit<s>ies</s>y</a>)}
                {authState === AuthState.Authenticated && (<a className="navbar-brand" href="#">{userName}'s Priorit<s>ies</s>y</a>)}
            <menu className="navbar-nav">
                <li className="nav-item">
                    <NavLink className="nav-link" to="">Login</NavLink>
                </li>
                {authState === AuthState.Authenticated && (
                    <li className="nav-item">
                        <NavLink className="nav-link" to="goaltracker">Tracker</NavLink>
                    </li>
                )}
                {authState === AuthState.Authenticated && (
                    <li className="nav-item">
                        <NavLink className="nav-link" to="scores">Scoreboard</NavLink>
                    </li>
                )}
                <li className="nav-item">
                    <NavLink className="nav-link" to="philosophy">Philosophy</NavLink>
                </li>
            </menu>
            </nav>
        </header>


        <Routes>
          <Route 
            path='/' 
            element={
                <Login 
                    userName={userName}
                    authState={authState}
                    onAuthChange={(userName, authState) => {
                        setAuthState(authState);
                        setUserName(userName);
                    }}
                />   
            } 
            exact
          />
          <Route path='/goaltracker' element={<GoalTracker/>} />
          <Route path='/scores' element={<Scores />} />
          <Route path='/philosophy' element={<Philosophy />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <footer>
            <div className="container-fluid"> 
                <span className="page-author">Caleb Harding</span>
                <a className="source-code" href="https://github.com/calebcsjm/startup">GitHub</a>
            </div>
        </footer>
    </div>
  </BrowserRouter>
  );
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}