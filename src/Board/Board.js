import React from 'react';
import './Board.css';
import Cell from '../Cell/Cell';

export default class Board extends React.Component {
    constructor(props) {
        super(props);

        const mineCount = 50;
        const width = 25;
        const height = 25;

        const boardModel = [...Array(width).keys()].map(x =>
            [...Array(height).keys()].map(y => ({
                x,
                y,
                isMine: false,
                mineCount: 0,
                isRevealed: false,
                isFlagged: false
            }))
        );

        // Create a set of length mineCount comprising unique random x and y values
        const set = new Set();
        while (set.size < mineCount) {
            // Positions are stringified so the set can ignore duplicate positions
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

        this.state = {
            width,
            height,
            matrix: boardModel
        };
    }

    revealCell = (x, y) => {
        const spreadReveal = (matrix, x, y) => {
            if (matrix[x][y].isRevealed) return matrix;
            matrix[x][y].isRevealed = true;
            if (matrix[x][y].mineCount > 0 || matrix[x][y].isMine) return matrix;

            if (x > 0 && y > 0) matrix = spreadReveal(matrix, x - 1, y - 1);
            if (x > 0) matrix = spreadReveal(matrix, x - 1, y);
            if (x > 0 && y < this.state.height - 1) matrix = spreadReveal(matrix, x - 1, y + 1);
            if (y > 0) matrix = spreadReveal(matrix, x, y - 1);
            if (x < this.state.width - 1) matrix = spreadReveal(matrix, x + 1, y);
            if (x < this.state.width - 1 && y > 0) matrix = spreadReveal(matrix, x + 1, y - 1);
            if (y < this.state.height - 1) matrix = spreadReveal(matrix, x, y + 1);
            if (x < this.state.width - 1 && y < this.state.height - 1) matrix = spreadReveal(matrix, x + 1,y + 1);

            return matrix;
        };

        const newMatrix = spreadReveal(this.state.matrix, x, y);
        this.setState({ matrix: newMatrix });
    }

    toggleFlagCell = (x, y) => {
        this.setState({
            matrix: this.state.matrix.map(column => column.map(cell => ({
                ...cell,
                isFlagged: cell.x === x && cell.y === y ? !cell.isFlagged : cell.isFlagged
            })))
        });
    }

    render = () => {
        return (
            <div className='board'>
                {this.state.matrix.map(column =>
                    <div className='column' key={Math.random()}>
                        {column.map(cell => <Cell key={Math.random()} model={cell} revealCell={this.revealCell} toggleFlagCell={this.toggleFlagCell} />)}
                    </div>
                )}
            </div>
        );
    }
};
