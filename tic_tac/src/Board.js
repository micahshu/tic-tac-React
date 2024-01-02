import calculateWinner from './CalculateWinner';
import Square from './Square';

export default function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }


  function CreateBoard() {
    let boardArray = [];

    for (let i = 0; i < 3; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        const currentIndex = i * 3 + j;
        row.push(
          <Square
            key={currentIndex}
            value={squares[currentIndex]}
            onSquareClick={() => handleClick(currentIndex)}
          />
        );
      }
      boardArray.push(<div className='board-row' key={i}>{row}</div>);
    }
    return <div>{boardArray}</div>;

  }

  return (
    <>
      <div className="status">{status}</div>
      <CreateBoard />

    </>
  );
}
