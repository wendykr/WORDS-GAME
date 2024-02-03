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
    currentWord,
    uniqueWords,
    removeRandomWord,
    randomWords,
    generateCurrentNewWord,
  }) => {

  const {
    updateProgressbar,
    progressbar,
    resultState, setResultState,
    isDisabled, setIsDisabled
  } = useWordsSetup();

  const {
    isShow, setIsShow,
    isCzech, isAudio } = useSettings();
  const { speakWord } = useVoiceSpeak();
  const [isFavorite, setIsFavorite] = useState();
  const [isDisplay, setIsDisplay] = useState(false);

  const [isMarkedWord, setIsMarkedWord] = useState(false);
  const [isSearchWord, setIsSearchWord] = useState();
  const [selectedMarkedId, setSelectedMarkedId] = useState(0);
  const [recentWords, setRecentWords] = useState([]);
  const [isCorrectWord, setIsCorrectWord] = useState(false);
  const [selectedCurrentId, setSelectedCurrentId] = useState(0);
  const [isIncorrectWord, setIsIncorrectWord] = useState(false);
  const [selectedFalseId, setSelectedFalseId] = useState(0);

  const firstLetterCze = czword ? czword.toLowerCase()[0] : '';
  const firstLetterEng = enword ? enword.toLowerCase()[0] : '';

  useEffect(() => {
    if (currentWord && uniqueWords) {
      setRecentWords(prevWords => {
        const newWords = [...prevWords, currentWord, ...uniqueWords].slice(-3);
        const shuffledWords = shuffleArray(newWords);
        return shuffledWords;
      });
    }
  }, [currentWord, uniqueWords]);

  useEffect(() => {

    if (!id) return;

    const getIsFavorite = async () => {
      const { data } = await supabase
        .from('terms')
        .select('favorite')
        .eq('id', id && id)
        .single();

      setIsFavorite(data?.favorite);
    };

    getIsFavorite();
  }, [id]);

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

      const { data } = await supabase
        .from('terms')
        .select('favorite')
        .eq("id", id)
        .single();

      setIsFavorite(data?.favorite);

    } catch (error) {
      alert('Unexpected error during update: ' + error.message);
    }
  }

  const showFirstLetter = () => {
    setIsDisplay(prevState => !prevState);
  };

  const answerReveal = () => {
    isCzech && isAudio && speakWord(enword);
    setResultState("dont-know");
    setIsMarkedWord(false);
    setSelectedMarkedId(0);
    setIsCorrectWord(true);
    setSelectedCurrentId(id);
    setIsDisplay(false);
    setIsDisabled(true);
  };

  const handleCheckWord = (id, markedWord) => {
    isCzech && isAudio && speakWord(markedWord);
    setSelectedMarkedId(id);
    setIsSearchWord(markedWord);
    setIsMarkedWord(true);
    setIsDisplay(false);
  }

  const handleCheckResult = () => {
    setIsMarkedWord(false);
    setIsDisabled(true);
    const wordId = selectedMarkedId;
    setSelectedMarkedId(0);

    if (resultState === "") {

      if (isSearchWord === (isCzech ? enword : czword)) {
        setResultState("correct");
        updateProgressbar(true, true);

        setIsCorrectWord(true);
        setSelectedCurrentId(id);
      }

      if (isSearchWord !== (isCzech ? enword : czword)) {
        isCzech && isAudio && speakWord(enword);
        setSelectedFalseId(wordId);

        setIsIncorrectWord(true);
        setResultState("incorrect");

        setIsCorrectWord(true);
        setSelectedCurrentId(id);
      }
    }
  };

  const handleClickNext = () => {
    if (resultState === "correct") {
      removeRandomWord();
    } else if (resultState === "dont-know" || resultState === "incorrect") {
      generateCurrentNewWord(randomWords);
    }

    setResultState("");
    setIsCorrectWord(false);
    setIsIncorrectWord(false);
    setSelectedCurrentId(0);
    setSelectedFalseId(0);
    setIsDisabled(false);
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
            <MdHelpCenter className={`hint-icon ${resultState !== "" ? "hidden" : ""}`} title={`${isDisplay ? 'Hidden first letter' : 'Show first letter'}`} onClick={showFirstLetter} />
              <span className={`hint-firts-word ${isDisplay ? 'show' : ''}`}>
                    {`${isCzech ? firstLetterEng : firstLetterCze}_`}
              </span>
          </span>
          <span className="icons--left">
            <FaStar className={`icon-star ${isFavorite ? 'icon-star--favorite' : ''}`} onClick={() => updateFavorite(id)} title={`${isFavorite ? 'Remove to favorite' : 'Add to favorite'}`} />
          </span>
        </div>

        {isCzech ?
          <h2 className="h2">{czword && czword.toLowerCase()}</h2>
          :
          <h2 className="h2" onClick={handleSpeakWord}>
          {enword && (
            <>
              {enword.toLowerCase()}{" "}
              {isAudio ? (
                <FaVolumeUp className="icon-volume" title="Repeat speak" />
              ) : (
                <IoVolumeMute className="icon-volume" title="Sound icon" />
              )}
            </>
          )}
          </h2>
        }

        {
          recentWords.map((word, index) => (
            <Response
              key={index}
              id={word.id}
              czword={word.czword}
              enword={word.enword}
              handleCheckWord={handleCheckWord}
              isCzech={isCzech}
              isMarkedWord={word.id === selectedMarkedId}
              isCorrectWord={word.id === selectedCurrentId}
              isIncorrectWord={word.id === selectedFalseId}
              isDisabled={isDisabled}
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
                ? handleClickNext(event)
                : handleCheckResult(event);
            }}
            text={buttonText}
            isMarkedWord={isMarkedWord}
            isCorrectWord={isCorrectWord}
            isIncorrectWord={isIncorrectWord}
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
  );
}