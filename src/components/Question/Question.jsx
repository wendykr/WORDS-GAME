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
    favorite,
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
  const [isFavorite, setIsFavorite] = useState(favorite);
  // const [isHiddenInput, setIsHiddenInput] = useState(false);
  const refInput = useRef(null);

  useEffect(() => {
    setIsFavorite(favorite);
  }, [favorite]);

  async function updateFavorite(id) {
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

  const handleCheckKeyDown = (event) => {
    // console.log('%c handleCheckKeyDown ', 'background:orange;color:white;');

    if (resultState === "") {

      if (event.key === "Enter" && inputValue.length !== 0) {
        // console.log("Enter");
        isCzech && isAudio && speakWord(enword);

        if (inputValue.toLowerCase() !== (isCzech ? enword.toLowerCase() : czword.toLowerCase())) {
          setResultState("incorrect");
          // console.log("incorrect");
        } else {
          setInputValue(inputValue);
          setResultState("correct");
          // console.log("correct");
        }
      }
    }
  };

  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     console.log('%c handleKeyDown ', 'background:silver;color:white;');

  //     if (event.key === "Enter") {
  //       if (resultState === "correct") {
  //         console.log('- removeRandomWord -');
  //         removeRandomWord();
  //         generateCurrentNewWord(randomWords);
  //       } else if (resultState === "dont-know" || resultState === "incorrect") {
  //         console.log('- generateCurrentNewWord -');
  //         generateCurrentNewWord(randomWords);
  //       }

  //       setInputValue("");
  //       console.log("inputValue", inputValue);
  //       setResultState("");
  //       console.log("resultState", resultState);
  //     }
  //   };

  //   window.addEventListener('keydown', handleKeyDown);
  //   console.log('%c Já jsem useEffect keydownNext ', 'background:red;color:white;');

  //   return () => {
  //     window.removeEventListener('keydown', handleKeyDown);
  //   };

  // }, [isHiddenInput]);

  const handleCheckResult = () => {
    // console.log('%c handleCheckResult ', 'background:orange;color:white;');

    if (resultState === "") {
      // setIsHiddenInput(true);
      isCzech && isAudio && speakWord(enword);

      if (inputValue.toLowerCase() !== (isCzech ? enword.toLowerCase() : czword.toLowerCase())) {
        setResultState("incorrect");
        // console.log('%c incorrect ', 'background:red;color:white;');
      } else {
        // console.log('%c updateProgressbar ', 'background:white;color:green;font-weight:bold;');
        updateProgressbar(true, true);
        setInputValue(inputValue);
        setResultState("correct");
        // console.log('%c correct ', 'background:green;color:white;');
      }
    }
  };

  const handleClick = () => {
    // console.log('%c handleClick ', 'background:purple;color:white;');
    // console.log("resultState", resultState);

    if (resultState === "correct") {
      removeRandomWord();
    } else if (resultState === "dont-know" || resultState === "incorrect") {
      // console.log(randomWords);
      generateCurrentNewWord(randomWords);
    }

    setInputValue("");
    // console.log("inputValue", inputValue);
    setResultState("");
    // console.log("resultState", resultState);
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
          title="Favorite icon"
        />

        {isCzech ?
          <h2 className="guess-word">{czword}</h2>
          :
          <h2 className="guess-word" onClick={handleSpeakWord}>{enword}&nbsp; 
            { isAudio ? <FaVolumeUp className="icon-volume" title="Sound icon" /> : <IoVolumeMute className="icon-volume" title="Sound icon" /> }
          </h2>
        }

        <p
          className={`hint ${resultState !== "" ? "hidden" : ""}`}
          onClick={showFirstLetter}
        >
          Hint <MdHelpCenter className="icon-hint" title="Hint icon" />
        </p>

        <input
          className={`your-answer ${resultState !== "" ? "hidden" : ""}`}
          onChange={changeWord}
          onKeyDown={handleCheckKeyDown}
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
};