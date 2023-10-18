import React, { useState, useRef } from 'react';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { Button } from '../Button/Button';
import './Question.scss';

import { MdHelpCenter } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { FaVolumeUp } from "react-icons/fa";

export const Question = ({ czWord, word }) => {
  const [isMarked, setIsMarked] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [answerDisplayed, setAnswerDisplayed] = useState(false); // ukázat výsledek, nenapíšeme žádnou odpověď
  const [showResult, setShowResult] = useState(false); // ukázat výsledek, napíšeme špatnou odpověď
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false); // ukázat výsledek, napíšeme správnou odpověď
  const refInput = useRef(null);

  const handleStarToggle = () => {
    setIsMarked(prevState => !prevState);
  };

  const showFirstLetter = () => {
    const currentValue = word[0];
    setInputValue(currentValue);
    refInput.current.focus();
  };

  const answerReveal = () => {
    setInputValue(word);
    setAnswerDisplayed(true);
  };

  const changeWord = (event) => {
    const myWord = event.target.value;
    setInputValue(myWord);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && inputValue.length !== 0) {
      if (inputValue.toLowerCase() !== word.toLowerCase()) {
        setShowResult(true);
      } else {
        setShowCorrectAnswer(true);
        setInputValue(inputValue);
      }
    }
  };

  const handleClick = () => {
    if (inputValue.toLowerCase() !== word.toLowerCase()) {
      setShowResult(true);
    } else {
      setShowCorrectAnswer(true);
      setInputValue(inputValue);
    }
  };

  const speak = () => {
    let utterance = new SpeechSynthesisUtterance(word);
    window.speechSynthesis.speak(utterance);
  };

  // const stateResult = showResult;
  // const stateCorrect = showCorrectAnswer && !answerDisplayed;
  // const stateDontKnow = answerDisplayed || showResult;

  // const resultSentence = stateResult ? "Your answer" : (stateCorrect || stateDontKnow) ? "Correct Answer" : "" ;
  // const resultStatus = stateResult ? "answer--incorrect" : (stateCorrect || stateDontKnow) ? "answer--correct" : "" ;
  // const resultValue = (stateResult || stateCorrect) ? inputValue :  stateDontKnow ? word : "" ;

//! const finalResponse = [].length < 0 ? "Exit" : ""

  return (
    <div className="question">
      <div className="question__head">
        <ProgressBar line="91" />
      </div>
      <div className="question__body">
        <FaStar className={`icon-star ${isMarked ? 'icon-star--marked' : ''}`} onClick={handleStarToggle} title="Mark icon" />

        <h2 className="guess-word" onClick={speak}>{czWord} <FaVolumeUp className="icon-volume" title="Sound icon" /></h2>

          <p className={`hint ${(showResult|| showCorrectAnswer || answerDisplayed) ? "hidden" : ""}`} onClick={showFirstLetter}>Hint <MdHelpCenter className="icon-hint" title="Hint icon" /></p>

          <input className={`your-answer ${(showResult|| showCorrectAnswer || answerDisplayed) ? "hidden" : ""}`}
                onChange={(changeWord)}
                onKeyDown={(handleKeyDown)}
                value={inputValue}
                type="text"
                ref={refInput}>
          </input>

          {/* {(stateResult || stateCorrect || stateDontKnow) && (
            <div className="answer">
              <p className="answer__label">{resultSentence}</p>
              <div className={`answer__content ${resultStatus}`} >{resultValue}</div>
            </div>
          )} */}

        {showResult && (
          <div className="answer">
              <p className="answer__label">Your answer</p>
              <div className="answer__content answer--incorrect">{inputValue}</div>
          </div>
        )}

        {(showCorrectAnswer && !answerDisplayed) && (
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

      <div className="question__foot">
        <Button onClick={handleClick} text={(showResult || showCorrectAnswer || answerDisplayed) ? "Next" : "Check"} length={inputValue.length} inputValue={inputValue} />

        <div className={`question__foot--link ${(showResult || showCorrectAnswer || answerDisplayed) ? "hidden" : ""}`} onClick={answerReveal}>Don&apos;t know?</div>
      </div>
    </div>
    );
}















