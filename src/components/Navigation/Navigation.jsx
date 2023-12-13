import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.scss';

import { LuAlignJustify } from 'react-icons/lu';
import { RxCross2 } from 'react-icons/rx';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseMenu = () => {
    setIsOpen(!isOpen);
  }

  const handleNavLinkClick = () => {
    handleCloseMenu();

    // if (!confirm('Do you really want to leave and lose the current game?')) {
    //   event.preventDefault();
    //   return;
    // }
  }

  return (
    <nav className="navigation">
      <div className={`navigation__toggler ${isOpen ? 'menu--xmark' : 'menu--bars'}`} onClick={handleCloseMenu}>
        {isOpen ? (
          <RxCross2 className="icon-menu" title="Menu icon" />
        ) : (
          <LuAlignJustify className="icon-menu" title="Menu icon" />
        )}
      </div>
      <div className={`navigation__list ${isOpen ? 'show-navigation' : ''}`}>
        <NavLink to="/" className={ ({isActive}) => `${isActive ? 'navigation__list--link activeLink' : 'navigation__list--link nonActiveLink'} ${isOpen && ''}` } onClick={handleNavLinkClick} > Home </NavLink>
        <NavLink to="/flashcards" className={ ({isActive}) => `${isActive ? 'navigation__list--link activeLink' : 'navigation__list--link nonActiveLink'} ${isOpen && ''}` } onClick={handleNavLinkClick} > Flashcards </NavLink>
        <NavLink to="/quiz" className={ ({isActive}) => `${isActive ? 'navigation__list--link activeLink' : 'navigation__list--link nonActiveLink'} ${isOpen && ''}` } onClick={handleNavLinkClick} > Quiz </NavLink>
        <NavLink to="/match" className={ ({isActive}) => `${isActive ? 'navigation__list--link activeLink' : 'navigation__list--link nonActiveLink'} ${isOpen && ''}` } onClick={handleNavLinkClick} > Match </NavLink>
      </div>
    </nav>
  );
}