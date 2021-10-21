import React, { useState } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    
    if (replace) {
      setMode(mode)
      setHistory(prev => ([...prev.slice(0, prev.length-1), mode]))
    } else {
      setMode(mode)
      setHistory(prev => ([...prev, mode]))
    }
  }

  function back() {
    if (history.length > 1) {
      history.pop()
      console.log(history)
      setMode(history[history.length-2])
      console.log("YES IT IS BEING CALLED!")
    }
  }

  return {mode, transition, back};
}

