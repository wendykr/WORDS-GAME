import React from 'react';
import './Modes.scss';

const modesData = [
    {
        title: "Flashcards",
        description: "Just click and the correct answer is on the other side of the card."
    },
    {
        title: "Quiz",
        description: "Write the correct answer to the question."
    },
    {
        title: "Match",
        description: "Drag and drop correct answer above the question."
    }
];

export const Modes = () => {
    return (
        <div className="modes">
            <h1 className="modes__head">Practice methods</h1>
            <div className="modes__body">
            {
                modesData.map((oneMode) => (
                    <div className="modes__item" key={oneMode.id}>
                        <h2 className="modes__title">{oneMode.title}</h2>
                        <img className="modes__image" src="https://static.vecteezy.com/system/resources/previews/000/357/052/original/vector-notes-icon.jpg" alt="image" />
                        <p className="modes__description">{oneMode.description}</p>
                    </div>
                ))
            }
            </div>
        </div>
    );
};