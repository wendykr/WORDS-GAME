import React from 'react';
import './Response.scss';

export const Response = ({
    id, czword, enword,
    handleCheckWord, isCzech,
    isMarkedWord, isCorrectWord, isIncorrectWord,
    isDisabled
  }) => {

  const handleClick = () => {
    handleCheckWord(id, isCzech ? enword : czword);
  }

  return (
    <div className={`response
        ${isMarkedWord && 'marked'}
        ${isCorrectWord && 'correct'}
        ${isIncorrectWord && 'incorrect'}
        ${isDisabled && 'disabled'}
      `}
      onClick={(handleClick)}
    >
      <h3 className="response__word">{isCzech ? (enword && enword.toLowerCase()) : (czword && czword.toLowerCase())}</h3>
    </div>
  );
}