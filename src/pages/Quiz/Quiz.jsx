import React from 'react';
import { useState, useEffect } from 'react';
import './Quiz.scss';
import { wordData } from '../../constants/words';
import { Card } from '../../components/Card/Card';

export const Quiz = () => {

    const [allWords, setAllWords] = useState(wordData); // všechna slova

    const [randomWords, setRandomWords] = useState([]); // náhodná slova

    const [randomIndex, setRandomIndex] = useState(); // náhodný index

    // definuje se nová funkce pro vygenerování náhodného čísla
    const generateRandomNumber = () => {
        // generuje se náhodné číslo od 1 do 50
        const randomIndex = Math.floor(Math.random() * allWords.length) + 1;
        // vrací toto jedno náhodné číslo od 1 do 50
        return randomIndex;
    }

    useEffect(() => {

        //! 1. Napsat kód co ti vygeneruje náhodné číslo podle počtu čísel

        //! 2. Vygeneruj náhodné čísla do pole

        //! 3. 

        // 1. zavolá funkci, která vygeneruje jedno náhodné číslo od 1 do 50 podle počtu čísel
        setRandomIndex(generateRandomNumber());

        // inicializace prázdného pole
        let randomIndx = [];

        // dokud nebude délka pole větší jako číslo, bude stále loopovat
        while (randomIndx.length < 20) {
            // vygeneruje se náhodné číslo
            const currentRandomNumber = generateRandomNumber(allWords.length);

            // pokud nebude v poli náhodně vygenerované číslo, přidá se do pole
            if (!randomIndx.includes(allWords[currentRandomNumber])) {
                randomIndx.push(allWords[currentRandomNumber]);
            }
        }

        setRandomWords(randomIndx);

    }, []);

    console.log("randomWords", randomWords);

    // Zde kontrolujeme, zda je randomWord definováno
    const randomWord = randomWords.length > 0 ? randomWords[Math.floor(Math.random() * randomWords.length)] : null;
    console.log(randomWord);
    
    return (
        <main className="quiz">
            <div className="quiz__body">
                {randomWord && (
                    <Card className="card" czWord={randomWord.czWord} word={randomWord.word} key={randomWord.id} />
                )}
            </div>
        </main>
    );
}