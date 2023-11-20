import React from 'react';
import './Answer.scss';

export const Answer = ({ czword, enword, isCzech, handleWord }) => {

  return (
    <div className="answers correct" onClick={() => handleWord(czword)}>
      <h3 className="answers__word">{isCzech ? enword : czword}</h3>
    </div>
  )
}
