import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import './Pair.scss';
// import { Setting } from '../../components/Setting/Setting';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { Button } from '../../components/Button/Button';
import { Answer } from '../../components/Answer/Answer';
import { useWordsSetup } from '../../context/WordsSetupContext';
import { useSettings } from '../../context/SettingsContext';
import { useVoiceSpeak } from '../../context/VoiceSpeakContext';
import { generateRandomNumber } from '../../helpers/generateRandomNumber';

import { MdHelpCenter } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';
import { FaVolumeUp } from 'react-icons/fa';
import { IoVolumeMute } from 'react-icons/io5';

generateRandomNumber();

export const Pair = ({
    id,
    czword,
    enword,
    favorite,
    // removeRandomWord,
    // randomWords,
    // generateCurrentNewWord,
  }) => {

  const {
    // updateProgressbar,
    progressbar,
    // resultState, setResultState, 
  } = useWordsSetup();

  const {
    // isShow, setIsShow,
    isCzech, isAudio } = useSettings();
  const { speakWord } = useVoiceSpeak();
  const [isFavorite, setIsFavorite] = useState(favorite);
  const [isDisplay, setIsDisplay] = useState(false);
  // const [randomWAnswer, setRandomAnswer] = useState([]);

  const firstLetterCze = czword && czword[0];
  const firstLetterEng = enword && enword[0];

  generateRandomNumber(2);

  useEffect(() => {
    setIsFavorite(favorite);
  }, [favorite]);

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

      // překreslit
      console.log('favorite', favorite);
      setIsFavorite(!currentTerm.favorite);

    } catch (error) {
      alert('Unexpected error during update: ' + error.message);
    }
  }

  const handleClick = () => {
    console.log('handleClick');
  }

  const handleWord = (czword) => {
    console.log('handleWord', czword);
  }

  const handleSpeakWord = () => {
    isCzech ? '' : isAudio && speakWord(enword);
  };

  return (
    <div className="pair">
      <div className="pair__head">
          <ProgressBar line={progressbar}/>
      </div>

      <div className="pair__main">
        <div className="container--icons">
          <span className="icons--right">
            <MdHelpCenter className="hint-icon" title="Hint icon" onClick={showFirstLetter} />
              <span className={`hint-firts-word ${isDisplay ? 'show' : ''}`}>
                    {`${isCzech ? firstLetterEng : firstLetterCze}_`}
              </span>
          </span>
          <span className="icons--left">
            <FaStar className={`icon-star ${isFavorite ? 'icon-star--favorite' : ''}`} onClick={() => updateFavorite(id)} title="Favorite icon" />
          </span>
        </div>

        {isCzech ?
          <h2 className="h2">{czword}</h2>
          :
          <h2 className="h2" onClick={handleSpeakWord}>{enword}&nbsp; 
            { isAudio ? <FaVolumeUp className="icon-volume" title="Sound icon" /> : <IoVolumeMute className="icon-volume" title="Sound icon" /> }
          </h2>
        }

        <div className="pair__word" onClick={() => handleWord(czword)}>
          <h3 className="h3">{isCzech ? enword : 'Otec'}</h3>
        </div>
        <div className="pair__word incorrect" onClick={() => handleWord(czword)}>
          <h3 className="h3">{isCzech ? enword : 'Pes'}</h3>
        </div>
        <div className="pair__word correct" onClick={() => handleWord(czword)}>
          <h3 className="h3">{isCzech ? enword : czword}</h3>
        </div>
        {/* <Answer czword='Komponenta' enword='Komponenta' /> */}
      </div>

      <div className="pair__foot">
        <Button
          onClick={handleClick}
          text="CHECK"
        />

        <div
          className={`pair__foot--link`}
          // ${
          //   resultState !== "" ? "hidden" : ""
          // }
          // `}
          // onClick={(answerReveal)}
        >
          Don&apos;t know?
        </div>
      </div>
    </div>
  )
}