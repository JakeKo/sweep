import React from 'react';
import './GameControls.css';

export default class GameControls extends React.Component {
    render = () => {
        const { difficulty, changeGameDifficulty, resetGame } = this.props;

        return (
            <form className='game-controls'>
                <select className='game-difficulty' value={difficulty} onChange={changeGameDifficulty}>
                    <option value='easy'>EASY</option>
                    <option value='medium'>MEDIUM</option>
                    <option value='hard'>HARD</option>
                </select>
                <button className='game-reset' onClick={resetGame}>RESET</button>
            </form>
        );
    }
}