import React from "react";
import ReactDOM from "react-dom";
import ReactAudioPlayer from "react-audio-player";

ReactDOM.render(
  <ReactAudioPlayer
    src="https://talk.3dmemories.eu/speech-1azl6.mp3"
    controls
  />,
  document.getElementById("root")
);
