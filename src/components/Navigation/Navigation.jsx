import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.scss';

import { LuAlignJustify } from 'react-icons/lu';
import { RxCross2 } from 'react-icons/rx';
import { useWordsSetup } from '../../context/WordsSetupContext';
// import { wordData } from '../../constants/words';
import { supabase } from '../../supabaseClient';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    setAllWords, allWords,
    setRandomWords, setCurrentWord
    // categoryValue
  } = useWordsSetup();

  useEffect(() => {
    getTerms();
  }, []);

  const getTerms = async () => {
    try {

      let { data: terms, error } = await supabase
        .from('terms')
        .select('*')
        .order('id');
  
      if (error) {
        console.error('Chyba při načítání dat:', error);
        return;
      }
  
      setAllWords(terms);
      // console.log("terms", terms);
    } catch (error) {
      console.error('Neočekávaná chyba při načítání dat:', error);
    }
  }

  const handleCloseMenu = () => {
    setIsOpen(!isOpen);
    setAllWords(allWords);
    setCurrentWord();
    setRandomWords([]);
    // categoryValue();
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