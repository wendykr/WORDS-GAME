import React from 'react';
import './RadioButton.scss';

export const RadioButton = ({
    name,
    firstValue,
    secondValue,
    //onChange,
    checkedValue,
    setTemporaryFunction
  }) => {

  const handleToggle = (event) => {
    // console.log(name, event.target.value);
    setTemporaryFunction(event.target.value);
  };

  return (
      <div className="radioButton" onChange={handleToggle}>
        <input type="radio" id={`${name}-radio-one`} className="radioButton__input" name={`${name}`} value={true} defaultChecked={checkedValue === true} />
        <label className="radioButton__label" htmlFor={`${name}-radio-one`}>{firstValue}</label>
        <input type="radio" id={`${name}-radio-two`} className="radioButton__input" name={`${name}`} value={false} defaultChecked={checkedValue === false} />
        <label className="radioButton__label" htmlFor={`${name}-radio-two`}>{secondValue}</label>
      </div>
  );
}