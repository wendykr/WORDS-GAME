import React, { useState, useEffect } from'react';
import './MatchPage.scss';
import { Pair } from '../../components/Pair/Pair';
import { useWordsSetup } from '../../context/WordsSetupContext';
import { useSettings } from '../../context/SettingsContext';
import { useVoiceSpeak } from '../../context/VoiceSpeakContext';
import { generateRandomNumber } from '../../helpers/generateRandomNumber';

generateRandomNumber();

export const MatchPage = () => {

  const { setupCountWord, isCzech, isAudio } = useSettings();
  const {
    allWords,
    randomWords, setRandomWords,
    currentWord, setCurrentWord,
  } = useWordsSetup();

  const { speakWord } = useVoiceSpeak();

  console.log('%c randomWords QUIZ', 'background: gray; color: white;');
  console.log(randomWords);

  const [uniqueWords, setUniqueWords] = useState([]);

  useEffect(() => {
    let randomIndx = [];

    while (randomIndx.length < 2) {
      const currentRandomNumber = generateRandomNumber(allWords.length);

      if (!randomIndx.includes(allWords[currentRandomNumber]) || !randomIndx.includes(currentWord?.id)) {
        randomIndx.push(allWords[currentRandomNumber]);
      }
    }

    setUniqueWords(randomIndx);
  
  }, [currentWord?.id]);

  console.log('%c uniqueWords PAIR', 'background: purple; color: white;');
  console.log(uniqueWords);

  useEffect(() => {
    let randomIndx = [];

    while (randomIndx.length < setupCountWord) {
      const currentRandomNumber = generateRandomNumber(allWords.length);

      if (!randomIndx.includes(allWords[currentRandomNumber])) {
        randomIndx.push(allWords[currentRandomNumber]);
      }
    }

    setRandomWords(randomIndx);

    generateCurrentNewWord(randomIndx);
  }, [setupCountWord]);

  useEffect(() => {
    generateCurrentNewWord(randomWords);
  }, [randomWords]);

  useEffect(() => {
    isCzech ? '' : isAudio && speakWord(currentWord?.enword);
  }, [currentWord]);

  const removeRandomWord = () => {
    setRandomWords((prevRandomWords) => {
      const filteredWords = prevRandomWords.filter((word) => {
        // console.log(word.word, currentWord.word);
        return word.id !== currentWord.id;
      });
      // console.log('%c filteredWords ', 'background: blue; color: white;');
      // console.log(filteredWords);
      return filteredWords;
    });
  };

  const generateCurrentNewWord = (wordsArray) => {
    const newObject = Object.assign({}, wordsArray[generateRandomNumber(wordsArray.length)]);
    setCurrentWord(newObject);
  };

  console.log("Aktuální slovo v MatchPage:", currentWord);

  return (
    <main className="match">
      <div className="match__body">
        <Pair
            id={currentWord?.id}
            czword={currentWord?.czword}
            enword={currentWord?.enword}
            favorite={currentWord?.favorite}
            removeRandomWord={removeRandomWord}
            randomWords={randomWords}
            generateCurrentNewWord={generateCurrentNewWord}
            uniqueWords={uniqueWords}
        />
      </div>
    </main>
  )
}