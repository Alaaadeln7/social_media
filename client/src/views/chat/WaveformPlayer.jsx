import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

const WaveformPlayer = ({ audioUrl }) => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#ddd",
      progressColor: "#007bff",
      barWidth: 2,
      height: 50,
      responsive: true,
    });

    wavesurfer.current.load(audioUrl);

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }
    };
  }, [audioUrl]);

  const handlePlayPause = () => {
    wavesurfer.current.playPause();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex items-center gap-3 mt-3">
      <div ref={waveformRef}></div>
      <button
        onClick={handlePlayPause}
        className="bg-blue-500 hover:bg-blue-600 text-white border-none px-1 py-2 cursor-pointer rounded-md"
      >
        {isPlaying ? "⏸ Pause" : "▶ Play"}
      </button>
    </div>
  );
};

export default WaveformPlayer;
