import React from 'react';
import './Home.scss';
import { Mode } from '../../components/Mode/Mode';
import images01 from '../../components/Mode/images/flashcards.svg';
import images02 from '../../components/Mode/images/quiz.svg';
import images03 from '../../components/Mode/images/match.svg';

const modesData = [
    {
        title: "Flashcards",
        description: "Check your answer on the other side of the card.",
        img: images01,
        url: "flashcards"
    },
    {
        title: "Quiz",
        description: "Write the correct answer to the question.",
        img: images02,
        url: "quiz"
    },
    {
        title: "Match",
        description: "Combine correct answer above the question.",
        img: images03,
        url: "match"
    }
];

export const Home = () => {
    return (
        <main className="home">
            <h1 className="home__head">Practice methods</h1>
            <div className="home__body">
            {
                modesData.map(({ id, title, description, img, url }) => (
                    <Mode title={title} description={description} img={img} url={url} key={id} />
                ))
            }
            </div>
        </main>
    );
}
