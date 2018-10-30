import React from 'react'
// import ReactDOM from 'react-dom'
import './index.css'

function Square(props) {    
    // const winningSquares = props.winningSquares;
    let classes = ["square"];
    if(props.selected) {
        classes.push("selected")
    }
    if(props.winningSquare){
        classes.push('winning-square')
    }
    return (
        <button
            className={classes.join(" ")}
            onClick={props.onClick}>
            {props.value}
        </button>
    )
}

export default Square;