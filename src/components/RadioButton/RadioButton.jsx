import React, { useState } from 'react';
import './RadioButton.scss';

export const RadioButton = ({
    name,
    firstValue,
    secondValue,
    checkedValue,
    setTemporaryFunction
  }) => {

  const [checkValue, setCheckValue] = useState(checkedValue);
  // console.log('checkValue', typeof checkValue);

  const handleToggle = (event) => {
    const newValue = event.target.value;
    // console.log('newValue', typeof newValue);
    setCheckValue(newValue);
    setTemporaryFunction(newValue);
  };

  return (
      <div className="radioButton">
        <input
          type="radio" id={`${name}-radio-one`} className="radioButton__input" name={`${name}`} value="true"
          checked={checkValue === 'true' || checkValue === true}
          onChange={handleToggle}
        />
        <label className="radioButton__label" htmlFor={`${name}-radio-one`}>{firstValue}</label>
        <input type="radio" id={`${name}-radio-two`} className="radioButton__input" name={`${name}`} value="false"
          checked={checkValue === 'false' || checkValue === false}
          onChange={handleToggle}
        />
        <label className="radioButton__label" htmlFor={`${name}-radio-two`}>{secondValue}</label>
      </div>
  );
}