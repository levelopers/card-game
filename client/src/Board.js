import React from 'react'
import Card from './Card'
import './App.css';

export default function Board({ board, cardClick,disabled }) {
  return (
    <div className="boardContainer">
      {board.map((card, index) =>
        <Card key={index} cardClick={cardClick} card={card} index={index} disabled={disabled} />)}
    </div>
  )
}