import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

ReactDOM.render(
  <div>
    <Router>
      <ScrollToTop />
      <App />
    </Router>
  </div>,
  document.getElementById('root')
);
