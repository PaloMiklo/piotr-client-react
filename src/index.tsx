import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import http from './service/http.service';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

let config: unknown;

(async () => {
  const response = await http.get('/config.json');
  console.log('response', response);
  config = response;
})();

export const ConfigContext = React.createContext(config);

root.render(
  <React.StrictMode>
    <ConfigContext.Provider value={config}>
      <App />
    </ConfigContext.Provider>,
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
