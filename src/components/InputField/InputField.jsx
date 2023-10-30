import React from 'react';
import './InputField.scss';

export const InputField = ({ setNumberValue, setupCountWord }) => {

  //const {setSetupCountWord} = useSettingContext()

  const entryInput = (event) => {
    const inputValue = event.target.value;

    if (inputValue < 1) {
      alert('Number of words must be greater than 1');
    } else {
      setNumberValue(inputValue);
    }
    //setSetupCountWord(inputValue)
    // console.log(inputValue);
    
  };

  return (
    <input type="number" id="number" className="input" onChange={entryInput} value={setupCountWord} />
  );
}