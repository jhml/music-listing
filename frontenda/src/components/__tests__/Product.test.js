import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Product from '../Product';

jest.mock('axios');

describe('Product component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders create form when no id is provided', () => {
    render(
      <MemoryRouter initialEntries={['/create']}>
        <Routes>
          <Route path='/create' element={<Product />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      screen.getByPlaceholderText(/Album\/Song Name/i),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Artist Name/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Add Product/i }),
    ).toBeInTheDocument();
  });

  test('loads product data when editing and shows current image', async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        name: 'Test Song',
        artist: 'Tester',
        imageUrl: '/uploads/img.jpg',
      },
    });

    render(
      <MemoryRouter initialEntries={['/edit/123']}>
        <Routes>
          <Route path='/edit/:id' element={<Product />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => expect(axios.get).toHaveBeenCalled());
    await expect(
      screen.findByDisplayValue(/Test Song/i),
    ).resolves.toBeInTheDocument();
    await expect(
      screen.findByDisplayValue(/Tester/i),
    ).resolves.toBeInTheDocument();
    await expect(screen.findByAltText(/current/i)).resolves.toBeInTheDocument();
  });
});
