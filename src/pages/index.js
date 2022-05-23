export { default as CardPage } from './CardPage';
export { default as FindPasswordPage } from './FindPasswordPage';
export { default as JoinPage } from './JoinPage';
export { default as LoginPage } from './LoginPage';
export { default as MainPage } from './MainPage';
export { default as MyPage } from './MyPage';
export { default as SocialPage } from './SocialPage';

import 'bulma/css/bulma.min.css';

import App from '../App';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
