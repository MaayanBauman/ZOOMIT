import React from 'react';
import {DialogTitle,Button, Dialog, DialogActions, IconButton , Typography,
    DialogContent} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import useStyles from './SignUpDialogStyles';

const SignUpDialog : React.FC<Props> = ({isOpen, handleOpen, handleClose}: Props): JSX.Element => {
    const classes = useStyles();

    return (
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={isOpen}>
        <DialogTitle id="customized-dialog-title">
           יצירת משתמש
        </DialogTitle>
        <DialogContent dividers>
            <Typography gutterBottom>
           כאן תהיה בחירת קטגוריות
            </Typography>
        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
                Save changes
            </Button>
        </DialogActions>
        </Dialog>
    )
    
};

export interface Props {
    isOpen : boolean,
    handleOpen: () => void,
    handleClose: () => void
}
    
export default SignUpDialog;