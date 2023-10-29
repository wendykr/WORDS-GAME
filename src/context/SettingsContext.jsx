import React, {useState, useContext, createContext} from 'react';
// import { wordData } from "../constants/words";

export const SettingsContext = createContext();

export const SettingsProvider = ({children}) => {

  // const setupCountWord = 3;

  //! Progressbar nový context => progressbar + setProgressBar => Progressbar
  //! Words nový context => allWords, randomWords, currentWords => WordsContext, WordsSetupContext
  //! Settings => isShown, isFavorite, isCzech/English, isAudio, atd.... => SettingsContext

  const [isShow, setIsShow] = useState(false);
  const [isCzech, setIsCzech] = useState(true);
  const [isFavorite, setIsFavorite] = useState(true);
  const [isAudio, setIsAudio] = useState(true);

  //const [numberValue, setNumberValue] = useState(0);
  const [categoryValue, setCategoryValue] = useState('');

  return (
    <SettingsContext.Provider value={{
      isShow,
      setIsShow,
      isCzech,
      setIsCzech,
      isFavorite,
      setIsFavorite,
      isAudio,
      setIsAudio,
      //numberValue,
      //setNumberValue,
      categoryValue,
      setCategoryValue,
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);