import { useState, useEffect } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //add the new mode to our history
  function transition(updatedMode, shouldReplacePreviousMode) {
    if (!shouldReplacePreviousMode) {
      setHistory(prevHistory => [...prevHistory, updatedMode]);
    } else {
      setHistory(prevHistory => [...prevHistory.slice(0, -1), updatedMode])
    }
    setMode(updatedMode);
    
  }

  //set the mode to the previous item in our history array
  //not allow the user to go back past the inital mode - history array will need to have length that is > 1
  function back() {
    //check if history array is greater than 1
    if (history.length > 1) {
      //remove the last item
      const copyArray = [...history]
      //removing the last mode
      copyArray.pop()
      //get the latest of the array after the last mode was popped off
      const updatedMode = copyArray[copyArray.length - 1];
      //setMode with the new mode
      setMode(updatedMode);
      //also have to set the history
      setHistory(copyArray)
    }
  }

  // useEffect(() => {console.log(history)}, [history])

  return { mode, transition, back };

}