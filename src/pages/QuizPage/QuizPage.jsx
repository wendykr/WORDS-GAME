import React, { useEffect } from'react';
import { supabase } from '../../supabaseClient';
import './QuizPage.scss';
import { Question } from '../../components/Question/Question';
import { useWordsSetup } from '../../context/WordsSetupContext';
import { useSettings } from '../../context/SettingsContext';
import { useVoiceSpeak } from '../../context/VoiceSpeakContext';
import { generateRandomNumber } from '../../helpers/generateRandomNumber';

generateRandomNumber();

export const QuizPage = () => {

  const { setupCountWord, isCzech, isAudio, categoryValue } = useSettings();
  const {
    allWords,
    randomWords, setRandomWords,
    currentWord, setCurrentWord,
  } = useWordsSetup();

  const { speakWord } = useVoiceSpeak();

  console.log('categoryValue', categoryValue);
  console.log('setupCountWord', setupCountWord);

  console.log('%c randomWords QUIZ', 'background: gray; color: white;');
  console.log(randomWords);

  useEffect(() => {
    if (!allWords || allWords.length === 0) {
      // console.log('Data se načítají nebo jsou prázdná.');
      return;
    }

    console.log('allWords', allWords);

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
    generateCurrentNewWord(randomWords);
    // console.log('new generation');
  }, [randomWords]);

  useEffect(() => {
    isCzech ? '' : isAudio && speakWord(currentWord?.enword);
  }, [currentWord?.enword]);

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
    const newObject = Object.assign(
      {},
      wordsArray[generateRandomNumber(wordsArray.length)]
    );
    setCurrentWord(newObject);
  };

  const getIsFavorite = async () => {
    // console.log(
    //   supabase.from("terms").select("favorite").eq("id", currentWord?.id),
    //   currentWord?.id
    // );
    return await supabase.from("terms").select("favorite");
  };

  // console.log("Aktuální slovo v QuizPage:", currentWord);

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