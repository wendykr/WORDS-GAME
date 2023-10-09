import React from "react";
import './ProgressBar.scss';

export const ProgressBar = () => {
    return (
      <div className="progress">
        <div className="progress__container">
          <div className="progress__line"></div>
        </div>
      </div>
    );
  };