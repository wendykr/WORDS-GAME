import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.scss';

import { LuAlignJustify } from 'react-icons/lu';
import { RxCross2 } from 'react-icons/rx';
import { useWordsSetup } from '../../context/WordsSetupContext';
import { wordData } from '../../constants/words';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setRandomWords, setCurrentWord,
    setAllWords
  } = useWordsSetup();

  const handleCloseMenu = () => {
    setIsOpen(!isOpen);
    setRandomWords([]);
    setCurrentWord();
    setAllWords(wordData);
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
        <NavLink to="/" className={ ({isActive}) => `${isActive ? 'navigation__list--link activeLink' : 'navigation__list--link nonActiveLink'} ${isOpen && ''}` } onClick={handleCloseMenu} > Home </NavLink>
        <NavLink to="/flashcards" className={ ({isActive}) => `${isActive ? 'navigation__list--link activeLink' : 'navigation__list--link nonActiveLink'} ${isOpen && ''}` } onClick={handleCloseMenu} > Flashcards </NavLink>
        <NavLink to="/quiz" className={ ({isActive}) => `${isActive ? 'navigation__list--link activeLink' : 'navigation__list--link nonActiveLink'} ${isOpen && ''}` } onClick={handleCloseMenu} > Quiz </NavLink>
        <NavLink to="/match" className={ ({isActive}) => `${isActive ? 'navigation__list--link activeLink' : 'navigation__list--link nonActiveLink'} ${isOpen && ''}` } onClick={handleCloseMenu} > Match </NavLink>
      </div>
    </nav>
  );
}