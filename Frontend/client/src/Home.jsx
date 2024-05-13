import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Home Component</h1>
      <Link to="/transactions">
        <button>Transactions</button>
      </Link>
      <Link to="/balance">
        <button>Balance</button>
      </Link>
    </div>
  );
};

export default Home;
