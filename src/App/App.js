import React from 'react';
import './App.css';
import GameControls from '../GameControls/GameControls';
import Board from '../Board/Board';
import GameEndAlert from '../GameEndAlert/GameEndAlert';
import { formatTimerDisplay, BOARD_PARAMETERS, BOARD_STATE } from '../utilities';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            difficulty: 'medium',
            boardId: Math.random(),
            boardState: BOARD_STATE.CONTINUE,
            timer: 0,
            timerLoop: undefined
        };
    }

    startTimer = () => {
        this.setState({
            timerLoop: setInterval(() => this.setState({ timer: this.state.timer + 1 }), 1000)
        });
    }

    stopTimer = () => {
        clearInterval(this.state.timerLoop);
        this.setState({
            timerLoop: undefined
        });
    }

    changeGameDifficulty = event => {
        this.stopTimer();
        this.setState({
            difficulty: event.target.value,
            boardId: Math.random(),
            boardState: BOARD_STATE.CONTINUE,
            timer: 0
        });
    }

    resetGame = event => {
        event.preventDefault();

        this.stopTimer();
        this.setState({
            boardId: Math.random(),
            boardState: BOARD_STATE.CONTINUE,
            timer: 0
        });
    }

    respondToBoardState = boardState => {
        if (boardState !== BOARD_STATE.CONTINUE) {
            this.stopTimer();
        } else if (this.state.timerLoop === undefined) {
            this.startTimer();
        }

        this.setState({
            boardState
        });
    }

    render = () => {
        const { difficulty, boardId, boardState, timer } = this.state;
        const { height, width, mineCount } = BOARD_PARAMETERS[difficulty];

        return (
            <div className='app'>
                <div className='game-timer'>{formatTimerDisplay(timer)}</div>
                <GameControls difficulty={difficulty} changeGameDifficulty={this.changeGameDifficulty} resetGame={this.resetGame} />
                <Board id={boardId} height={height} width={width} mineCount={mineCount} emitBoardState={this.respondToBoardState} />
                {boardState !== BOARD_STATE.CONTINUE && <GameEndAlert boardState={boardState} timerValue={timer} resetGame={this.resetGame} />}
            </div>
        );
    }
};
