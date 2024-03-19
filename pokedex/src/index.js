import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppTitle from './AppTitle';
import reportWebVitals from './reportWebVitals';
import Search from './Search';
import Footer from './Footer';

ReactDOM.render(
  <React.StrictMode>
    <AppTitle />
    <Search />
    <App />
    <Footer />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

