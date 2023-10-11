import React from 'react';
import './ProgressBar.scss';

export const ProgressBar = ({ line }) => {
  return (
    <div className="progress">
      <div className="progress__container">
        <div className="progress__line" style={{ width: `${line}%` }}></div>
      </div>
    </div>
  );
};