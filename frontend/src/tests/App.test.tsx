import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders App', () => {
  render(<App />);
  const headerElement = screen.getByText("Condense Reality Frontend Test");
  expect(headerElement).toBeInTheDocument();
});
