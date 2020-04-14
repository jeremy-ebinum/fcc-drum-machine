import React, { useState, useCallback } from "react";

import "./App.scss";

import clips from "../../data/clips";
import DrumPad from "../DrumPad/DrumPad";

const App = () => {
  const [display, setDisplay] = useState("");

  const updateDisplay = useCallback((newDisplay) => {
    setDisplay(newDisplay);
  }, []);

  return (
    <>
      <h1 className="heading">Drum Machine</h1>

      <div id="drum-machine" className="drum-machine">
        <div className="drum-pad-container">
          {clips.map((clip) => {
            return <DrumPad key={clip.id} clip={clip} cb={updateDisplay} />;
          })}
        </div>
        <div id="display" className="display">
          {display}
        </div>
      </div>

      <p className="instructions">
        Click one of the keys or press the indicated keyboard button to play a
        drum kit sound
      </p>
    </>
  );
};

export default App;
