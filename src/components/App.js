import React from 'react';
import '../index.css';
import { getStyles, ThemeProvider, themes } from '../utilities/theming';
import { BOARD_PARAMETERS, BOARD_STATE, formatTimerDisplay } from '../utilities/utilities';
import Board from './Board';
import GameControls from './GameControls';
import GameEndAlert from './GameEndAlert';

const customStyles = (theme, baseStyles) => ({
    app: {
        ...baseStyles.flexColCC,
        width: '100vw',
        height: '100vh'
    },
    gameTimer: {
        color: theme.color.primary.darker,
        ...baseStyles.fontBody
    }
});

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            difficulty: 'medium',
            boardId: Math.random(),
            boardState: BOARD_STATE.CONTINUE,
            timer: 0,
            timerLoop: undefined,
            theme: themes['light']
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
        const { difficulty, boardId, boardState, timer, theme } = this.state;
        const { height, width, mineCount } = BOARD_PARAMETERS[difficulty];
        const { app, gameTimer } = getStyles(theme, customStyles);

        return (
            <ThemeProvider theme={theme}>
                <div style={app}>
                    <div style={gameTimer}>{formatTimerDisplay(timer)}</div>
                    <GameControls difficulty={difficulty} changeGameDifficulty={this.changeGameDifficulty} resetGame={this.resetGame} />
                    <Board id={boardId} height={height} width={width} mineCount={mineCount} emitBoardState={this.respondToBoardState} />
                    {boardState !== BOARD_STATE.CONTINUE && <GameEndAlert boardState={boardState} timerValue={timer} resetGame={this.resetGame} />}
                </div>
            </ThemeProvider>
        );
    }
};

export default App;
