import "./App.scss";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Card } from "./components/Card/Card";
import { wordData } from "./constants/words";

function App() {

  const randomIndex = Math.floor(Math.random() * 21) + 1;

  return (
    <div className="container">
      <div className="container__header">
        <Header />
      </div>

      <div className="constainer__body">
        {
          wordData.map(({ id, czWord, word }, index ) => (
            (index === randomIndex) && <Card czWord={czWord} word={word} key={id} />
            )
          )
        }
      </div>

      <div className="container__footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;