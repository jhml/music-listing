import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../config';
import { ReactComponent as DeleteIcon } from '../assets/delete-icon.svg';
import { ReactComponent as EditIcon } from '../assets/edit-icon.svg';
import { useNavigate } from 'react-router-dom';

interface IProduct {
  _id: string;
  name: string;
  artist: string;
  imageUrl?: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API}/products`);
        setProducts(res.data);
      } catch (err) {
        console.error('Failed to fetch products', err);
      }
    };
    fetchProducts();
  }, []);

  const imageHost = API.replace(/\/api\/?$/, '');

  const handleDelete = async (id: string) => {
    const ok = window.confirm('Are you sure you want to delete this product?');
    if (!ok) return;

    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${API}/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((prev) => prev.filter((p) => p._id !== id));
      alert('Product deleted');
    } catch (err) {
      console.error('Delete failed', err);
      alert('Failed to delete product');
    }
  };

  return (
    <div className='main-content'>
      <h2>Products</h2>
      {products.length === 0 ? (
        <p>No product found.</p>
      ) : (
        <table className='products-table'>
          <thead>
            <tr>
              <th>Cover</th>
              <th>Name</th>
              <th>Artist</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td data-label='Cover'>
                  <img
                    src={`${imageHost}${p.imageUrl}`}
                    alt={p.name}
                    style={{ width: 80, height: 80, objectFit: 'cover' }}
                  />
                </td>
                <td data-label='Name'>{p.name}</td>
                <td data-label='Artist'>{p.artist}</td>
                <td data-label='Actions' className='actions'>
                  <div>
                    <button
                      className='action-btn'
                      onClick={() => navigate(`/edit/${p._id}`)}
                      aria-label={`Edit ${p.name}`}
                      title='Edit'
                    >
                      <EditIcon className='edit-icon' aria-hidden='true' />
                    </button>
                    <button
                      className='action-btn'
                      onClick={() => handleDelete(p._id)}
                      aria-label={`Delete ${p.name}`}
                      title='Delete'
                    >
                      <DeleteIcon className='delete-icon' aria-hidden='true' />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;
