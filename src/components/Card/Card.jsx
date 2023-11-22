import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
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
  { 
    id,
    czword,
    enword,
    category,
    favorite,
    setCurrentWordIndex,
    currentWordIndex,
    randomWords,
    setRandomWords,
  }) => {

    // console.log('favorite', favorite);

  // console.log('%c INIT currentWordIndex ', 'background:black;color:white;font-weight:bold;');
  // console.log('currentWordIndex', currentWordIndex);

  const { setupCountWord, isCzech, isAudio } = useSettings();
  const { updateProgressbar, progressbar, isTurned, setIsTurned,
  } = useWordsSetup();
  const { speakWord } = useVoiceSpeak();

  // console.log('Card setupCountWord', setupCountWord);

  const [isDisplay, setIsDisplay] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const firstLetterCze = czword && czword[0];
  const firstLetterEng = enword && enword[0];

  useEffect(() => {
    if (isTurned && isCzech && isAudio) {
      setTimeout(() => {
        speakWord(enword);
      }, 1000);
    }
  }, [isTurned]);

  useEffect(() => {
    if (repeat && !isCzech && isAudio) {
      setRepeat(prevState => !prevState);
      setTimeout(() => {
        speakWord(enword);
      }, 1000);
    }
  }, [repeat]);

  const showFirstLetter = () => {
    setIsDisplay(prevState => !prevState);
  };

  const updateFavorite = async (id) => {
    try {
      const { data: currentTerm, error } = await supabase
        .from('terms')
        .select('favorite')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching current term:', error);
        throw error;
      }

      const { updateError } = await supabase
        .from('terms')
        .update({ favorite: !currentTerm.favorite })
        .eq('id', id)


      if (updateError) {
        console.error('Error updating term:', updateError);
        throw updateError;
      }

      const updatedWord = {
        ...currentTerm,
        id,
        czword,
        enword,
        category,
        favorite: !currentTerm.favorite,
      };

      const updatedRandomWords = randomWords.map(word =>
        word.id === id ? updatedWord : word
      );

      setRandomWords(updatedRandomWords);
  
    } catch (error) {
      alert('Unexpected error during update: ' + error.message);
    }
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
    }
  }

  const handleSpeakWord = () => {
    isCzech ? '' : isAudio && speakWord(enword);
  }

  // console.log('%c favoriteWords ', 'background: green; color: white;');
  // console.log(favoriteWords);

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
                <FaStar className={`icon-star ${favorite ? 'icon-star--favorite' : ''}`} onClick={() => updateFavorite(id)} title="Favorite icon" />
              </span>
            </div>
            <div className="container--words" onClick={handleClick} >
              <h2 className="front-word">{isCzech ? czword : enword}</h2>
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
                <FaStar className={`icon-star ${favorite ? 'icon-star--favorite' : ''}`} onClick={() => updateFavorite(id)} title="Favorite icon" />
              </span>
            </div>
            <div className="container--words" onClick={handleClick} >
              <h2 className="front-word">{isCzech ? enword : czword}</h2>
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