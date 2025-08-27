import React, { useState, useRef } from "react";
import Icon from "../base/Icon";

interface AudioButtonProps {
  audioSrc: string;
}

const AudioButton: React.FC<AudioButtonProps> = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAudioPlay = (e: any) => {
    e.stopPropagation();
    if (!audioRef.current) {
      audioRef.current = new Audio(audioSrc);
      audioRef.current.onended = () => {
        setIsPlaying(false);
      };
    }

    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Failed to play audio:", error);
        });
    }
  };

  return (
    <button
      onClick={handleAudioPlay}
      className="flex items-center cursor-pointer justify-center w-11 h-11 bg-neutral-content rounded-full text-base-card hover:bg-neutral focus:outline-none transition duration-300"
      aria-label="Play Audio"
    >
      {isPlaying ? (
        <Icon name="volume_off" size="md" />
      ) : (
        <Icon name="volume_up" size="md" />
      )}
    </button>
  );
};

export default AudioButton;
