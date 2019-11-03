import React from 'react'

import './App.scss'
import mapImage from '../images/map.svg'

function App () {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Diplomacy app</h1>
        <img src={mapImage} alt="Diplomacy map" />
      </header>
    </div>
  )
}

export default App
