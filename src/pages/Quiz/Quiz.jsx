import React from 'react';
import { useState, useEffect } from 'react';
import './Quiz.scss';
import { wordData } from '../../constants/words';
import { Card } from '../../components/Card/Card';

export const Quiz = () => {

    const [allWords, setAllWords] = useState(wordData)

    const [randomWords, setRandomWords] = useState([]);

    const [randomIndex, setRandomIndex] = useState();


    const generateRandomNumber = () => {
        const randomIndex = Math.floor(Math.random() * allWords.length) + 1;

        return randomIndex;
    }

    useEffect(() => {


        //! 1. Napsat kod co ti vygeneruje náhodné číslo podle počtu čísel

        //! 2. Vygerenuj náhodné čísla do pole

        //! 3. 

        setRandomIndex(generateRandomNumber())



        

        
        

        let randomIndx = []

        for (let index = 0; index < 20; index++) {
            
            //setRandomWords(generateRandomNumber(allWords.length))

            randomIndx.push(allWords[generateRandomNumber()])

            //let currentRandomNumber = generateRandomNumber(allWords.length);

            
            //if(randomWords.includes(currentRandomNumber)) {
            //    currentRandomNumber = generateRandomNumber(allWords.length);
            //}
            
            
            console.log(randomWords)
        }
        
        setRandomWords(randomIndx)


        console.log("randomWords", randomWords)

    }, []);


    return (
        <main className="quiz">
            <div className="quiz__body">
            {
                allWords.map(({ id, czWord, word }, index ) => (
                    (index === randomIndex) && <Card className="card" czWord={czWord} word={word} key={id} />
                ))
            }
            </div>
        </main>
    );
}
