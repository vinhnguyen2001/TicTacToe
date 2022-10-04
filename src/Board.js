import React from 'react';
import Square from './Square';


const Board = (props) => {


    const renderSquare = (i, row, col) => {

        return <Square value={props.squares[i]}
            onClick={() => props.onClick(i, row, col)}
            index={props.index[i]}
            arr={props.arr}
            key={i}
        />;
    }

    const setSquareInRow = (row, col) => {

        var rows = [];
        for (let i = 0; i < col; i++) {
            rows.push(renderSquare(i + row * col, row, i));
        }

        return rows;
    }

    const createBoard = (row, col) => {

        var index = 0;
        const html = [];

        for (let i = 0; i < row; i++) {

            var rowSquareHtml = [];
            for (let j = 0; j < col; j++) {
                rowSquareHtml.push(renderSquare(index, row, i))
                index++;
            }
            html.push(<div className="board-row" key={i}> {setSquareInRow(i, col)}</div>)
        }

        return (html);
    }

    const ROW = 5;
    const COL = 5;

    return (
        <div>
            {createBoard(ROW, COL)}
        </div>
    );

}


export default Board;