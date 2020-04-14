import React from 'react';
import './RevealedCell.css';

export default class Cell extends React.Component {
    evaluateCellClass = () => {
        return ['cell', this.props.isMine ? 'cell-mine' : `cell-value-${this.props.mineCount}`].join(' ');
    }

    evaluteCellContent = () => {
        return this.props.isMine ? 'M' : (this.props.mineCount > 0 ? this.props.mineCount : '');
    }

    render = () => {
        return (
            <div className={this.evaluateCellClass()}>{this.evaluteCellContent()}</div>
        );
    }
}
