import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders search box with Search placeholder', () => {
  render(<App />);
  const search = screen.getByPlaceholderText(/Search/i);
  expect(search).toBeInTheDocument();
});

