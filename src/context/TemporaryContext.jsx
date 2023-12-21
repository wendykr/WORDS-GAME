import React, {useState, useContext, createContext} from 'react';

export const TemporaryContext = createContext();

export const TemporaryProvider = ({children}) => {

  const [isTemporaryCzech, setIsTemporaryCzech] = useState();
  const [temporaryCategory, setTemporaryCategory] = useState();
  const [temporaryCount, setTemporaryCount] = useState();
  const [isTemporaryFavorite, setIsTemporaryFavorite] = useState();
  const [isTemporaryAudio, setIsTemporaryAudio] = useState();
  const [temporaryAllWords, setTemporaryAllWords] = useState([]);

  return (
    <TemporaryContext.Provider value={{
      isTemporaryCzech, setIsTemporaryCzech,
      temporaryCategory, setTemporaryCategory,
      temporaryCount, setTemporaryCount,
      isTemporaryFavorite, setIsTemporaryFavorite,
      isTemporaryAudio, setIsTemporaryAudio,
      temporaryAllWords, setTemporaryAllWords
    }}>
      {children}
    </TemporaryContext.Provider>
  );
}

export const useTemporary = () => useContext(TemporaryContext);