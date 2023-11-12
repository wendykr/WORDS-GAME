import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useWordsSetup } from './context/WordsSetupContext';
import { useSettings } from './context/SettingsContext';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

function App() {

  const {
    setSetupCountWord,
    setIsShow,
    setIsCzech,
    setIsFavorite,
    setIsAudio,
    setCategoryValue
  } = useSettings();

  const {
    setCurrentWord, setCurrentWordIndex, setProgressbar, setInputValue, setResultState, setIsTurned
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
    setInputValue("");
    setResultState("");
    setIsTurned(false);
  }, [path]);

  return (
    <>
      {!isHeaderHidden && <Header />}
      <Outlet />
      <Footer />
    </>
  );
}

export default App;