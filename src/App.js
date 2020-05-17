import './App.css';

import React, { useEffect, useState } from 'react';

import Landskap from './Landskap.js';

function App() {
  const [gameArray, setGameArray] = useState([])
  const [currentName, setCurrentName] = useState("Skane")
  const [completed, setCompleted] = useState([])

  const getNewCurrent = () => {
    setCurrentName(gameArray.find(elem => (!elem.completed && elem.name !== currentName)).name)
  }

  const clickFunc = (e) => {
    console.log(completed)
    const wasCorrect = e.target.id === currentName
    setGameArray(gameArray.map(item => (item.name === e.target.id) ? { ...item, clicks: wasCorrect ? item.clicks : item.clicks + 1, completed: wasCorrect ? true : item.completed } : item))
    wasCorrect && getNewCurrent()
    wasCorrect && setCompleted([...completed, e.target.id])
  }
  return (
    <div className="App">
      <header></header>
      <div className="wrapper">
        <QuestionComponent currentName={currentName} />
        <div className="landskap-div">
          <Landskap clickFunc={clickFunc} setGameArray={setGameArray} completed={completed}/>
        </div>
        <AnswerComponent gameArray={gameArray} currentName={currentName} />
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
        Antal fel:{countErrors()}
      </h2>
    </div>
  )
}

export default App;
