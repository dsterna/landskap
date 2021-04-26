import './App.css';

import React, { useEffect, useState } from 'react';

import Landskap from './Landskap.js';
import { useStopwatch } from 'react-timer-hook';

const START_TEXT = "Klicka på valfritt landskap för att börja"
function App() {
  const [gameArray, setGameArray] = useState([])
  const [currentName, setCurrentName] = useState(START_TEXT)
  const [complete, setComplete] = useState(false)
  const [completed, setCompleted] = useState([])

  const getNewCurrent = () => {
    const currentObject = gameArray.find(elem => (!elem.completed && elem.name !== currentName))
    if (currentObject) {
      setCurrentName(currentObject.name)
    }
    else {
      setComplete(true)
      setCurrentName("BRA JOBBAT")
    }
  }

  const clickFunc = (e) => {
    console.log("in click func")
    if (currentName === START_TEXT) {
      console.log("starting with ", gameArray[0].name)
      setCurrentName(gameArray[0].name)
      return
    }

    const wasCorrect = e.target.id === currentName
    console.log("wasCorrect", wasCorrect)
    setGameArray(gameArray.map(item => (item.name === e.target.id) ? { ...item, clicks: wasCorrect ? item.clicks : item.clicks + 1, completed: wasCorrect ? true : item.completed } : item))
    wasCorrect && getNewCurrent()
    wasCorrect && setCompleted([...completed, e.target.id])
  }
  const changeGame = () => {

  }

  return (
    <div className="App">
      <h1 className="header" onClick={changeGame}></h1>
      <div className="wrapper">
        <div className="left-div">
          <QuestionComponent currentName={currentName} />
        </div>
        <div className="landskap-div">
          <Landskap clickFunc={clickFunc} setGameArray={setGameArray} completed={completed} />
        </div>
        <div className="right-div">

          {currentName !== START_TEXT && <div className="status">
            <AnswerComponent gameArray={gameArray} currentName={currentName} />
            <TimeComponent complete={complete} />
          </div>}
        </div>
      </div>


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
const TimeComponent = (props) => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!props.done)
      setTimeout(() => {
        setCount(count + 1)
      }, 1000);
  }, [count])
  return <span>Tid: {count}s</span>
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
