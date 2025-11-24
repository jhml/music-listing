import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { API } from '../config';

const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [artist, setArtist] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API}/products/${id}`);
        setName(res.data.name || '');
        setArtist(res.data.artist || '');
        setCurrentImage(res.data.imageUrl || null);
      } catch (err) {
        console.error('Failed to load product', err);
        alert('Failed to load product');
        navigate('/');
      }
    };
    fetchProduct();
  }, [id, navigate]);

  useEffect(() => {
    if (id) return;
    setName('');
    setArtist('');
    setFile(null);
    setCurrentImage(null);
  }, [id]);

  const imageHost = API.replace(/\/api\/?$/, '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('artist', artist);
    if (file) formData.append('image', file);

    const token = localStorage.getItem('token');
    try {
      if (id) {
        await axios.put(`${API}/products/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Product updated');
      } else {
        await axios.post(`${API}/products`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Product created');
      }
      navigate('/');
    } catch (err) {
      console.error('Submit failed', err);
      alert('Failed to submit product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='main-content'>
      <h2>{id ? 'Edit Product' : 'Add Product'}</h2>
      <form onSubmit={handleSubmit} className='create-form'>
        <input
          value={name}
          placeholder='Album/Song Name'
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          value={artist}
          placeholder='Artist Name'
          onChange={(e) => setArtist(e.target.value)}
          required
        />
        {currentImage ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img
              src={`${imageHost}${currentImage}`}
              alt='current'
              style={{
                width: 80,
                height: 80,
                objectFit: 'cover',
                borderRadius: 6,
              }}
            />
            <div style={{ color: '#bdbdbd' }}>
              Current cover — choose a file to replace
            </div>
          </div>
        ) : null}
        <input
          type='file'
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        <button type='submit' disabled={loading}>
          {loading ? 'Saving...' : id ? 'Update Product' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default Product;
