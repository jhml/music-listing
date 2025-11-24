import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import ProductList from '../ProductList';

jest.mock('axios');

describe('ProductList', () => {
  afterEach(() => jest.clearAllMocks());

  test('renders products from API', async () => {
    const products = [
      {
        _id: '1',
        name: 'Song A',
        artist: 'Artist A',
        imageUrl: '/uploads/a.jpg',
      },
      {
        _id: '2',
        name: 'Song B',
        artist: 'Artist B',
        imageUrl: '/uploads/b.jpg',
      },
    ];
    axios.get.mockResolvedValueOnce({ data: products });

    const { container } = render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>,
    );

    await waitFor(() => expect(axios.get).toHaveBeenCalled(), 2000);
    await waitFor(() => expect(container.textContent).toMatch(/Song A/i));
    await waitFor(() => expect(container.textContent).toMatch(/Artist B/i));
    const editButtons = await screen.findAllByTitle(/Edit/i);
    const deleteButtons = await screen.findAllByTitle(/Delete/i);
    expect(editButtons.length).toBeGreaterThan(0);
    expect(deleteButtons.length).toBeGreaterThan(0);
  });
});
