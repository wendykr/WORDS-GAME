import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../supabaseClient';
import './Question.scss';
import { Setting } from '../../components/Setting/Setting';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { Button } from '../Button/Button';
import { useWordsSetup } from '../../context/WordsSetupContext';
import { useSettings } from '../../context/SettingsContext';
import { useVoiceSpeak } from '../../context/VoiceSpeakContext';

import { MdHelpCenter } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';
import { FaVolumeUp } from 'react-icons/fa';
import { IoVolumeMute } from 'react-icons/io5';

export const Question = (
  {
    id,
    czword,
    enword,
    removeRandomWord,
    randomWords,
    generateCurrentNewWord,
  }) => {

  const {
    updateProgressbar, progressbar,
    inputValue, setInputValue,
    resultState, setResultState, 
  } = useWordsSetup();
  const { isShow, setIsShow, isCzech, isAudio } = useSettings();
  const { speakWord } = useVoiceSpeak();
  const refInput = useRef(null);

  const [isFavorite, setIsFavorite] = useState();
  const [isSecondEnter, setIsSecondEnter] = useState(false);

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

  useEffect(() => {
    const handleKeyDown = (event) => {

      if (event.key === "Enter" && inputValue.length !== 0) {
        handleCheckResult();

        if (isSecondEnter) {
          if (randomWords.length > 1) {
            handleClick();
            setIsSecondEnter(false);
          } else {
            showSetting();
          }
        } else {
          setIsSecondEnter(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };

  }, [inputValue, isSecondEnter]);

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
        .eq('id', id)
        .single();

      setIsFavorite(data?.favorite);

    } catch (error) {
      alert('Unexpected error during update: ' + error.message);
    }
  }

  const showFirstLetter = () => {
    const currentValue = isCzech ? enword[0] : czword[0];
    setInputValue(currentValue);
    refInput.current.focus();
  };

  const answerReveal = () => {
    setInputValue(isCzech ? enword : czword);
    setResultState("dont-know");
    isCzech && isAudio && speakWord(enword);
  };

  const changeWord = (event) => {
    const myWord = event.target.value;
    setInputValue(myWord);
  };

  const handleCheckResult = () => {
    setIsSecondEnter(true);

    if (resultState === "") {
      isCzech && isAudio && speakWord(enword);

      if (inputValue.toLowerCase() !== (isCzech ? enword.toLowerCase() : czword.toLowerCase())) {
        setResultState("incorrect");
      } else {
        updateProgressbar(true, true);
        setInputValue(inputValue);
        setResultState("correct");
      }
    }
  };

  const handleClick = () => {

    if (resultState === "correct") {
      removeRandomWord();
    } else if (resultState === "dont-know" || resultState === "incorrect") {
      generateCurrentNewWord(randomWords);
    }

    setInputValue("");
    setResultState("");
    setIsSecondEnter(false);
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
    <div className="question">
      <div className="question__hidden">
        {isShow && <Setting /> }
      </div>
      <div className="question__head">
        <ProgressBar line={progressbar} />
      </div>
      <div className="question__body">
        <FaStar
          className={`icon-star ${isFavorite ? "icon-star--favorite" : ""}`}
          onClick={() => updateFavorite(id)}
          title={`${isFavorite ? 'Remove to favorite' : 'Add to favorite'}`}
        />

        {isCzech ?
          <h2 className="guess-word">{czword}</h2>
          :
          <h2 className="guess-word" onClick={handleSpeakWord}>{enword}{" "}
            { isAudio ? <FaVolumeUp className="icon-volume" title="Repeat speak" /> : <IoVolumeMute className="icon-volume" title="Sound icon" /> }
          </h2>
        }

        <p
          className={`hint ${resultState !== "" ? "hidden" : ""}`}
          title="Show first letter"
          onClick={showFirstLetter}
        >
          Hint <MdHelpCenter className="icon-hint" title="Show first letter" />
        </p>

        <input
          className={`your-answer ${resultState !== "" ? "hidden" : ""}`}
          onChange={changeWord}
          value={inputValue}
          type="text"
          ref={refInput}
        ></input>

        {resultState === "incorrect" && (
          <div className="answer">
            <p className="answer__label">Your answer</p>
            <div className="answer__content incorrect">
              {inputValue}
            </div>
          </div>
        )}

        {(resultState === "correct" || resultState === "finished") && (
          <div className="answer">
            <p className="answer__label">Correct answer</p>
            <div className="answer__content correct">{inputValue}</div>
          </div>
        )}

        {(resultState === "dont-know" || resultState === "incorrect") && (
          <div className="answer">
            <p className="answer__label">Correct answer</p>
            <div className="answer__content correct">{isCzech ? enword : czword}</div>
          </div>
        )}
      </div>

      <div className="question__foot">
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
            length={inputValue.length}
            inputValue={inputValue}
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