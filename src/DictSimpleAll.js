import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';

const appId = '3c30f30b-db67-4d1d-aa78-ed664d06bcd1';
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

//export default () => {
const DictSimple = () => {
  const [message, setMessage] = useState('');
  const commands = [
    {
      command: '* is my name',
      callback: (name) => setMessage(`Hi ${name}!`),
      matchInterim: true
    },
    {
      command: 'My top sports are * and *',
      callback: (sport1, sport2) => setMessage(`#1: ${sport1}, #2: ${sport2}`)
    },
    {
      command: 'Goodbye',
      callback: () => setMessage('So long!'),
      matchInterim: true
    },
    {
      command: 'Pass the salt (please)',
      callback: () => setMessage('My pleasure')
    }
  ];
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable
  } = useSpeechRecognition({ commands });
  const listenContinuously = () => SpeechRecognition.startListening({ continuous: true });

  if (!browserSupportsSpeechRecognition) {
    return <span>No browser support</span>
  }

  if (!isMicrophoneAvailable) {
    return <span>Please allow access to the microphone</span>
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button
        onTouchStart={listenContinuously}
        onMouseDown={listenContinuously}
        onTouchEnd={SpeechRecognition.stopListening}
        onMouseUp={SpeechRecognition.stopListening}
      >Hold to talk</button>
      <p>T {transcript}</p>
      <p>M {message}</p>
    </div>
  );
};

export default DictSimple;