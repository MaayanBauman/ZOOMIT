import React from 'react';
import { DialogTitle,Button, Dialog, DialogActions ,Select ,MenuItem,
    DialogContent, TextField, InputLabel, InputAdornment  } from '@material-ui/core';
import {  CalendarTodayOutlined } from '@material-ui/icons';

import Category from 'models/Category/Category';
import useStyles from './EventEditorDialogStyles';

const EventEditorDialog : React.FC<Props> = (props : Props): JSX.Element => {

    //const { categories } = ();
    const classes = useStyles();
    const {isOpen, handleClose, isEditMode} = props;

    return (
        <div>
            <Dialog dir='rtl' fullWidth={true} maxWidth='sm' onClose={handleClose}  open={isOpen}>
                <DialogTitle className={classes.dialogTitle}>
                    {isEditMode? 'עריכת זום' : 'יצירת זום'}
                </DialogTitle>
                <DialogContent dividers>
                <form >
                    <div className={classes.formRow}>
                        <InputLabel className={classes.label}>שם</InputLabel>
                        <TextField className={classes.fieldInput} size="small" fullWidth/>
                    </div>
                    <div className={classes.formRow}>
                        <InputLabel className={classes.label}>קטגוריה</InputLabel>
                        <Select
                         className={classes.fieldInput}
                         fullWidth
                        >
                            <MenuItem dir='rtl' value={10}>אמילי</MenuItem>
                        </Select>
                    </div>
                    <div className={classes.formRow}>
                        <InputLabel className={classes.label}>מועד</InputLabel>
                        <TextField className={classes.fieldInput} size="small" fullWidth
                         InputProps={{
                            endAdornment: <CalendarTodayOutlined className={}></CalendarTodayOutlined>
                        }} />
                    </div>
                    <div className={classes.formRow}>
                        <InputLabel className={classes.label}>תיאור</InputLabel>
                        <TextField className={classes.fieldInput} size="small" fullWidth/>
                    </div>
                    <div className={classes.formRow}>
                        <InputLabel className={classes.label}>לינק</InputLabel>
                        <TextField className={classes.fieldInput} size="small" fullWidth/>
                    </div>
                    <div className={classes.formRow}>
                        <InputLabel className={classes.label}>מחיר</InputLabel>
                        <TextField className={classes.fieldInput} size="small" fullWidth
                            InputProps={{
                                endAdornment: <InputAdornment position="end">₪</InputAdornment>
                            }} 
                        /> 
                    </div>
                </form>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" variant="contained">
                       אישור
                    </Button>
                    <Button color="secondary" variant="contained">
                       ביטול
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
};

export interface Props {
    isEditMode: boolean,
    isOpen : boolean,
    handleClose: () => void
}
    
export default EventEditorDialog;