import React, { useState } from 'react';
import './InputField.scss';

export const InputField = ({ setTemporaryFunction, setupCountWord }) => {
  const [inputValue, setInputValue] = useState(setupCountWord);

  const entryInput = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    setTemporaryFunction(newValue);
  };

  return (
    <input
      type="number"
      id="number"
      className="input"
      onChange={entryInput}
      value={inputValue}
    />
  );
};