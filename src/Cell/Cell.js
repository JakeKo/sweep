import React from 'react';
import './Cell.css';

function Cell({ isMine, mineNeighborCount }) {
    return (
        <React.Fragment>
            {isMine && <div className='cell cell-mine'>M</div>}
            {!isMine && <div className={`cell cell-value-${mineNeighborCount}`}>{mineNeighborCount}</div>}
        </React.Fragment>
    );
}

export default Cell;
