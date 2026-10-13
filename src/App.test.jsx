import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';

function renderAt(path) {
  window.history.pushState({}, '', path);
  return render(<App />);
}

const lengthLink = () => screen.getByText('Length', { selector: 'a' });

test('the top page shows the Length calculator with its nav link active', () => {
  const { container } = renderAt('/');
  expect(container.textContent).toContain('Kilo Meter');
  expect(lengthLink()).toHaveClass('active');
});

test('the old /length URL redirects to the top page', () => {
  renderAt('/length');
  expect(window.location.pathname).toBe('/');
  expect(lengthLink()).toHaveClass('active');
});

test('the React Converter logo returns to the Length calculator', () => {
  const { container } = renderAt('/weight');
  expect(lengthLink()).not.toHaveClass('active');
  fireEvent.click(container.querySelector('#logo'));
  expect(window.location.pathname).toBe('/');
  expect(container.textContent).toContain('Kilo Meter');
  expect(lengthLink()).toHaveClass('active');
});

test('the tablet/phone menu shows the current page and navigates on selection', () => {
  const { container } = renderAt('/area');
  const menu = screen.getByRole('combobox', { name: 'Converter' });
  expect(menu).toHaveValue('/area');
  fireEvent.change(menu, { target: { value: '/temperature' } });
  expect(window.location.pathname).toBe('/temperature');
  expect(container.textContent).toContain('Temperature Converter');
  expect(menu).toHaveValue('/temperature');
  fireEvent.click(container.querySelector('#logo'));
  expect(menu).toHaveValue('/');
});
