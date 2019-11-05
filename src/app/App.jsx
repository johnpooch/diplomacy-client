import React from 'react'

import './App.scss'

import AppHeader from './AppHeader.jsx'
import Board from '../components/Board.jsx'

function App () {
  return (
    <div className="app">
      <AppHeader />
      <Board />
    </div>
  )
}

export default App
