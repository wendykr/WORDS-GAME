import React, { useState, useEffect } from 'react';
import './Setting.scss';
import { RadioButton } from '../RadioButton/RadioButton';
import { SelectList } from '../SelectList/SelectList';
import { InputField } from '../InputField/InputField';
import { useSettings } from '../../context/SettingsContext';
import { useWordsSetup } from '../../context/WordsSetupContext';
// import { wordData } from '../../constants/words';
import { supabase } from '../../supabaseClient';

import { IoSettingsSharp } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';

export const Setting = () => {

  const {
    isShow, setIsShow,
    isCzech, setIsCzech,
    categoryValue, setCategoryValue,
    setSetupCountWord,
    isFavorite, setIsFavorite,
    isAudio, setIsAudio
  } = useSettings();

  const {
    setAllWords, allWords, 
    setProgressbar,
    setInputValue,
    setResultState,
    setCurrentWordIndex,
    setIsTurned,
    setRandomWords,
    setCurrentWord
  } = useWordsSetup();
  
  const [isTemporaryCzech, setIsTemporaryCzech] = useState(isCzech);
  const [isTemporaryCategory, setIsTemporaryCategory] = useState();
  const [isTemporaryCount, setIsTemporaryCount] = useState();
  const [isTemporaryFavorite, setIsTemporaryFavorite] = useState(isFavorite);
  const [isTemporaryAudio, setIsTemporaryAudio] = useState(isAudio);

  useEffect(() => {
    getTerms();
  }, []);

  async function getTerms() {
    try {

      let { data: terms, error } = await supabase
        .from('terms')
        // vypsat všechny
        .select('*')
        .order('id');
        // vypsat z kategorie Animal
        // .eq('category', 'Animals');
        // vypsat všechny FALSE
        // .eq('favorite', false);
        // vypsat z kategorie Animal a TRUE
        // .eq('category', 'Animals')
        // .eq('favorite', true);
  
      if (error) {
        console.error('Chyba při načítání dat:', error);
        return;
      }
  
      setAllWords(terms);
      console.log("terms", terms);
    } catch (error) {
      console.error('Neočekávaná chyba při načítání dat:', error);
    }
  }

  // const [formData, setFormData] = useState({
  //   question: true,
  //   totalWords: 0,
  //   category: "all",
  //   star: false,
  //   audio: true
  // });

  const showSetup = () => {
    setIsShow(prevState => !prevState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsShow(prevState => !prevState);

    console.log('isTemporaryCount', isTemporaryCount);

    if (isTemporaryCount <= 0 || typeof isTemporaryCount === 'undefined') {
      alert('Number of words must be greater than 0.');
      setIsShow(true);
      return;
    } else {

      if (isTemporaryCategory) {
        setCategoryValue(isTemporaryCategory);

        let filterCategory = allWords.filter(word => word.category === isTemporaryCategory);
        console.log('%c filterCategory ', 'background: red; color: white;');
        console.log(...filterCategory);

        console.log('isTemporaryCount', isTemporaryCount);

        if (filterCategory.length > 0 && filterCategory.length < isTemporaryCount) {
          alert(`The maximum number of words from the selected category ${isTemporaryCategory} is ${filterCategory.length}.`);
          setIsShow(true);
          console.log('alert');
          return;
        } else {
          console.log('filter');
          setSetupCountWord(Number(isTemporaryCount));
          setAllWords(filterCategory);
        }
      } else {
        console.log('all');
        setSetupCountWord(Number(isTemporaryCount));
        setAllWords(allWords);
      }
    }

    setIsCzech(isTemporaryCzech);
    setIsFavorite(isTemporaryFavorite);
    setIsAudio(isTemporaryAudio);
    setProgressbar(0);

    setInputValue("");
    setResultState("");
    setCurrentWordIndex(0);
    setRandomWords([]);
    setCurrentWord();

    setIsTemporaryCategory(isTemporaryCategory);
    setIsTemporaryCount("");
    setIsTemporaryCzech(isTemporaryCzech);
    setIsTemporaryFavorite(isTemporaryFavorite);
    setIsTemporaryAudio(isTemporaryAudio);

    setIsTurned(false);

    console.log('%c !!! SAVE !!! ', 'background: green; color: white;');

    // console.log('Category: ' + isTemporaryCategory);
    // console.log('Count: ' + isTemporaryCount);
    // console.log('isCzech: ' + isTemporaryCzech);
    // console.log('isFavorite: ' + isTemporaryFavorite);
    // console.log('isAudio: ' + isTemporaryAudio);
  }

  return (
    <div className="setting">
      <div className="setting__head">
        <IoSettingsSharp className="icon-setting" onClick={showSetup} title="Setting icon" />
      </div>
      <div className={`setting__body ${isShow ? 'show' : ''}`}>
        <div className="setting__body--container">
            <h3 className="setting__body--title">Setting options</h3>
            <RxCross2 className="icon-close" onClick={showSetup} title="Close icon" />
        </div>
          <form className="form" key={isShow}>
            <div className="form__row">
              <div className="form__row--label">Question format</div>
              <div className="form__row--option">
                <RadioButton
                  setTemporaryFunction={setIsTemporaryCzech}
                  name="language" firstValue="CZECH" secondValue="ENGLISH"
                  checkedValue={isCzech}
                />
              </div>
            </div>
            <div className="form__row">
              <div className="form__row--label">Words from the category</div>
              <div className="form__row--option">
                <SelectList
                  setTemporaryFunction={setIsTemporaryCategory}
                  categoryValue={categoryValue}
                />
              </div>
            </div>
            <div className="form__row">
              <div className="form__row--label">Number of words</div>
              <div className="form__row--option">
                  <InputField
                    setTemporaryFunction={setIsTemporaryCount}
                    setupCountWord={isTemporaryCount}
                  />
              </div>
            </div>
            <div className="form__row">
              <div className="form__row--label">Favorite words only</div>
              <div className="form__row--option">
                <RadioButton
                  setTemporaryFunction={setIsTemporaryFavorite}
                  name="favorite" firstValue="YES" secondValue="NO"
                  checkedValue={isFavorite}
                />
              </div>
            </div>
            <div className="form__row">
              <div className="form__row--label">Audio</div>
              <div className="form__row--option">
                <RadioButton
                  setTemporaryFunction={setIsTemporaryAudio}
                  name="audio" firstValue="YES" secondValue="NO"
                  checkedValue={isAudio}
                />
              </div>
            </div>
            <div className="form__row form__row--button">
              <button className="form__button" onClick={handleSubmit} type="submit">SAVE</button>
            </div>
          </form>
      </div>
    </div>
  );
}