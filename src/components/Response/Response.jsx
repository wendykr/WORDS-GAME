import React from 'react';
import './Response.scss';

export const Response = ({
    id, czword, enword,
    handleCheckWord, isCzech,
    isMarkedWord, isCorrectWord, isIncorrectWord
  }) => {

  const handleClick = () => {
    handleCheckWord(id, isCzech ? enword : czword);
  }

  return (
    <div className={`response
        ${isMarkedWord && 'marked'}
        ${isCorrectWord && 'correct'}
        ${isIncorrectWord && 'incorrect'}
      `}
      onClick={(handleClick)}
    >
      <h3 className="response__word">{isCzech ? enword : czword}</h3>
    </div>
  )
}