import React from 'react';
import './Board.css';
import Cell from '../Cell/Cell';

function createBoardModel(width, height, mineCount) {
    const boardModel = [...Array(width).keys()].map(x =>
        [...Array(height).keys()].map(y => ({
            x,
            y,
            isMine: false,
            mineNeighborCount: 0
        }))
    );

    // Create an array of length mineCount comprising random x and y values
    // TODO: Enforce no duplicates
    const set = new Set();
    while (set.size < mineCount) {
        set.add(JSON.stringify({
            x: Math.round(Math.random() * (width - 1)),
            y: Math.round(Math.random() * (height - 1))
        }));
    }

    [...set].map(JSON.parse).forEach(({ x, y }) => {
        if (x > 0 && y > 0) if (!boardModel[x - 1][y - 1].isMine) boardModel[x - 1][y - 1].mineNeighborCount++;
        if (x > 0) if (!boardModel[x - 1][y].isMine) boardModel[x - 1][y].mineNeighborCount++;
        if (x > 0 && y < height - 1) if (!boardModel[x - 1][y + 1].isMine) boardModel[x - 1][y + 1].mineNeighborCount++;
        if (y > 0) if (!boardModel[x][y - 1].isMine) boardModel[x][y - 1].mineNeighborCount++;
        boardModel[x][y].isMine = true;
        if (y < height - 1) if (!boardModel[x][y + 1].isMine) boardModel[x][y + 1].mineNeighborCount++;
        if (x < width - 1 && y > 0) if (!boardModel[x + 1][y - 1].isMine) boardModel[x + 1][y - 1].mineNeighborCount++;
        if (x < width - 1) if (!boardModel[x + 1][y].isMine) boardModel[x + 1][y].mineNeighborCount++;
        if (x < width - 1 && y < height - 1) if (!boardModel[x + 1][y + 1].isMine) boardModel[x + 1][y + 1].mineNeighborCount++;
    });

    let boardString = '';
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            boardString += boardModel[x][y].isMine ? 'M' : boardModel[x][y].mineNeighborCount;
        }
        boardString += '\n';
    }
    console.log(boardString);

    return boardModel;
}

function Board() {
    return (
        <div className='board'>
            {createBoardModel(10, 10, 25).map(column =>
                <div className='column'>
                    {column.map(cell =>
                        <Cell isMine={cell.isMine} mineNeighborCount={cell.mineNeighborCount} />
                    )}
                </div>
            )}
        </div>
    );
}

export default Board;
