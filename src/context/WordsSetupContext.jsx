import React, {useState, useContext, createContext} from 'react';
import { wordData } from "../constants/words";
import { useSettings } from './SettingsContext';

export const WordsSetupContext = createContext();

export const WordsSetupProvider = ({children}) => {

  const { setupCountWord, 
    //categoryValue
  } = useSettings();

  // let filterCategory = wordData.filter(word => word.category === categoryValue);
  // console.log(filterCategory);

  // const [allWords, setAllWords] = useState(categoryValue); // všechna slova
  const [allWords, setAllWords] = useState(wordData); // všechna slova
  const [randomWords, setRandomWords] = useState([]); // náhodná slova
  const [currentWord, setCurrentWord] = useState(); // aktuální slovo

  const [progressbar, setProgressbar] = useState(0); // progressBar line

  const updateProgressbar = () => {
    setProgressbar((prevValue) => {
      const increment = 100 / setupCountWord;
      const newValue = prevValue + increment;
      return newValue;
    });
  };

  console.log(123)

  return (
    <WordsSetupContext.Provider value={{
      updateProgressbar,
      progressbar,
      allWords,
      setAllWords,
      randomWords,
      setRandomWords,
      currentWord,
      setCurrentWord
    }}>
      {children}
    </WordsSetupContext.Provider>
  );
}

export const useWordsSetup = () => useContext(WordsSetupContext);