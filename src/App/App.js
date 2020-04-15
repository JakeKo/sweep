import React from 'react';
import './App.css';
import GameControls from '../GameControls/GameControls';
import Board from '../Board/Board';
import GameEndAlert from '../GameEndAlert/GameEndAlert';

const BOARD_STATE = {
    GAME_OVER: 'GAME OVER',
    CONTINUE: 'CONTINUE',
    WIN: 'WIN'
};

const BOARD_PARAMETERS = {
    easy: { height: 15, width: 15, mineCount: 20 },
    medium: { height: 25, width: 25, mineCount: 75 },
    hard: { height: 30, width: 60, mineCount: 250 }
};

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            difficulty: 'medium',
            boardId: Math.random(),
            boardState: BOARD_STATE.CONTINUE
        };
    }

    changeGameDifficulty = event => {
        this.setState({
            difficulty: event.target.value,
            boardId: Math.random(),
            boardState: BOARD_STATE.CONTINUE
        });
    }

    resetGame = event => {
        event.preventDefault();
        this.setState({
            boardId: Math.random(),
            boardState: BOARD_STATE.CONTINUE
        });
    }

    respondToBoardState = boardState => {
        this.setState({ boardState });
    }

    render = () => {
        const { difficulty, boardId } = this.state;
        const { height, width, mineCount } = BOARD_PARAMETERS[difficulty];

        return (
            <div className='app'>
                <GameControls difficulty={difficulty} changeGameDifficulty={this.changeGameDifficulty} resetGame={this.resetGame} />
                <Board id={boardId} height={height} width={width} mineCount={mineCount} emitBoardState={this.respondToBoardState} />
                {this.state.boardState !== BOARD_STATE.CONTINUE && <GameEndAlert boardState={this.state.boardState} resetGame={this.resetGame} />}
            </div>
        );
    }
};
