import React from 'react'

import './App.scss'

import AppHeader from './AppHeader.jsx'
import Map from '../components/Map.jsx'

function App () {
  return (
    <div className="app">
      <AppHeader />
      <Map />
    </div>
  )
}

export default App
