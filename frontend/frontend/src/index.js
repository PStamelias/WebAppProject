import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import App from './App.js'
import Routes from './components/Routes.js'
ReactDOM.render(
    <Router>
    <Routes/>
    </Router>,
  document.getElementById('root')
);
