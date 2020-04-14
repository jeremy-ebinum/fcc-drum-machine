import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";

import "./DrumPad.scss";

const DrumPad = ({ clip, cb }) => {
  const playClip = useCallback(() => {
    const audio = document.querySelector(`audio[data-trigger="${clip.text}"]`);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.play();
      cb(clip.id.replace(/-/g, " "));
    }
  }, [cb, clip.id, clip.text]);

  const updateStyles = useCallback(() => {
    const drumPad = document.querySelector(`#${clip.id}`);
    if (drumPad) {
      drumPad.classList.add("isActive");

      setTimeout(() => {
        drumPad.classList.remove("isActive");
      }, 100);
    }
  }, [clip.id]);

  const handleKeyPlay = useCallback(
    (event) => {
      if (event.keyCode === clip.keyCode) {
        playClip();
        updateStyles();
      }
    },
    [clip.keyCode, playClip, updateStyles]
  );

  const handleA11xInteractivity = useCallback(
    (event) => {
      if (event.keyCode === 13 || event.keyCode === 32) {
        event.preventDefault();
        event.target.click();
        updateStyles();
      }
    },
    [updateStyles]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPlay);

    return () => {
      document.removeEventListener("keydown", handleKeyPlay);
    };
  }, [handleKeyPlay]);

  return (
    <div
      role="button"
      tabIndex={0}
      className="drum-pad"
      id={clip.id}
      onClick={playClip}
      onKeyDown={handleA11xInteractivity}
    >
      <span>{clip.text}</span>
      <audio
        className="clip"
        id={clip.text}
        src={clip.url}
        data-trigger={clip.text}
        preload="auto"
      >
        Your browser does not support this audio format
        <track kind="captions" />
      </audio>
    </div>
  );
};

DrumPad.propTypes = {
  clip: PropTypes.shape({
    keyCode: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  cb: PropTypes.func.isRequired,
};

export default DrumPad;
