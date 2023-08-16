import etchasketch from './etchasketch.png';
import knob from './knob.png';
import './App.css';
import { useState } from "react";

var numPixels = 50 * 70;


function Pixel(props) {
  return (
    <div
      className="App-etch-pixel"
      style={{ 
        backgroundColor: props.color
         
      }}
      onMouseEnter={props.onMouseEnter}
    />
  );
}

function App() {
  const [pixelColors, setPixelColors] = useState([]);

  function handlePixelHover(index) {    
    const newColors = [...pixelColors];
    newColors[index] = 'black';
    setPixelColors(newColors);
    }

  const pixelArray = [];
  for(let i = 0; i < numPixels; i++) {
    const pixelId = `pixel-${i}`;
    pixelArray.push(

    <Pixel 
    key={`pixel-${i}`}
    color={pixelColors[i]}
    onMouseEnter={() => handlePixelHover(i)}
    />
    );
  }

  return (    
    <><div className="App">
      <header className="App-header">

        <img src={etchasketch} className="App-etchasketch" alt="etchasketch" />
        <img src={knob} className="App-knob-left" alt="knob-right" />
        <img src={knob} className="App-knob-right" alt="knob-left" />

        <div className="App-pixel-container" alt="pixel-container">
          {pixelArray}               
        </div>
      
      <p>
        Etch-a-sketch!
      </p>
        
      </header>
    </div>
    </>
  );
}

export default App;
