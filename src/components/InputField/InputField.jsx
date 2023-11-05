import React, { useState } from 'react';
import './InputField.scss';

export const InputField = ({ setTemporaryFunction }) => {
  const [inputValue, setInputValue] = useState('');

  const entryInput = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    setTemporaryFunction(newValue);
  };

  return (
    <input type="number"id="number" className="input" onChange={entryInput}
      value={inputValue}
    />
  );
}