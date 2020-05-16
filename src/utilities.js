export const BOARD_STATE = {
    GAME_OVER: 'GAME OVER',
    CONTINUE: 'CONTINUE',
    WIN: 'WIN'
};

export const BOARD_PARAMETERS = {
    easy: {
        height: 15,
        width: 15,
        mineCount: 20
    },
    medium: {
        height: 25,
        width: 25,
        mineCount: 75
    },
    hard: {
        height: 30,
        width: 60,
        mineCount: 250
    }
};

export const formatTimerDisplay = timerValue => [
    Math.floor(timerValue / 60).toString().padStart(2, '0'),
    (timerValue % 60).toString().padStart(2, '0'),
].join(':');