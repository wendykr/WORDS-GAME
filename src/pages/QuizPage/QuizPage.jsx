import React from 'react';
import { useState, useEffect } from 'react';
import './QuizPage.scss';
import { wordData } from '../../constants/words';
import { Question } from '../../components/Question/Question';

export const QuizPage = () => {
//    const [randomWord, setRandomWord] = useState({});

    const setupCountWord = 3;

    const [allWords, setAllWords] = useState(wordData); // všechna slova
    const [randomWords, setRandomWords] = useState([]); // náhodná slova
    const [line, setLine] = useState(0); // progressBar line

    // definuje se nová funkce pro vygenerování náhodného čísla
    const generateRandomNumber = () => {
        // generuje se náhodné číslo od 1 do 50
        const randomIndex = Math.floor(Math.random() * allWords.length);
        // vrací toto jedno náhodné číslo od 1 do 50
        return randomIndex;
    }

    useEffect(() => {

        // inicializace prázdného pole
        let randomIndx = [];

        // dokud nebude délka pole větší jako číslo, bude stále loopovat
        while (randomIndx.length < setupCountWord) {
            // vygeneruje se náhodné číslo
            const currentRandomNumber = generateRandomNumber(allWords.length);

            // pokud nebude v poli náhodně vygenerované číslo, přidá se do pole
            if (!randomIndx.includes(allWords[currentRandomNumber])) {
                randomIndx.push(allWords[currentRandomNumber]);
            }
        }

        setRandomWords(randomIndx);

    }, []);

    // const updateLine = () => {
    //     setLine(prevValue => {
    //         // const totalPercentage =
        
    //         console.log("délka randomWords", (3 / randomWords.length) * 100);
    //         return (( 1 / 3 ) * 100);
    //     })
    // }

    const updateLine = () => {
        setLine(prevValue => {
            console.log('prevValue ' + prevValue);
            const increment = 100 / setupCountWord;
            console.log('increment ' + increment);
            const newValue = prevValue + increment;
            console.log('newValue ' + newValue);
            return newValue;
            // setLine(prevValue => prevValue + (100 / (randomWords.length)));
        });
    }

    console.log("randomWords", randomWords);

    // zde kontrolujeme, zda je randomWord definováno
    const randomWord = randomWords.length > 0 ? randomWords[Math.floor(Math.random() * randomWords.length)] : null;
    console.log(randomWord);

    const removeRandomWord = () => {
        setRandomWords(prevRandomWords => {
            //const filteredWords = prevRandomWords.filter(word =>  word !== randomWord);
            const filteredWords = prevRandomWords.filter(word => {
                return word !== randomWord;
            });
            // setLine(prevValue => prevValue + (100 / (randomWords.length + 1)));
            console.log('randomWords.length ' + randomWords.length);
            return filteredWords;
        });
    }

    // useEffect(() => {
    //     console.log('Line ', line);
    //     randomWords.length > 0 && updateLine();

    // }, [randomWords]);


    const generateNewRandomWord = () => {
        const updatedRandomWords = (prevRandomWords) => {
            // vrácení nového pole, které je kopií `prevRandomWords`
            return [...prevRandomWords];
        }
        // aktualizace stavu `randomWords` pomocí funkce `setRandomWords`
        setRandomWords(updatedRandomWords);
    }

    return (
        <main className="quiz">
            <div className="quiz__body">
                {randomWord && (
                    <Question czWord={randomWord.czWord} word={randomWord.word} key={randomWord.id} removeRandomWord={removeRandomWord} generateNewRandomWord={generateNewRandomWord} updateLine={updateLine} line={line} />
                )}
            </div>
        </main>
    );
}