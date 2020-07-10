import React from 'react';
import './RevealedCell.css';
import { withTheme, getStyles } from '../theming';

const colors = {
    1: 'blue',
    2: 'green',
    3: 'red',
    4: 'indigo',
    5: 'purple',
    6: 'teal',
    7: 'black',
    8: 'grey'
};
const customStyles = (theme, baseStyles) => ({
    cell: {
        height: '25px',
        width: '25px',
        border: '1px solid #121212',
        ...baseStyles.flexRowCC,
        ...baseStyles.fontBody,
        borderRadius: '2px',
        cursor: 'pointer'
    },
    revealed: {
        background: 'rgba(255, 255, 255, 0.08)',
        '&:hover': {
            background: 'rgba(255, 255, 255, 0.15)'
        }
    },
    mine: {
        background: '#F06543',
        color: theme.color.primary.lightest
    },
    cellValue: value => ({
        color: colors[value]
    })
});

class Cell extends React.Component {
    evaluteCellContent = () => {
        const { isMine, mineCount } = this.props;
        return isMine ? 'M' : (mineCount > 0 ? mineCount : '');
    }

    render = () => {
        const { isMine, mineCount, theme } = this.props;
        const { cell, revealed, mine, cellValue } = getStyles(theme, customStyles);
        const style = {
            ...cell,
            ...revealed,
            ...(isMine ? mine : cellValue(mineCount))
        };

        return (
            <div style={style}>{this.evaluteCellContent()}</div>
        );
    }
}

export default withTheme(Cell);
