import React from 'react';
import { Person } from '@material-ui/icons';
import{ AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';

import useStyles from './TopNavbarStyles';
import logo from 'assets/images/zoomit_small_logo.png';


const TopNavBar: React.FC = (): JSX.Element => {
    const classes = useStyles();
    return (
        <div >
            <AppBar position="static" className={classes.appBar} dir='rtl'>
                <Toolbar variant="dense">
                    <div className={classes.rightSection}>
                        <img alt='logo' src={logo}  />
                        <Typography variant="h6" color="inherit" className={classes.menuTypog}> 
                            הפרופיל שלי
                        </Typography>
                        <Typography variant="h6" color="inherit" className={classes.menuTypog}>
                            אני זומר
                        </Typography>
                    </div> 
                    <div className={classes.leftSection}>
                    <Typography variant="h6" color="inherit" className={classes.menuTypog + ' ' + classes.admin}>
                            ניהול המערכת
                        </Typography>
                        <IconButton edge="start" color="inherit" aria-label="menu" className={classes.admin}>
                            <Person />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default TopNavBar;
