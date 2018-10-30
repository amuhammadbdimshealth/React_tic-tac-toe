import React from 'react'
// import ReactDOM from 'react-dom'
import Board from './Board'
import { calculateWinner, findMoveLocation } from './utility'
import './index.css'

class Game extends React.Component {
    state = {
        history: [
            {
                squares: Array(9).fill(null),
                indexClicked: null
            }
        ],
        xIsNext: true,
        stepNumber: 0,
        sortMovesAsc: true,
        winningSquares: null
    }

    handleClick(i) {
        // const history = [...this.state.history];
        const indexClicked = i;

        // consider the stepnumber - reflects the move displayed to the user now. 
        // ensures that if we “go back in time” and then make a new move from that point, we throw away all the “future” history 
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];

        // treating squares as immutable. This will allow us to store every past version of the squares array.
        const squares = [...current.squares];

        // if winner found || square is filled
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        // put an X or O in the square
        squares[i] = this.state.xIsNext ? 'X' : 'O';

        // update the state to reflect latest turn
        // stepNumber must reflect the move displayed to the user now
        history.push({
            squares: squares,
            indexClicked: indexClicked
        });

        // find winner if exists
        // this.setState({winningSquares: winner.winningSquares});
        let winner = calculateWinner(history[history.length - 1].squares)
        const winningSquares = winner ? winner.winningSquares : null;        

        this.setState({
            history: history, // .concat([{ squares: squares }]),
            xIsNext: !this.state.xIsNext,
            // retrieves length of history before this move. For move = 1, length = 2
            stepNumber: history.length - 1,
            winningSquares: winningSquares
        })
    }

    jumpTo(move) {
        this.setState({
            stepNumber: move,
            xIsNext: (move % 2) === 0
        });
    }

    generateMovelist(history, sortAsc = true) {
        const moveList = history.map((boardState, move) => {
            // console.log(boardState, move)
            const moveLocation = findMoveLocation(boardState.indexClicked);
            const desc = move ? ('Go to move #' + move + moveLocation) : 'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })
        return sortAsc ? moveList : moveList.reverse();
    }
    generateStatus(winner, currentBoardSquares) {
        let status;
        const numOfSquares = currentBoardSquares.length - 1;
        if (winner) {
            status = 'Winner: ' + winner.winnerName;
            // console.log(winner.winningSquares)
        } else if(numOfSquares == this.state.stepNumber - 1) { //means all squares are filled up
            status = 'Match Drawn'            
        }
        else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return status;
    }

    sortMoves = () => {
        this.setState((prevState) => {
            return { sortMovesAsc: !prevState.sortMovesAsc }
        })
    }
    render() {
        const history = this.state.history;
        const lastMoveIndex = history.length - 1;
        const stepNumber = this.state.stepNumber;

        let current = history[lastMoveIndex];
        if (lastMoveIndex !== this.state.stepNumber) {
            current = history[stepNumber]
        }
        const winner = calculateWinner(current.squares)
        const moves = this.generateMovelist(history, this.state.sortMovesAsc)
        const status = this.generateStatus(winner, current.squares);

        return (
            <div className='game'>
                <div className='game-board'>
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                        selectedSquareIndex={current.indexClicked}
                        winningSquares={this.state.winningSquares}
                    />
                </div>
                <div className='game-info'>
                    <div>
                        {status}
                        <button className='sortBtn' onClick={this.sortMoves}>Sort</button>
                    </div>
                    <ol>{moves}</ol>
                </div>
            </div>
        )
    }
}

export default Game;