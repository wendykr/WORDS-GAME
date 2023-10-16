import React from 'react';
import { Link } from 'react-router-dom';
import './Error.scss';

export const Error = () => {
    return (
        <main className="error">
            <h2>404</h2>
            <p>Page no found.</p>
            <Link to="/">Back to Home</Link>
        </main>
    );
}