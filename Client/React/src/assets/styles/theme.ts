import { createMuiTheme } from '@material-ui/core/styles';

export const primaryBackgroundColor = '#F3F6FB';

declare module '@material-ui/core/styles/createMuiTheme' {
    interface Theme {
        backgrounds: {
            bg1: React.CSSProperties['color'],
            bg2: React.CSSProperties['color']
        }
    }
    interface ThemeOptions {
        backgrounds: {
            bg1: React.CSSProperties['color'],
            bg2: React.CSSProperties['color']
        }
    }
}


const theme = createMuiTheme({
    direction: 'rtl',
    typography: {
        fontSize: 15,
        fontFamily: 'Assistant',
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        subtitle1: {
            color: '#39394D'
        },
        body1: {
            color: '#868692'
        },
        body2: {
            color: '#0C63CE'
        },

    },
    backgrounds: {
        bg1: '#FFFFFF',
        bg2: '#E4F7EB'
    },
    palette: {
        primary: {
            light: '#f69d69',
            main: '#F26D21',
            dark: '#d4550c',
            contrastText: '#fff'
        },
        secondary: {
            main: '#7DC9C0',
        }
    }
});

export default theme;
