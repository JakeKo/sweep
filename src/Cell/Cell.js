import React from 'react';
import './Cell.css';

export default class Cell extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isRevealed: false,
            isFlagged: false
        };
    }

    onClickHandler = event => {
        event.preventDefault();

        if (event.type === 'contextmenu') {
            this.setState({ isFlagged: !this.state.isFlagged });
        } else if (event.type === 'click' && !this.state.isFlagged) {
            this.setState({ isRevealed: true });
        }
    }

    render = () => {
        const { isMine, mineCount } = this.props;

        return (
            <React.Fragment>
                {!this.state.isRevealed && <div className='cell' onClick={this.onClickHandler} onContextMenu={this.onClickHandler}>{this.state.isFlagged ? 'X' : ''}</div>}
                {this.state.isRevealed && isMine && <div className='cell cell-mine'>M</div>}
                {this.state.isRevealed && !isMine && <div className={`cell cell-value-${mineCount}`}>{mineCount > 0 ? mineCount : ''}</div>}
            </React.Fragment>
        );
    }
}
