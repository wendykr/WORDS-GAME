import React, { useState, useRef } from "react";
import { Button } from "../Button/Button";
import './Card.scss';

import { MdHelpCenter } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { FaVolumeUp } from "react-icons/fa";

export const Card = ({ czWord, word }) => {
  const [isMarked, setIsMarked] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  const handleStarToggle = () => {
    console.log('click');
    setIsMarked(prevState => !prevState);
  };


  const showFirstLetter = () => {
    const currentValue = word.charAt(0);
    setInputValue(currentValue);
    inputRef.current.focus();
  }

  const changeWord = (event) => {
    const myWord = event.target.value;
    setInputValue(myWord);
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && inputValue.length !== 0) {
      if (inputValue.toLowerCase() === word.toLowerCase()) {
        alert('TRUE');
      } else {
        alert('FALSE');
      }
    }
  }

  const speak = () => {
    let utterance = new SpeechSynthesisUtterance(word);
    window.speechSynthesis.speak(utterance);
  }

  return (
    <main className="card">

      <div className="card__head">
        <FaStar className={`icon-star ${isMarked ? 'icon-star--marked' : ''}`} onClick={handleStarToggle} title="Mark icon" />
      </div>
      <div className="card__body">
        <h2 className="guess-word" onClick={speak}>{czWord} <FaVolumeUp className="icon-volume" title="Sound icon" /></h2>

        <p className="hint" onClick={showFirstLetter}>Hint <MdHelpCenter className="icon-hint" title="Hint icon" /></p>

        <input className="answer"
              onChange={(changeWord)}
              onKeyDown={(handleKeyDown)}
              value={inputValue}
              type="text"
              ref={inputRef}>
        </input>
        <div className="result">Result</div>
      </div>

      <div className="card__foot">
        <Button text="Check" length={inputValue.length} inputValue={inputValue} word={word}/>
        <div className="card__foot--link">Don&apos;t know?</div>
      </div>

    </main>
  );
};