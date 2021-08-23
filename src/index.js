import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <link
      href="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css"
      rel="stylesheet"
    />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
