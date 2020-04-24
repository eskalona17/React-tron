import React, { useEffect, useReducer } from "react";
import "./App.css";
import Board from "./components/Board";
import useInterval from "./hooks/useInterval";

import { PLAYER_ONE, PLAYER_TWO, BOARD_SIZE, UNIT } from "./config/const";
import getPlayableCells from "./utils/getPlayableCells";
import getCellkey from "./utils/getCellKey";
import sumCoordinates from "./utils/sumCoordinates";
import playerCanChangeToDirection from "./utils/playerCanChangeToDirection";

const players = [PLAYER_ONE, PLAYER_TWO];

const initialState = {
  players,
  playableCells: getPlayableCells(
    BOARD_SIZE,
    UNIT,
    players.map((player) => getCellkey(player.position.x, player.position.y))
  ),
};

function updateGame(game, action) {
  if (action.type === "move") {
    const newPlayers = game.players.map((player) => ({
      ...player,
      position: sumCoordinates(player.position, player.direction),
    }));

    const newPlayersWithCollision = newPlayers.map((player) => {
      const myCellKey = getCellkey(player.position.x, player.position.y);
      return {
        ...player,
        hasDied:
          !game.playableCells.includes(myCellKey) ||
          newPlayers
            .filter((p) => p.id != player.id)
            .map((p) => getCellkey(p.position.x, p.position.y))
            .includes(myCellKey),
      };
    });

    const newOccupiedCells = game.players.map(player => getCellkey(player.position.x, player.position.y));

    const playableCells = game.playableCells.filter(playableCell => {
      return !newOccupiedCells.includes(playableCell)
    })
    return {
      players: newPlayersWithCollision,
      playableCells: playableCells,
    };
  }
  if (action.type === "changeDirection") {
    const newPlayers = game.players.map((player) => ({
      ...player,
      direction:
        player.keys[action.key] &&
        playerCanChangeToDirection(player.direction, player.keys[action.key])
          ? player.keys[action.key]
          : player.direction,
    }));
    return {
      players: newPlayers,
      playableCells: game.playableCells,
    };
  }
}

function App() {
  const [game, gameDispatch] = useReducer(updateGame, initialState);

  const players = game.players;

  const diedPlayers = players.filter(player => player.hasDied);

  if(diedPlayers.length > 0){
    console.log(diedPlayers)
  }

  useInterval(() => {
    gameDispatch({
      type: "move",
    });
  }, diedPlayers.length > 0 ? null : 100);

  useEffect(() => {
    function handlekeyPress(event) {
      const key = `${event.keyCode}`;
      gameDispatch({
        type: "changeDirection",
        key,
      });
    }
    document.addEventListener("keydown", handlekeyPress);

    return function cleanUp() {
      document.removeEventListener("keydown", handlekeyPress);
    };
  }, []);

  return <Board players={game.players} />;
}

export default App;
