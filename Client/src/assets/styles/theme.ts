import { createMuiTheme } from '@material-ui/core/styles';

export const primaryBackgroundColor = '#F3F6FB';

const theme = createMuiTheme({
    direction: 'rtl',
    typography: {
        fontSize: 16,
        fontFamily: 'Assistant',
        fontWeightRegular: 400,
        fontWeightMedium: 500,
    }
});

export default theme;
