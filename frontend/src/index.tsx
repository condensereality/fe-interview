import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


// Choose which app type you want, class or function
// import App from './App';
import App from './AppHooks';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

