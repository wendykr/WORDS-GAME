import React, { useState } from 'react';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { NavigationArrows } from '../NavigationArrows/NavigationArrows';
import './Card.scss';
import { wordData } from '../../constants/words';

import { MdHelpCenter } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { FaVolumeUp } from "react-icons/fa";

export const Card = () => {
  const [isDisplay, setIsDisplay] = useState(false);
  const [isMarked, setIsMarked] = useState(false);
  const [isTurnet, setIsTurnet] = useState(false);

  const selectedWord = wordData[0]; 
  console.log(selectedWord);

  const showFirstLetter = () => {
    setIsDisplay(prevState => !prevState);
  };

  const handleStarToggle = () => {
    setIsMarked(prevState => !prevState);
  };

  const handleClick = () => {
    setIsTurnet(prevState => !prevState);
    setIsDisplay(false);
    console.log('click');
  };

  const speak = () => {
    let utterance = new SpeechSynthesisUtterance(selectedWord.word);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <main className="card">
      <div className="card__head">
        <ProgressBar line="91" />
      </div>

      <div className="card__body">
        <div className={`card__body--container ${isTurnet ? 'is-turned' : ''}`} >
          <div className="card__body--front">
            <div className="container--icons">
              <span className="icons--right">
                <MdHelpCenter className="hint-icon" title="Hint icon" onClick={showFirstLetter} /> <span className={`hint-firts-word ${isDisplay ? 'show' : ''}`}>{`${selectedWord.word[0]}_`}</span>
              </span>
              <span className="icons--left">
                <FaVolumeUp className="icon-volume" onClick={speak} title="Sound icon" />
                <FaStar className={`icon-star ${isMarked ? 'icon-star--marked' : ''}`} onClick={handleStarToggle} title="Mark icon" />
              </span>
            </div>
            <div className="container--words" onClick={handleClick} >
              <h2 className="front-word">{selectedWord.czWord}</h2>
            </div>
          </div>
          <div className="card__body--back">
            <div className="container--icons">
              <span className="icons--right">
                <MdHelpCenter className="hint-icon" title="Hint icon" onClick={showFirstLetter} /> <span className={`hint-firts-word ${isDisplay ? 'show' : ''}`}>{`${selectedWord.czWord[0]}_`}</span>
              </span>
              <span className="icons--left">
                <FaVolumeUp className="icon-volume" onClick={speak} title="Sound icon" />
                <FaStar className={`icon-star ${isMarked ? 'icon-star--marked' : ''}`} onClick={handleStarToggle} title="Mark icon" />
              </span>
            </div>
            <div className="container--words" onClick={handleClick} >
              <h2 className="front-word">{selectedWord.word}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="card__foot">
        <NavigationArrows />
      </div>
    </main>
  );
};