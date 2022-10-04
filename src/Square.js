import React from 'react';

const Square = (props) => {

    var highLight = props.arr;
    var classHighLight = "square";
    var index = props.index;

    if (highLight) {
        if (highLight.includes(index)) {
            classHighLight = "square square-highlight";
        }
    }


    return (
        <button
            className={classHighLight}
            onClick={() => props.onClick()}
        >
            {props.value}
        </button>
    );
}


export default Square;