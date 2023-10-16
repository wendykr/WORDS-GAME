import React from 'react';
import './Flashcards.scss';
import { wordData } from '../../constants/words';
import { Card } from '../../components/Card/Card';

export const Flashcards = () => {
    return (
        <main className="flashcards">
            <div className="flashcards__body">
                <Card className="card" czWord={wordData.czWord} word={wordData.word} key={wordData.id} />
            </div>
        </main>
    );
}