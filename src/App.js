import React, { useState, useEffect, useCallback } from 'react';
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';

const appId = '3c30f30b-db67-4d1d-aa78-ed664d06bcd1';
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
const speechRecognition = new SpeechlySpeechRecognition();
speechRecognition.continuous = true;

export default () => {
  const [transcript, setTranscript] = useState('');

  const handleResult = useCallback(({ results }) => {
    const newTranscript = [transcript, results[0][0].transcript].join(' ');
    setTranscript(newTranscript);
  }, [transcript]);

  useEffect(() => {
    speechRecognition.onresult = handleResult;
  });

  return (
    <div>
      <button
        onTouchStart={speechRecognition.start}
        onMouseDown={speechRecognition.start}
        onTouchEnd={speechRecognition.stop}
        onMouseUp={speechRecognition.stop}
        >Hold to talk</button>
      <span>{transcript}</span>
    </div>
  );
};