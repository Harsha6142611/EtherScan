// // const express = require('express');
// // const axios = require('axios');

// // const app = express();
// // const PORT = process.env.PORT || 3000;

// // // Define your Etherscan API key
// // const ETHERSCAN_API_KEY = '5YRZPPNSUR6DE6SXZ23SA3M84YEJ6VKGVN';

// // // API endpoint to fetch crypto transactions for a user
// // app.get('/crypto-transactions/:address', async (req, res) => {
// //   try {
// //     const address = req.params.address;
// //     const apiUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${ETHERSCAN_API_KEY}`;

// //     const response = await axios.get(apiUrl);

// //     // Filter out only "Normal" transactions
// //     const transactions = response.data.result.filter(transaction => transaction.txreceipt_status === '1');

// //     res.json({ transactions });
// //   } catch (error) {
// //     console.error('Error fetching transactions:', error);
// //     res.status(500).json({ error: 'Error fetching transactions' });
// //   }
// // });

// // // Start the server
// // app.listen(PORT, () => {
// //   console.log(`Server is running on port ${PORT}`);
// // });

// const express = require('express');
// const axios = require('axios');
// const cors = require('cors'); // Import cors module

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Use cors middleware
// app.use(cors());

// // Define your Etherscan API key
// const ETHERSCAN_API_KEY = '5YRZPPNSUR6DE6SXZ23SA3M84YEJ6VKGVN';

// // API endpoint to fetch crypto transactions for a user
// app.get('/crypto-transactions/:address', async (req, res) => {
//   try {
//     const address = req.params.address;
//     const apiUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${ETHERSCAN_API_KEY}`;

//     const response = await axios.get(apiUrl);

//     // Filter out only "Normal" transactions
//     const transactions = response.data.result.filter(transaction => transaction.txreceipt_status === '1');

//     res.json({ transactions });
//     console.log(response.data.result); // Add this line in your server code
//   } catch (error) {
//     console.error('Error fetching transactions:', error);
//     res.status(500).json({ error: 'Error fetching transactions' });
//   }
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require("mongoose")
const TransactionModel = require("./models/Transcations")

mongoose.connect("mongodb+srv://<username>:<password>@cluster0.6coalvf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
const app = express();
const PORT = process.env.PORT || 3000;

// Use cors middleware
app.use(cors());
app.use(express.json());

// Define your Etherscan API key
const ETHERSCAN_API_KEY = 'Your Eth Key';

// Function to calculate user's balance based on transactions
async function calculateBalance(userAddress) {
  try {
    const transactionsUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${userAddress}&startblock=0&endblock=99999999&sort=desc&apikey=${ETHERSCAN_API_KEY}`;

    // Fetch user's transactions
    const transactionsResponse = await axios.get(transactionsUrl);
    const transactions = transactionsResponse.data.result.filter(transaction => transaction.txreceipt_status === '1');

    // Calculate user's balance
    let balance = 0;
    transactions.forEach(transaction => {
      if (transaction.from.toLowerCase() === userAddress.toLowerCase()) {
        balance -= parseFloat(transaction.value);
      }
      if (transaction.to.toLowerCase() === userAddress.toLowerCase()) {
        balance += parseFloat(transaction.value);
      }
    });

    return balance;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw new Error('Error fetching transactions');
  }
}

// API endpoint to fetch user's transactions and calculate balance
app.get('/user/:address', async (req, res) => {
  try {
    const userAddress = req.params.address;

    // Calculate user's balance
    const balance = await calculateBalance(userAddress);

    // Fetch current price of Ether from an API (e.g., CoinGecko)
    const etherPriceResponse = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
    const etherPrice = etherPriceResponse.data.ethereum.usd;

    // Return user's balance and current price of Ether
    res.json({
      balance,
      etherPrice
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Error fetching user data' });
  }
});

// API endpoint to fetch crypto transactions for a user
app.get('/crypto-transactions/:address', async (req, res) => {
  try {
    const address = req.params.address;
    const apiUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${ETHERSCAN_API_KEY}`;

    const response = await axios.get(apiUrl);

    // Filter out only "Normal" transactions
    const transactions = response.data.result.filter(transaction => transaction.txreceipt_status === '1');

    res.json({ transactions });
    console.log(response.data.result); // Add this line in your server code
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Error fetching transactions' });
  }
});

app.post('/transactions', (req, res) => {
  console.log("IM trasactions");
  console.log(req.body);
  console.log("IM trasactions");
  const { hash, from, to, value } = req.body;
  const newTransaction = new TransactionModel({
    hash,
    from,
    to,
    value
  });
  TransactionModel.create(newTransaction)
    .then(transaction => {
      console.log("Transaction saved successfully:", transaction);
      res.status(201).json(transaction);
    })
    .catch(error => {
      console.log("Error saving transaction:", error);
      res.status(500).json({ error: "Error saving transaction" });
    });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
