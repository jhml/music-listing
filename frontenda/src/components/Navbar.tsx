import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  logout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ logout }) => (
  <nav>
    <div className='logo'>MusicDB</div>
    <div className='links'>
      <Link to='/'>Home</Link>
      <Link to='/create'>Add Product</Link>
      <button onClick={logout}>Logout</button>
    </div>
  </nav>
);

export default Navbar;
