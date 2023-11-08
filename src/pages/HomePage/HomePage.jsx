import React from 'react';
import './HomePage.scss';
import { Mode } from '../../components/Mode/Mode';
import images01 from '../../components/Mode/images/flashcards.svg';
import images02 from '../../components/Mode/images/quiz.svg';
import images03 from '../../components/Mode/images/pexeso.svg';

const modesData = [
  {
    id: 1,
    title: "Flashcards",
    description: "Check your answer on the other side of the card.",
    img: images01,
    url: "flashcards"
  },
  {
    id: 2,
    title: "Quiz",
    description: "Write the correct answer to the question.",
    img: images02,
    url: "quiz"
  },
  {
    id: 3,
    title: "Pexeso",
    description: "Find the pairs that belong together.",
    img: images03,
    url: "pexeso"
  }
];

export const HomePage = () => {
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