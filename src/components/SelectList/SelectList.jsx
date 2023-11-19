import React, { useState, useEffect } from 'react';
import './SelectList.scss';
// import { wordData } from '../../constants/words';
import { supabase } from '../../supabaseClient';

export const SelectList = ({
    setTemporaryFunction,
    categoryValue
  }) => {

  const [selectedCategory, setSelectedCategory] = useState(categoryValue);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    try {
      let { data: categoryData, error } = await supabase
        .from('terms')
        .select('category')
        .order('category');
  
      if (error) {
        console.error('Chyba při načítání dat:', error);
        return;
      }
  
      const uniqueCategories = [...new Set(categoryData.map(item => item.category))];
  
      // console.log("uniqueCategories", uniqueCategories);
  
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Neočekávaná chyba při načítání dat:', error);
    }
  }

  // const uniqueCategories = [...new Set(wordData.map(oneOption => oneOption.category))].sort();

  const selectValue = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
    setTemporaryFunction(selectedCategory);
  };

  const options = categories.map((category, index) => (
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