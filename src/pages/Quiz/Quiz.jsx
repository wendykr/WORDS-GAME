import React from 'react';
import { useState, useEffect } from 'react';
import './Quiz.scss';
import { wordData } from '../../constants/words';
import { Card } from '../../components/Card/Card';

export const Quiz = () => {

    // const [randomWords, setRandomWords] = useState([]);
    const [randomIndex, setRandomIndex] = useState(1);

    useEffect(() => {

        const randomIndex = Math.floor(Math.random() * wordData.length) + 1;
        setRandomIndex(randomIndex);
        console.log(randomIndex);

    }, []);

    return (
        <main className="quiz">
            <div className="quiz__body">
            {
                wordData.map(({ id, czWord, word }, index ) => (
                    (index === randomIndex) && <Card czWord={czWord} word={word} key={id} />
                ))
            }
            </div>
        </main>
    );
}
