import React, { useEffect } from "react";
import "./QuizPage.scss";
import { Question } from "../../components/Question/Question";
import { useWordsSetup } from '../../context/WordsSetupContext';
import { useSettings } from "../../context/SettingsContext";

const generateRandomNumber = (limit) => {
  const randomIndex = Math.floor(Math.random() * limit);
  return randomIndex;
};

export const QuizPage = () => {

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
    setCurrentWord(wordsArray[generateRandomNumber(wordsArray.length)]);
  };

  useEffect(() => {
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
  }, [setupCountWord]);

  useEffect(() => {
    generateCurrentNewWord(randomWords);
  }, [randomWords]);

  // console.log("Aktuální slovo v QuizPage:", currentWord);

  return (
    <main className="quiz">
      <div className="quiz__body">
        <Question
          czWord={currentWord?.czWord}
          word={currentWord?.word}
          removeRandomWord={removeRandomWord}
          randomWords={randomWords}
          generateCurrentNewWord={generateCurrentNewWord}
        />
      </div>
    </main>
  );
}