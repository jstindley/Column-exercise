import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchNotice from '../SearchNotice'; 

test ('renders header', () => {    
    render(<SearchNotice />);
    const results = screen.getByRole('banner');
    expect(results).toBeInTheDocument();
});

test('renders search box with Search placeholder', () => {
  render(<SearchNotice />);
  const search = screen.getByPlaceholderText(/Search/i);
  expect(search).toBeInTheDocument();
});
