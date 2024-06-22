import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import React from 'react';
import { init } from '@sentry/electron/renderer';

init({
  dsn: 'https://c3ee844c513692f73dd13d9822a0f00e@o4507300165713920.ingest.de.sentry.io/4507300168269904',
  debug: true,
  attachStacktrace: true,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
