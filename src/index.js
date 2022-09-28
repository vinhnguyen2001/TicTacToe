import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';



const Square = (props) => {

    var highLight = props.arr;
    var classHighLight = "square";
    var index = props.index;

    if (highLight) {
        if (highLight.includes(index)) {
            classHighLight = "square square-highlight";
        }
    }


    return (<button
        className={classHighLight}
        onClick={() => props.onClick()}
    >
        {props.value}
    </button>)
}


class Board extends React.Component {


    renderSquare(i, row, col) {

        return <Square value={this.props.squares[i]}
            onClick={() => this.props.onClick(i, row, col)}
            index={this.props.index[i]}
            arr={this.props.arr}
            key={i}
        />;
    }

    setSquareInRow(row, col) {

        var rows = [];
        for (let i = 0; i < col; i++) {
            rows.push(this.renderSquare(i + row * col, row, i));
        }

        return rows;
    }

    createBoard(row, col) {

        var index = 0;
        const html = [];

        for (let i = 0; i < row; i++) {

            var rowSquareHtml = [];
            for (let j = 0; j < col; j++) {
                rowSquareHtml.push(this.renderSquare(index, row, i))
                index++;
            }
            html.push(<div className="board-row" key={i}> {this.setSquareInRow(i, col)}</div>)
        }

        return (html);

    }
    render() {
        const ROW = 5;
        const COL = 5;
        return (
            <div>
                {this.createBoard(ROW, COL)}
            </div>
        );
    }
}

class Game extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            history: [{
                squares: Array(25).fill(null),

            }],
            stepNumber: 0,
            xIsNext: true,
            location: [{ x: "", y: "" }],
            reversed: false,
            index: Array(25).fill().map((dummy, index) => index),

        }
    }


    handleClick(i, row, col) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        var location = this.state.location.slice(0, this.state.stepNumber + 1);


        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';

        location.push({ x: row, y: col });

        this.setState({
            history: history.concat([
                {
                    squares: squares,

                }
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
            location: location,
        });
    }


    jumpTo(step) {

        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    getAppropriateClass() {
        return "button-bold";
    }

    sortDesc() {

        this.setState({
            reversed: !this.state.reversed,
        })

    }
    render() {

        const history = this.state.history;
        const stepNumber = this.state.stepNumber;
        const current = history[this.state.stepNumber];

        const winner = calculateWinner(current.squares);

        const location = this.state.location;


        var moves = history.map((step, move) => {


            let firstStr = "Go to move # " + move;
            let additionalStr = "  (" + location[move].x +
                ", " + location[move].y + ") ";

            firstStr = `${firstStr} ${additionalStr}`;


            const desc = move ? firstStr : 'Go to game start';

            var buttonHtml = <button onClick={() => this.jumpTo(move)}>{desc}</button>;

            if (move === stepNumber) {
                var selectedButtonHtml = <button onClick={() => this.jumpTo(move)}
                    className={this.getAppropriateClass()}>{desc}</button>;

                buttonHtml = selectedButtonHtml;
            }

            return (<li key={move}>
                {buttonHtml}
            </li>);
        });

        if (this.state.reversed === true) {
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
            status = "Next player: " + (this.state.xIsNext ? 'X' : 'O');
        }



        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        index={this.state.index}
                        onClick={(i, row, col) => this.handleClick(i, row, col)}
                        arr={highLight}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
                <div className="sort-button"><button
                    onClick={() => this.sortDesc()}
                >Sort Desc</button></div>
            </div>
        );
    }
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



// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);