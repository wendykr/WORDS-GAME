import React, {useState, useContext, createContext, useEffect} from 'react';
import { supabase } from '../supabaseClient';
// import { wordData } from '../constants/words';
import { useSettings } from './SettingsContext';

export const WordsSetupContext = createContext();

export const WordsSetupProvider = ({children}) => {

  const { setupCountWord } = useSettings();

  const [allWords, setAllWords] = useState([]); // všechna slova
  const [randomWords, setRandomWords] = useState([]); // náhodná slova
  const [currentWord, setCurrentWord] = useState(); // aktuální slovo
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [favoriteWords, setFavoriteWords] = useState([]);

  const [inputValue, setInputValue] = useState("");
  const [resultState, setResultState] = useState("");

  const [isTurned, setIsTurned] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const [progressbar, setProgressbar] = useState(0); // progressBar line

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
    } catch (error) {
      console.error('Neočekávaná chyba při načítání dat:', error);
    }
  }

  // console.log('setAllWords', allWords);

  const updateProgressbar = (deg, up) => {
    setProgressbar((prevValue) => {
      const increment = deg ? 100 / setupCountWord : 100 / (setupCountWord - 1);
      const newValue = up ? prevValue + increment : prevValue - increment;
      return newValue;
    });
  };

  return (
    <WordsSetupContext.Provider value={{
      updateProgressbar,
      progressbar, setProgressbar,
      allWords, setAllWords,
      randomWords, setRandomWords,
      currentWord, setCurrentWord,
      currentWordIndex, setCurrentWordIndex,
      favoriteWords, setFavoriteWords,
      inputValue, setInputValue,
      resultState, setResultState,
      isTurned, setIsTurned,
      isDisabled, setIsDisabled,
    }}>
      {children}
    </WordsSetupContext.Provider>
  );
}

export const useWordsSetup = () => useContext(WordsSetupContext);