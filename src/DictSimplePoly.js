import React, { useState, useEffect } from 'react';
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';

const appId = '3c30f30b-db67-4d1d-aa78-ed664d06bcd1';
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
const speechRecognition = new SpeechlySpeechRecognition();
speechRecognition.continuous = true;
speechRecognition.interimResults = true;

const COMMANDS = ['PLAY', 'PAUSE', 'REWIND'];

//export default () => {
const DictSimple = () => { 
  const [matchedCommand, setMatchedCommand] = useState('');

  const handleResult = ({ results }) => {
    const { transcript } = results[0][0];
    COMMANDS.forEach(command => {
      if (transcript.indexOf(command) !== -1) {
        setMatchedCommand(command);
      }
    });
  };

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
      <span>{matchedCommand}</span>
    </div>
  );
};

export default DictSimple;