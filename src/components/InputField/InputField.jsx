import React from 'react';
import './InputField.scss';

export const InputField = ({
    setTemporaryFunction,
    setupCountWord
  }) => {

  const entryInput = (event) => {
    const inputValue = event.target.value;

    if (inputValue <= 0) {
      alert('Number of words must be greater than 0');
      event.target.value = "";
    } else {
      setTemporaryFunction(inputValue);
    }
  };

  return (
    <input type="number" id="number" className="input" onChange={entryInput} placeholder={`${setupCountWord}`} />
  );
}