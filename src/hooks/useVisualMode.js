import { useState } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(updatedMode, replace) {

    setHistory(prev => {
      const newHistory = [...prev];

      if (replace) {
        newHistory.pop();
      }
      newHistory.push(updatedMode);
      return newHistory;
    });
    setMode(updatedMode);
  };

  //set the mode to the previous item in our history array
  //not allow the user to go back past the inital mode - history array will need to have length that is > 1
  function back() {
    //check if history array is greater than 1
    if (history.length > 1) {
      //remove the last item
      const newHistory = [...history];
      //removing the last mode
      newHistory.pop();
      //get the latest of the array after the last mode was popped off
      const updatedMode = newHistory[newHistory.length - 1];
      //setMode with the new mode
      setMode(updatedMode);
      //also have to set the history
      setHistory(newHistory);
    }
  }
  return { mode, transition, back };
};