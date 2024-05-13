// UserComponent.js
import React, { useState } from 'react';
import axios from 'axios';

const Balance = () => {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState(null);
  const [ether, setEther] = useState(null);
//   const [transactions, setTransactions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetch user balance and transactions
      const response = await axios.get(`http://localhost:3000/user/${address}`);
    //   console.log(response.data);
      setBalance(response.data.balance);
    //   setTransactions(response.data.transactions);
      setEther(response.data.etherPrice)
      console.log("Balance"+response.data.balance);
    } catch (error) {
      console.error('Error:', error.message);
      // Handle error
    }
  };

  return (
    <div>
      <h2>Enter User Address</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter Ethereum Address" />
        <button type="submit">Submit</button>
      </form>
      {(
        <div>
          <h3>Balance: {balance}</h3>
          <h3>Ethereum: {ether} usd</h3>
          {/* <ul>
            {transactions.map((transaction, index) => (
              <li key={index}>{JSON.stringify(transaction)}</li>
            ))}
          </ul> */}
        </div>
      )}
      {/* {transactions && transactions.length > 0 ? (
        <div>
        <h3>Balance: {balance}</h3>
        <h3>Transactions:</h3>
          <ul>
            {transactions.map((transaction, index) => (
              <li key={index}>{JSON.stringify(transaction)}</li>
            ))}
          </ul>
          </div>
        ) : (
          <p>No transactions found.</p>
        )} */}
    </div>
  );
};

export default Balance;
