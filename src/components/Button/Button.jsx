// import React, { useState } from "react";
import './Button.scss';

export const Button = ({ text, string, length, myWord, word }) => {

  const handleClick = () => {
    if (myWord.toLowerCase() === word.toLowerCase()) {
      alert('TRUE');
    } else {
      alert('FALSE');
    }
  }

  return (
    <button className={`custom-button ${(length === 0 || string === '') ? 'disabled' : ''}`}
            onClick={handleClick}
            disabled={(length === 0 || string === '') ? true : false}
    > {text} </button>
  );
};