import React, { useState } from 'react';
import axios from 'axios';
import "./App.css";
function Transactions() {
  const [address, setAddress] = useState('');
  const [transactions, setTransactions] = useState([]);

  // const getTransactions = async () => {
  //   try {
  //     const response = await axios.get(`/crypto-transactions/${address}`);
  //     setTransactions(response.data.transactions);
  //     console.log("transaations are imported");
  //     console.log(response.data.transactions);
  //   } catch (error) {
  //     console.error('Error fetching transactions:', error);
  //   }
  // };

  // const getTransactions = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:3000/crypto-transactions/${address}`);
  //     setTransactions(response.data.transactions); // Change this line
  //     console.log("Transactions are imported");
  //     console.log(response.data);
  //     console.log(transactions); // And this line
  //     response.data.transactions.forEach(async (transaction) => {
  //       try {
  //         await axios.post('http://localhost:3000/transactions', {transaction});
  //         console.log("Transaction sent to server successfully");
  //       } catch (error) {
  //         console.log("Error sending transaction to server:", error);
  //       }
  //     });
  //     console.log("Transactions sent to server successfully");
  //   } catch (error) {
  //     console.log("Error fetching transactions:", error);
  //   }
  // };
  const getTransactions = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/crypto-transactions/${address}`);
      const receivedTransactions = response.data.transactions; // Store transactions in a variable
      setTransactions(receivedTransactions); // Update state with received transactions
      console.log("Transactions are imported");
      console.log(receivedTransactions); // Log received transactions
      // Now, loop through the received transactions to send them to the server
      receivedTransactions.forEach(async (transaction) => {
        try {
          await axios.post('http://localhost:3000/transactions',transaction);
          console.log("Transaction sent to server successfully");
        } catch (error) {
          console.log("Error sending transaction to server:", error);
        }
      });
      console.log("Transactions sent to server successfully");
    } catch (error) {
      console.log("Error fetching transactions:", error);
    }
  };
  
  
  return (
    <div className="container">
      <h2>Crypto Transactions Viewer</h2>
      <div className="form">
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter Ethereum Address" />
        <button onClick={getTransactions}>Get Transactions</button>
      </div>
      <div id="transactions">
        {transactions && transactions.length > 0 ? (
          <ul>
            {transactions.map((transaction, index) => (
              <li key={index}>
                <strong>Hash:</strong> {transaction.hash}, <br></br>
                <strong>From:</strong> {transaction.from}, <strong>To:</strong> {transaction.to}, <br></br>
                <strong>Value:</strong> {transaction.value}
              </li>
            ))}
          </ul>
        ) : (
          <p>No transactions found.</p>
        )}
      </div>
    </div>
  );
}

export default Transactions;
