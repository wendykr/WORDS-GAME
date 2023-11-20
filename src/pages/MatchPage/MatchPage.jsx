import React, { useEffect } from'react';
import './MatchPage.scss';
import { Pair } from '../../components/Pair/Pair';
// import { wordData } from '../../constants/words';
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
        />
        {/* <Pair key={wordData[0].id} czWord={wordData[0].czWord} word={wordData[0].word} /> */}
      {/* {
        wordData.map(({ czWord, word, id }) => (
          <Pair key={id} czWord={czWord} word={word} />
        ))
      } */}
      </div>
    </main>
  )
}