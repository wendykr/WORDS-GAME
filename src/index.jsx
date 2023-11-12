import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import './index.scss';
import { HomePage } from './pages/HomePage/HomePage';
import { FlashcardPage } from './pages/FlashcardPage/FlashcardPage';
import { QuizPage } from './pages/QuizPage/QuizPage';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { WordsSetupProvider } from './context/WordsSetupContext';
import { SettingsProvider } from './context/SettingsContext';
import { VoiceSpeakProvider } from './context/VoiceSpeakContext.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'flashcards',
        element: <FlashcardPage />,
      },
      {
        path: 'quiz',
        element: <QuizPage />,
      },
      {
        path: 'pexeso',
        element: <ErrorPage />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <VoiceSpeakProvider>
    <SettingsProvider>
      <WordsSetupProvider>
        <RouterProvider router={router} />
      </WordsSetupProvider>
    </SettingsProvider>
  </VoiceSpeakProvider>
  // </React.StrictMode>,
);