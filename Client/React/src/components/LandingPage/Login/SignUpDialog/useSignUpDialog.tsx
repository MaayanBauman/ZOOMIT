import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import Swal from 'sweetalert2';

import axios from 'utils/axios';
import User from 'models/User/User';
import useStyles from './SignUpDialogStyles';
import Category from 'models/Category/Category';
import StoreStateType from 'redux/storeStateType';
import {setUser} from 'redux/User/userActionCreator';
import {eventsPageRoute, contentRoute} from 'utils/Routes/Routes';

const useSignUpDialog  = ({handleClose} : useEventPageInCome) : useEventPageOutCome  => {
    
    const [categories, setCategories] = useState<Category[]>([]);
    const [userName, setUserName] = useState<string>('');
    const [favoriteCategories, setFavoriteCategories] = useState<string[]>([]);

    const user = useSelector<StoreStateType, User>(state => state.user);

    const classes = useStyles();
    const history = useHistory();

    const getCategories = () => {
        axios.get('/categories')
        .then((result : any) => {
            const categoriesResult = result.data.map((category: any)=> {
                return {
                    id: category._id,
                    name: category.name,
                }
            });
           setCategories(categoriesResult);
         })
        .catch((error: any)=> (
            console.log(error)
        ))
    }

    const favoriteHandler = (event : any) => {
        const newFav = event.target.value;
        if(!favoriteCategories.find((value) => value === newFav)){
            setFavoriteCategories([...favoriteCategories, event.target.value])
        } else {
            setFavoriteCategories(favoriteCategories.filter((item: string) => item !== newFav))
        }
        console.log(event.target);
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

    useEffect(() => {
        getCategories();
    }, []);
    
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