import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPage.scss';

export const ErrorPage = () => {
    return (
        <main className="error">
            <h2>Error 404</h2>
            <p>We can&apos;t seem to find the page you&apos;re looking for</p>
            <Link to="/">Return to Home</Link>
        </main>
    );
}