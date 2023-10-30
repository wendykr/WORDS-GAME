import React, {useState, useContext, createContext} from 'react';
import { wordData } from "../constants/words";

export const WordsSetupContext = createContext();

export const WordsSetupProvider = ({children}) => {

  const [setupCountWord, setSetupCountWord] = useState(5); // aktuální slovo

  let filterCategory = wordData.filter(word => word.category === "Animals");
  console.log(filterCategory);

  // const [allWords, setAllWords] = useState(filterCategory); // všechna slova
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

  return (
    <WordsSetupContext.Provider value={{
      updateProgressbar,
      progressbar,
      setupCountWord,
      setSetupCountWord,
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