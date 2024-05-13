import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Value = () => {
  const [ethereumValue, setEthereumValue] = useState(null);

  useEffect(() => {
    const fetchEthereumValue = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr');
        const data = response.data;
        const value = data.ethereum.inr;
        setEthereumValue(value);
      } catch (error) {
        console.error('Error fetching Ethereum value:', error.message);
      }
    };

    fetchEthereumValue();
    // Fetch Ethereum value every 10 minutes (600000 milliseconds)
    const intervalId = setInterval(fetchEthereumValue, 600000);

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []); // Empty dependency array ensures effect runs only once on mount

  return (
    <div>
      <h2>Ethereum Value (INR)</h2>
      <p>Updates every 10 minutes</p>
      {ethereumValue !== null ? (
        <strong><p>{ethereumValue}</p></strong>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Value;
