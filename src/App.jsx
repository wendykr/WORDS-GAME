import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { FlashcardPage } from './pages/FlashcardPage/FlashcardPage';
import { QuizPage } from './pages/QuizPage/QuizPage';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { SharedLayout } from './components/SharedLayout/SharedLayout';
import { WordsSetupProvider } from './context/WordsSetupContext';
import { SettingsProvider } from './context/SettingsContext';

function App() {

  return (
<<<<<<< HEAD
    <div className="container">
      <div className="container__head">
        <Header />
      </div>

      <div className="container__body">
        <div className="container__body--bar">
          <ProgressBar line="91" />
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
=======
    <SettingsProvider>
    <WordsSetupProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/flashcards" element={<FlashcardPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/match" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </WordsSetupProvider>
    </SettingsProvider>
>>>>>>> 1533464b5c6354ffcb035d348d7b3c666b12f599
  );
}

export default App;