import React from 'react';
import './NavigationArrows.scss';

import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { BsFillArrowRightSquareFill } from "react-icons/bs";

export const NavigationArrows = ({ handleClickPrev, handleClickNext, length, setupCountWord }) => {

  return (
    <>
      <BsFillArrowLeftSquareFill className={`icon-prev ${(length === 0) ? 'disabled' : ''}`} title="Arrow prev icon" onClick={handleClickPrev} />
      <BsFillArrowRightSquareFill className={`icon-next ${(length === (setupCountWord--)) ? 'disabled' : ''}`} title="Arrow next icon" onClick={handleClickNext} />
    </>
  );
}