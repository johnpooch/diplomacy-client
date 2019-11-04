import React from 'react'

import './Map.scss'

// import mapImage from '../images/map.svg'
import json from '../json/territories.json'
import Territory from './Territory.jsx'

function Map () {
  // console.log(json)
  const territories = []

  for (let index = 0; index < json.length; index++) {
    const key = json[index].pk
    const fields = json[index].fields

    territories.push(
      <Territory
        key={key}
        name={fields.name}
        coastal={fields.coastal}
        neighbours={fields.neighbours}
        shared_coasts={fields.shared_coasts}
        type={fields.type}
      />
    )
  }

  return (
    <main className="map">
      {territories}
    </main>
  )
}

export default Map
