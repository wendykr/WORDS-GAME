import React from 'react';
import { Link } from 'react-router-dom';
import './Mode.scss';

export const Mode = ({ title, description, img, url }) => {
  return (
    <div className="mode">
      <Link to={`/${url}`} className="mode__item">
        <img className="mode__image" src={img} alt="image" />
          <h2 className="mode__title">{title}</h2>
          <p className="mode__description">{description}</p>
      </Link>
    </div>
  );
}