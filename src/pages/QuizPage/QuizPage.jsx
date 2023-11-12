import React, { useEffect } from'react';
// import { useSpeechSynthesis } from 'react-speech-kit';
import './QuizPage.scss';
import { Question } from '../../components/Question/Question';
import { useWordsSetup } from '../../context/WordsSetupContext';
import { useSettings } from '../../context/SettingsContext';
import { useVoiceSpeak } from '../../context/VoiceSpeakContext';
import { generateRandomNumber } from '../../helpers/generateRandomNumber';

generateRandomNumber();

export const QuizPage = () => {

  const { setupCountWord, isCzech, isAudio } = useSettings();
  const {
    allWords,
    randomWords, setRandomWords,
    currentWord, setCurrentWord,
  } = useWordsSetup();

  const { speakWord } = useVoiceSpeak();

  console.log('%c randomWords QUIZ', 'background: gray; color: white;');
  console.log(randomWords);


  // setAllWords(favoriteWords)

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

  useEffect(() => {
    isCzech ? '' : isAudio && speakWord(currentWord?.word);
  }, [currentWord]);

  // const speakWord = (word) => {
  //   if (isAudio && voices.length > 0) {
  //     const selectedVoice = voices.find(voice => voice.name === 'Google US English');
  //     if (selectedVoice) {
  //       speak({ text: word, rate: 0.8, voice: selectedVoice });
  //     } else {
  //       console.error('Hlas "Google US English" nenalezen.');
  //     }
  //   } else {
  //     console.error('Hlasové funkce nejsou k dispozici.');
  //   }
  // };

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

  console.log("Aktuální slovo v QuizPage:", currentWord);

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