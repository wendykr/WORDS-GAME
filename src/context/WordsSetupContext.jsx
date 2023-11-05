import React, {useState, useContext, createContext} from 'react';
import { wordData } from '../constants/words';
import { useSettings } from './SettingsContext';

export const WordsSetupContext = createContext();

export const WordsSetupProvider = ({children}) => {

  const { setupCountWord } = useSettings();

  const [allWords, setAllWords] = useState(wordData); // všechna slova
  const [randomWords, setRandomWords] = useState([]); // náhodná slova
  const [currentWord, setCurrentWord] = useState(); // aktuální slovo

  const [inputValue, setInputValue] = useState("");
  const [resultState, setResultState] = useState("");

  const [progressbar, setProgressbar] = useState(0); // progressBar line

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
      progressbar,
      setProgressbar,
      allWords,
      setAllWords,
      randomWords,
      setRandomWords,
      currentWord,
      setCurrentWord,
      inputValue, setInputValue,
      resultState, setResultState,
    }}>
      {children}
    </WordsSetupContext.Provider>
  );
}

export const useWordsSetup = () => useContext(WordsSetupContext);