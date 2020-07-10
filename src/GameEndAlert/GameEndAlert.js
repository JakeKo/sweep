import React from 'react';
import { getStyles, withTheme } from '../theming';
import { BOARD_STATE, formatTimerDisplay } from '../utilities';

const customStyles = (theme, baseStyles) => ({
    background: {
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        background: 'rgba(0, 0, 0, 0.4)'
    },
    alert: {
        position: 'absolute',
        ...baseStyles.flexColCC,
        color: theme.color.primary.standard,
        ...baseStyles.fontBody,
        zIndex: 2,
        textAlign: 'center'
    },
    acknowledgement: {
        border: 'none',
        outline: 'none',
        color: '#151515',
        ...baseStyles.fontBody,
        background: theme.color.primary.lightest,
        padding: '8px 48px',
        marginTop: '24px',
        borderRadius: '4px',
        cursor: 'pointer'
    }
});

class GameEndAlert extends React.Component {
    render = () => {
        const { boardState, timerValue, resetGame, theme } = this.props;
        const { background, alert, acknowledgement } = getStyles(theme, customStyles);

        return (
            <React.Fragment>
                <div style={background}></div>
                <form style={alert}>
                    {boardState === BOARD_STATE.WIN ? 'You won!' : 'Game over.'}<br />
                    Game time: {formatTimerDisplay(timerValue)}
                    <button style={acknowledgement} onClick={resetGame}>RESET</button>
                </form>
            </React.Fragment>
        )
    }
}

export default withTheme(GameEndAlert);
