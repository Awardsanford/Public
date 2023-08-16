import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Use BrowserRouter for testing
import Login from '../components/Login';

test('displays error message for invalid username or password', () => {
  render(
    <Router>
      <Login />
    </Router>
  );

  // Select the log-in button
  const loginButton = screen.getByText(/Log In/i);

  // Trigger the click event on the log-in button
  fireEvent.click(loginButton);

  // Expect an error message to appear
  const errorMessage = screen.getByText(/Invalid username or password/i);
  expect(errorMessage).toBeInTheDocument();
});
