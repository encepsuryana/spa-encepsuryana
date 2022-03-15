import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <ColorModeScript />
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
