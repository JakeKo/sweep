import React from 'react';
import './Board.css';
import Cell from '../Cell/Cell';

function createBoardModel(width, height, mineCount) {
    const boardModel = [...Array(width).keys()].map(x =>
        [...Array(height).keys()].map(y => ({
            x,
            y,
            isMine: false,
            mineCount: 0
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

    // Place the mines and increment the count of surrounding cells
    [...set].map(JSON.parse).forEach(({ x, y }) => {
        if (x > 0 && y > 0) if (!boardModel[x - 1][y - 1].isMine) boardModel[x - 1][y - 1].mineCount++;
        if (x > 0) if (!boardModel[x - 1][y].isMine) boardModel[x - 1][y].mineCount++;
        if (x > 0 && y < height - 1) if (!boardModel[x - 1][y + 1].isMine) boardModel[x - 1][y + 1].mineCount++;
        if (y > 0) if (!boardModel[x][y - 1].isMine) boardModel[x][y - 1].mineCount++;
        boardModel[x][y].isMine = true;
        if (y < height - 1) if (!boardModel[x][y + 1].isMine) boardModel[x][y + 1].mineCount++;
        if (x < width - 1 && y > 0) if (!boardModel[x + 1][y - 1].isMine) boardModel[x + 1][y - 1].mineCount++;
        if (x < width - 1) if (!boardModel[x + 1][y].isMine) boardModel[x + 1][y].mineCount++;
        if (x < width - 1 && y < height - 1) if (!boardModel[x + 1][y + 1].isMine) boardModel[x + 1][y + 1].mineCount++;
    });

    return boardModel;
}

function Board() {
    return (
        <div className='board'>
            {createBoardModel(25, 25, 100).map(column =>
                <div className='column' key={Math.random()}>
                    {column.map(cell => <Cell key={Math.random()} isMine={cell.isMine} mineCount={cell.mineCount} />)}
                </div>
            )}
        </div>
    );
}

export default Board;
