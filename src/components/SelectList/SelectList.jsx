import React, { useState } from 'react';
import './SelectList.scss';
import { wordData } from '../../constants/words';

export const SelectList = ({
    setTemporaryFunction,
    categoryValue
  }) => {

  const [selectedCategory, setSelectedCategory] = useState(categoryValue);

  const uniqueCategories = [...new Set(wordData.map(oneOption => oneOption.category))].sort();

  const selectValue = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
    setTemporaryFunction(selectedCategory);
  };

  const options = uniqueCategories.map((category, index) => (
    <option key={index} value={category}>
      {category[0].toUpperCase() + category.slice(1)}
    </option>
  ));

  return (
    <select id="selectList" className="selectList" name="category" onChange={selectValue} value={selectedCategory} >
      <option value="">- All -</option>
      {options}
    </select>
  );
}