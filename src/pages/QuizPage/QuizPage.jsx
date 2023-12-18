import React, { useEffect } from'react';
import { supabase } from '../../supabaseClient';
import './QuizPage.scss';
import { Question } from '../../components/Question/Question';
import { useWordsSetup } from '../../context/WordsSetupContext';
import { useSettings } from '../../context/SettingsContext';
// import { useVoiceSpeak } from '../../context/VoiceSpeakContext';
import { generateRandomNumber } from '../../helpers/generateRandomNumber';

generateRandomNumber();

export const QuizPage = () => {

  const { setupCountWord, isCzech, isAudio, isFavorite } = useSettings();
  const {
    allWords,
    randomWords, setRandomWords,
    currentWord, setCurrentWord,
  } = useWordsSetup();

  // const { speakWord } = useVoiceSpeak();

  console.log('%c randomWords QUIZ', 'background: gray; color: white;');
  console.log(randomWords);

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
  }, [allWords.length, setupCountWord, isCzech, isAudio, isFavorite]);

  useEffect(() => {
    generateCurrentNewWord(randomWords);
  }, [randomWords]);

  // useEffect(() => {
  //   isCzech ? '' : isAudio && speakWord(currentWord?.enword);
  // }, [currentWord?.enword]);

  const removeRandomWord = () => {
    setRandomWords((prevRandomWords) => {
      const filteredWords = prevRandomWords.filter((word) => {
        return word.id !== currentWord.id;
      });
      return filteredWords;
    });
  };

  const generateCurrentNewWord = (wordsArray) => {
    const newObject = Object.assign(
      {},
      wordsArray[generateRandomNumber(wordsArray.length)]
    );
    setCurrentWord(newObject);
  };

  const getIsFavorite = async () => {
    return await supabase.from("terms").select("favorite");
  };

  console.log("Aktuální slovo v QuizPage:", currentWord);

  return (
    <main className="quiz">
      <div className="quiz__body">
        <Question
          id={currentWord?.id}
          czword={currentWord?.czword}
          enword={currentWord?.enword}
          category={currentWord?.category}
          favorite={getIsFavorite}
          removeRandomWord={removeRandomWord}
          randomWords={randomWords}
          setRandomWords={setRandomWords}
          generateCurrentNewWord={generateCurrentNewWord}
        />
      </div>
    </main>
  );
}