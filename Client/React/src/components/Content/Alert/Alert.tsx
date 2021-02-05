import React, { SyntheticEvent, useEffect } from 'react';
import useStyles from './AlertStyles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { socket } from 'components/useApp';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
  
const AlertRequst: React.FC = (): JSX.Element => {

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
                <Alert onClose={handleClose} className={classes.container} severity="info">
                    בקשת זומר חדשה!
                </Alert>
            </Snackbar>
        </div>
    );
}

export default AlertRequst;
