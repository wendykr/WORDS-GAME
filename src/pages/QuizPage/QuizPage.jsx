import React from "react";
import { useState, useEffect } from "react";
import "./QuizPage.scss";
import { wordData } from "../../constants/words";
import { Question } from "../../components/Question/Question";

// definuje se nová funkce pro vygenerování náhodného čísla
const generateRandomNumber = (limit) => {
  // generuje se náhodné číslo od 1 do 50
  const randomIndex = Math.floor(Math.random() * limit);
  // vrací toto jedno náhodné číslo od 1 do 50
  return randomIndex;
};

export const QuizPage = () => {
  const setupCountWord = 2;

  const [allWords, setAllWords] = useState(wordData); // všechna slova
  const [randomWords, setRandomWords] = useState([]); // náhodná slova
  const [progressbar, setProgressbar] = useState(0); // progressBar line

  const [currentWord, setCurrentWord] = useState();

  const updateProgressbar = () => {
    setProgressbar((prevValue) => {
      // console.log("prevValue " + prevValue);
      const increment = 100 / setupCountWord;
      // console.log("increment " + increment);
      const newValue = prevValue + increment;
      // console.log("newValue " + newValue);
      return newValue;
    });
  };

  console.log("randomWords", randomWords);

  const removeRandomWord = () => {
    setRandomWords((prevRandomWords) => {
      //const filteredWords = prevRandomWords.filter(word =>  word !== randomWord);
      const filteredWords = prevRandomWords.filter((word) => {
        console.log(word.word, currentWord.word);

        return word.id !== currentWord.id;
      });
      console.log("filteredWords", filteredWords);
      return filteredWords;
    });
  };

  // const updateWordsArray = () => {
  //   const updatedRandomWords = (prevRandomWords) => {
  //     // vrácení nového pole, které je kopií `prevRandomWords`
  //     return [...prevRandomWords];
  //   };
  //   // aktualizace stavu `randomWords` pomocí funkce `setRandomWords`
  //   setRandomWords(updatedRandomWords);
  // };

  const generateCurrentNewWord = (wordsArray) => {
    setCurrentWord(wordsArray[generateRandomNumber(wordsArray.length)]);
  };

  useEffect(() => {
    // inicializace prázdného pole
    let randomIndx = [];

    // dokud nebude délka pole větší jako číslo, bude stále loopovat
    while (randomIndx.length < setupCountWord) {
      // vygeneruje se náhodné číslo
      const currentRandomNumber = generateRandomNumber(allWords.length);

      // pokud nebude v poli náhodně vygenerované číslo, přidá se do pole
      if (!randomIndx.includes(allWords[currentRandomNumber])) {
        randomIndx.push(allWords[currentRandomNumber]);
      }
    }

    setRandomWords(randomIndx);

    console.log("random index", generateRandomNumber(randomIndx.length));
    generateCurrentNewWord(randomIndx);

    //setCurrentWord(randomWords[generateRandomNumber(randomWords.length)]);
  }, []);

  const isFinished = randomWords.length === 0;

  return (
    <main className="quiz">
      <div className="quiz__body">
        {(isFinished === "") === 0 ? (
          <h1>Hezky</h1>
        ) : (
          <Question
            czWord={currentWord?.czWord}
            word={currentWord?.word}
            removeRandomWord={removeRandomWord}
            // updateWordsArray={updateWordsArray}
            progressbar={progressbar}
            updateProgressbar={updateProgressbar}
            generateCurrentNewWord={generateCurrentNewWord}
            randomWords={randomWords}
          />
        )}
      </div>
    </main>
  );
};
