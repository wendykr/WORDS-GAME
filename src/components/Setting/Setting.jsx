import React, { useState, useEffect } from 'react';
import './Setting.scss';
import { RadioButton } from '../RadioButton/RadioButton';
import { SelectList } from '../SelectList/SelectList';
import { InputField } from '../InputField/InputField';
import { useSettings } from '../../context/SettingsContext';
import { useWordsSetup } from '../../context/WordsSetupContext';
import { supabase } from '../../supabaseClient';

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
    getTerms();
  }, [temporaryCategory]);

  const getTerms = async () => {
    try {

      let { data: terms, error } = await supabase
        .from('terms')
        .select('*')
        .order('id');

      if (error) {
        console.error('Chyba při načítání dat:', error);
        return;
      }

      setTemporaryAllWords(terms);
    } catch (error) {
      console.error('Neočekávaná chyba při načítání dat:', error);
    }
  }

  const showSetup = () => {
    setIsShow(prevState => !prevState);
  };

  const handleSubmit = (event) => {
    // console.log("submit");

    event.preventDefault();
    setIsShow(prevState => !prevState);

    if (typeof temporaryCount === 'undefined' || temporaryCount <= 2) {
      alert('Count of words must be greater than 3.');
      setIsShow(true);
      return;
    } else {
      let filterCategory;

      if (temporaryCategory) {
        console.log('isTemporaryCategory', temporaryCategory);

        if (isTemporaryFavorite) {
          filterCategory = temporaryAllWords.filter(word => word.category === temporaryCategory && word.favorite === isTemporaryFavorite);
        } else {
          filterCategory = temporaryAllWords.filter(word => word.category === temporaryCategory);
        }

        // console.log('%c filterCategory ', 'background: red; color: white;');
        // console.log(...filterCategory);

        if (filterCategory.length > 0 && filterCategory.length < temporaryCount) {
          alert(`The maximum count of words is ${filterCategory.length}.`);
          setIsShow(true);
          return;
        } else {
          setAllWords(filterCategory);
        }
      } else {
        setAllWords(temporaryAllWords);
      }

      setCategoryValue(temporaryCategory);
      console.log('categoryValue', categoryValue);
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

    setTemporaryCategory(temporaryCategory);
    setTemporaryCount("");
    setTemporaryAllWords([]);
    setIsTemporaryCzech(isTemporaryCzech);
    setIsTemporaryFavorite(isTemporaryFavorite);
    setIsTemporaryAudio(isTemporaryAudio);

    setIsTurned(false);
    setIsDisabled(false);

    // console.log('%c !!! SAVE !!! ', 'background: green; color: white;');

    // console.log('Category: ' + temporaryCategory);
    // console.log('Count: ' + isTemporaryCount);
    // console.log('isCzech: ' + isTemporaryCzech);
    // console.log('isFavorite: ' + isTemporaryFavorite);
    // console.log('isAudio: ' + isTemporaryAudio);
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