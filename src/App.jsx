import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { supabase } from './supabaseClient';
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
    setAllWords, allWords,
    setCurrentWord, setCurrentWordIndex, setProgressbar, setInputValue, setResultState, setIsTurned, setIsDisabled
  } = useWordsSetup();

  const location = useLocation();

  const isHeaderHidden = location.pathname === '/';
  const path = location.pathname;

  useEffect(() => {
    console.log("USE EFFECT 1");
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
      } catch (error) {
        console.error('Neočekávaná chyba při načítání dat:', error);
      }
    };

    getTerms();
  }, [path]);

  console.log('allWords', allWords);

  useEffect(() => {
    console.log("USE EFFECT 2");
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
    setIsDisabled(false);
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