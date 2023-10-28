import React, { useState } from 'react';
import './Setting.scss';
import { ToggleButton } from '../ToggleButton/ToggleButton';
import { SelectList } from '../SelectList/SelectList';
import { InputField } from '../InputField/InputField';

import { IoSettingsSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

export const Setting = () => {
  const [isShow, setIsShow] = useState(false);
  const [numberValue, setNumberValue] = useState('');
  const [selectListValue, setSelectListValue] = useState('');

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

  const handleChange = (numberValue) => {
    setNumberValue(numberValue);
  }

  const selectList = (selectListValue) => {
    setSelectListValue(selectListValue);
  }

  const toggle = () => {
    console.log('toggle');
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("category: ", selectListValue);
    console.log("number: ", numberValue);
    console.log('click submit');
    setIsShow(prevState => !prevState);
    console.log('SAVE');
  }

  return (
    <div className="setting" onSubmit={handleSubmit}>
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
                <ToggleButton id="toggleQuestion" firstValue="CZECH" secondValue="ENGLISH" onChange={toggle}/>
              </div>
            </div>
            <div className="form__row">
              <div className="form__row--label">Study words from the category</div>
              <div className="form__row--option">
                <SelectList onChange={selectList}/>
              </div>
            </div>
            <div className="form__row">
              <div className="form__row--label">Number of questions</div>
              <div className="form__row--option">
                  <InputField onChange={handleChange}/>
              </div>
            </div>
            <div className="form__row">
              <div className="form__row--label">Study starred terms only</div>
              <div className="form__row--option">
                <ToggleButton id="toggleStarred" firstValue="YES" secondValue="NO" onChange={toggle}/>
              </div>
            </div>
            <div className="form__row">
              <div className="form__row--label">Audio</div>
              <div className="form__row--option">
                <ToggleButton id="toggleAudio" firstValue="YES" secondValue="NO" onChange={toggle}/>
              </div>
            </div>
            <div className="form__row form__row--button">
              <button className="form__button" type="submit">SAVE</button>
            </div>
          </form>
      </div>
    </div>
  );
}