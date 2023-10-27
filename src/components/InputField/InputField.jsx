import React from 'react';
import './InputField.scss';

export const InputField = () => {

    const entryInput = (event) => {
        const inputValue = event.target.value;
        console.log(inputValue);
    };

    return (
        <input type="number" id="number" className="input" onChange={entryInput} />
    );
}