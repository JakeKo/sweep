import React from 'react';
import './Cell.css';

export default class Cell extends React.Component {
    onClickHandler = event => {
        event.preventDefault();

        const { isFlagged, x, y } = this.props.model;
        const { toggleFlagCell, revealCell } = this.props;

        if (event.type === 'contextmenu') toggleFlagCell(x, y);
        else if (event.type === 'click' && !isFlagged) revealCell(x, y);
    }

    evaluateCellClass = () => {
        const { isMine, mineCount, isRevealed, isFlagged } = this.props.model;

        return [
            'cell',
            isRevealed ? (isMine ? 'cell-mine' : `cell-value-${mineCount}`) : 'cell-hidden',
            isFlagged ? 'cell-flagged' : ''
        ].join(' ');
    }

    evaluteCellContent = () => {
        const { isMine, mineCount, isRevealed, isFlagged } = this.props.model;

        if (isFlagged) return 'X';
        if (!isRevealed) return '';
        return isMine ? 'M' : (mineCount > 0 ? mineCount : '');
    }

    render = () => {
        return (
            <div
                className={this.evaluateCellClass()}
                onClick={this.onClickHandler}
                onContextMenu={this.onClickHandler}
            >{this.evaluteCellContent()}</div>
        );
    }
}
