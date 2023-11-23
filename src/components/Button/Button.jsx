import React from 'react';
import './Button.scss';

export const Button = ({ text, length, inputValue, onClick, isMarked }) => {

  return (
    <button className={`button ${((length === 0 || inputValue === '') && !isMarked) ? 'disabled' : ''}`}
            onClick={onClick}
            disabled={((length === 0 || inputValue === '') && !isMarked) ? true : false}
    > {text} </button>
  );
}