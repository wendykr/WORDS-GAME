import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { useWordsSetup } from '../../context/WordsSetupContext';
import { useSettings } from '../../context/SettingsContext';
// import { wordData } from '../../constants/words';

export const SharedLayout = () => {
  
  const { setSetupCountWord,
    setIsShow,
    setIsCzech,
    setIsFavorite,
    setIsAudio,
    setCategoryValue
  } = useSettings();
  
  const {
    setCurrentWord, setCurrentWordIndex, setProgressbar, setIsTurned,
    // setRandomWords
  } = useWordsSetup();

  const location = useLocation();

  const isHeaderHidden = location.pathname === '/';
  const path = location.pathname;

  useEffect(() => {
    setSetupCountWord(5);
    setIsShow(false);
    setIsCzech(false);
    setIsFavorite(false);
    setIsAudio(true);
    setCategoryValue();
    setCurrentWord();
    setCurrentWordIndex(0);
    setProgressbar(0);
    setIsTurned(false);
    // setRandomWords(wordData);
  }, [path])

  return (
    <>
        {!isHeaderHidden && <Header />}
        <Outlet />
        <Footer />
    </>
  );
}