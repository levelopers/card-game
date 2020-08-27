import React from 'react'
import './App.css';


export default function Card({ card, index, cardClick, disabled }) {
  return (
    <h3 style={!!card.state ?
      { background: 'white' }
      : { background: 'black' }}
      className="cardContainer"
      onClick={() => !disabled && cardClick(index, card)}
    >
      {card.name}
    </h3>
  )
}