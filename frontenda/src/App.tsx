import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Auth from './components/Auth';
import ProductList from './components/ProductList';
import Product from './components/Product';
import Navbar from './components/Navbar';

function App(): JSX.Element {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token'),
  );

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  if (!token) return <Auth setToken={setToken} />;

  return (
    <Router>
      <Navbar logout={logout} />
      <Routes>
        <Route path='/' element={<ProductList />} />
        <Route path='/create' element={<Product />} />
        <Route path='/edit/:id' element={<Product />} />
      </Routes>
    </Router>
  );
}

export default App;
