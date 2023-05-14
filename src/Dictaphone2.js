import React, { useState, useEffect } from 'react'
//import { useSpeechRecognition } from '../SpeechRecognition'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';
var moment = require('moment')

const host = 'https://talk.3dmemories.eu';

function makeSpeech(text) {
  return axios.post(host + '/talk', { text });
}

function log (msg)  {
  console.log(moment().format('YYYY-MM-DD hh:mm:ss')+" "+ msg)
}


const Dictaphone2 = ({ commands }) => {
  const [speak, setSpeak] = useState(false);
  const [transcribing, setTranscribing] = useState(true)
  const [clearTranscriptOnListen, setClearTranscriptOnListen] = useState(true)
  const toggleTranscribing = () => setTranscribing(!transcribing)
  const toggleClearTranscriptOnListen = () => setClearTranscriptOnListen(!clearTranscriptOnListen)
  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition({ transcribing, clearTranscriptOnListen, commands })
  //
  const listenContinuously = () => SpeechRecognition.startListening({
    continuous: true,
    language: 'en-GB'
  })
  const listenContinuouslyInCzech = () => SpeechRecognition.startListening({
    continuous: true,
    language: 'cs'
  })
  const listenOnce = () => SpeechRecognition.startListening({ continuous: false })
  
  const listenStop = () =>  SpeechRecognition.stopListening();
  //    setSpeak(true) ;
  //})

  // speech
  useEffect(() => {

    if (finalTranscript === '')
      return;

   log("ms1: "+finalTranscript)
   makeSpeech(finalTranscript) 
   .then( response => {
      log("ms2: "+response.data)
      let {blendData, filename}= response.data;

      /*let newClips = [ 
        createAnimation(blendData, morphTargetDictionaryBody, 'HG_Body'), 
        createAnimation(blendData, morphTargetDictionaryLowerTeeth, 'HG_TeethLower') ];
      */
      filename = host + filename;
      log("ms3: "+filename)
      //setClips(newClips);
      setAudioSource(filename);

    })
    .catch(err => {
      console.error(err);
      //setSpeak(false);

    })

   
  }, [finalTranscript])


  useEffect(() => {
    if (interimTranscript !== '') {
      log('Got interim result:', interimTranscript)
    }
    if (finalTranscript !== '') {
      log('Got final result:', finalTranscript)
    }
  }, [interimTranscript, finalTranscript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>No browser support</span>
  }

  if (!isMicrophoneAvailable) {
    return <span>Please allow access to the microphone</span>
  }

/*        <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button
        onTouchStart={startListening}
        onMouseDown={startListening}
        onTouchEnd={SpeechRecognition.stopListening}
        onMouseUp={SpeechRecognition.stopListening}
      >Hold to talk</button>
      <p>{transcript}</p>
    </div>
*/
  return (
   <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span>listening: {listening ? 'on' : 'off'}</span>
      <span>transcribing: {transcribing ? 'on' : 'off'}</span>
      <span>clearTranscriptOnListen: {clearTranscriptOnListen ? 'on' : 'off'}</span>
      <button onClick={resetTranscript}>Reset</button>
      <button onClick={toggleTranscribing}>Toggle transcribing</button>
      <button onClick={toggleClearTranscriptOnListen}>Toggle clearTranscriptOnListen</button>
       <br />
      <button onClick={listenOnce}>Listen once</button>
      <button onClick={listenContinuously}>Listen continuously English</button>
      <button onClick={listenContinuouslyInCzech}>Listen continuously (Czech)</button>
      <button onClick={listenStop}>STOP listening</button>
      <span>{transcript}</span>
    </div>
  )
 }

export default Dictaphone2