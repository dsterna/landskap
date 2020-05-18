import './App.css';

import React, { useEffect, useState } from 'react';

import Landskap from './Landskap.js';
import { useStopwatch } from 'react-timer-hook';

const START_TEXT ="Klicka på valfritt landskap för att börja"
function App() {
  const [gameArray, setGameArray] = useState([])
  const [currentName, setCurrentName] = useState(START_TEXT)
  const {
    seconds,
    minutes,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false });
  const [completed, setCompleted] = useState([])

  const getNewCurrent = () => {
    const currentObject = gameArray.find(elem => (!elem.completed && elem.name !== currentName))
    if (currentObject) {
      setCurrentName(currentObject.name)
    }
    else {
      setCurrentName("BRA JOBBAT")
      pause()
    }
  }

  const clickFunc = (e) => {
    if (currentName === START_TEXT) {
      setCurrentName(gameArray[0].name)
      start()
      return
    }
    const wasCorrect = e.target.id === currentName
    setGameArray(gameArray.map(item => (item.name === e.target.id) ? { ...item, clicks: wasCorrect ? item.clicks : item.clicks + 1, completed: wasCorrect ? true : item.completed } : item))
    wasCorrect && getNewCurrent()
    wasCorrect && setCompleted([...completed, e.target.id])
  }
  return (
    <div className="App">
      <header></header>
      <div className="wrapper">
        <div className="left-div">
          <QuestionComponent currentName={currentName} />
        </div>
        <div className="landskap-div">
          <Landskap clickFunc={clickFunc} setGameArray={setGameArray} completed={completed} />
        </div>
        <div className="right-div">
          <AnswerComponent gameArray={gameArray} currentName={currentName} />
          <h2>
            Tid: <span>{minutes}</span>:<span>{seconds}</span>
          </h2>
        </div>
      </div>

      <footer></footer>
    </div>
  );
}
const QuestionComponent = (props) => {
  return (
    <div>
      <h1>{props.currentName}</h1>
    </div>
  )
}
const AnswerComponent = (props) => {
  const countErrors = () => {
    let count = 0
    props.gameArray.forEach(elem => count += elem.clicks)
    return count
  }

  return (
    <div>
      <h2>
        Antal fel: {countErrors()}
      </h2>
    </div>
  )
}
export default App;
