import React from "react";
import { useState, useEffect } from "react";
import "./QuizPage.scss";
import { wordData } from "../../constants/words";
import { Question } from "../../components/Question/Question";
import { useRandomWord } from '../../context/RandomWordContext';

// definuje se nová funkce pro vygenerování náhodného čísla
const generateRandomNumber = (limit) => {
  // generuje se náhodné číslo od 1 do 50
  const randomIndex = Math.floor(Math.random() * limit);
  // vrací toto jedno náhodné číslo od 1 do 50
  return randomIndex;
};

export const QuizPage = () => {
  // const setupCountWord = 3;

  const [allWords, setAllWords] = useState(wordData); // všechna slova
  const [randomWords, setRandomWords] = useState([]); // náhodná slova
  // const [progressbar, setProgressbar] = useState(0); // progressBar line

  const [currentWord, setCurrentWord] = useState();

  const { setupCountWord } = useRandomWord();

  // const updateProgressbar = () => {
  //   setProgressbar((prevValue) => {
  //     // console.log("prevValue " + prevValue);
  //     const increment = 100 / setupCountWord;
  //     // console.log("increment " + increment);
  //     const newValue = prevValue + increment;
  //     // console.log("newValue " + newValue);
  //     return newValue;
  //   });
  // };

  console.log("randomWords", randomWords);

  const removeRandomWord = () => {
    setRandomWords((prevRandomWords) => {
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

  // const generateCurrentNewWord = (wordsArray) => {
  //   setCurrentWord(wordsArray[generateRandomNumber(wordsArray.length)]);
  // };

  // generování nového slova z pole wordsArray
  const generateCurrentNewWord = (randomWords) => {
    // generuje se náhodný index na základě délky pole
    console.log("randomWords.length: ", randomWords.length);
    const randomIndex = generateRandomNumber(randomWords.length);
    // vybere slovo z pole na základě náhodného indexu
    const newWord = randomWords[randomIndex];
    // vypíše nové slovo do konzole pro účely ladění
    console.log("Nové slovo:", newWord);
    // nastaví nové slovo jako aktuální slovo k zobrazení
    setCurrentWord(newWord);
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

  console.log("Aktuální slovo v QuizPage:", currentWord);

  return (
    <main className="quiz">
      <div className="quiz__body">
        <Question
          czWord={currentWord?.czWord}
          word={currentWord?.word}
          removeRandomWord={removeRandomWord}
          // updateWordsArray={updateWordsArray}
          // progressbar={progressbar}
          // updateProgressbar={updateProgressbar}
          generateCurrentNewWord={generateCurrentNewWord}
          randomWords={randomWords}
        />
      </div>
    </main>
  );
};
