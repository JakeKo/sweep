import { createTheming } from '@callstack/react-theme-provider';

const themes = {
    'light': {
        color: {
            primary: {
                darker: '#BBBBBB',
                standard: '#DDDDDD',
                lighter: '#FFFFFF'
            }
        },
        font: {
            body: {
                typeface: 'monospace',
                weigth: 'standard',
                size: '1rem'
            }
        }
    },
    'dark': {

    },
    'high-contrast': {

    }
};

const { ThemeProvider, withTheme } = createTheming(themes['light']);

const getStyles = (theme, customStyles = () => ({})) => {
    const flexRow = {
        display: 'flex',
        flexDirection: 'row'
    };

    const flexCol = {
        display: 'flex',
        flexDirection: 'column'
    };

    const flexRowTL = {
        ...flexRow,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    };

    const flexRowTC = {
        ...flexRow,
        justifyContent: 'center',
        alignItems: 'flex-start'
    };

    const flexRowTR = {
        ...flexRow,
        justifyContent: 'flex-end',
        alignItems: 'flex-start'
    };

    const flexRowCL = {
        ...flexRow,
        justifyContent: 'flex-start',
        alignItems: 'center'
    };

    const flexRowCC = {
        ...flexRow,
        justifyContent: 'center',
        alignItems: 'center'
    };

    const flexRowCR = {
        ...flexRow,
        justifyContent: 'flex-end',
        alignItems: 'center'
    };

    const flexRowBL = {
        ...flexRow,
        justifyContent: 'flex-start',
        alignItems: 'flex-end'
    };

    const flexRowBC = {
        ...flexRow,
        justifyContent: 'center',
        alignItems: 'flex-end'
    };

    const flexRowBR = {
        ...flexRow,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    };

    const flexColTL = {
        ...flexCol,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    };

    const flexColTC = {
        ...flexCol,
        justifyContent: 'flex-start',
        alignItems: 'center'
    };

    const flexColTR = {
        ...flexCol,
        justifyContent: 'flex-start',
        alignItems: 'flex-end'
    };

    const flexColCL = {
        ...flexCol,
        justifyContent: 'center',
        alignItems: 'flex-start'
    };

    const flexColCC = {
        ...flexCol,
        justifyContent: 'center',
        alignItems: 'center'
    };

    const flexColCR = {
        ...flexCol,
        justifyContent: 'center',
        alignItems: 'flex-end'
    };

    const flexColBL = {
        ...flexCol,
        justifyContent: 'flex-end',
        alignItems: 'flex-start'
    };

    const flexColBC = {
        ...flexCol,
        justifyContent: 'flex-end',
        alignItems: 'center'
    };

    const flexColBR = {
        ...flexCol,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    };

    const fullScreen = {
        width: '100vw',
        height: '100vh'
    };

    const fontBody = {
        fontFamily: theme.font.body.typeface,
        fontWeight: theme.font.body.weight,
        fontSize: theme.font.body.size
    };

    const baseStyles = {
        flexRow,
        flexCol,
        flexRowTL,
        flexRowTC,
        flexRowTR,
        flexRowCL,
        flexRowCC,
        flexRowCR,
        flexRowBL,
        flexRowBC,
        flexRowBR,
        flexColTL,
        flexColTC,
        flexColTR,
        flexColCL,
        flexColCC,
        flexColCR,
        flexColBL,
        flexColBC,
        flexColBR,
        fullScreen,
        fontBody
    };

    return {
        ...baseStyles,
        ...customStyles(theme, baseStyles)
    };
}

export { ThemeProvider, withTheme, themes, getStyles };
