import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import './Pair.scss';
import { Setting } from '../../components/Setting/Setting';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { Button } from '../../components/Button/Button';
import { Response } from '../../components/Response/Response';
import { useWordsSetup } from '../../context/WordsSetupContext';
import { useSettings } from '../../context/SettingsContext';
import { useVoiceSpeak } from '../../context/VoiceSpeakContext';
// import { generateRandomNumber } from '../../helpers/generateRandomNumber';

import { MdHelpCenter } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';
import { FaVolumeUp } from 'react-icons/fa';
import { IoVolumeMute } from 'react-icons/io5';

// generateRandomNumber();

export const Pair = ({
    id,
    czword,
    enword,
    favorite,
    uniqueWords, setUniqueWords,
    removeRandomWord,
    randomWords,
    generateCurrentNewWord,
    currentWord
  }) => {

  const {
    updateProgressbar,
    progressbar,
    resultState, setResultState, 
    // allWords
  } = useWordsSetup();

  const {
    isShow, setIsShow,
    isCzech, isAudio } = useSettings();
  const { speakWord } = useVoiceSpeak();
  const [isFavorite, setIsFavorite] = useState(favorite);
  const [isDisplay, setIsDisplay] = useState(false);
  const [isMarked, setIsMarked] = useState(false);
  const [isSearchWord, setIsSearchWord] = useState();
  const [selectedResponseId, setSelectedResponseId] = useState(0);
  // const [randomWAnswer, setRandomAnswer] = useState([]);

  // const [uniqueWords, setUniqueWords] = useState([]);

  const firstLetterCze = czword && czword[0];
  const firstLetterEng = enword && enword[0];

  // useEffect(() => {
  //   let randomIndx = [];

  //   while (randomIndx.length < 2) {
  //     const currentRandomNumber = generateRandomNumber(allWords.length);

  //     if (!randomIndx.includes(allWords[currentRandomNumber]) || !randomIndx.includes(id)) {
  //       randomIndx.push(allWords[currentRandomNumber]);
  //     }
  //   }

  //   setUniqueWords(randomIndx);
  
  // }, [allWords, id]);

  // console.log('%c uniqueWords PAIR', 'background: purple; color: white;');
  // console.log(uniqueWords);

  // const [addCurrentWord, setAddCurrentWord] = useState({
  //   id,
  //   czword,
  //   enword,
  //   favorite
  // });

  // console.log('currentWord', currentWord);
  
  useEffect(() => {
    console.log('currentWord', currentWord);
    setUniqueWords(prevWords => {
      const newWords = [...prevWords, currentWord];
      console.log('newWords', newWords);
      return newWords;
    });
  }, [currentWord, setUniqueWords]);

  useEffect(() => {
    console.log('uniqueWords', uniqueWords);
  }, [uniqueWords]);

  useEffect(() => {
    setIsFavorite(favorite);
  }, [favorite]);

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

  const showFirstLetter = () => {
    setIsDisplay(prevState => !prevState);
  };

  // kliknu na dont-know
  const answerReveal = () => {
    setResultState("dont-know");
    setIsMarked(true);
    isCzech && isAudio && speakWord(enword);
  };

    // kliknu na slovo
  const handleCheckWord = (id, markWord) => {
    setSelectedResponseId(id);
    speakWord(markWord);
    setIsSearchWord(markWord);
    setIsMarked(true);
  }

  const handleCheckResult = () => {
    if (resultState === "") {
      isCzech && isAudio && speakWord(enword);

      // TRUE
      if (isSearchWord === czword) {
        setResultState("correct");
        updateProgressbar(true, true);
      }

      // FALSE
      if (isSearchWord !== czword) {
        setResultState("incorrect");
      }
    }
  };

  const handleClick = () => {
    if (resultState === "correct") {
      removeRandomWord();
    } else if (resultState === "dont-know" || resultState === "incorrect") {
      generateCurrentNewWord(randomWords);
    }

    setResultState("");
    setIsMarked(false);
  };

  const handleSpeakWord = () => {
    isCzech ? '' : isAudio && speakWord(enword);
  };

  const buttonText =
    resultState !== ""
      ? resultState === "finished"
        ? "Exit"
        : "Next"
      : "Check";

  const isFinished = resultState === "correct" && randomWords.length === 1;

  const showSetting = () => {
    setIsShow(true);
  }

  return (
    <div className="pair">
      <div className="pair__hidden">
        {isShow && <Setting /> }
      </div>
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

        {/* {
          uniqueWords.map((word) => (
            <div
              key={word.id}
              className={`pair__word
                ${(resultState === "dont-know" || resultState === "correct") && 'correct'}
                ${(resultState === "incorrect") && 'incorrect'}
                ${isMarked ? 'marked' : ''}`}
              onClick={() => handleWord(isCzech ? word.enword : word.czword)}
            >
              <h3 className="h3">{isCzech ? word.enword : word.czword}</h3>
            </div>
          ))
        } */}
        {/* <div className={`pair__word
              ${(resultState === "dont-know" || resultState === "correct") && 'correct'}
              ${(resultState === "incorrect") && 'incorrect'}
              ${isMarked ? 'marked' : ''}`}
            onClick={() => handleCheckWord(id, isCzech ? enword : czword)}>
          <h3 className="h3">{isCzech ? enword : czword}</h3>
        </div> */}

        {
          uniqueWords.map((word) => (
            <Response
              key={word.id}
              id={word.id}
              czword={word.czword}
              enword={word.engword}
              handleCheckWord={handleCheckWord}
              resultState={resultState}
              isMarked={word.id === selectedResponseId}
            />
          ))
        }
      </div>

      <div className="pair__foot">
      {isFinished ? (
          <Button text="Done" onClick={showSetting} />
        ) : (
          <Button
            onClick={(event) => {
              resultState !== ""
                ? handleClick(event)
                : handleCheckResult(event);
            }}
            text={buttonText}
            isMarked={isMarked}
            length='0'
            inputValue=""
          />
        )}

        <div
          className={`question__foot--link ${
            resultState !== "" ? "hidden" : ""
          }`}
          onClick={answerReveal}
        >
          Don&apos;t know?
        </div>
      </div>
    </div>
  )
}