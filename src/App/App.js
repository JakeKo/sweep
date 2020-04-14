import React from 'react';
import './App.css';
import Board from '../Board/Board';

const BOARD_PARAMETERS = {
    easy: { height: 15, width: 15, mineCount: 30 },
    medium: { height: 25, width: 25, mineCount: 50 },
    hard: { height: 30, width: 60, mineCount: 200 }
};

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            difficulty: 'medium',
            boardId: Math.random()
        };
    }

    changeGameDifficulty = event => {
        this.setState({ difficulty: event.target.value, boardId: Math.random() });
    }

    resetGame = event => {
        event.preventDefault();
        this.setState({ boardId: Math.random() });
    }

    render = () => {
        const { difficulty, boardId } = this.state;
        const { height, width, mineCount } = BOARD_PARAMETERS[difficulty];

        return (
            <div className='app'>
                <form className='game-controls'>
                    <select className='game-difficulty' value={difficulty} onChange={this.changeGameDifficulty}>
                        <option value='easy'>EASY</option>
                        <option value='medium'>MEDIUM</option>
                        <option value='hard'>HARD</option>
                    </select>
                    <button className='game-reset' onClick={this.resetGame}>RESET</button>
                </form>
                <Board id={boardId} height={height} width={width} mineCount={mineCount} />
            </div>
        );
    }
};
