import React from 'react'

import './App.scss'
import mapImage from '../images/map.svg'

function App () {
  return (
    <div className="app">
      <header className="app-header">
        <p>
          Hello world
        </p>
        <img src={mapImage} alt="Page Logo" />
      </header>
    </div>
  )
}

export default App
