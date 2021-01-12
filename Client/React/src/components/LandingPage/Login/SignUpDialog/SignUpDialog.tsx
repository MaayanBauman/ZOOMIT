import React from 'react';
import {DialogTitle,Button, Dialog, DialogActions , Typography,
    DialogContent, FormGroup , Checkbox, FormControlLabel} from '@material-ui/core';
import {Favorite, FavoriteBorder} from '@material-ui/icons';

import useStyles from './SignUpDialogStyles';
import Category from 'models/Category/Category';
import useSignUpDialog from './useSignUpDialog';

const SignUpDialog : React.FC<Props> = ({isOpen, handleClose}: Props): JSX.Element => {
    const classes = useStyles();

    const {categories, favoriteHandler, favoriteCategories} = useSignUpDialog();

    return (
        <div className={classes.root}>
            <Dialog dir='rtl' fullWidth={true} maxWidth='sm' onClose={handleClose}  open={isOpen}>
                <DialogTitle>
                אנחנו רואים שאתה חדש כאן
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        בחר את הקטגוריות האהובות עליך
                    </Typography>
                    <FormGroup row>
                        {categories.map((category: Category) => {
                        return (
                            <FormControlLabel onChange={favoriteHandler}
                            control={<Checkbox value={category.id} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}
                            label={category.name}
                        />
                        )
                        }
                        )}
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
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