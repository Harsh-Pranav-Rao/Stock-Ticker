import React, { useState, useEffect, useRef } from 'react';
import Company from '../company/Company';
import './TickerTape.css';

function TickerTape({ stockData, darkMode }) {
  const tickerRef = useRef(null);
  const [tickerPosition, setTickerPosition] = useState(0);
  const tickerWidth = 100; // Adjust this to the width of your ticker item
  const screenWidth = window.innerWidth;
  const itemsPerScreen = Math.floor(screenWidth / tickerWidth);
  const itemSpacing = 10; // Adjust the spacing between items

  // Define currentSector using the stockData parameter
  const currentSector = stockData.length > 0 ? stockData[stockData.length - 1].sector : '';

  useEffect(() => {
    const ticker = tickerRef.current;
    let animationFrameId;

    setTickerPosition(screenWidth);

    const updateTickerPosition = () => {
      setTickerPosition((prevPosition) => {
        const newPosition = prevPosition - 1;
        return newPosition <= -(tickerWidth + itemSpacing)
          ? screenWidth
          : newPosition;
      });

      animationFrameId = requestAnimationFrame(updateTickerPosition);
    };

    updateTickerPosition();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [screenWidth]);

  return (
    <div className="ticker-container" style={{ backgroundColor: darkMode ? 'black' : 'white' }}>
      <div
        ref={tickerRef}
        className="ticker"
        style={{
          transform: `translateX(-${tickerPosition}px)`,
          backgroundColor: darkMode ? 'black' : 'white',
        }}
      >
  
      {stockData.map((dataItem) => {
      if (dataItem.sector === currentSector) {
        return Object.entries(dataItem.data).map(([companyName, companyData]) => {
          const value = (((companyData["c"] - companyData["o"]) / companyData["o"]) * 100).toFixed(2);

          return (
            <Company key={companyName} name={companyName} value={value} darkMode={darkMode} />
          );
        });
      }
      return null;
    })}
      </div>
    </div>
  );
}

export default TickerTape;