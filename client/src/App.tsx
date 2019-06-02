import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Fibonacci from './Fibonacci';
import OtherPage from "./OtherPage";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Link to="/">Home</Link><Link to="/otherPage">Other Page</Link>
        <div>
			<Route exact path="/" component={Fibonacci}/>
			<Route path="/otherPage" component={OtherPage} />
		</div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
