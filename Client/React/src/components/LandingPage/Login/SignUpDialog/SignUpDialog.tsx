import React from 'react';
import {DialogTitle,Button, Dialog, DialogActions , Typography,
    DialogContent, FormGroup , Checkbox, FormControlLabel, TextField} from '@material-ui/core';
import {Favorite, FavoriteBorder} from '@material-ui/icons';

import useStyles from './SignUpDialogStyles';
import Category from 'models/Category/Category';
import useSignUpDialog from './useSignUpDialog';

const SignUpDialog : React.FC<Props> = ({isOpen, handleClose}: Props): JSX.Element => {
    const classes = useStyles();

    const {categories, favoriteHandler, favoriteCategories, createUser,
        userName, setUserName} = useSignUpDialog({handleClose});

    return (
        <div>
            <Dialog dir='rtl' fullWidth={true} maxWidth='sm' onClose={handleClose}  open={isOpen}>
                <DialogTitle>
                אנחנו רואים שאתה חדש כאן
                </DialogTitle>
                <DialogContent dividers>
                <form >
                    <TextField  label="איך קוראים לך" variant="outlined" dir='rtl' onBlur={(event)=> setUserName(event.target.value)}/>
                </form>
                    <Typography gutterBottom>
                        בחר את הקטגוריות האהובות עליך
                    </Typography>
                    <FormGroup row>
                        {
                            categories.map((category: Category) => {
                            return (
                                <FormControlLabel onChange={favoriteHandler}
                                control={<Checkbox value={category.id} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}
                                label={category.name}
                            />)})
                        }  
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={createUser} color="primary">
                        צור משתמש
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
};

export interface Props {
    isOpen : boolean,
    handleClose: () => void
}
    
export default SignUpDialog;