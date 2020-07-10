import React from 'react';
import { getStyles, withTheme } from '../utilities/theming';
import { BOARD_STATE } from '../utilities/utilities';
import HiddenCell from './HiddenCell';
import RevealedCell from './RevealedCell';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initializeBoard(props);
    }

    initializeBoard({ width, height, mineCount }) {
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
        const minePositions = [...set].map(JSON.parse);
        minePositions.forEach(({ x, y }) => {
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

        return {
            minePositions,
            matrix: boardModel
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.id !== this.props.id) {
            this.setState(this.initializeBoard(this.props));
        }
    }

    // Handle clicking on a cell with the right number of flags around it to reveal adjacent cells
    revealCell = (x, y) => {
        const { height, width } = this.props;
        const spreadReveal = (matrix, x, y) => {
            if (matrix[x][y].isRevealed) return matrix;
            matrix[x][y].isRevealed = true;
            if (matrix[x][y].mineCount > 0 || matrix[x][y].isMine) return matrix;

            if (x > 0 && y > 0) matrix = spreadReveal(matrix, x - 1, y - 1);
            if (x > 0) matrix = spreadReveal(matrix, x - 1, y);
            if (x > 0 && y < height - 1) matrix = spreadReveal(matrix, x - 1, y + 1);
            if (y > 0) matrix = spreadReveal(matrix, x, y - 1);
            if (x < width - 1) matrix = spreadReveal(matrix, x + 1, y);
            if (x < width - 1 && y > 0) matrix = spreadReveal(matrix, x + 1, y - 1);
            if (y < height - 1) matrix = spreadReveal(matrix, x, y + 1);
            if (x < width - 1 && y < height - 1) matrix = spreadReveal(matrix, x + 1, y + 1);

            return matrix;
        };

        const newMatrix = spreadReveal(this.state.matrix, x, y);
        this.setState({ matrix: newMatrix });
        this.props.emitBoardState(this.evaluateBoardState());
    }

    toggleFlagCell = (x, y) => {
        // Ignore the attempt to toggle the cell flag if the cell is already revealed
        if (this.state.matrix[x][y].isRevealed) return;

        this.setState({
            matrix: this.state.matrix.map(column => column.map(cell => ({
                ...cell,
                isFlagged: cell.x === x && cell.y === y ? !cell.isFlagged : cell.isFlagged
            })))
        });
    }

    evaluateBoardState = () => {
        const { height, width, mineCount } = this.props;
        const { matrix, minePositions } = this.state;

        const revealedMine = minePositions.some(({ x, y }) => matrix[x][y].isRevealed && matrix[x][y].isMine);
        if (revealedMine) return BOARD_STATE.GAME_OVER;

        const nonMineCount = height * width - mineCount;
        const revealedCount = matrix.reduce((sum, column) => sum + column.reduce((sum, cell) => sum + cell.isRevealed, 0), 0);

        return nonMineCount === revealedCount ? BOARD_STATE.WIN : BOARD_STATE.CONTINUE;
    }

    render = () => {
        const { flexRow, flexCol } = getStyles(this.props.theme);

        return (
            <div style={flexRow}>
                {this.state.matrix.map(column =>
                    <div style={flexCol} key={Math.random()}>
                        {column.map(cell => cell.isRevealed
                            ? <RevealedCell key={Math.random()} {...cell} />
                            : <HiddenCell key={Math.random()} {...cell} revealCell={this.revealCell} toggleFlagCell={this.toggleFlagCell} />)}
                    </div>
                )}
            </div>
        );
    }
};

export default withTheme(Board);
