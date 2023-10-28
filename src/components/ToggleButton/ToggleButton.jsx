import React, { useState } from 'react';
import './ToggleButton.scss';

export const ToggleButton = ({ id, firstValue, secondValue, onChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    const valueToSend = isChecked ? firstValue : secondValue;
    setIsChecked(prev => !prev);
    console.log(isChecked ? `${id}, ${firstValue}` : `${id}, ${secondValue}`);
    onChange(id, valueToSend);
  };

  return (
    <div className="toggle">
      <input
        type="checkbox"
        id={`"${id}"`}
        className="toggle__checkbox"
        checked={isChecked}
        onChange={handleToggle}
      />
      <label htmlFor={`"${id}"`} className="toggle__container">
        <div className={`toggle__label ${isChecked ? "active" : "inactive"}`}>{firstValue}</div>
        <div className={`toggle__label ${isChecked ? "inactive" : "active"}`}>{secondValue}</div>
      </label>
    </div>
  );
}