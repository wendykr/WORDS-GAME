import React, { useState } from 'react'
import './Pair.scss';
// import { Setting } from '../../components/Setting/Setting';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { Button } from '../../components/Button/Button';
// import { useWordsSetup } from '../../context/WordsSetupContext';
import { useSettings } from '../../context/SettingsContext';
// import { useVoiceSpeak } from '../../context/VoiceSpeakContext';

import { FaStar } from 'react-icons/fa';
import { FaVolumeUp } from 'react-icons/fa';
import { IoVolumeMute } from 'react-icons/io5';

export const Pair = ({
    czWord, word
  }) => {

  const {
    // isShow, setIsShow, isCzech,
    isAudio } = useSettings();

  const [isFavorite, setIsFavorite] = useState(false);

  const handleClick = () => {
    console.log('handleClick');
  }

  const handleWord = (czWord) => {
    console.log('handleWord', czWord);
  }

  const handleSpeakWord = () => {
    console.log('speak');
  }

  const handleStarToggle = () => {
    setIsFavorite((prevState) => !prevState);
  };

  return (
    <div className="pair">
      <div className="pair__head">
          <ProgressBar
            line="50"
          />
      </div>

      <div className="pair__main">
        <FaStar
          className={`icon-star ${isFavorite ? "icon-star--favorite" : ""}`}
          onClick={handleStarToggle}
          title="Favorite icon"
        />

        <h2 className="h2" onClick={handleSpeakWord}> {word}&nbsp; 
            { isAudio ? <FaVolumeUp className="icon-volume" title="Sound icon" /> : <IoVolumeMute className="icon-volume" title="Sound icon" /> }</h2>
        <div className="pair__word" onClick={() => handleWord(czWord)}>
          <h3 className="h3"> {czWord} </h3>
        </div>
        <div className="pair__word incorrect" onClick={() => handleWord(czWord)}>
          <h3 className="h3"> {czWord} </h3>
        </div>
        <div className="pair__word correct" onClick={() => handleWord(czWord)}>
          <h3 className="h3"> {czWord} </h3>
        </div>
      </div>

      <div className="pair__foot">
        <Button
          onClick={handleClick}
          text="CHECK"
        />
      </div>
    </div>
  )
}