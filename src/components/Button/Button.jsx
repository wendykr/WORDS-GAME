import React from 'react';
import './Button.scss';

export const Button = ({ text, length, inputValue, onClick }) => {

  return (
    <button className={`button ${(length === 0 || inputValue === '') ? 'disabled' : ''}`}
            onClick={onClick}
            disabled={(length === 0 || inputValue === '') ? true : false}
    > {text} </button>
  );
};