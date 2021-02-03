import {useSelector} from 'react-redux'
import { Typography } from '@material-ui/core';

import User from 'models/User/User';
import UserType from 'models/Enums/UserType';
import StoreStateType from 'redux/storeStateType';
import Unauthorized from 'utils/Unauthorized/Unauthorized';

const ZoomerPage: React.FC = (): JSX.Element => {

    const user = useSelector<StoreStateType, User>(state => state.user);
   
    return (
        <div >
            {!(user.user_type === UserType.ZOOMER) ?  
                <Unauthorized /> :
                   <Typography>
                   Zoomer
               </Typography>
            }
        </div>
    );
}

export default ZoomerPage;
