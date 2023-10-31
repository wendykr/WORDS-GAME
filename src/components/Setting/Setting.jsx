import React from 'react';
import { useState } from 'react';
import './Setting.scss';
import { RadioButton } from '../RadioButton/RadioButton';
import { SelectList } from '../SelectList/SelectList';
import { InputField } from '../InputField/InputField';
import { useSettings } from '../../context/SettingsContext';
import { useWordsSetup } from '../../context/WordsSetupContext';
import { wordData } from "../../constants/words";

import { IoSettingsSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

export const Setting = () => {

  const {
    isShow, setIsShow,
    isCzech, setIsCzech,
    categoryValue, setCategoryValue,
    setupCountWord, setSetupCountWord,
    isFavorite, setIsFavorite,
    isAudio, setIsAudio
  } = useSettings();
  
  const [isTemporaryCzech, setIsTemporaryCzech] = useState(isCzech);
  const [isTemporaryCategory, setIsTemporaryCategory] = useState(categoryValue);
  const [isTemporaryCount, setIsTemporaryCount] = useState(setupCountWord);
  const [isTemporaryFavorite, setIsTemporaryFavorite] = useState(isFavorite);
  const [isTemporaryAudio, setIsTemporaryAudio] = useState(isAudio);

  const { setAllWords } = useWordsSetup();

  // const [formData, setFormData] = useState({
  //   question: true,
  //   totalWords: 0,
  //   category: "all",
  //   star: false,
  //   audio: true
  // });

  const showSetup = () => {
    setIsShow(prevState => !prevState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsShow(prevState => !prevState);
    // setCategoryValue(categoryValue);
    // setSetupCountWord(setupCountWord);
    // setIsCzech(isCzech);
    // setIsFavorite(isFavorite);
    // setIsAudio(isAudio);

    setCategoryValue(isTemporaryCategory);
    setSetupCountWord(isTemporaryCount);
    setIsCzech(isTemporaryCzech);
    setIsFavorite(isTemporaryFavorite);
    setIsAudio(isTemporaryAudio);

    let filterCategory = wordData.filter(word => word.category === isTemporaryCategory);
    console.log('%c filterCategory ', 'background: red; color: white;');
    console.log(...filterCategory);

    if (filterCategory.length > 0) {
      setAllWords(filterCategory);
    } else {
      setAllWords(wordData);
    }

    console.log('%c !!! SAVE !!! ', 'background: green; color: white;');

    console.log('Category: ' + isTemporaryCategory);
    console.log('Count: ' + isTemporaryCount);
    console.log('isCzech: ' + isTemporaryCzech);
    console.log('isFavorite: ' + isTemporaryFavorite);
    console.log('isAudio: ' + isTemporaryAudio);
  }

  return (
    <div className="setting">
      <div className="setting__head">
        <IoSettingsSharp className="icon-setting" onClick={showSetup} title="Setting icon" />
      </div>
      <div className={`setting__body ${isShow ? 'show' : ''}`}>
        <div className="setting__body--container">
            <h3 className="setting__body--title">Setting options</h3>
            <RxCross2 className="icon-close" onClick={showSetup} title="Close icon" />
        </div>
          <form className="form">
            <div className="form__row">
              <div className="form__row--label">Question format</div>
              <div className="form__row--option">
                <RadioButton
                  // setTemporaryFunction={setIsCzech}
                  setTemporaryFunction={setIsTemporaryCzech}
                  name="language" firstValue="CZECH" secondValue="ENGLISH"
                  checkedValue={isTemporaryCzech} />
              </div>
            </div>
            <div className="form__row">
              <div className="form__row--label">Words from the category</div>
              <div className="form__row--option">
                <SelectList
                  // setCategoryValue={setCategoryValue}
                  setTemporaryFunction={setIsTemporaryCategory}
                />
              </div>
            </div>
            <div className="form__row">
              <div className="form__row--label">Number of words</div>
              <div className="form__row--option">
                  <InputField
                    // setNumberValue={setSetupCountWord}
                    setTemporaryFunction={setIsTemporaryCount}
                    setupCountWord={setupCountWord}
                  />
              </div>
            </div>
            <div className="form__row">
              <div className="form__row--label">Favorite terms only</div>
              <div className="form__row--option">
                <RadioButton
                  // setTemporaryFunction={setIsFavorite}
                  setTemporaryFunction={setIsTemporaryFavorite}
                  name="favorite" firstValue="YES" secondValue="NO"
                  checkedValue={isFavorite} />
              </div>
            </div>
            <div className="form__row">
              <div className="form__row--label">Audio</div>
              <div className="form__row--option">
                <RadioButton
                  setTemporaryFunction={setIsTemporaryAudio}
                  // setTemporaryFunction={setIsAudio}
                  name="audio" firstValue="YES" secondValue="NO"
                  checkedValue={isAudio} />
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