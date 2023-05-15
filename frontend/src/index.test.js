import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom/extend-expect';

test('renders the App component without errors', () => {
  const { container } = render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // Assert that the App component is rendered without errors
  expect(container).toBeInTheDocument();
});
