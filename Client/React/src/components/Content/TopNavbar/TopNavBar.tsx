import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useRouteMatch } from 'react-router-dom';
import{ AppBar, Toolbar, Typography, IconButton, Avatar } from '@material-ui/core';

import User from 'models/User/User';
import useStyles from './TopNavbarStyles';
import UserType from 'models/Enums/UserType';
import StoreStateType from 'redux/storeStateType';
import logo from 'assets/images/zoomit_small_logo.png';
import SignOutPopover from './SignOutPopover/SignOutPopover';
import {eventsPageRoute, zoomerPageRoute, profilePageRoute, managePageRoute} from 'utils/Routes/Routes';


const TopNavBar: React.FC = (): JSX.Element => {
    const classes = useStyles();
    const { path } = useRouteMatch();

    const user = useSelector<StoreStateType, User>(state => state.user);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState<boolean>(false);

    const handleAvatarMouseOver = (event : any) => {
        setIsPopoverOpen(true);
        setAnchorEl(event.currentTarget);
    };

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
                           { user.user_type === UserType.ZOOMER && 
                            <Typography variant="h6" color="inherit" className={classes.menuTypog}>
                                    אני זומר
                            </Typography>}
                        </NavLink> 
                    </div> 
                    <div className={classes.leftSection}>
                        <Typography variant="h6" color="inherit" className={classes.menuTypog + ' ' + classes.admin}> 
                           {`שלום ${user.full_name}`}
                        </Typography>
                        <NavLink className={classes.menuLink} activeClassName={classes.activeItem} to={`${path}${managePageRoute}`}>
                        {    user.user_type === UserType.ADMIN &&
                            <Typography variant="h6" color="inherit" className={classes.menuTypog + ' ' + classes.admin}> 
                                ניהול המערכת
                            </Typography>}
                        </NavLink> 
                        <IconButton edge="start" color="inherit" aria-lhandleAvatarMouseOverl="menu" >
                            <NavLink className={classes.menuLink} activeClassName={classes.activeItem} to={`${path}${profilePageRoute}`}>
                                <span>
                                    <Avatar alt={user.full_name} 
                                            src={user.photograph} 
                                            onMouseOver={(event)=> handleAvatarMouseOver(event)}/>
                                    <SignOutPopover anchorEl={anchorEl} isOpen={isPopoverOpen} setIsOpen={setIsPopoverOpen}/>
                                </span>                               
                            </NavLink>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default TopNavBar;