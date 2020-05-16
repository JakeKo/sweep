import React from 'react';
import './GameEndAlert.css';
import { formatTimerDisplay, BOARD_STATE } from '../utilities';

export default class GameEndAlert extends React.Component {
    render = () => {
        const { boardState, timerValue, resetGame } = this.props;
        return (
            <React.Fragment>
                <div className='game-end-background'></div>
                <form className='game-end-alert'>
                    {boardState === BOARD_STATE.WIN ? 'You won!' : 'Game over.'}<br />
                    Game time: {formatTimerDisplay(timerValue)}
                    <button className='game-end-acknowledgement' onClick={resetGame}>RESET</button>
                </form>
            </React.Fragment>
        )
    }
}