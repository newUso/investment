// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // 修正箇所
import App from './App';

// React 18 以降は createRoot を使用します
const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);