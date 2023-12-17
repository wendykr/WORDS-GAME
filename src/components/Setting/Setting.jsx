import React, { useState, useEffect } from 'react';
import './Setting.scss';
import { RadioButton } from '../RadioButton/RadioButton';
import { SelectList } from '../SelectList/SelectList';
import { InputField } from '../InputField/InputField';
import { useSettings } from '../../context/SettingsContext';
import { useWordsSetup } from '../../context/WordsSetupContext';

import { IoSettingsSharp } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';

export const Setting = () => {

  const {
    isShow, setIsShow,
    isCzech, setIsCzech,
    categoryValue, setCategoryValue,
    setSetupCountWord,
    isFavorite, setIsFavorite,
    isAudio, setIsAudio
  } = useSettings();

  const {
    setAllWords,
    initialAllWords,
    setProgressbar,
    setInputValue,
    setResultState,
    setCurrentWordIndex,
    setIsTurned,
    setIsDisabled,
    setRandomWords,
    setCurrentWord
  } = useWordsSetup();

  const [isTemporaryCzech, setIsTemporaryCzech] = useState(isCzech);
  const [temporaryCategory, setTemporaryCategory] = useState(categoryValue);
  const [temporaryCount, setTemporaryCount] = useState();
  const [isTemporaryFavorite, setIsTemporaryFavorite] = useState(isFavorite);
  const [isTemporaryAudio, setIsTemporaryAudio] = useState(isAudio);
  const [temporaryAllWords, setTemporaryAllWords] = useState([]);

  useEffect(() => {
    setTemporaryAllWords(initialAllWords);
  }, [categoryValue]);

  const showSetup = () => {
    setIsShow(prevState => !prevState);
  };

  const handleSubmit = (event) => {

    event.preventDefault();
    setIsShow(prevState => !prevState);

    if (typeof temporaryCount === 'undefined' || temporaryCount <= 2) {
      alert('Count of words must be greater than 3.');
      setIsShow(true);
      return;
    } else {
      let filterCategory;

      if (temporaryCategory) {
        if (isTemporaryFavorite) {
          filterCategory = temporaryAllWords.filter(word => word.category === temporaryCategory && word.favorite === isTemporaryFavorite);
        } else {
          filterCategory = temporaryAllWords.filter(word => word.category === temporaryCategory);
        }

        if (filterCategory.length > 0 && filterCategory.length < temporaryCount) {
          alert(`The maximum count of words is ${filterCategory.length}.`);
          setIsShow(true);
          return;
        } else {
          setAllWords(filterCategory);
        }
      } else {
        if (isTemporaryFavorite) {
          const favoriteWords = initialAllWords.filter(word => word.favorite === isTemporaryFavorite);
          setAllWords(favoriteWords);
        } else {
          setAllWords(initialAllWords);
        }
      }

      setCategoryValue(temporaryCategory);
      setSetupCountWord(temporaryCount);
    }

    setIsCzech(isTemporaryCzech);
    setIsFavorite(isTemporaryFavorite);
    setIsAudio(isTemporaryAudio);
    setProgressbar(0);

    setInputValue("");
    setResultState("");
    setCurrentWordIndex(0);
    setRandomWords([]);
    setCurrentWord();

    setIsShow(false);

    setTemporaryCategory("");
    setTemporaryCount("");
    setTemporaryAllWords([]);
    setIsTemporaryCzech(isTemporaryCzech);
    setIsTemporaryFavorite(isTemporaryFavorite);
    setIsTemporaryAudio(isTemporaryAudio);

    setIsTurned(false);
    setIsDisabled(false);
  }

  return (
    <div className="setting">
      <div className="setting__head">
        <IoSettingsSharp className="icon-setting" onClick={showSetup} title="Open setting" />
      </div>
      <div className={`setting__body ${isShow ? 'show' : ''}`}>
        <div className="setting__body--container">
            <h3 className="setting__body--title">Setting options</h3>
            <RxCross2 className="icon-close" onClick={showSetup} title="Close setting" />
        </div>
          <form className="form" key={isShow}>
            <div className="form__row">
              <div className="form__row--label">Question format</div>
              <div className="form__row--option">
                <RadioButton
                  setTemporaryFunction={setIsTemporaryCzech}
                  name="language" firstValue="CZECH" secondValue="ENGLISH"
                  checkedValue={isCzech}
                />
              </div>
            </div>
            <div className="form__row">
              <div className="form__row--label">Words from the category</div>
              <div className="form__row--option">
                <SelectList
                  setTemporaryFunction={setTemporaryCategory}
                  categoryValue={categoryValue}
                />
              </div>
            </div>
            <div className="form__row">
              <div className="form__row--label">Count of words</div>
              <div className="form__row--option">
                  <InputField
                    setTemporaryFunction={setTemporaryCount}
                    setupCountWord={temporaryCount}
                  />
              </div>
            </div>
            <div className="form__row">
              <div className="form__row--label">Favorite words only</div>
              <div className="form__row--option">
                <RadioButton
                  setTemporaryFunction={setIsTemporaryFavorite}
                  name="favorite" firstValue="YES" secondValue="NO"
                  checkedValue={isFavorite}
                />
              </div>
            </div>
            <div className="form__row">
              <div className="form__row--label">Audio</div>
              <div className="form__row--option">
                <RadioButton
                  setTemporaryFunction={setIsTemporaryAudio}
                  name="audio" firstValue="YES" secondValue="NO"
                  checkedValue={isAudio}
                />
              </div>
            </div>
            <div className="form__row form__row--button">
              <button className="form__button" onClick={handleSubmit} type="submit">SAVE</button>
            </div>
          </form>
      </div>
    </div>
  );
}