import React from 'react';
import './InputField.scss';

export const InputField = ({ setNumberValue, setupCountWord }) => {

  //const {setSetupCountWord} = useSettingContext()

  const entryInput = (event) => {
    const inputValue = event.target.value;
    //setSetupCountWord(inputValue)
    // console.log(inputValue);
    setNumberValue(inputValue);
  };

  return (
    <input type="number" id="number" className="input" min="1" onChange={entryInput} value={setupCountWord} />
  );
}