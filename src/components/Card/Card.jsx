import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import './Card.scss';
import { Setting } from '../../components/Setting/Setting';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { NavigationArrows } from '../NavigationArrows/NavigationArrows';
import { useWordsSetup } from '../../context/WordsSetupContext';
import { useSettings } from '../../context/SettingsContext';
import { useVoiceSpeak } from '../../context/VoiceSpeakContext';
import { useAuthentication } from '../../context/AuthenticationContext';

import { MdHelpCenter } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';
import { FaVolumeUp } from 'react-icons/fa';
import { IoVolumeMute } from 'react-icons/io5';

export const Card = (
  { 
    id,
    czword,
    enword,
    setCurrentWordIndex,
    currentWordIndex,
  }) => {

  const { isShow, setupCountWord, isCzech, isAudio } = useSettings();
  const { updateProgressbar, progressbar, isTurned, setIsTurned,
  } = useWordsSetup();
  const { speakWord } = useVoiceSpeak();
  const { isToken } = useAuthentication();

  const [isFavorite, setIsFavorite] = useState();

  const [isDisplay, setIsDisplay] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const firstLetterCze = czword ? czword.toLowerCase()[0] : '';
  const firstLetterEng = enword ? enword.toLowerCase()[0] : '';

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

  useEffect(() => {
    const handleKeyDown = (event) => {

      if (event.key === 'ArrowRight') {
        handleClickNext();
      }

      if (event.key === 'ArrowLeft') {
        handleClickPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentWordIndex]);

  useEffect(() => {

    if (!id) return;

    const getIsFavorite = async () => {
      const { data } = await supabase
        .from('terms')
        .select('favorite')
        .eq('id', id && id)
        .single();

      setIsFavorite(data?.favorite);
    };

    getIsFavorite();
  }, [id]);

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
        .eq('id', id);

      if (updateError) {
        console.error('Error updating term:', updateError);
        throw updateError;
      }

      const { data } = await supabase
      .from('terms')
      .select('favorite')
      .eq('id', id)
      .single();

      setIsFavorite(data?.favorite);

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
    if (currentWordIndex > 0) {
      setIsTurned(prevValue => {
        if (prevValue) {
          setTimeout(() => {
            setCurrentWordIndex(prevValue => prevValue - 1);
            setIsDisplay(false);
          }, 300);
        } else {
          setCurrentWordIndex(prevValue => prevValue - 1);
          setIsDisplay(false);
        }
        updateProgressbar(false, false);
        return false;
      });
    }
  }

  const handleClickNext = () => {
    if (currentWordIndex < (setupCountWord - 1)) {
      setIsTurned(prevValue => {
        if (prevValue) {
          setTimeout(() => {
            setCurrentWordIndex(prevValue => prevValue + 1);
            setIsDisplay(false);
          }, 300);
        } else {
          setCurrentWordIndex(prevValue => prevValue + 1);
          setIsDisplay(false);
        }
        updateProgressbar(false, true);
        return false;
      });
    }
  }

  const handleSpeakWord = () => {
    speakWord(enword);
  }

  const handleFavorite = () => {
    alert('You need to log in to change your favorite.');
  }

  const favoriteIcon = isToken ? 
  <FaStar className={`icon-star ${isFavorite ? 'icon-star--favorite' : ''}`} onClick={() => updateFavorite(id)} title={`${isFavorite ? 'Remove to favorite' : 'Add to favorite'}`} />
  :
  <FaStar className={`icon-star ${isFavorite ? 'icon-star--favorite' : ''}`} onClick={handleFavorite} title={`${isFavorite ? 'Favorite' : 'Unfavorite'}`} />

  return (
    <div className="card">
      <div className="card__hidden">
        {isShow && <Setting /> }
      </div>
      <div className="card__head">
        <ProgressBar line={progressbar} />
      </div>

      <div className="card__body">
        <div className={`card__body--container ${isTurned ? 'is-turned' : ''}`} >
          <div className="card__body--front">
            <div className="container--icons">
              <span className="icons--right">
                <MdHelpCenter className="hint-icon" title={`${isDisplay ? 'Hidden first letter' : 'Show first letter'}`} onClick={showFirstLetter} />
                  <span className={`hint-firts-word ${isDisplay ? 'show' : ''}`}>
                    {`${isCzech ? firstLetterEng : firstLetterCze}_`}
                  </span>
              </span>
              <span className="icons--left">
                { !isCzech && (
                  isAudio ? 
                  <FaVolumeUp className="icon-volume" onClick={handleSpeakWord} title="Repeat speak" />
                  :
                  <IoVolumeMute className="icon-volume" title="Sound icon" />
                  )
                }
                {favoriteIcon}
              </span>
            </div>
            <div className="container--words" onClick={handleClick} >
              <h2 className="front-word">{isCzech ? (czword?.toLowerCase() || '') : (enword?.toLowerCase() || '')}</h2>
            </div>
          </div>
          <div className="card__body--back">
            <div className="container--icons">
              <span className="icons--right">
                <MdHelpCenter className="hint-icon" title={`${isDisplay ? 'Hidden first letter' : 'Show first letter'}`} onClick={showFirstLetter} />
                  <span className={`hint-firts-word ${isDisplay ? 'show' : ''}`}>
                    {`${isCzech ? firstLetterCze : firstLetterEng}_`}
                  </span>
              </span>
              <span className="icons--left">
                { isCzech && (
                  isAudio ? 
                  <FaVolumeUp className="icon-volume" onClick={handleSpeakWord} title="Repeat speak" />
                  :
                  <IoVolumeMute className="icon-volume" title="Sound icon" />
                  )
                }
                {favoriteIcon}
              </span>
            </div>
            <div className="container--words" onClick={handleClick} >
            <h2 className="front-word">{isCzech ? (enword?.toLowerCase() || '') : (czword?.toLowerCase() || '')}</h2>
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