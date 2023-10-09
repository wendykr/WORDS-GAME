import React from "react";
import './Button.scss';

export const Button = ({ text, length, inputValue, word }) => {

  const handleClick = () => {
    console.log('click');
    console.log(inputValue);
    console.log(word);
    if (inputValue.toLowerCase() === word.toLowerCase()) {
      alert('TRUE');
    } else {
      alert('FALSE');
    }
  }

  return (
    <button className={`button ${(length === 0 || inputValue === '') ? 'disabled' : ''}`}
            onClick={handleClick}
            disabled={(length === 0 || inputValue === '') ? true : false}
    > {text} </button>
  );
};