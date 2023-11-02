import React, { useState, useEffect } from 'react'; 
import { useSpeechSynthesis } from 'react-speech-kit';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { NavigationArrows } from '../NavigationArrows/NavigationArrows';
import { useWordsSetup } from '../../context/WordsSetupContext';
// import { useSettings } from '../../context/SettingsContext';
import './Card.scss';
import { wordData } from '../../constants/words';

import { MdHelpCenter } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { FaVolumeUp } from "react-icons/fa";

export const Card = (
  { czWord,
    word,
    counter,
    // setCurrentWordIndex,
    // currentWordIndex,
    // randomWords,
  }) => {

  // const [progressbar, setProgressbar] = useState(0);
  const { updateProgressbar, progressbar } = useWordsSetup();
  // const { setupCountWord } = useSettings();
  const { speak, voices } = useSpeechSynthesis();

  const [isMarked, setIsMarked] = useState(false);
  const [isDisplay, setIsDisplay] = useState(false);
  const [isTurned, setIsTurned] = useState(false);

  const speakWord = () => {
    const selectedVoice = voices.find(voice => voice.name === 'Google US English');
    speak({ text: word, rate: 0.8, voice: selectedVoice });
  };

  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  //   useEffect(() => {
  //   for (let i = 0; i < 10; i++) {
  //     // console.log(i, wordData[i].czWord);
  //   }
  // }, []);

  useEffect(() => {
    if (isTurned) {
      setTimeout(() => {
        speakWord();
      }, 1000);
    }
  }, [isTurned]);

  const showFirstLetter = () => {
    setIsDisplay(prevState => !prevState);
  };

  const handleStarToggle = () => {
    setIsMarked(prevState => !prevState);
  };

  const handleClick = () => {
    setIsTurned(prevState => !prevState);
    setIsDisplay(false);
  };

  const [length, setLength] = useState(0);

  const handleClickPrev = () => {
    if (length !== 0) {
      console.log('click on prev');
      // setProgressbar(prevValue => prevValue - 11.11);
      updateProgressbar(false);
      // console.log(progressbar);
      setLength(prevValue => prevValue - 1);
      console.log(length);
      setIsDisplay(false);
    }

    if (currentWordIndex > 0) {
      if (isTurned) {
        setIsTurned(false);
      }
      setCurrentWordIndex(prevIndex => prevIndex - 1);
    }
  }

  const handleClickNext = () => {
    if (length !== (counter--)) {
      console.log('click on next');
      // setProgressbar(prevValue => prevValue + 11.11);
      updateProgressbar(true);
      // console.log(progressbar);
      setLength(prevValue => prevValue + 1);
      console.log(length);
      setIsDisplay(false);
    }

    if (currentWordIndex < counter) {
      if (isTurned) {
        setIsTurned(false);
      }
      setCurrentWordIndex(prevIndex => prevIndex + 1);
    }
  }

  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     console.log(event.key);

  //     if (event.key === 'ArrowRight') {
  //       console.log('NEXT');
  //       handleClickNext();
  //     }

  //     if (event.key === 'ArrowLeft') {
  //       console.log('PREV');
  //       handleClickPrev();
  //     }
  //   };

  //   document.addEventListener('keydown', handleKeyDown);
  // }, []);

  return (
    <div className="card">
      <div className="card__head">
        <ProgressBar line={progressbar} />
      </div>

      <div className="card__body">
        <div className={`card__body--container ${isTurned ? 'is-turned' : ''}`} >
          <div className="card__body--front">
            <div className="container--icons">
              <span className="icons--right">
                <MdHelpCenter className="hint-icon" title="Hint icon" onClick={showFirstLetter} /> <span className={`hint-firts-word ${isDisplay ? 'show' : ''}`}>{`${wordData[currentWordIndex].word[0]}_`}</span>
              </span>
              <span className="icons--left">
                <FaStar className={`icon-star ${isMarked ? 'icon-star--marked' : ''}`} onClick={handleStarToggle} title="Mark icon" />
              </span>
            </div>
            <div className="container--words" onClick={handleClick} >
              <h2 className="front-word">{czWord}</h2>
            </div>
          </div>
          <div className="card__body--back">
            <div className="container--icons">
              <span className="icons--right">
                <MdHelpCenter className="hint-icon" title="Hint icon" onClick={showFirstLetter} /> <span className={`hint-firts-word ${isDisplay ? 'show' : ''}`}>{`${wordData[currentWordIndex].czWord[0]}_`}</span>
              </span>
              <span className="icons--left">
                <FaVolumeUp className="icon-volume" onClick={speakWord} title="Sound icon" />
                <FaStar className={`icon-star ${isMarked ? 'icon-star--marked' : ''}`} onClick={handleStarToggle} title="Mark icon" />
              </span>
            </div>
            <div className="container--words" onClick={handleClick} >
              <h2 className="front-word">{word}</h2>
            </div>
            </div>
        </div>
      </div>

      <div className="card__foot">
        <NavigationArrows length={length} setupCountWord={counter}
          handleClickPrev={handleClickPrev} 
          handleClickNext={handleClickNext} 
        />
      </div>
    </div>
  );
}