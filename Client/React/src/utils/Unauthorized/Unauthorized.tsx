import React from 'react';
import { Typography } from '@material-ui/core';

import useStyles from './UnauthorizedStyles';

const Unauthorized: React.FC = () => {

    const classes = useStyles();

    return (
      <div>
          <Typography>אין לך הרשאות לצפות בדף זה</Typography>
      </div>    
    );
}

export default Unauthorized;
