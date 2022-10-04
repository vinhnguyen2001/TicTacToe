import React, { useState } from 'react';
import Board from './Board';


const Game = (props) => {

    var [history, setHistory] = useState([{
        squares: Array(25).fill(null),

    }]);
    var [stepNumber, setStepNumber] = useState(0);
    var [xIsNext, setXIsNext] = useState(true);
    var [coordinates, setCoordinates] = useState([{ x: "", y: "" }]);
    var [reversed, setReversed] = useState(false);
    var [index] = useState(Array(25).fill().map((dummy, index) => index));

    const handleClick = (i, row, col) => {
        const tempHistory = history.slice(0, stepNumber + 1);
        const current = tempHistory[tempHistory.length - 1];
        const squares = current.squares.slice();
        var tempCoordinates = coordinates.slice(0, stepNumber + 1);


        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = xIsNext ? 'X' : 'O';

        tempCoordinates.push({ x: row, y: col });

        setHistory(tempHistory.concat([
            {
                squares: squares,

            }
        ]));

        setStepNumber(tempHistory.length);
        setXIsNext(!xIsNext);
        setCoordinates(tempCoordinates);

    }


    const jumpTo = (step) => {

        setStepNumber(step);
        setXIsNext((step % 2) === 0);
    }

    const getAppropriateClass = () => {
        return "button-bold";
    }

    const sortDesc = () => {
        setReversed(!reversed);
    }


    const tempHistory = history;
    const tempStepNumber = stepNumber;
    const current = tempHistory[stepNumber];
    const winner = calculateWinner(current.squares);


    var moves = tempHistory.map((step, move) => {


        let firstStr = "Go to move # " + move;
        let additionalStr = "  (" + coordinates[move].x + ", " + coordinates[move].y + ") ";

        firstStr = `${firstStr} ${additionalStr}`;


        const desc = move ? firstStr : 'Go to game start';
        var buttonHtml = <button onClick={() => jumpTo(move)}>{desc}</button>;

        if (move === tempStepNumber) {

            var selectedButtonHtml = <button onClick={() => jumpTo(move)}
                className={getAppropriateClass()}>{desc}</button>;

            buttonHtml = selectedButtonHtml;
        }


        return (
            <li key={move}>
                {buttonHtml}
            </li>
        );
    });

    if (reversed === true) {
        moves = moves.reverse();
    }

    let status;
    let highLight = null;

    if (winner) {
        status = "Winner: " + winner.result;
        highLight = winner.arr;
    }
    else if (stepNumber === 25) {
        status = "This match's result is draw !"
    }
    else {
        status = "Next player: " + (xIsNext ? 'X' : 'O');
    }


    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={current.squares}
                    index={index}
                    onClick={(i, row, col) => handleClick(i, row, col)}
                    arr={highLight}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
            <div className="sort-button"><button
                onClick={() => sortDesc()}
            >Sort Desc</button></div>
        </div>
    );

}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2, 3, 4],
        [5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24],
        [0, 5, 10, 15, 20],
        [1, 6, 11, 16, 21],
        [2, 7, 12, 17, 22],
        [3, 8, 13, 18, 23],
        [4, 9, 14, 19, 24],
        [0, 6, 12, 18, 24],
        [4, 8, 12, 16, 20],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c, d, e] = lines[i];
        if (squares[a] &&
            squares[a] === squares[b]
            && squares[a] === squares[c]
            && squares[a] === squares[d]
            && squares[a] === squares[e]) {

            return { result: squares[a], arr: [a, b, c, d, e] };
        }
    }

    return null;
}


export default Game