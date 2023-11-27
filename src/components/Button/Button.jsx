import React from 'react';
import './Button.scss';

export const Button = ({ text, length, inputValue, onClick, isMarkedWord, isCorrectWord, isIncorrectWord }) => {

  return (
    <button className={`button ${((length === 0 || inputValue === '') && (!isMarkedWord && !isCorrectWord && !isIncorrectWord)) ? 'disabled' : ''}`}
            onClick={onClick}
            disabled={((length === 0 || inputValue === '') && (!isMarkedWord && !isCorrectWord && !isIncorrectWord)) ? true : false}
    > {text} </button>
  );
}