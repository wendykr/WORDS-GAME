import { useState, useEffect } from 'react';
import './App.scss';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
// import { Modes } from './components/Modes/Modes';
import { Card } from './components/Card/Card';
import { wordData } from './constants/words';

function App() {
  // const [randomWords, setRandomWords] = useState([]);
  const [randomIndex, setRandomIndex] = useState(1);

  useEffect(() => {

    const randomIndex = Math.floor(Math.random() * wordData.length) + 1;
    setRandomIndex(randomIndex);
    console.log(randomIndex);

  }, []);

  return (
    <div className="container">
      <div className="container__head">
        <Header />
      </div>

      <div className="container__body">
        {
          wordData.map(({ id, czWord, word }, index ) => (
            (index === randomIndex) && <Card czWord={czWord} word={word} key={id} />
            )
          )
        }
        {/* <Modes /> */}
      </div>

      <div className="container__foot">
        <Footer />
      </div>
    </div>
  );
}

export default App;