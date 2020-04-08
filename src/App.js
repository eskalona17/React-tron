import React, { useReducer } from 'react';
import './App.css';
import Board from './components/Board';

import useInterval from './hooks/useInterval'

import { PLAYER_ONE, PLAYER_TWO } from './config/const'

const initialState = [
  PLAYER_ONE, PLAYER_TWO
];

function updateGame(state, action){
  if(action.type === 'move'){
    //update players state
    console.log('toca mover')
    return state
  }
}

function App() {

  const [ players, gameDispatch] = useReducer(updateGame, initialState)

  useInterval(() => {
    gameDispatch({
      type: 'move'
    })
  }, 1000)

  return (
   <Board players={players}/>
  );
}

export default App;
