import { render, screen } from '@testing-library/react';
import Home_Page from './Home_Page';

test('renders learn react link', () => {
  render(<Home_Page />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
