import React, { useEffect, useReducer } from 'react';
import './App.css';
import Board from './components/Board';

import useInterval from './hooks/useInterval'

import { PLAYER_ONE, PLAYER_TWO } from './config/const'

import sumCoordinates from './utils/sumCoordinates'

const initialState = [
  PLAYER_ONE, PLAYER_TWO
];

function updateGame(players, action){
  if(action.type === 'move'){
    const newPlayers = players.map(player => ({
      ...player,
      position: sumCoordinates(player.position, player.direction)
    }))
    return newPlayers
  }
  if(action.type === 'changeDirection') {
    const newPlayers = players.map(player => ({
      ...player,
      direction: player.keys[action.key] ? player.keys[action.key] : player.direction
    }))
    return newPlayers;
  }
}

function App() {

  const [ players, gameDispatch] = useReducer(updateGame, initialState)

  useInterval(() => {
    gameDispatch({
      type: 'move'
    })
  }, 1000)

  useEffect(() => {
    function handlekeyPress(event) {
      const key = `${event.keyCode}`;
      gameDispatch({
        type: 'changeDirection', key
      })
    }
      document.addEventListener('keydown', handlekeyPress)

      return function cleanUp(){
        document.removeEventListener('keydown', handlekeyPress)
      }
  }, [])

  return (
   <Board players={players}/>
  );
}

export default App;
