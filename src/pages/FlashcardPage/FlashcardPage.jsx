import React, { useEffect } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import './FlashcardPage.scss';
import { Card } from '../../components/Card/Card';
import { useWordsSetup } from '../../context/WordsSetupContext';
import { useSettings } from '../../context/SettingsContext';
// import { speakWord } from '../../helpers/speakWord'
import { generateRandomNumber } from '../../helpers/generateRandomNumber';

generateRandomNumber();

export const FlashcardPage = () => {

  const { setupCountWord, isCzech, isAudio } = useSettings();
  const {
    allWords,
    randomWords, setRandomWords,
    currentWordIndex, setCurrentWordIndex,
    currentWord, setCurrentWord
  } = useWordsSetup();

  const { speak, voices } = useSpeechSynthesis();

  console.log('%c randomWords FLASH ', 'background: gray; color: white;');
  console.log(randomWords);


  useEffect(() => {
    let randomIndx = [];

    while (randomIndx.length < setupCountWord) {
      const currentRandomNumber = generateRandomNumber(allWords.length);

      if (!randomIndx.includes(allWords[currentRandomNumber])) {
        randomIndx.push(allWords[currentRandomNumber]);
      }
    }

    setRandomWords(randomIndx);

    console.log("loaded new words");

    // console.log("random index", generateRandomNumber(randomIndx.length));
    generateCurrentNewWord(randomIndx);
  }, [setupCountWord]);
  
  useEffect(() => {
    generateCurrentNewWord(randomWords, currentWordIndex);

    console.log("generate new words");

  }, [currentWordIndex, randomWords]);

  // useEffect(() => {
  //   for (let i = 0; i < randomWords.length; i++) {
  //     // console.log(i, randomWords[i].czWord, randomWords[i].word, randomWords[i].category);
  //   }
  // }, [randomWords]);

  useEffect(() => {
    isCzech ? '' : speakWord(currentWord?.word);

    console.log("speaked");

    // isCzech ? '' : speakWord(speak, currentWord?.word, voices);
  }, [currentWord]);

  const generateCurrentNewWord = (wordsArray, index) => {
    setCurrentWord(wordsArray[index]);
  };

  const speakWord = (word) => {
    if (isAudio) {
      const selectedVoice = voices.find(voice => voice.name === 'Google US English');
      speak({ text: word, rate: 0.8, voice: selectedVoice });
    }
  };

  console.log("Aktuální slovo ve FlashcardsPage:", currentWord);

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