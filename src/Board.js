import React from 'react'
// import ReactDOM from 'react-dom'
import Square from './Square'
import './index.css'


class Board extends React.Component {
    renderSquare(i) {
        const winningSquares = this.props.winningSquares;
        let isWinningSquare = null;
        if(winningSquares) {
             isWinningSquare = winningSquares.indexOf(i) !== -1;
        }        
        return <Square
            key={i}
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
            selected={i === this.props.selectedSquareIndex}
            winningSquare={isWinningSquare}
        />;
    }
    createBoard(rows = 3, cols = 3) {
        let board = [];
        let index = 0;
        // Outer loop to create rows
        for (let i = 0; i < rows; i++) {
            let children = [];
            // Inner loop to create columns
            for (let j = 0; j < cols; j++) {
                children.push(this.renderSquare(index));
                index++;
            }
            board.push(
                <div key={i} className="board-row">
                    {children}
                </div>
            )
        }
        return board;
    }
    render() {
        return (
            <div>
                {this.createBoard()}
            </div>
        )
    }
}

export default Board;