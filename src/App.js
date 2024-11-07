import React, { useState, useEffect } from "react";
import "./App.css";

const initialState = Array(9).fill(null);

function App() {
  const [squares, setSquares] = useState(initialState);
  const [xIsNext, setXIsNext] = useState(true);

  useEffect(() => {
    const savedState = localStorage.getItem("ticTacToeState");
    if (savedState) {
      const { squares, xIsNext } = JSON.parse(savedState);
      setSquares(squares);
      setXIsNext(xIsNext);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "ticTacToeState",
      JSON.stringify({ squares, xIsNext })
    );
  }, [squares, xIsNext]);

  const handleClick = (index) => {
    if (squares[index] || calculateWinner(squares)) return;

    const newSquares = squares.slice();
    newSquares[index] = xIsNext ? "X" : "O";

    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const winner = calculateWinner(squares);

  return (
    <div className="game">
      <h1>Крестики-нолики</h1>
      <div className="board">
        {squares.map((square, index) => (
          <button
            key={index}
            className="square"
            onClick={() => handleClick(index)}
          >
            {square}
          </button>
        ))}
      </div>
      {winner ? (
        <h2>Победитель: {winner}</h2>
      ) : (
        <h2>Следующий ход: {xIsNext ? "X" : "O"}</h2>
      )}
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

export default App;
