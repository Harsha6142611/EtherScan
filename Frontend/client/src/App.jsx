import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import Transactions from './Transactions';
import Value from './Value';
import Home from './Home';
import Balance from './Balance';

function App() {
  return (
    <Router>
    <Value/>
    <Home/>
      <Routes>   
        <Route path="/balance" element={<Balance />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </Router>
  );
}

export default App;
