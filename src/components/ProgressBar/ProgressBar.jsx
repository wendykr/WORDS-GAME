import React from 'react';
import './ProgressBar.scss';

export const ProgressBar = ({ line }) => {
<<<<<<< HEAD
    return (
      <div className="progress">
        <div className="progress__container">
          <div className="progress__line" style={{ width: `${line}%` }}></div>
        </div>
=======

  return (
    <div className="progress">
      <div className="progress__container">
        <div className="progress__line" style={{ width: `${line}%` }}></div>
        {/*line*/}
>>>>>>> 1533464b5c6354ffcb035d348d7b3c666b12f599
      </div>
    </div>
  );
}