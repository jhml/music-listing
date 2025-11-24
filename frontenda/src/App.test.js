import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Add Product link when logged in', () => {
  localStorage.setItem('token', 'test-token');
  render(<App />);
  const linkElement = screen.getByText(/Add Product/i);
  expect(linkElement).toBeInTheDocument();
  localStorage.removeItem('token');
});
