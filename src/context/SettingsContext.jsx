import React, {useState, useContext, createContext} from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = ({children}) => {

  const [setupCountWord, setSetupCountWord] = useState(5); // počet slov
  const [categoryValue, setCategoryValue] = useState();
  const [isShow, setIsShow] = useState(false);
  const [isCzech, setIsCzech] = useState(true);
  // const [isCzech, setIsCzech] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAudio, setIsAudio] = useState(true);

  return (
    <SettingsContext.Provider value={{
      setupCountWord, 
      setSetupCountWord,
      isShow,
      setIsShow,
      isCzech,
      setIsCzech,
      isFavorite,
      setIsFavorite,
      isAudio,
      setIsAudio,
      categoryValue,
      setCategoryValue,
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);