import React from 'react';
import './NavigationArrows.scss';

import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { BsFillArrowRightSquareFill } from "react-icons/bs";

export const NavigationArrows = () => {
  return (
    <>
        <BsFillArrowLeftSquareFill className="icon-left" title="Arrow prev icon" />
        <BsFillArrowRightSquareFill className="icon-right" title="Arrow next icon" />
    </>
  );
};