import React from 'react';
import './Cell.css';

export default class Cell extends React.Component {
    render() {
        const { isMine, mineCount } = this.props;
        return (
            <React.Fragment>
                {isMine && <div className='cell cell-mine'>M</div>}
                {!isMine && <div className={`cell cell-value-${mineCount}`}>{mineCount > 0 ? mineCount : ''}</div>}
            </React.Fragment>
        );
    }
}
