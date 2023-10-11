import React, { useState, useEffect, useRef } from 'react';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { Button } from '../Button/Button';
import './Card.scss';

import { MdHelpCenter } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { FaVolumeUp } from "react-icons/fa";

export const Card = ({ czWord, word }) => {
  const [isMarked, setIsMarked] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [answerDisplayed, setAnswerDisplayed] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const refInput = useRef(null);

  const handleStarToggle = () => {
    setIsMarked(prevState => !prevState);
  };

  const showFirstLetter = () => {
    const currentValue = word[0];
    setInputValue(currentValue);
    refInput.current.focus();
  }

  const answerReveal = () => {
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
      } else {
        setShowCorrectAnswer(true);
        setInputValue(inputValue);
      }
    }
  }

  const handleClick = () => {
    if (inputValue.toLowerCase() !== word.toLowerCase()) {
      setShowResult(true);
    } else {
      setShowCorrectAnswer(true);
      setInputValue(inputValue);
    }
  }

  const speak = () => {
    let utterance = new SpeechSynthesisUtterance(word);
    window.speechSynthesis.speak(utterance);
  }

  useEffect(() => {
    const yourAnswerElm = document.querySelector('.your-answer');
    const hintElm = document.querySelector('.hint');
    const cardFootLinkElm = document.querySelector('.card__foot--link');
    if (showResult) {
      yourAnswerElm.classList.add('hidden');
      hintElm.classList.add('hidden');
      cardFootLinkElm.classList.add('hidden');
    }
  }, [showResult]);

  useEffect(() => {
    const yourAnswerElm = document.querySelector('.your-answer');
    const hintElm = document.querySelector('.hint');
    const cardFootLinkElm = document.querySelector('.card__foot--link');
    if (showCorrectAnswer) {
      yourAnswerElm.classList.add('hidden');
      hintElm.classList.add('hidden');
      cardFootLinkElm.classList.add('hidden');
    }
  }, [showCorrectAnswer]);

  return (
    <main className="card">

      <div className="card__head">
        <ProgressBar line="91" />
      </div>
      <div className="card__body">
        <FaStar className={`icon-star ${isMarked ? 'icon-star--marked' : ''}`} onClick={handleStarToggle} title="Mark icon" />

        <h2 className="guess-word" onClick={speak}>{czWord} <FaVolumeUp className="icon-volume" title="Sound icon" /></h2>

        {(!answerDisplayed) && (
          <p className="hint" onClick={showFirstLetter}>Hint <MdHelpCenter className="icon-hint" title="Hint icon" /></p>
        )}

        {(!answerDisplayed) && (
          <input className="your-answer"
                onChange={(changeWord)}
                onKeyDown={(handleKeyDown)}
                value={inputValue}
                type="text"
                ref={refInput}>
          </input>
        )}

        {showResult && (
          <div className="answer">
              <p className="answer__label">Your answer</p>
              <div className="answer__content answer--incorrect">{inputValue}</div>
          </div>
        )}

        {showCorrectAnswer && (
          <div className="answer">
            <p className="answer__label">Correct answer</p>
            <div className="answer__content answer--correct">{inputValue}</div>
          </div>
        )}

        {(answerDisplayed || showResult) && (
          <div className="answer">
            <p className="answer__label">Correct answer</p>
            <div className="answer__content answer--correct">{word}</div>
          </div>
        )}
      </div>

      <div className="card__foot">
        <Button onClick={handleClick} text={(answerDisplayed || showResult || showCorrectAnswer) ? "Next" : "Check"} length={inputValue.length} inputValue={inputValue} />

        {(!answerDisplayed) && (
          <div className="card__foot--link" onClick={answerReveal}>Don&apos;t know?</div>
        )}
      </div>

    </main>
  );
};