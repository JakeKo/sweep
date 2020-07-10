import React from 'react';
import { getStyles, withTheme } from '../theming';

const customStyles = (theme, baseStyles) => ({
    controls: {
        marginBottom: '24px',
        ...baseStyles.fontBody
    },
    diff: {
        border: 'none',
        outline: 'none',
        ...baseStyles.fontBody,
        background: 'rgba(255, 255, 255, 0.3)',
        color: theme.color.primary.lighter,
        padding: '6px',
        margin: '0 8px',
        cursor: 'pointer',
        borderRadius: '4px',
        '&:after': {
            width: 0,
            height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: '6px solid white',
            position: 'absolute',
            top: '40%',
            right: '5px',
            content: ''
        }
    },
    opt: {
        background: '#121212',
        border: 'none',
        outline: 'none',
        cursor: 'pointer'
    },
    reset: {
        background: 'rgba(255, 255, 255, 0.3)',
        border: 'none',
        outline: 'none',
        ...baseStyles.fontBody,
        color: theme.color.primary.lightest,
        padding: '6px 18px',
        margin: '0 8px',
        cursor: 'pointer',
        borderRadius: '4px'
    }
});

class GameControls extends React.Component {
    render = () => {
        const { difficulty, changeGameDifficulty, resetGame, theme } = this.props;
        const { controls, diff, opt, reset } = getStyles(theme, customStyles);

        return (
            <form style={controls}>
                <select style={diff} value={difficulty} onChange={changeGameDifficulty}>
                    <option style={opt} value='easy'>EASY</option>
                    <option style={opt} value='medium'>MEDIUM</option>
                    <option style={opt} value='hard'>HARD</option>
                </select>
                <button style={reset} onClick={resetGame}>RESET</button>
            </form>
        );
    }
}

export default withTheme(GameControls);
