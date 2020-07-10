import React from 'react';
import { getStyles, withTheme } from '../utilities/theming';

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
    hidden: {
        background: 'rgba(255, 255, 255, 0.2)',
        '&:hover': {
            background: 'rgba(255, 255, 255, 0.3)'
        }
    },
    flagged: {
        color: theme.color.primary.standard
    }
});

class HiddenCell extends React.Component {
    onClickHandler = event => {
        event.preventDefault();

        const { x, y, isFlagged, toggleFlagCell, revealCell } = this.props;
        if (event.type === 'contextmenu') toggleFlagCell(x, y);
        else if (event.type === 'click' && !isFlagged) revealCell(x, y);
    }

    render = () => {
        const { theme, isFlagged } = this.props;
        const { cell, hidden, flagged } = getStyles(theme, customStyles);
        return (
            <div
                style={{ ...cell, ...hidden, ...(isFlagged ? flagged: {})}}
                onClick={this.onClickHandler}
                onContextMenu={this.onClickHandler}
            >{isFlagged ? 'X' : ''}</div>
        );
    }
}

export default withTheme(HiddenCell);
