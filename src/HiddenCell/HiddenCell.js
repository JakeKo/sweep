import React from 'react';
import './HiddenCell.css';

export default class HiddenCell extends React.Component {
    onClickHandler = event => {
        event.preventDefault();

        const { x, y, isFlagged, toggleFlagCell, revealCell } = this.props;
        if (event.type === 'contextmenu') toggleFlagCell(x, y);
        else if (event.type === 'click' && !isFlagged) revealCell(x, y);
    }

    evaluateCellClass = () => {
        return ['cell', 'cell-hidden', this.props.isFlagged ? 'cell-flagged' : ''].join(' ');
    }

    evaluteCellContent = () => {
        return this.props.isFlagged ? 'X' : '';
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
