import React from "react";
import { useEffect } from "react";
import "./QuizPage.scss";
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

  const {
    setupCountWord,
    allWords,
    setAllWords,
    randomWords,
    setRandomWords,
    currentWord,
    setCurrentWord
  } = useRandomWord();

  console.log('%c randomWords ', 'background: gray; color: white;');
  console.log(randomWords);

  const removeRandomWord = () => {
    setRandomWords((prevRandomWords) => {
      const filteredWords = prevRandomWords.filter((word) => {
        console.log(word.word, currentWord.word);
        return word.id !== currentWord.id;
      });
      console.log('%c filteredWords ', 'background: blue; color: white;');
      console.log(filteredWords);
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

  // // generování nového slova z pole wordsArray
  // const generateCurrentNewWord = (wordsArray) => {
  //   // generuje se náhodný index na základě délky pole
  //   console.log("wordsArray.length: ", wordsArray.length);
  //   const randomIndex = generateRandomNumber(wordsArray.length);
  //   // vybere slovo z pole na základě náhodného indexu
  //   const newWord = wordsArray[randomIndex];
  //   // vypíše nové slovo do konzole pro účely ladění
  //   console.log("Nové slovo:", newWord);
  //   // nastaví nové slovo jako aktuální slovo k zobrazení
  //   setCurrentWord(newWord);
  // };

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
  }, [setupCountWord]);

  useEffect(() => {
    generateCurrentNewWord(randomWords);
  }, [randomWords]);

  console.log("Aktuální slovo v QuizPage:", currentWord);

  return (
    <main className="quiz">
      <div className="quiz__body">
        <Question
          czWord={currentWord?.czWord}
          word={currentWord?.word}
          removeRandomWord={removeRandomWord}
          // updateWordsArray={updateWordsArray}
          generateCurrentNewWord={generateCurrentNewWord}
          randomWords={randomWords}
        />
      </div>
    </main>
  );
}