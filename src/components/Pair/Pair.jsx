import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import './Pair.scss';
import { Setting } from '../../components/Setting/Setting';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { Button } from '../../components/Button/Button';
import { Response } from '../../components/Response/Response';
import { useWordsSetup } from '../../context/WordsSetupContext';
import { useSettings } from '../../context/SettingsContext';
import { useVoiceSpeak } from '../../context/VoiceSpeakContext';

import { MdHelpCenter } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';
import { FaVolumeUp } from 'react-icons/fa';
import { IoVolumeMute } from 'react-icons/io5';

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const Pair = ({
    id,
    czword,
    enword,
    favorite,
    uniqueWords,
    removeRandomWord,
    randomWords,
    generateCurrentNewWord,
    currentWord
  }) => {

  const {
    updateProgressbar,
    progressbar,
    resultState, setResultState, 
  } = useWordsSetup();

  const {
    isShow, setIsShow,
    isCzech, isAudio } = useSettings();
  const { speakWord } = useVoiceSpeak();
  const [isFavorite, setIsFavorite] = useState(favorite);
  const [isDisplay, setIsDisplay] = useState(false);
  const [isMarkedWord, setIsMarkedWord] = useState(false);
  const [isSearchWord, setIsSearchWord] = useState();
  const [selectedResponseId, setSelectedResponseId] = useState(0);
  const [recentWords, setRecentWords] = useState([]);
  const [isCorrectWord, setIsCorrectWord] = useState(false);
  const [selectedCurrentId, setSelectedCurrentId] = useState(0);
  const [isIncorrectWord, setIsIncorrectWord] = useState(false);
  const [selectedFalseId, setSelectedFalseId] = useState(0);

  const firstLetterCze = czword && czword[0];
  const firstLetterEng = enword && enword[0];

  // console.log('%c uniqueWords PAIR', 'background: purple; color: white;');
  // console.log(uniqueWords);
  
  useEffect(() => {
    if (currentWord && uniqueWords) {
      setRecentWords(prevWords => {
        const newWords = [...prevWords, currentWord, ...uniqueWords].slice(-3);
        const shuffledWords = shuffleArray(newWords);
        console.log('recentWords', shuffledWords);
        return shuffledWords;
      });
    }
  }, [currentWord, uniqueWords]);

  useEffect(() => {
    setIsFavorite(favorite);
  }, [favorite]);

  const updateFavorite = async (id) => {
    try {
      const { data: currentTerm, error } = await supabase
        .from('terms')
        .select('favorite')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching current term:', error);
        throw error;
      }

      const { updateError } = await supabase
        .from('terms')
        .update({ favorite: !currentTerm.favorite })
        .eq('id', id);

      if (updateError) {
        console.error('Error updating term:', updateError);
        throw updateError;
      }

      // překreslit
      console.log('favorite', favorite);
      setIsFavorite(!currentTerm.favorite);

    } catch (error) {
      alert('Unexpected error during update: ' + error.message);
    }
  }

  const showFirstLetter = () => {
    setIsDisplay(prevState => !prevState);
  };

  // kliknu na dont-know
  const answerReveal = () => {
    setResultState("dont-know");
    setIsMarkedWord(true);
    isCzech && isAudio && speakWord(enword);
    console.log('id', id);
    setIsCorrectWord(true);
    setSelectedCurrentId(id);
    setIsDisplay(false);
  };

  // kliknu na slovo
  const handleCheckWord = (id, markWord) => {
    setSelectedResponseId(id);
    isCzech && isAudio && speakWord(markWord);
    setIsSearchWord(markWord);
    setIsMarkedWord(true);
    setIsDisplay(false);
  }

  // kliknu na check
  const handleCheckResult = () => {
    const wordId = selectedResponseId;
    setSelectedResponseId(0);

    if (resultState === "") {
      isCzech && isAudio && speakWord(enword);

      // TRUE
      if (isSearchWord === (isCzech ? enword : czword)) {
        setResultState("correct");
        updateProgressbar(true, true);

        setIsCorrectWord(true);
        setSelectedCurrentId(id);
      }

      // FALSE
      if (isSearchWord !== (isCzech ? enword : czword)) {
        setSelectedFalseId(wordId);

        setIsIncorrectWord(true);
        setResultState("incorrect");

        setIsCorrectWord(true);
        setSelectedCurrentId(id);
      }
    }
  };

  const handleClick = () => {
    if (resultState === "correct") {
      removeRandomWord();
    } else if (resultState === "dont-know" || resultState === "incorrect") {
      generateCurrentNewWord(randomWords);
    }

    setResultState("");
    console.log('resultState', resultState);
    setIsMarkedWord(false);
    setIsCorrectWord(false);
    setIsIncorrectWord(false);
  };

  const handleSpeakWord = () => {
    isCzech ? '' : isAudio && speakWord(enword);
  };

  const buttonText =
    resultState !== ""
      ? resultState === "finished"
        ? "Exit"
        : "Next"
      : "Check";

  const isFinished = resultState === "correct" && randomWords.length === 1;

  const showSetting = () => {
    setIsShow(true);
  }

  return (
    <div className="pair">
      <div className="pair__hidden">
        {isShow && <Setting /> }
      </div>
      <div className="pair__head">
          <ProgressBar line={progressbar}/>
      </div>

      <div className="pair__main">
        <div className="container--icons">
          <span className="icons--right">
            <MdHelpCenter className="hint-icon" title="Hint icon" onClick={showFirstLetter} />
              <span className={`hint-firts-word ${isDisplay ? 'show' : ''}`}>
                    {`${isCzech ? firstLetterEng : firstLetterCze}_`}
              </span>
          </span>
          <span className="icons--left">
            <FaStar className={`icon-star ${isFavorite ? 'icon-star--favorite' : ''}`} onClick={() => updateFavorite(id)} title="Favorite icon" />
          </span>
        </div>

        {isCzech ?
          <h2 className="h2">{czword}</h2>
          :
          <h2 className="h2" onClick={handleSpeakWord}>{enword}&nbsp; 
            { isAudio ? <FaVolumeUp className="icon-volume" title="Sound icon" /> : <IoVolumeMute className="icon-volume" title="Sound icon" /> }
          </h2>
        }

        {
          recentWords.map((word) => (
            <Response
              key={word.id}
              id={word.id}
              czword={word.czword}
              enword={word.enword}
              handleCheckWord={handleCheckWord}
              isCzech={isCzech}
              isMarkedWord={word.id === selectedResponseId}
              isCorrectWord={word.id === selectedCurrentId}
              isIncorrectWord={word.id === selectedFalseId}
            />
          ))
        }
      </div>

      <div className="pair__foot">
      {isFinished ? (
          <Button text="Done" onClick={showSetting} />
        ) : (
          <Button
            onClick={(event) => {
              resultState !== ""
                ? handleClick(event)
                : handleCheckResult(event);
            }}
            text={buttonText}
            isMarkedWord={isMarkedWord}
            length='0'
            inputValue=""
          />
        )}

        <div
          className={`question__foot--link ${
            resultState !== "" ? "hidden" : ""
          }`}
          onClick={answerReveal}
        >
          Don&apos;t know?
        </div>
      </div>
    </div>
  )
}