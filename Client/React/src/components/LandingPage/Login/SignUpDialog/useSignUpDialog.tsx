import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';

import axios from 'utils/axios';
import User from 'models/User/User';
import useStyles from './SignUpDialogStyles';
import Category from 'models/Category/Category';
import StoreStateType from 'redux/storeStateType';
import {setUser} from 'redux/User/userActionCreator';
import {eventsPageRoute, contentRoute} from 'utils/Routes/Routes';

const useSignUpDialog  = ({ handleClose } : useEventPageInCome) : useEventPageOutCome  => {
    
    const [userName, setUserName] = useState<string>('');
    const [favoriteCategories, setFavoriteCategories] = useState<string[]>([]);

    const user = useSelector<StoreStateType, User>(state => state.user);
    const categories = useSelector<StoreStateType,Category[]>(state=> state.categories);

    const classes = useStyles();
    const history = useHistory();

    const favoriteHandler = (event : any) => {
        const newFav = event.target.value;
        if(!favoriteCategories.find((value) => value === newFav)){
            setFavoriteCategories([...favoriteCategories, event.target.value])
        } else {
            setFavoriteCategories(favoriteCategories.filter((item: string) => item !== newFav))
        }
    }

    const createUser = () => {
        handleClose();
        var newUser =  { 
            ...user,
            favorite_categories : favoriteCategories,
            full_name: userName
        }

        axios.post('users', { user: newUser })
        .then((response: any) => {
            if (response) {
                newUser._id = response.data.insertedId;
                setUser(newUser);
                Swal.fire({
                    title: 'המשתמש נוצר בהצלחה',
                    text: ',תמשיך הלאה לכל האירועים',
                    icon: 'success',
                    confirmButtonText: 'יאלה קח אותי',
                    customClass: {
                        title: classes.swal,
                        content: classes.swal,
                        container: classes.swal
                    },
                  }).then(()=> {
                    history.push(contentRoute + eventsPageRoute);
                  })        
            }
        })
        .catch((error)=> {
            console.log(error)
        })
    }

    return {
        categories,
        favoriteHandler,
        favoriteCategories,
        createUser,
        userName,
        setUserName
    }
}

interface useEventPageOutCome {
    categories: Category[],
    favoriteHandler: (event:any ) => void,
    favoriteCategories: string[],
    createUser: () => void,
    userName: string,
    setUserName: Function
}

interface useEventPageInCome {
    handleClose: () => void
}

export default useSignUpDialog;