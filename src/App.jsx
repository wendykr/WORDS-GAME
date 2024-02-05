import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useWordsSetup } from './context/WordsSetupContext';
import { useTemporary } from './context/TemporaryContext';
import { useSettings } from './context/SettingsContext';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { LoginBar } from './components/LoginBar/LoginBar';

function App() {

  const {
    setSetupCountWord,
    setIsShow,
    setIsShowForm,
    setIsCzech,
    setIsFavorite,
    setIsAudio,
    setCategoryValue
  } = useSettings();

  const {
    initialAllWords, setAllWords,
    setCurrentWord, setCurrentWordIndex,
    setProgressbar, setInputValue, setResultState, setIsTurned, setIsDisabled, setIsReplay
  } = useWordsSetup();

  const {
    setIsTemporaryCzech,
    setTemporaryCategory,
    setTemporaryCount,
    setIsTemporaryFavorite,
    setIsTemporaryAudio,
    setTemporaryAllWords
  } = useTemporary();

  const location = useLocation();

  const isHeaderHidden = location.pathname === '/';
  const path = location.pathname;

  useEffect(() => {
    setAllWords(initialAllWords);
    setSetupCountWord(5);
    setIsShow(false);
    setIsCzech(true);
    setIsFavorite(false);
    setIsAudio(true);
    setCategoryValue();
    setCurrentWord();
    setCurrentWordIndex(0);
    setProgressbar(0);
    setInputValue("");
    setResultState("");
    setIsTurned(false);
    setIsDisabled(false);
    setIsReplay(false);
    setIsTemporaryCzech();
    setTemporaryCategory();
    setTemporaryCount();
    setIsTemporaryFavorite();
    setIsTemporaryAudio();
    setTemporaryAllWords();
    setIsShowForm(false);
  }, [path]);

  return (
    <>
      <LoginBar />
      {!isHeaderHidden && <Header />}
      <Outlet />
      <Footer />
    </>
  );
}

export default App;