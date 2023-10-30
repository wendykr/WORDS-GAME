import React from 'react';
import './Setting.scss';
import { RadioButton } from '../RadioButton/RadioButton';
import { SelectList } from '../SelectList/SelectList';
import { InputField } from '../InputField/InputField';
import { useSettings } from '../../context/SettingsContext';
import { useWordsSetup } from '../../context/WordsSetupContext';

import { IoSettingsSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

export const Setting = () => {
  const {
    isShow, setIsShow,
    isCzech, setIsCzech,
    isFavorite, setIsFavorite,
    isAudio, setIsAudio,
    categoryValue, setCategoryValue
  } = useSettings();

  const { setupCountWord, setSetupCountWord } = useWordsSetup();

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

  // const handleChange = (setupCountWord) => {
  //   setSetupCountWord(setupCountWord);
  // }

  // const selectList = (categoryValue) => {
  //   setCategoryValue(categoryValue);
  // }

  // const handleToggle = (
  //   isCzech,
  //   isFavorite,
  //   isAudio
  //   ) => {
    
  //   setIsCzech(isCzech);
  //   setIsFavorite(isFavorite);
  //   setIsAudio(isAudio);
  // }

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsShow(prevState => !prevState);
    setCategoryValue(categoryValue);
    setSetupCountWord(setupCountWord);
    setIsCzech(isCzech);
    setIsFavorite(isFavorite);
    setIsAudio(isAudio);

    console.log('Category: ' + categoryValue);
    console.log('Count: ' + setupCountWord);
    console.log('isCzech: ' + isCzech);
    console.log('isFavorite: ' + isFavorite);
    console.log('isAudio: ' + isAudio);
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
                  setTemporaryFunction={setIsCzech}
                  name="language" firstValue="CZECH" secondValue="ENGLISH"
                  //onChange={handleToggle}
                  checkedValue={isCzech} />
              </div>
            </div>
            <div className="form__row">
              <div className="form__row--label">Words from the category</div>
              <div className="form__row--option">
                <SelectList setCategoryValue={setCategoryValue}
                //onChange={selectList}
                />
              </div>
            </div>
            <div className="form__row">
              <div className="form__row--label">Number of words</div>
              <div className="form__row--option">
                  <InputField setNumberValue={setSetupCountWord}
                  //onChange={handleChange}
                  setupCountWord={setupCountWord} />
              </div>
            </div>
            <div className="form__row">
              <div className="form__row--label">Favorite terms only</div>
              <div className="form__row--option">
                <RadioButton
                  setTemporaryFunction={setIsFavorite}
                  name="favorite" firstValue="YES" secondValue="NO"
                  //onChange={handleToggle}
                  checkedValue={isFavorite} />
              </div>
            </div>
            <div className="form__row">
              <div className="form__row--label">Audio</div>
              <div className="form__row--option">
                <RadioButton
                  setTemporaryFunction={setIsAudio}
                  name="audio" firstValue="YES" secondValue="NO"
                  //onChange={handleToggle}
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