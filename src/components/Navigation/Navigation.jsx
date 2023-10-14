import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.scss';

import { LuAlignJustify } from 'react-icons/lu';
import { RxCross2 } from 'react-icons/rx';

export const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        const navigationListElm = document.querySelector('.navigation__list');
        if (isOpen) {
            navigationListElm.classList.add('show-navigation');
        }
    }, [isOpen]);

    return (
        <nav className="navigation">
            <div className={`navigation__toggler ${isOpen ? 'menu--xmark' : 'menu--bars'}`} onClick={handleClick}>
                {isOpen ? (
                    <RxCross2 className="icon-menu" title="Menu icon" />
                ) : (
                    <LuAlignJustify className="icon-menu" title="Menu icon" />
                )}
            </div>
            <div className={`navigation__list ${isOpen ? 'show-navigation' : ''}`}>
                <NavLink to="/" className={ ({isActive}) => isActive ? 'navigation__list--link activeLink' : 'navigation__list--link nonActiveLink'} > Home </NavLink>
                <NavLink to="/flashcards" className={ ({isActive}) => isActive ? 'navigation__list--link activeLink' : 'navigation__list--link nonActiveLink'} > Flashcards </NavLink>
                <NavLink to="/quiz" className={ ({isActive}) => isActive ? 'navigation__list--link activeLink' : 'navigation__list--link nonActiveLink'} > Quiz </NavLink>
                <NavLink to="/match" className={ ({isActive}) => isActive ? 'navigation__list--link activeLink' : 'navigation__list--link nonActiveLink'} > Match </NavLink>
            </div>
        </nav>
    );
};