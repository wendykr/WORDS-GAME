import React, { useEffect } from 'react';
import './FlashcardPage.scss';
import { Card } from '../../components/Card/Card';
import { useWordsSetup } from '../../context/WordsSetupContext';
import { useSettings } from '../../context/SettingsContext';
import { useVoiceSpeak } from '../../context/VoiceSpeakContext';
import { generateRandomNumber } from '../../helpers/generateRandomNumber';

generateRandomNumber();

console.log('123');

export const FlashcardPage = () => {
  const { setupCountWord, isCzech, isAudio, categoryValue } = useSettings();
  const {
    allWords,
    randomWords, setRandomWords,
    currentWordIndex, setCurrentWordIndex,
    currentWord, setCurrentWord
  } = useWordsSetup();

  console.log('456');

  const { speakWord } = useVoiceSpeak();

  console.log('%c randomWords FLASH ', 'background: gray; color: white;');
  console.log(randomWords);

  console.log('setupCountWord', setupCountWord);

  useEffect(() => {
    let randomIndx = [];
    console.log('101112');

    while (randomIndx.length < setupCountWord) {
      const currentRandomNumber = generateRandomNumber(allWords.length);

      if (!randomIndx.includes(allWords[currentRandomNumber])) {
        randomIndx.push(allWords[currentRandomNumber]);
      }
    }

    setRandomWords(randomIndx);

    // console.log("random index", generateRandomNumber(randomIndx.length));
    generateCurrentNewWord(randomIndx);
  }, [setupCountWord, isCzech, isAudio, categoryValue]);

  useEffect(() => {
    console.log('161718');
    generateCurrentNewWord(randomWords, currentWordIndex);
    console.log("generate new words");
  }, [currentWordIndex, randomWords]);

  useEffect(() => {
    console.log('192021');
    isCzech ? '' : isAudio && speakWord(currentWord?.enword);
  }, [currentWord?.enword]);

  console.log('789');

  const generateCurrentNewWord = (wordsArray, index) => {
    console.log('131415');
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