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
<<<<<<< HEAD
  const [inputValue, setInputValue] = useState('');
  const [answerDisplayed, setAnswerDisplayed] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const refInput = useRef(null);
=======
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
>>>>>>> 1533464b5c6354ffcb035d348d7b3c666b12f599

  const handleStarToggle = () => {
    setIsMarked(prevState => !prevState);
  };

<<<<<<< HEAD
  const showFirstLetter = () => {
    const currentValue = word[0];
    setInputValue(currentValue);
    refInput.current.focus();
  }

  const answerReveal = () => {
    setInputValue(word);
    setAnswerDisplayed(true);
  }

  const changeWord = (event) => {
    const myWord = event.target.value;
    setInputValue(myWord);
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && inputValue.length !== 0) {
      if (inputValue.toLowerCase() !== word.toLowerCase()) {
        setShowResult(true);
      } else {
        setShowCorrectAnswer(true);
        setInputValue(inputValue);
=======
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
>>>>>>> 1533464b5c6354ffcb035d348d7b3c666b12f599
      }
      updateProgressbar(false, false);
      setCurrentWordIndex(prevValue => prevValue - 1);
      setIsDisplay(false);
    }
  }

<<<<<<< HEAD
  const handleClick = () => {
    if (inputValue.toLowerCase() !== word.toLowerCase()) {
      setShowResult(true);
    } else {
      setShowCorrectAnswer(true);
      setInputValue(inputValue);
    }
  }

  const speak = () => {
    let utterance = new SpeechSynthesisUtterance(word);
    window.speechSynthesis.speak(utterance);
  }

  useEffect(() => {
    const yourAnswerElm = document.querySelector('.your-answer');
    const hintElm = document.querySelector('.hint');
    const cardFootLinkElm = document.querySelector('.card__foot--link');
    if (showResult) {
      yourAnswerElm.classList.add('hidden');
      hintElm.classList.add('hidden');
      cardFootLinkElm.classList.add('hidden');
    }
  }, [showResult]);

  useEffect(() => {
    const yourAnswerElm = document.querySelector('.your-answer');
    const hintElm = document.querySelector('.hint');
    const cardFootLinkElm = document.querySelector('.card__foot--link');
    if (showCorrectAnswer) {
      yourAnswerElm.classList.add('hidden');
      hintElm.classList.add('hidden');
      cardFootLinkElm.classList.add('hidden');
    }
  }, [showCorrectAnswer]);
=======
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
>>>>>>> 1533464b5c6354ffcb035d348d7b3c666b12f599

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

<<<<<<< HEAD
        {(!answerDisplayed) && (
          <p className="hint" onClick={showFirstLetter}>Hint <MdHelpCenter className="icon-hint" title="Hint icon" /></p>
        )}

        {(!answerDisplayed) && (
          <input className="your-answer"
                onChange={(changeWord)}
                onKeyDown={(handleKeyDown)}
                value={inputValue}
                type="text"
                ref={refInput}>
          </input>
        )}

        {showResult && (
          <div className="answer">
              <p className="answer__label">Your answer</p>
              <div className="answer__content answer--incorrect">{inputValue}</div>
          </div>
        )}

        {showCorrectAnswer && (
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

      <div className="card__foot">
        <Button onClick={handleClick} text={(answerDisplayed || showResult || showCorrectAnswer) ? "Next" : "Check"} length={inputValue.length} inputValue={inputValue} />

        {(!answerDisplayed) && (
          <div className="card__foot--link" onClick={answerReveal}>Don&apos;t know?</div>
        )}
=======

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
>>>>>>> 1533464b5c6354ffcb035d348d7b3c666b12f599
      </div>
    </div>
  );
}