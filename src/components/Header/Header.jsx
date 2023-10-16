import React from 'react';
import { Navigation } from '../Navigation/Navigation';
import { Setting } from '../Setting/Setting';
import './Header.scss';

export const Header = () => {
    return (
        <header className="header">
            <Navigation />
            <Setting />
        </header>
    );
}