import React, { useState, useRef } from "react";
import { useSpeechSynthesis } from 'react-speech-kit';
import { Setting } from "../../components/Setting/Setting";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import { Button } from "../Button/Button";
import { useWordsSetup } from '../../context/WordsSetupContext';
import { useSettings } from '../../context/SettingsContext';
import "./Question.scss";

import { MdHelpCenter } from "react-icons/md";
import { FaStar } from "react-icons/fa";
// import { FaVolumeUp } from "react-icons/fa";s

export const Question = ({
    czWord,
    word,
    removeRandomWord,
    randomWords,
  }) => {

  const { updateProgressbar, progressbar, setRandomWords } = useWordsSetup();
  const { isShow, setIsShow } = useSettings();
  const { speak, voices } = useSpeechSynthesis();

  const [isMarked, setIsMarked] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [resultState, setResultState] = useState("");
  // const [isHiddenInput, setIsHiddenInput] = useState(false);

  const refInput = useRef(null);

  const speakWord = () => {
    const selectedVoice = voices.find(voice => voice.name === 'Google US English');
    speak({ text: word, rate: 0.8, voice: selectedVoice });
  };

  const handleStarToggle = () => {
    setIsMarked((prevState) => !prevState);
  };

  const showFirstLetter = () => {
    const currentValue = word[0];
    setInputValue(currentValue);
    refInput.current.focus();
  };

  const answerReveal = () => {
    setInputValue(word);
    setResultState("dont-know");
    speakWord();
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
        speakWord();

        if (inputValue.toLowerCase() !== word.toLowerCase()) {
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
    console.log('%c handleCheckResult ', 'background:orange;color:white;');

    if (resultState === "") {
      // setIsHiddenInput(true);
      speakWord();

      if (inputValue.toLowerCase() !== word.toLowerCase()) {
        setResultState("incorrect");
        console.log('%c incorrect ', 'background:red;color:white;');
      } else {
        console.log('%c updateProgressbar ', 'background:white;color:green;font-weight:bold;');
        updateProgressbar();
        setInputValue(inputValue);
        setResultState("correct");
        console.log('%c correct ', 'background:green;color:white;');
      }
    }
  };

  const handleClick = () => {
    console.log('%c handleClick ', 'background:purple;color:white;');
    console.log("resultState", resultState);

    if (resultState === "correct") {
      removeRandomWord();
    } else if (resultState === "dont-know" || resultState === "incorrect") {
      setRandomWords(randomWords);
    }

    setInputValue("");
    console.log("inputValue", inputValue);
    setResultState("");
    console.log("resultState", resultState);
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
          className={`icon-star ${isMarked ? "icon-star--marked" : ""}`}
          onClick={handleStarToggle}
          title="Mark icon"
        />

        {/* <h2 className="guess-word" onClick={speak}>{czWord} <FaVolumeUp className="icon-volume" title="Sound icon" /></h2> */}
        <h2 className="guess-word">{czWord}</h2>

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
            <div className="answer__content answer--incorrect">
              {inputValue}
            </div>
          </div>
        )}

        {(resultState === "correct" || resultState === "finished") && (
          <div className="answer">
            <p className="answer__label">Correct answer</p>
            <div className="answer__content answer--correct">{inputValue}</div>
          </div>
        )}

        {(resultState === "dont-know" || resultState === "incorrect") && (
          <div className="answer">
            <p className="answer__label">Correct answer</p>
            <div className="answer__content answer--correct">{word}</div>
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