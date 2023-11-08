import React, { useState, useEffect } from 'react'; 
import { useSpeechSynthesis } from 'react-speech-kit';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { NavigationArrows } from '../NavigationArrows/NavigationArrows';
import { useWordsSetup } from '../../context/WordsSetupContext';
import { useSettings } from '../../context/SettingsContext';
import './Card.scss';

import { MdHelpCenter } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';
import { FaVolumeUp } from 'react-icons/fa';
import { IoVolumeMute } from 'react-icons/io5';

export const Card = (
  { czWord,
    word,
    setCurrentWordIndex,
    currentWordIndex,
  }) => {

  // console.log('%c INIT currentWordIndex ', 'background:black;color:white;font-weight:bold;');
  // console.log('currentWordIndex', currentWordIndex);

  const { setupCountWord, isCzech, isAudio } = useSettings();
  const { updateProgressbar, progressbar, isTurned, setIsTurned } = useWordsSetup();
  const { speak, voices } = useSpeechSynthesis();

  // console.log('Card setupCountWord', setupCountWord);

  const [isMarked, setIsMarked] = useState(false);
  const [isDisplay, setIsDisplay] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const firstLetterCze = czWord && czWord[0];
  const firstLetterEng = word && word[0];

  useEffect(() => {
    if (isTurned && isCzech) {
      setTimeout(() => {
        speakWord();
      }, 1000);
    }
  }, [isTurned]);

  useEffect(() => {
    if (repeat && !isCzech) {
      setRepeat(prevState => !prevState);
      setTimeout(() => {
        speakWord();
      }, 1000);
    }
  }, [repeat]);

  const speakWord = () => {
    if (isAudio) {
      const selectedVoice = voices.find(voice => voice.name === 'Google US English');
      speak({ text: word, rate: 0.8, voice: selectedVoice });
    }
  };

  const showFirstLetter = () => {
    setIsDisplay(prevState => !prevState);
  };

  const handleStarToggle = () => {
    setIsMarked(prevState => !prevState);
  };

  const handleClick = () => {
    isTurned && setRepeat(true);
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
                    {`${isCzech ? firstLetterEng : firstLetterCze}_`}
                  </span>
              </span>
              <span className="icons--left">
                { !isCzech && (
                  isAudio ? 
                  <FaVolumeUp className="icon-volume" onClick={speakWord} title="Sound icon" />
                  :
                  <IoVolumeMute className="icon-volume" title="Sound icon" />
                  )
                }
                <FaStar className={`icon-star ${isMarked ? 'icon-star--marked' : ''}`} onClick={handleStarToggle} title="Mark icon" />
              </span>
            </div>
            <div className="container--words" onClick={handleClick} >
              <h2 className="front-word">{isCzech ? czWord : word}</h2>
            </div>
          </div>
          <div className="card__body--back">
            <div className="container--icons">
              <span className="icons--right">
                <MdHelpCenter className="hint-icon" title="Hint icon" onClick={showFirstLetter} />
                  <span className={`hint-firts-word ${isDisplay ? 'show' : ''}`}>
                    {`${isCzech ? firstLetterCze : firstLetterEng}_`}
                  </span>
              </span>
              <span className="icons--left">
                { isCzech && (
                  isAudio ? 
                  <FaVolumeUp className="icon-volume" onClick={speakWord} title="Sound icon" />
                  :
                  <IoVolumeMute className="icon-volume" title="Sound icon" />
                  )
                }
                <FaStar className={`icon-star ${isMarked ? 'icon-star--marked' : ''}`} onClick={handleStarToggle} title="Mark icon" />
              </span>
            </div>
            <div className="container--words" onClick={handleClick} >
              <h2 className="front-word">{isCzech ? word : czWord}</h2>
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