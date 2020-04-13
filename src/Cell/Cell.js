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

    render = () => {
        const { isMine, mineCount, isRevealed, isFlagged } = this.props.model;

        return (
            <React.Fragment>
                {!isRevealed && <div className='cell cell-hidden' onClick={this.onClickHandler} onContextMenu={this.onClickHandler}>{isFlagged ? 'X' : ''}</div>}
                {isRevealed && isMine && <div className='cell cell-mine'>M</div>}
                {isRevealed && !isMine && <div className={`cell cell-value-${mineCount}`}>{mineCount > 0 ? mineCount : ''}</div>}
            </React.Fragment>
        );
    }
}
