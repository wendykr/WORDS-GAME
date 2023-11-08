export const speakWord = (speak, word, voices) => {
  const selectedVoice = voices.find(voice => voice.name === 'Google US English');
  speak({ text: word, rate: 0.8, voice: selectedVoice });
};