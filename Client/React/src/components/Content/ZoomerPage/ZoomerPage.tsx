import React, {useState} from 'react';
import {useSelector} from 'react-redux'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import { Avatar, Typography, TextField } from '@material-ui/core';

import User from 'models/User/User';
import UserType from 'models/Enums/UserType';
import StoreStateType from 'redux/storeStateType';
import formatDate  from 'utils/DatesUtil/DatesUtil';
import Unauthorized from 'utils/Unauthorized/Unauthorized';

import useStyles from './ZoomerPageStyles'; 
import useZoomerPage from './useZoomerPage';
import ZoomerEvent from './ZoomerEvents/ZoomerEvents';

const ZoomerPage: React.FC = (): JSX.Element => {

    const classes = useStyles();
    const zoomer = useSelector<StoreStateType, User>(state => state.user);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    const { handleDescriptonChange, updateZoomer } = useZoomerPage();
    
    return (
        <>
            {!(zoomer.user_type === UserType.ZOOMER) ?  
                <Unauthorized /> :
                <>
                    <div  className={classes.zoomerDetailes}>
                        <div className={classes.zoomerHead}> 
                            <Avatar alt="Remy Sharp" src={zoomer.photograph} className={classes.zoomerImg} />
                            <div className={classes.zoomerTitle}>
                                <Typography className={classes.zoomerName} >{zoomer.full_name}</Typography>
                                { zoomer.approved_date &&
                                    <Typography className={classes.zoomerApprovedDate} >{`זומר/ית מ- ${formatDate(zoomer.approved_date)}`}</Typography>
                                }
                            </div>
                        </div>
                        <div  className={classes.zoomerEditDesc}>
                            <TextField
                                className={classes.zoomerDescription}
                                placeholder="הכנס את התיאור שלך"
                                variant="outlined"
                                color='primary'
                                multiline
                                disabled={!isEditMode}
                                value={zoomer.description}
                                onChange= {(event) => handleDescriptonChange(event)}
                            />
                            {
                                !isEditMode ?
                                <EditOutlinedIcon className={classes.descEditIcon} onClick={()=> setIsEditMode(true)}> </EditOutlinedIcon> :
                                <SaveOutlinedIcon className={classes.descEditIcon} onClick={()=> {
                                    setIsEditMode(false); 
                                    updateZoomer();
                                }}> </SaveOutlinedIcon>
                            }
                        </div>
                    </div>
                    <ZoomerEvent />
                </>
            }
        </>
    );
}

export default ZoomerPage;
