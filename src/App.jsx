import { BrowserRouter, Routes, Route } from  'react-router-dom';
import './App.scss';
import { Home } from './pages/Home/Home';
import { Flashcards } from './pages/Flashcards/Flashcards';
import { Quiz } from './pages/Quiz/Quiz';
import { Error } from './components/Error/Error';
import { SharedLayout} from './components/SharedLayout/SharedLayout';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <SharedLayout /> }>
          <Route index element={ <Home /> } />
          <Route path="/flashcards" element={ <Flashcards /> } />
          <Route path="/quiz" element={ <Quiz /> } />
          <Route path="/match" element={ <Error /> } />
          <Route path="*" element={ <Error /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;