import React, {useState, useContext, createContext} from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = ({children}) => {

  const [isShow, setIsShow] = useState(false);
  const [isCzech, setIsCzech] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAudio, setIsAudio] = useState(true);
  const [categoryValue, setCategoryValue] = useState('all');

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
      categoryValue,
      setCategoryValue,
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);