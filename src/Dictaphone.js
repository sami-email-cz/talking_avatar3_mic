import React from 'react';
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import createSpeechServicesPonyfill from 'web-speech-cognitive-services';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// speechlu
const appId = '3c30f30b-db67-4d1d-aa78-ed664d06bcd1';
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);


// AZURE
/*const { SpeechRecognition: AzureSpeechRecognition } = createSpeechServicesPonyfill({
  credentials: {
    region: process.env.AZURE_REGION,
    subscriptionKey: process.env.AZURE_KEY,
  }
});
SpeechRecognition.applyPolyfill(AzureSpeechRecognition);
*/
const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const startListening = () => SpeechRecognition.startListening({
    continuous: false,
    language: 'en-US'
  })

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
      <br />
    </div>
  );
};
export default Dictaphone;