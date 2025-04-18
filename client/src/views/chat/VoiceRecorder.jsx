import { useState, useRef } from "react";

const VoiceRecorder = ({ onUpload }) => {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);

    mediaRecorder.current.ondataavailable = (event) => {
      audioChunks.current.push(event.data);
    };

    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
      setAudioBlob(audioBlob);
      onUpload(audioBlob);
      audioChunks.current = [];
    };

    mediaRecorder.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder.current.stop();
    setRecording(false);
  };

  return (
    <div>
      {recording ? (
        <button onClick={stopRecording}>🛑 Stop</button>
      ) : (
        <button onClick={startRecording}>🎤 Record</button>
      )}
      {audioBlob && (
        <audio controls>
          <source src={URL.createObjectURL(audioBlob)} type="audio/webm" />
        </audio>
      )}
    </div>
  );
};

export default VoiceRecorder;
