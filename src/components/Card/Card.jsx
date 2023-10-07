import React, { useState, useRef } from "react";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import { Button } from "../Button/Button";
import './Card.scss';

import { FaLightbulb } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaVolumeUp } from "react-icons/fa";

export const Card = ({ czWord, word }) => {

  const [isMarker, setIsMarker] = useState(false);

  const handleStarToggle = () => {
    setIsMarker(prevState => !prevState);
  };

  const [myWord, isMyWord] = useState('');
  const [wordLength, isWordLength] = useState('');
  const [inputValue, isInputValue] = useState('');
  const inputRef = useRef(null);

  const showFirstLetter = () => {
    const inputValue = word.charAt(0);
    isInputValue(inputValue);
    inputRef.current.focus();
    isWordLength(inputValue.length);
  }

  const changeWord = (event) => {
    const myWord = event.target.value;
    isMyWord(myWord);
    isWordLength(myWord.length);
    isInputValue(myWord);
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && myWord.length !== 0) {
      if (myWord.toLowerCase() === word.toLowerCase()) {
        alert('TRUE');
      } else {
        alert('FALSE');
      }
    }
  }

  const speak = () => {
    let costWord = word;
    let utterance = new SpeechSynthesisUtterance(costWord);
    window.speechSynthesis.speak(utterance);
  }

  return (
    <main className="card">

      <div className="card__header">
        <div className="card__header--progress">
          <ProgressBar />
        </div>
      </div>

      {/* <div className="kontrolni-vypis">{myWord}</div> */}

      <div className="card__body">
        <FaStar className={`icon-star ${isMarker ? 'mark' : ''}`} onClick={handleStarToggle} title="mark" />

        <h2 className="question" onClick={speak}>{czWord} <FaVolumeUp className="icon-volume" title="sound" /></h2>

        <p className="language" onClick={(showFirstLetter)}>English <FaLightbulb title="hint" /></p>

        <input className="answer"
              onChange={(changeWord)}
              onKeyDown={(handleKeyDown)}
              value={inputValue}
              type="text"
              ref={inputRef}>
        </input>
        <div className="result">Result</div>
      </div>

      <div className="card__footer">
        <Button text="Check" string={inputValue} length={wordLength.length} word={word} myWord={myWord} />
        <div className="card__footer--link">Don't know?</div>
      </div>

    </main>
  );
};