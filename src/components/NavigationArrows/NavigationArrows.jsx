import React from 'react';
import './NavigationArrows.scss';

import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { BsFillArrowRightSquareFill } from "react-icons/bs";

export const NavigationArrows = ({ handleClickPrev, handleClickNext, length }) => {

  return (
    <>
      <BsFillArrowLeftSquareFill className={`icon-prev ${(length === 0) ? 'disabled' : ''}`} title="Arrow prev icon" onClick={handleClickPrev} />
      <BsFillArrowRightSquareFill className={`icon-next ${(length === 9) ? 'disabled' : ''}`} title="Arrow next icon" onClick={handleClickNext} />
    </>
  );
}