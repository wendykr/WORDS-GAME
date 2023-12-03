import React, { useState, useEffect } from'react';
import './MatchPage.scss';
import { Pair } from '../../components/Pair/Pair';
// import { wordData } from '../../constants/words';
import { useWordsSetup } from '../../context/WordsSetupContext';
import { useSettings } from '../../context/SettingsContext';
import { useVoiceSpeak } from '../../context/VoiceSpeakContext';
import { generateRandomNumber } from '../../helpers/generateRandomNumber';

generateRandomNumber();

export const MatchPage = () => {

  const { setupCountWord, isCzech, isAudio, categoryValue } = useSettings();
  const {
    allWords,
    randomWords, setRandomWords,
    currentWord, setCurrentWord,
  } = useWordsSetup();

  const { speakWord } = useVoiceSpeak();

  console.log('categoryValue', categoryValue);

  console.log('%c randomWords QUIZ', 'background: gray; color: white;');
  console.log(randomWords);

  const [uniqueWords, setUniqueWords] = useState([]);

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

    // console.log("random index", generateRandomNumber(randomIndx.length));
    generateCurrentNewWord(randomIndx);
  }, [allWords.length, setupCountWord, isCzech, isAudio, categoryValue]);

  useEffect(() => {
    // console.log("USE EFFECT 2");
    if (!allWords || allWords.length === 0) {
      console.log('Data se načítají nebo jsou prázdná.');
      return;
    }

    if (currentWord) {
      // console.log('currentWord?.id', currentWord?.id);

      let randomIndx = [];

      while (randomIndx.length < 2) {
        const currentRandomNumber = generateRandomNumber(allWords.length);
        // console.log('currentRandomNumber', currentRandomNumber);

        if (
          !randomIndx.includes(allWords[currentRandomNumber]) &&
          currentWord.id !== allWords[currentRandomNumber].id
        ) {
          randomIndx.push(allWords[currentRandomNumber]);
        }
      }

      setUniqueWords(randomIndx);
    }

  }, [allWords.length, currentWord]);

  // console.log('%c uniqueWords PAIR', 'background: purple; color: white;');
  // console.log(uniqueWords);

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

  // console.log("Aktuální slovo v MatchPage:", currentWord);

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