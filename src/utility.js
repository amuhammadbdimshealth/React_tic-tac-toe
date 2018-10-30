export function calculateWinner(squares) {
    let winnerName = null;
    const winningLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < winningLines.length; i++) {
        const [a, b, c] = winningLines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            winnerName = squares[a];
            const winningSquares = winningLines[i]
            
            return {winnerName,winningSquares};
        }
    }
    return null;
}

export function findMoveLocation(indexClicked, rowNum = 3, colNum = 3) {
    const rowIndex = Math.floor(indexClicked / rowNum)
    const colIndex = indexClicked % colNum
    return `(${colIndex},${rowIndex})`
}
