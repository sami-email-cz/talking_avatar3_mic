import React , { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';

const host = 'https://talk.3dmemories.eu';

function makeSpeech(text) {
  console.log("DictSimple - "+ host +" makeSpeech: "+text)
  return axios.post(host + '/talk', { text });
}


const DictSimple = () => {
  const [message, setMessage] = useState('')
  const commands = [
    {
      command: '*',
      callback : ( command  ) => setMessage(`${command}`
                   //makeSpeech(`${command}`)
                   /*.then( response => {
                   })
                  .catch(err => {
                     console.error(err);
                     //setSpeak(false);
                  })*/
                 )
    },
    {
      command: 'clear',
      callback: ({ resetTranscript }) => resetTranscript()
    }
   ]


  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition( { commands } );


const STYLES = {
  area: {position: 'absolute', bottom:'10px', left: '10px', zIndex: 500},
  text: {margin: '0px', width:'300px', padding: '5px', background: 'none', color: '#ffffff', fontSize: '1.2em', border: 'none'},
  speak: {padding: '10px', marginTop: '5px', display: 'block', color: '#FFFFFF', background: '#222222', border: 'None'},
  area2: {position: 'absolute', top:'5px', right: '15px', zIndex: 500},
  label: {color: '#777777', fontSize:'0.8em'}
}


  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-US' });

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p style={STYLES.text}>{message}</p>
      <p style={STYLES.text}>{transcript}</p>
    </div>
  );
};
export default DictSimple;