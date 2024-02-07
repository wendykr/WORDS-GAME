import React, {useState, useContext, createContext} from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = ({children}) => {

  const [setupCountWord, setSetupCountWord] = useState(5);
  const [categoryValue, setCategoryValue] = useState();
  const [isShow, setIsShow] = useState(false);
  const [isShowForm, setIsShowForm] = useState(false);
  const [isAudio, setIsAudio] = useState(true);
  const [isCzech, setIsCzech] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <SettingsContext.Provider value={{
      setupCountWord, setSetupCountWord,
      isShow, setIsShow,
      isShowForm, setIsShowForm,
      isCzech, setIsCzech,
      isFavorite, setIsFavorite,
      isAudio, setIsAudio,
      categoryValue, setCategoryValue,
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);