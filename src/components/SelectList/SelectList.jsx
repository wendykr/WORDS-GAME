import React from 'react';
import './SelectList.scss';
import { wordData } from '../../constants/words';

export const SelectList = ({ setCategoryValue }) => {

  const uniqueCategories = [...new Set(wordData.map(oneOption => oneOption.category))].sort();

  const selectValue = (event) => {
    const selectedCategory = event.target.value;
    // console.log('Selected Category: ' + selectedCategory);
    setCategoryValue(selectedCategory);
  };

  const options = uniqueCategories.map((category, index) => (
    <option key={index} value={category}>
      {category.charAt(0).toUpperCase() + category.slice(1)}
    </option>
  ));

  return (
    <select id="selectList" className="selectList" name="category" onChange={selectValue}>
      <option value="all">- All -</option>
      {options}
    </select>
  );
}