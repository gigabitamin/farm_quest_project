import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import LoginCheck from './pages/user/LoginCheck'; 
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import reducer from './pages/reducer';
import { CookiesProvider } from 'react-cookie';

const store = configureStore({ reducer: reducer });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>
    <BrowserRouter>
      <Provider store={store}>
        <LoginCheck />
        <App />
      </Provider>
    </BrowserRouter>
  </CookiesProvider>
);

reportWebVitals();
