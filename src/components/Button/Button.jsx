import React from 'react';
import './Button.scss';

export const Button = ({ text, length, inputValue, onClick, isMarkedWord }) => {

  return (
    <button className={`button ${((length === 0 || inputValue === '') && !isMarkedWord) ? 'disabled' : ''}`}
            onClick={onClick}
            disabled={((length === 0 || inputValue === '') && !isMarkedWord) ? true : false}
    > {text} </button>
  );
}