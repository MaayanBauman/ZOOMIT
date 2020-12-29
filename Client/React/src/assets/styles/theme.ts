import { createMuiTheme } from '@material-ui/core/styles';

export const primaryBackgroundColor = '#F3F6FB';

const theme = createMuiTheme({
    direction: 'rtl',
    typography: {
        fontSize: 15,
        fontFamily: 'Assistant',
        fontWeightRegular: 500,
        fontWeightMedium: 600,
    },
    palette: {
        primary: {
            light: '#f69d69',
            main: '#F26D21',
            dark: '#d4550c',
            contrastText: '#fff',
        }
    }
});

export default theme;
