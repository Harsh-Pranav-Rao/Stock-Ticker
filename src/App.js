import React, { useState, useEffect } from 'react';
import TickerTape from './components/tickerTape/TickerTape';
import './App.css';

function App() {
  const [stockData, setStockData] = useState([]); // Initialize as an empty array
  const [currentSector, setCurrentSector] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const fetchData = () => {
    fetch('/api')
      .then((response) => response.json())
      .then((data) => {
        const { sector, data: sectorData } = data;
  
        // Update stockData to include sector data
        setStockData((prevData) => [
          ...prevData,
          { sector, data: sectorData },
        ]);
  
        setCurrentSector(sector);
        setIsLoading(false);
      });
  };

  
  console.log("stock data:",stockData)

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 957000);

    return () => clearInterval(interval);
  }, []);

  const bodyStyle = {
    backgroundColor: darkMode ? 'black' : 'white',
  };

  return (
    <div style={bodyStyle}>
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        <div className="app-container">
          <hr style={{ borderColor: darkMode ? 'white' : 'black' }} />
          <div className="sectorName">{currentSector}</div>
          <TickerTape
            className="tickerTape"
            stockData={stockData}
            darkMode={darkMode}
          />

          <hr style={{ borderColor: darkMode ? 'white' : 'black' }} />
          <button
            className="DMbutton"
            onClick={() => {
              setDarkMode((prev) => !prev);
            }}
          >
            <i className="material-icons">
              {darkMode ? 'wb_sunny' : 'brightness_3'}
            </i>
          </button>
        </div>
      )}
    </div>
  );
}

export default App;