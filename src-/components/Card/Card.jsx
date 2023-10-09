import React, { useState, useEffect, useRef } from "react";
import { Button } from "../Button/Button";
import './Card.scss';

import { MdHelpCenter } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { FaVolumeUp } from "react-icons/fa";

export const Card = ({ czWord, word }) => {
  const [isMarked, setIsMarked] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [answerDisplayed, setAnswerDisplayed] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [incorrectAnswer, setInCorrectAnswer] = useState('');
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const inputRef = useRef(null);

  const handleStarToggle = () => {
    setIsMarked(prevState => !prevState);
  };

  const showFirstLetter = () => {
    const currentValue = word[0];
    setInputValue(currentValue);
    inputRef.current.focus();
  }

  const answerReveal = () => {
    setInCorrectAnswer(word);
    setInputValue(word);
    setAnswerDisplayed(true);
  }

  const changeWord = (event) => {
    const myWord = event.target.value;
    setInputValue(myWord);
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && inputValue.length !== 0) {
      if (inputValue.toLowerCase() !== word.toLowerCase()) {
        setShowResult(true);
        setInCorrectAnswer(word);
      } else {
        setShowCorrectAnswer(true);
        setInputValue(inputValue);
      }
    }
  }

  const speak = () => {
    let utterance = new SpeechSynthesisUtterance(word);
    window.speechSynthesis.speak(utterance);
  }

  useEffect(() => {
    const answerCorrectElm = document.querySelector('.your-answer');
    if (showResult) {
      answerCorrectElm.classList.add('hidden');
    }
  }, [showResult]);

  useEffect(() => {
    const answerCorrectElm = document.querySelector('.your-answer');
    if (showCorrectAnswer) {
      answerCorrectElm.classList.add('hidden');
    }
  }, [showCorrectAnswer]);

  return (
    <main className="card">

      <div className="card__head">
        <FaStar className={`icon-star ${isMarked ? 'icon-star--marked' : ''}`} onClick={handleStarToggle} title="Mark icon" />
      </div>
      <div className="card__body">
        <h2 className="guess-word" onClick={speak}>{czWord} <FaVolumeUp className="icon-volume" title="Sound icon" /></h2>

        <p className="hint" onClick={showFirstLetter}>Hint <MdHelpCenter className="icon-hint" title="Hint icon" /></p>

        {(!answerDisplayed) && (
          <input className="your-answer"
                onChange={(changeWord)}
                onKeyDown={(handleKeyDown)}
                value={inputValue}
                type="text"
                ref={inputRef}>
          </input>
        )}

        {showResult && (
          <div className="answer answer--incorrect">{inputValue}</div>
        )}

        {showCorrectAnswer && (
          <div className="answer answer--correct">{inputValue}</div>
        )}

        {(answerDisplayed || showResult) && (
          <div className="answer answer--correct">{incorrectAnswer}</div>
        )}
      </div>

      <div className="card__foot">
        <Button text={(answerDisplayed || showResult || showCorrectAnswer) ? "Next" : "Check"} length={inputValue.length} inputValue={inputValue} word={word}/>

        <div className="card__foot--link" onClick={answerReveal}>Don&apos;t know?</div>
      </div>

    </main>
  );
};