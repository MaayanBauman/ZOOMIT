import React from 'react';
import { Typography, Button } from '@material-ui/core';

import useStyles from './UnauthorizedStyles';
import { useHistory } from 'react-router-dom';
import { contentRoute } from 'utils/Routes/Routes';

const Unauthorized: React.FC = () => {

    const classes = useStyles();
    const history = useHistory();
    const message = 'אופס.. אין לך הרשאות לצפות בדף זה'

    return (
      <div className={classes.container}>
        <div className={classes.backgroundImage}>
          <div  className={classes.details}>
            <Typography className={classes.message}>{message}</Typography>
            <Button className={classes.redirectButton} color="primary" variant="contained" onClick={()=> history.push(contentRoute)}>קח אותי חזרה</Button>
          </div>
        </div>
      </div>    
    );
}

export default Unauthorized;
