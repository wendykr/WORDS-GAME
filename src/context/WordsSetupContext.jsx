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

  const [progressbar, setProgressbar] = useState(0); // progressBar line

  useEffect(() => {
    getTerms();
  }, []);

  async function getTerms() {
    try {

      let { data: terms, error } = await supabase
        .from('terms')
        // vypsat všechny
        .select('*')
        .order('id');
        // vypsat z kategorie Animal
        // .eq('category', 'Animals');
        // vypsat všechny FALSE
        // .eq('favorite', false);
        // vypsat z kategorie Animal a TRUE
        // .eq('category', 'Animals')
        // .eq('favorite', true);
  
      if (error) {
        console.error('Chyba při načítání dat:', error);
        return;
      }
  
      setAllWords(terms);
      console.log("terms", terms);
    } catch (error) {
      console.error('Neočekávaná chyba při načítání dat:', error);
    }
  }

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
    }}>
      {children}
    </WordsSetupContext.Provider>
  );
}

export const useWordsSetup = () => useContext(WordsSetupContext);