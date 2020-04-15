import React from 'react';
import './GameEndAlert.css';

const BOARD_STATE = {
    GAME_OVER: 'GAME OVER',
    CONTINUE: 'CONTINUE',
    WIN: 'WIN'
};

export default class GameEndAlert extends React.Component {
    render = () => {
        const { boardState, resetGame } = this.props;
        return (
            <React.Fragment>
                <div className='game-end-background'></div>
                <form className='game-end-alert'>
                    {boardState === BOARD_STATE.WIN ? 'You won!' : 'Game over.'}
                    <button className='game-end-acknowledgement' onClick={resetGame}>RESET</button>
                </form>
            </React.Fragment>
        )
    }
}