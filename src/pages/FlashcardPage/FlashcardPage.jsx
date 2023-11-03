import React, { useState, useEffect } from 'react';
import './FlashcardPage.scss';
import { Card } from '../../components/Card/Card';
import { useWordsSetup } from '../../context/WordsSetupContext';
import { useSettings } from "../../context/SettingsContext";

const generateRandomNumber = (limit) => {
  const randomIndex = Math.floor(Math.random() * limit);
  return randomIndex;
};

export const FlashcardPage = () => {

  const { setupCountWord } = useSettings();

  const {
    allWords,
    randomWords,
    setRandomWords,
    currentWord,
    setCurrentWord
  } = useWordsSetup();

  // console.log('%c randomWords ', 'background: gray; color: white;');
  // console.log(randomWords);

  useEffect(() => {
    let randomIndx = [];

    while (randomIndx.length < setupCountWord) {
      const currentRandomNumber = generateRandomNumber(allWords.length);

      if (!randomIndx.includes(allWords[currentRandomNumber])) {
        randomIndx.push(allWords[currentRandomNumber]);
      }
    }

    setRandomWords(randomIndx);

    console.log("random index", generateRandomNumber(randomIndx.length));
    generateCurrentNewWord(randomIndx);
  }, [setupCountWord]);

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  
  const generateCurrentNewWord = (wordsArray, index) => {
    setCurrentWord(wordsArray[index]);
  };
  
  useEffect(() => {
    generateCurrentNewWord(randomWords, currentWordIndex);
  }, [currentWordIndex, randomWords]);

  useEffect(() => {
    for (let i = 0; i < randomWords.length; i++) {
      console.log(i, randomWords[i].czWord, randomWords[i].category);
    }
  }, [randomWords]);

  // console.log("Aktuální slovo ve FlashcardsPage:", currentWord);

  return (
    <main className="flashcards">
      <div className="flashcards__body">
        <Card 
          czWord={currentWord?.czWord}
          word={currentWord?.word}
          currentWordIndex={currentWordIndex}
          setCurrentWordIndex={setCurrentWordIndex}
        />
      </div>
    </main>
  );
}