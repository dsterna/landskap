import './App.css';

import React from 'react';
import landskap from './landskap.png';
import skane from './skane.svg';

function App() {
  return (
    <div className="App">
      <div className="landskap-div">
        {/* <img src={landskap} alt="logo" /> */}
      </div>
        <svg onClick={() => console.log('hej')} className="landskap-svg" src={skane}></svg>
      <div className="landskap-text">
        <p>
          Klicka på <b>Skåne</b>
        </p>
      </div>
    </div>
  );
}

export default App;
