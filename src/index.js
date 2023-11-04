import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Company from './components/company/Company';
import TickerTape from './components/tickerTape/TickerTape';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <Company name="AAPL" value="1.50"/>
    <Company name="GOOGL" value="2.50"/> */}
    {/* <TickerTape stockData={{"AAPL":{"1. open":"161.6300","2. high":"165.8000","3. low":"161.4200","4. close":"165.5600","5. volume":"68445649"},"AMZN":{"1. open":"98.9500","2. high":"102.5700","3. low":"98.7100","4. close":"102.4000","5. volume":"67925138"},"MSFT":{"1. open":"283.5900","2. high":"289.9000","3. low":"283.1700","4. close":"289.8400","5. volume":"24222678"}}} stockDataKeys={["AAPL","AMZN","GOOG","GOOGL","MSFT"]}/> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
