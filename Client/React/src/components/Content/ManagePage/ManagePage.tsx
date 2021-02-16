import React from "react";
import Iframe from 'react-iframe';
import {useSelector} from 'react-redux';

import User from 'models/User/User';
import UserType from 'models/Enums/UserType';
import StoreStateType from 'redux/storeStateType';
import Unauthorized from 'utils/Unauthorized/Unauthorized';
import useStyles from './ManagePageStyles';

const ManagePage: React.FC = (): JSX.Element => {
    const classes = useStyles();

    const user = useSelector<StoreStateType, User>(state => state.user);
    
    return (
        <>
            { user.user_type !== UserType.ADMIN ?  
                <Unauthorized /> :
                <Iframe url={process.env.REACT_APP_MANAGE_URL || ""}
                  width="100%"
                  height="100%"
                  id="myId"
                  className={classes.iframe}
                  position="relative"
                />
            }
        </>
    )
}

export default ManagePage;


