import React, { useState, useEffect } from 'react'; 
import { useSpeechSynthesis } from 'react-speech-kit';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { NavigationArrows } from '../NavigationArrows/NavigationArrows';
import { useWordsSetup } from '../../context/WordsSetupContext';
import { useSettings } from '../../context/SettingsContext';
import './Card.scss';

import { MdHelpCenter } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { FaVolumeUp } from "react-icons/fa";

export const Card = (
  { czWord,
    word,
    setCurrentWordIndex,
    currentWordIndex,
  }) => {

    // const firstLetterEng = word[0];
    // console.log(firstLetterEng);
    // const firstLetterCze = czWord[0];
    // console.log(firstLetterCze);

  // console.log('%c INIT currentWordIndex ', 'background:black;color:white;font-weight:bold;');
  // console.log('currentWordIndex', currentWordIndex);

  const { updateProgressbar, progressbar } = useWordsSetup();
  const { setupCountWord } = useSettings();
  const { speak, voices } = useSpeechSynthesis();

  // console.log('Card setupCountWord', setupCountWord);

  const [isMarked, setIsMarked] = useState(false);
  const [isDisplay, setIsDisplay] = useState(false);
  const [isTurned, setIsTurned] = useState(false);

  const speakWord = () => {
    const selectedVoice = voices.find(voice => voice.name === 'Google US English');
    speak({ text: word, rate: 0.8, voice: selectedVoice });
  };

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

  const handleClickPrev = () => {
    // console.log('%c click PREV ', 'background:white;color:red;font-weight:bold;');
    if (currentWordIndex > 0) {
      if (isTurned) {
        setIsTurned(false);
      }
      updateProgressbar(false, false);
      setCurrentWordIndex(prevValue => prevValue - 1);
      setIsDisplay(false);
    }
  }

  const handleClickNext = () => {
    // console.log('%c click NEXT ', 'background:white;color:green;font-weight:bold;');
    if (currentWordIndex < (setupCountWord - 1)) {
      if (isTurned) {
        setIsTurned(false);
      }
      updateProgressbar(false, true);
      setCurrentWordIndex(prevValue => prevValue + 1);
      setIsDisplay(false);
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
                <MdHelpCenter className="hint-icon" title="Hint icon" onClick={showFirstLetter} />
                  <span className={`hint-firts-word ${isDisplay ? 'show' : ''}`}>
                    {/* {`${wordData[currentWordIndex].word[0]}_`} */}
                    {`${word}_`}
                    {/* {`${firstLetterEng}_`} */}
                  </span>
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
                <MdHelpCenter className="hint-icon" title="Hint icon" onClick={showFirstLetter} />
                  <span className={`hint-firts-word ${isDisplay ? 'show' : ''}`}>
                    {/* {`${wordData[currentWordIndex].czWord[0]}_`} */}
                    {`${czWord}_`}
                    {/* {`${firstLetterCze}_`} */}
                  </span>
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
        <NavigationArrows currentWordIndex={currentWordIndex} setupCountWord={setupCountWord}
          handleClickPrev={handleClickPrev} 
          handleClickNext={handleClickNext} 
        />
      </div>
    </div>
  );
}