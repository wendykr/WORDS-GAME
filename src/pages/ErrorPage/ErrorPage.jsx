import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPage.scss';

export const ErrorPage = () => {
  return (
    <main className="error">
      <h2 className="error__header">Page not found</h2>
      <p className="error__text">We can&apos;t seem to find the page.</p>
      <Link to="/" className="error__link">Return to Home</Link>
    </main>
  );
}