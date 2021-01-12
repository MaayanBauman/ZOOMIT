import { useState, useEffect, Dispatch } from 'react';

import axios from 'utils/axios';
import Category from 'models/Category/Category';

const useSignUpDialog = () : useEventPageOutCome  => {
    
    const [categories, setCategories] = useState<Category[]>([]);
    const [favoriteCategories, setFavoriteCategories] = useState<string[]>([]);
    const [userName, setUserName] = useState<string>('');

    const getCategories = () => {
        axios.get('/categories')
        .then((result : any)=> {
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
        alert(userName)
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

export default useSignUpDialog;