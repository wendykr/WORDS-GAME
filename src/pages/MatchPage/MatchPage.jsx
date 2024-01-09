import React, { useState, useEffect } from'react';
import './MatchPage.scss';
import { Pair } from '../../components/Pair/Pair';
import { useWordsSetup } from '../../context/WordsSetupContext';
import { useSettings } from '../../context/SettingsContext';
import { useVoiceSpeak } from '../../context/VoiceSpeakContext';
import { generateRandomNumber } from '../../helpers/generateRandomNumber';

generateRandomNumber();

export const MatchPage = () => {

  const { setupCountWord, isCzech, isAudio, isFavorite } = useSettings();
  const {
    allWords,
    randomWords, setRandomWords,
    currentWord, setCurrentWord,
    isReplay
  } = useWordsSetup();

  const { speakWord } = useVoiceSpeak();

  const [uniqueWords, setUniqueWords] = useState([]);

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
  }, [allWords.length, setupCountWord, isCzech, isAudio, isFavorite, isReplay]);

  useEffect(() => {
    if (!allWords || allWords.length === 0) {
      return;
    }

    if (currentWord) {

      let randomIndx = [];

      while (randomIndx.length < 2) {
        const currentRandomNumber = generateRandomNumber(allWords.length);

        if (
          !randomIndx.includes(allWords[currentRandomNumber]) &&
          currentWord.id !== allWords[currentRandomNumber].id
        ) {
          randomIndx.push(allWords[currentRandomNumber]);
        }
      }

      setUniqueWords(randomIndx);
    }

  }, [currentWord]);

  useEffect(() => {
    generateCurrentNewWord(randomWords);
  }, [randomWords]);

  useEffect(() => {
    isCzech ? '' : isAudio && speakWord(currentWord?.enword);
  }, [currentWord?.enword]);

  const removeRandomWord = () => {
    setRandomWords((prevRandomWords) => {
      const filteredWords = prevRandomWords.filter((word) => {
        return word.id !== currentWord.id;
      });
      return filteredWords;
    });
  };

  const generateCurrentNewWord = (wordsArray) => {
    const newObject = Object.assign({}, wordsArray[generateRandomNumber(wordsArray.length)]);
    setCurrentWord(newObject);
  };

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
            currentWord={currentWord}
            setUniqueWords={setUniqueWords}
        />
      </div>
    </main>
  );
}