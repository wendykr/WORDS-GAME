import React, {useState, useContext, createContext} from 'react';
// import { useSpeechSynthesis } from 'react-speech-kit';

export const SettingsContext = createContext();

export const SettingsProvider = ({children}) => {

//   const { speak, voices } = useSpeechSynthesis();

//   const speakWord = (word) => {
//     const selectedVoice = voices.find(voice => voice.name === 'Google US English');
//     speak({ text: word, rate: 0.8, voice: selectedVoice });
//   };

  const [setupCountWord, setSetupCountWord] = useState(5); // počet slov
  const [categoryValue, setCategoryValue] = useState();
  const [isShow, setIsShow] = useState(false);
  const [isCzech, setIsCzech] = useState(false);
  // const [isFavorite, setIsFavorite] = useState(true);
  // const [isAudio, setIsAudio] = useState(true);
  // const [isCzech, setIsCzech] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAudio, setIsAudio] = useState(true);

  // const [favoriteWords, setFavoriteWords] = useState([]);

  // const isFavorite = pokud je momentální slovo ve favoriteWords
  // setFavoriteWords(prev => [...prev, currentWord])

  // //1. když 

  return (
    <SettingsContext.Provider value={{
      setupCountWord, setSetupCountWord,
      isShow, setIsShow,
      isCzech, setIsCzech,
      isFavorite, setIsFavorite,
      isAudio, setIsAudio,
      categoryValue, setCategoryValue,
      // speakWord
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);