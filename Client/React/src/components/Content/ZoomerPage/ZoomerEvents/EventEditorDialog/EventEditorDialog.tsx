import React from 'react';
import {useSelector} from 'react-redux';
import { CalendarToday, AccessTime } from '@material-ui/icons';
import { DialogTitle,Button, Dialog, DialogActions ,Select ,MenuItem,
    DialogContent, TextField, InputLabel, InputAdornment  } from '@material-ui/core';
import { KeyboardTimePicker, KeyboardDatePicker,} from '@material-ui/pickers';
 
import Category from 'models/Category/Category';
import StoreStateType from 'redux/storeStateType';

import useStyles from './EventEditorDialogStyles';
import useEventEditorDialog from './useEventEditorDialog';

const EventEditorDialog : React.FC<Props> = (props : Props): JSX.Element => {

    const classes = useStyles();
    const {isOpen, handleClose, isEditMode} = props;
    const categories = useSelector<StoreStateType,Category[]>(state=> state.categories);

    const {startDate, setStartDate, endDate, setEndDate,handleDateChange,
            eventName, setEventName, categoryId, setCategoryId, description,
            setDescription, link, setLink, price, setPrice,
            maxRegisters, setMaxRegisters, zoomPass, setZoomPass, createEvent } = useEventEditorDialog();

    const datePickers = (
        <>
            <KeyboardDatePicker
                className={classes.picker}
                label="תאריך"
                format="dd/MM/yyyy"
                value={startDate}
                onChange={(date)=> handleDateChange(date)}
                showTodayButton
                keyboardIcon={
                    <CalendarToday className={classes.calendarIcon}/>
                }
            />
            <KeyboardTimePicker
                ampm={false}
                className={classes.picker}
                label="שעת התחלה"
                value={startDate}
                format='HH:mm'
                onChange={(date)=> setStartDate(date)}
                disableToolbar
                keyboardIcon={
                    <AccessTime className={classes.calendarIcon}/>
                }
            />
             <KeyboardTimePicker
                ampm={false}
                className={classes.picker}
                label="שעת סיום"
                value={endDate}
                format='HH:mm'
                onChange={(date)=> setEndDate(date)}
                disableToolbar
                keyboardIcon={
                    <AccessTime className={classes.calendarIcon}/>
                }
            />
        </>
    );

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
                        <TextField size="small" fullWidth
                            value={eventName}
                            onChange={(event)=> setEventName(event.target.value)}/>
                    </div>
                    <div className={classes.formRow}>
                        <InputLabel className={classes.label}>קטגוריה</InputLabel>
                        <Select
                         value={categoryId}
                         fullWidth
                         onChange={(event)=> setCategoryId(event.target.value)}
                        >
                            {categories.map((category: Category) => {
                                return  <MenuItem dir='rtl' value={category.id}>{category.name}</MenuItem>
                            })}
                        </Select>
                    </div>
                    <div className={classes.datePickers + ' ' + classes.formRow}>
                        {datePickers}
                    </div>
                    <div className={classes.formRow}>
                        <InputLabel className={classes.label}>תיאור</InputLabel>
                        <TextField size="small" fullWidth multiline
                         value={description}
                         onChange={(event)=> setDescription(event.target.value)}/>
                    </div>
                    <div className={classes.formRow}>
                        <InputLabel >מס' משתתפים מקסימלי</InputLabel>
                        <TextField size="small" fullWidth
                         value={maxRegisters}
                         onChange={(event)=> setMaxRegisters(event.target.value)}/>
                    </div>
                    <div className={classes.formRow}>
                        <InputLabel className={classes.label}>לינק</InputLabel>
                        <TextField size="small" fullWidth
                         value={link}
                         onChange={(event)=> setLink(event.target.value)}/>
                    </div>
                    <div className={classes.formRow}>
                        <InputLabel className={classes.label}>סיסמה</InputLabel>
                        <TextField size="small" fullWidth
                         value={zoomPass}
                         onChange={(event)=> setZoomPass(event.target.value)}/>
                    </div>
                    <div className={classes.formRow}>
                        <InputLabel className={classes.label}>מחיר</InputLabel>
                        <TextField size="small" fullWidth
                            value={price}
                            onChange={(event)=> setPrice(event.target.value)}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">₪</InputAdornment>
                            }} 
                        /> 
                    </div>
                </form>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" variant="contained" className={classes.dialogButton} 
                        onClick={()=> {
                            createEvent();
                            handleClose();
                        }}>
                       אישור
                    </Button>
                    <Button color="secondary" variant="contained" className={classes.dialogButton} 
                        onClick={handleClose}>
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