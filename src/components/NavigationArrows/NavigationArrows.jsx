import React from 'react';
import './NavigationArrows.scss';

import { BsFillArrowLeftSquareFill } from 'react-icons/bs';
import { BsFillArrowRightSquareFill } from 'react-icons/bs';

export const NavigationArrows = ({ handleClickPrev, handleClickNext, currentWordIndex, setupCountWord }) => {

  return (
    <>
      <BsFillArrowLeftSquareFill className={`icon-prev ${(currentWordIndex === 0) ? 'disabled' : ''}`} title="Prev word" onClick={handleClickPrev} />
      <BsFillArrowRightSquareFill className={`icon-next ${(currentWordIndex === (setupCountWord - 1)) ? 'disabled' : ''}`} title="Next word" onClick={handleClickNext} />
    </>
  );
}