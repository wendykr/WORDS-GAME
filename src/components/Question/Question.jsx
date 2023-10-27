import React, { useState, useRef } from "react";
import { useSpeechSynthesis } from 'react-speech-kit';
import { ProgressBar } from "../ProgressBar/ProgressBar";
import { Button } from "../Button/Button";
import { useRandomWord } from '../../context/RandomWordContext';
import "./Question.scss";
import { Setting } from "../../components/Setting/Setting";

import { MdHelpCenter } from "react-icons/md";
import { FaStar } from "react-icons/fa";
// import { FaVolumeUp } from "react-icons/fa";

export const Question = ({
  czWord,
  word,
  removeRandomWord,
  //updateWordsArray,
  generateCurrentNewWord,
  randomWords,
}) => {

  const { updateProgressbar, progressbar } = useRandomWord();
  const { speak, voices } = useSpeechSynthesis();

  const [isMarked, setIsMarked] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [resultState, setResultState] = useState("");

  console.log("inputValue", inputValue);
  console.log("resultState", resultState);

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

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && inputValue.length !== 0) {
      console.log("Enter");

      if (inputValue.toLowerCase() !== word.toLowerCase()) {
        setResultState("incorrect");
        console.log("incorrect");
      } else {
        setInputValue(inputValue);
        setResultState("correct");
        console.log("correct");
      }
    }
  };

  const handleCheckResult = () => {
    console.log('%c handleCheckResult ', 'background:orange;color:white;');

    if (resultState === "") {
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
      generateCurrentNewWord(randomWords);
    } else if (resultState === "dont-know" || resultState === "incorrect") {
      //updateWordsArray();
      generateCurrentNewWord(randomWords);
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

  const [isShowSetting, setIsShowSetting] = useState(false);

  const showSetting = () => {
    console.log('%c clickDone ', 'background:brown;color:white;');
    setIsShowSetting(true);
  }

  return (
    <div className="question">
      {isShowSetting && <Setting /> }
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
          onKeyDown={handleKeyDown}
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