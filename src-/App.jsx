import "./App.scss";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { ProgressBar } from "./components/ProgressBar/ProgressBar";
import { Card } from "./components/Card/Card";
import { wordData } from "./constants/words";

function App() {

  const randomIndex = Math.floor(Math.random() * wordData.length) + 1;
  console.log(randomIndex);

  return (
    <div className="container">
      <div className="container__head">
        <Header />
      </div>

      <div className="constainer__body">
        <div className="container__body--bar">
          <ProgressBar />
        </div>

        {
          wordData.map(({ id, czWord, word }, index ) => (
            (index === randomIndex) && <Card czWord={czWord} word={word} key={id} />
            )
          )
        }
      </div>

      <div className="container__foot">
        <Footer />
      </div>
    </div>
  );
}

export default App;