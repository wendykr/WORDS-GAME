import React, { useEffect } from 'react';
import './FlashcardPage.scss';
import { Card } from '../../components/Card/Card';
import { useWordsSetup } from '../../context/WordsSetupContext';
import { useSettings } from '../../context/SettingsContext';
import { useVoiceSpeak } from '../../context/VoiceSpeakContext';
import { generateRandomNumber } from '../../helpers/generateRandomNumber';

generateRandomNumber();

export const FlashcardPage = () => {
  const { setupCountWord, isCzech, isAudio, categoryValue } = useSettings();
  const {
    allWords,
    randomWords, setRandomWords,
    currentWordIndex, setCurrentWordIndex,
    currentWord, setCurrentWord
  } = useWordsSetup();

  const { speakWord } = useVoiceSpeak();

  // console.log('categoryValue', categoryValue);

  // console.log('%c randomWords FLASH ', 'background: gray; color: white;');
  // console.log(randomWords);

  // console.log('setupCountWord', setupCountWord);
  // console.log('currentWord', currentWord);
  // console.log('allWords.length', allWords.length);

  // console.log("allWords", allWords);
  // console.log("setupCountWord", setupCountWord);
  // console.log("isCzech", isCzech);
  // console.log("isAudio", isAudio);
  // console.log("categoryValue", categoryValue);

  useEffect(() => {
    // console.log("USE EFFECT 1");
    if (!allWords || allWords.length === 0) {
      // console.log('Data se načítají nebo jsou prázdná.');
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
    // console.log('randomIndx', randomIndx);

    // console.log("random index", generateRandomNumber(randomIndx.length));
    generateCurrentNewWord(randomIndx);

  }, [allWords.length, setupCountWord, isCzech, isAudio, categoryValue]);

  useEffect(() => {
    // console.log("USE EFFECT 2");
    generateCurrentNewWord(randomWords, currentWordIndex);
    // console.log("generate new words");
  }, [currentWordIndex, randomWords]);

  useEffect(() => {
    // console.log("USE EFFECT 3");
    isCzech ? '' : isAudio && speakWord(currentWord?.enword);
  }, [currentWord?.enword]);

  const generateCurrentNewWord = (wordsArray, index) => {
    setCurrentWord(wordsArray[index]);
  };

  // console.log("Aktuální slovo ve FlashcardsPage:", currentWord);

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