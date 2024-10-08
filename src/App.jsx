import { useState } from 'react'
import './App.css'
import Gameboard from './components/Gameboard'

function App() {

  return (
    <>
    <form id="form">
        <label for="X">X</label>
            <input type="radio" name="humanSymbol" id="X" value="X"></input>
        <label for="O">O</label>
            <input type="radio" name="humanSymbol" id="O" value="O"></input>
        <button type="submit" id="submit" control-id="ControlID-3">New game (vs cpu)</button>
    </form>
    <Gameboard /> 
    </>
  )
}



export default App
