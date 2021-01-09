import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { Person } from '@material-ui/icons';
import{ AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';

import useStyles from './TopNavbarStyles';
import logo from 'assets/images/zoomit_small_logo.png';
import {eventsPageRoute, zoomerPageRoute, profilePageRoute, managePageRoute} from 'utils/Routes/Routes';


const TopNavBar: React.FC = (): JSX.Element => {
    const classes = useStyles();
    const { path } = useRouteMatch();

    return (
        <div >
            <AppBar position="static" className={classes.appBar} dir='rtl'>
                <Toolbar variant="dense">
                    <div className={classes.rightSection}>
                        <NavLink className={classes.menuLink} activeClassName={classes.activeItem} to={`${path}${eventsPageRoute}`}>
                            <img alt='logo' src={logo}  />
                        </NavLink>
                        <NavLink className={classes.menuLink} activeClassName={classes.activeItem} to={`${path}${eventsPageRoute}`}>
                            <Typography variant="h6" color="inherit" className={classes.menuTypog}> 
                                זומים
                            </Typography>
                        </NavLink> 
                        <NavLink className={classes.menuLink} activeClassName={classes.activeItem} to={`${path}${profilePageRoute}`}>
                            <Typography variant="h6" color="inherit" className={classes.menuTypog}> 
                                    הפרופיל שלי
                            </Typography>
                        </NavLink> 
                        <NavLink className={classes.menuLink} activeClassName={classes.activeItem} to={`${path}${zoomerPageRoute}`}>
                            <Typography variant="h6" color="inherit" className={classes.menuTypog}>
                                אני זומר
                            </Typography>
                        </NavLink> 
                    </div> 
                    <div className={classes.leftSection}>
                        <NavLink className={classes.menuLink} activeClassName={classes.activeItem} to={`${path}${managePageRoute}`}>
                            <Typography variant="h6" color="inherit" className={classes.menuTypog + ' ' + classes.admin}> 
                            ניהול המערכת
                            </Typography>
                        </NavLink> 
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
