import React, { useState, useEffect } from 'react';
import './Card.scss';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { NavigationArrows } from '../NavigationArrows/NavigationArrows';
import { useWordsSetup } from '../../context/WordsSetupContext';
import { useSettings } from '../../context/SettingsContext';
import { useVoiceSpeak } from '../../context/VoiceSpeakContext';

import { MdHelpCenter } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';
import { FaVolumeUp } from 'react-icons/fa';
import { IoVolumeMute } from 'react-icons/io5';

export const Card = (
  { czWord,
    word,
    currentWord,
    setCurrentWordIndex,
    currentWordIndex,
  }) => {

  // console.log('%c INIT currentWordIndex ', 'background:black;color:white;font-weight:bold;');
  // console.log('currentWordIndex', currentWordIndex);

  const { setupCountWord, isCzech, isAudio } = useSettings();
  const { updateProgressbar, progressbar, isTurned, setIsTurned,
    favoriteWords,
    setFavoriteWords
  } = useWordsSetup();
  const { speakWord } = useVoiceSpeak();

  // console.log('Card setupCountWord', setupCountWord);

  const [isFavorite, setIsFavorite] = useState(false);
  const [isDisplay, setIsDisplay] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const firstLetterCze = czWord && czWord[0];
  const firstLetterEng = word && word[0];

  useEffect(() => {
    setIsFavorite(favoriteWords.includes(currentWord));
  }, [currentWord, favoriteWords]);

  useEffect(() => {
    if (isTurned && isCzech && isAudio) {
      setTimeout(() => {
        speakWord(word);
      }, 1000);
    }
  }, [isTurned]);

  useEffect(() => {
    if (repeat && !isCzech && isAudio) {
      setRepeat(prevState => !prevState);
      setTimeout(() => {
        speakWord(word);
      }, 1000);
    }
  }, [repeat]);

  const showFirstLetter = () => {
    setIsDisplay(prevState => !prevState);
  };

  const handleStarToggle = () => {
    setIsFavorite(prevState => !prevState);
    setFavoriteWords(prev => {
      const index = prev.indexOf(currentWord);
      if (index === -1) {
        return [...prev, currentWord];
      }
      const updatedWords = [...prev];
      updatedWords.splice(index, 1);
      return updatedWords;
    });
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
        setTimeout(() => {
          setCurrentWordIndex(prevValue => prevValue - 1);
          setIsDisplay(false);
        }, 300);
      } else {
        setCurrentWordIndex(prevValue => prevValue - 1);
        setIsDisplay(false);
      }
      updateProgressbar(false, false);
    }
  }

  const handleClickNext = () => {
    // console.log('%c click NEXT ', 'background:white;color:green;font-weight:bold;');
    if (currentWordIndex < (setupCountWord - 1)) {
      if (isTurned) {
        setIsTurned(false); // Otočí slovo zpět
        setTimeout(() => {
          setCurrentWordIndex(prevValue => prevValue + 1);
          setIsDisplay(false);
        }, 300);
      } else {
        setCurrentWordIndex(prevValue => prevValue + 1);
        setIsDisplay(false);
      }
      updateProgressbar(false, true);
      console.log('click');
    }
    setIsFavorite(false);
  }

  const handleSpeakWord = () => {
    isCzech ? '' : isAudio && speakWord(word);
  }

  console.log('%c favoriteWords ', 'background: green; color: white;');
  console.log(favoriteWords);

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
                  <FaVolumeUp className="icon-volume" onClick={handleSpeakWord} title="Sound icon" />
                  :
                  <IoVolumeMute className="icon-volume" title="Sound icon" />
                  )
                }
                <FaStar className={`icon-star ${isFavorite ? 'icon-star--favorite' : ''}`} onClick={handleStarToggle} title="Favorite icon" />
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
                <FaStar className={`icon-star ${isFavorite ? 'icon-star--favorite' : ''}`} onClick={handleStarToggle} title="Favorite icon" />
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