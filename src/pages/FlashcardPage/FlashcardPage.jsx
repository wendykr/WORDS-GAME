import React, { useEffect } from 'react';
import './FlashcardPage.scss';
import { Card } from '../../components/Card/Card';
import { useWordsSetup } from '../../context/WordsSetupContext';
import { useSettings } from '../../context/SettingsContext';
// import { useVoiceSpeak } from '../../context/VoiceSpeakContext';
import { generateRandomNumber } from '../../helpers/generateRandomNumber';

generateRandomNumber();

export const FlashcardPage = () => {
  const { setupCountWord, isCzech, isAudio, isFavorite } = useSettings();
  const {
    allWords,
    randomWords, setRandomWords,
    currentWordIndex, setCurrentWordIndex,
    currentWord, setCurrentWord
  } = useWordsSetup();

  // const { speakWord } = useVoiceSpeak();

  console.log('%c randomWords FLASH ', 'background: gray; color: white;');
  console.log(randomWords);

  useEffect(() => {
    if (!allWords || allWords.length === 0) {
      return;
    }

    let randomIndx = [];

    while (randomIndx.length < setupCountWord) {
      const currentRandomNumber = generateRandomNumber(allWords.length);

      if (!randomIndx.includes(allWords[currentRandomNumber])) {
        randomIndx.push(allWords[currentRandomNumber]);
      }
    }

    setRandomWords(randomIndx);
    generateCurrentNewWord(randomIndx);

  }, [allWords.length, setupCountWord, isCzech, isAudio, isFavorite]);

  useEffect(() => {
    generateCurrentNewWord(randomWords, currentWordIndex);
  }, [currentWordIndex, randomWords]);

  // useEffect(() => {
  //   isCzech ? '' : isAudio && speakWord(currentWord?.enword);
  // }, [currentWord?.enword]);

  const generateCurrentNewWord = (wordsArray, index) => {
    setCurrentWord(wordsArray[index]);
  };

  console.log("Aktuální slovo ve FlashcardsPage:", currentWord);

  return (
    <main className="flashcards">
      <div className="flashcards__body">
        <Card 
          id={currentWord?.id}
          czword={currentWord?.czword}
          enword={currentWord?.enword}
          currentWord={currentWord}
          currentWordIndex={currentWordIndex}
          setCurrentWordIndex={setCurrentWordIndex}
        />
      </div>
    </main>
  );
}