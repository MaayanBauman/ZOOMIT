import React, { SyntheticEvent, useEffect } from 'react';
import useStyles from './AlertStyles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { socket } from 'components/useApp';
import { useHistory } from "react-router-dom";
import { managePageRoute, contentRoute } from 'utils/Routes/Routes';
import { Button } from '@material-ui/core';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
  
const AlertRequst: React.FC = (): JSX.Element => {
    const history = useHistory();

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        socket.on('new-zoomer-request', () => {
            setOpen(true);
        });
      }, []);
      

    const handleClose = (event?: SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
     };

    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} className={classes.container} severity="info"
                action={
                    <Button color="inherit" size="small" style={{marginRight:"10px"}} onClick={ () => { 
                        history.push(`${contentRoute}${managePageRoute}/`)
                    }}> צפה בבקשה </Button>
                   }>
                    בקשת זומר חדשה!
                </Alert>
            </Snackbar>
        </div>
    );
}

export default AlertRequst;
