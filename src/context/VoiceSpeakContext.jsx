import React, { useState, useEffect, useContext, createContext } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';

export const VoiceSpeakContext = createContext();

export const VoiceSpeakProvider = ({ children }) => {
  const [currentVoice, setCurrentVoice] = useState();

  const { voices, speak } = useSpeechSynthesis();

  useEffect(() => {
    setCurrentVoice(voices.find((voice) => voice.name === "Google US English"));

    if (!currentVoice) {
      setCurrentVoice(
        voices.find((voice) => voice.name === "Google US English")
      );
    }
  }, [currentVoice, voices]);

  const speakWord = (word) => {
    speak({ text: word, rate: 0.8, voice: currentVoice });
  };

  return (
    <VoiceSpeakContext.Provider
      value={{
        currentVoice, setCurrentVoice,
        speakWord,
      }}
    >
      {children}
    </VoiceSpeakContext.Provider>
  );
};

export const useVoiceSpeak = () => useContext(VoiceSpeakContext);