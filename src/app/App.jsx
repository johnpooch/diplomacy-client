import React from 'react'

import './App.scss'

import AppHeader from './AppHeader.jsx'
import Game from '../components/Game.jsx'

function App () {
  return (
    <div className="app">
      <AppHeader />
      <Game />
    </div>
  )
}

export default App
