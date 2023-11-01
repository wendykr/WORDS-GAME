import React from 'react';
// import { useEffect } from "react";
import './FlashcardPage.scss';
import { wordData } from '../../constants/words';
import { Card } from '../../components/Card/Card';
// import { useWordsSetup } from '../../context/WordsSetupContext';
// import { useSettings } from "../../context/SettingsContext";

// const generateRandomNumber = (limit) => {
//   const randomIndex = Math.floor(Math.random() * limit);
//   return randomIndex;
// };

export const FlashcardPage = () => {

  // const { setupCountWord } = useSettings();

  // const {
  //   allWords,
  //   randomWords,
  //   setRandomWords,
  //   currentWord,
  //   setCurrentWord
  // } = useWordsSetup();

  return (
    <main className="flashcards">
      <div className="flashcards__body">
        <Card 
          czWord={wordData.czWord}
          word={wordData.word}
          key={wordData.id}
        />
      </div>
    </main>
  );
}