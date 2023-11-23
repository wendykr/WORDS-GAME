import React from 'react';
import './Response.scss';

export const Response = ({ id, czword, enword, isCzech, handleCheckWord, resultState, isMarked }) => {

  return (
    <div className={`response
      ${(resultState === "dont-know" || resultState === "correct") && 'correct'}
      ${(resultState === "incorrect") && 'incorrect'}
      ${isMarked ? 'marked' : ''}`}
      onClick={() => handleCheckWord(id, isCzech ? enword : czword)}>
      <h3 className="response__word">{isCzech ? enword : czword}</h3>
    </div>
  )
}