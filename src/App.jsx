import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { FlashcardPage } from "./pages/FlashcardPage/FlashcardPage";
import { QuizPage } from "./pages/QuizPage/QuizPage";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";
import { SharedLayout } from "./components/SharedLayout/SharedLayout";
import { WordsSetupProvider } from './context/WordsSetupContext';
import { SettingsProvider } from './context/SettingsContext';

function App() {

  return (
    <WordsSetupProvider>
    <SettingsProvider>
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
    </SettingsProvider>
    </WordsSetupProvider>
  );
}

export default App;