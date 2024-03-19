import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppTitle from './AppTitle';
import reportWebVitals from './reportWebVitals';
import Search from './Search';
import Footer from './Footer';
import TypeSort from './TypeSort';

ReactDOM.render(
  <React.StrictMode>
    <AppTitle />
    <Search />
    <TypeSort />
    <App />
    <Footer />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

