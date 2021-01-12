import { useState, useEffect } from 'react';

import axios from 'utils/axios';
import Category from 'models/Category/Category';

const useSignUpDialog = () : useEventPageOutCome  => {
    
    const [categories, setCategories] = useState<Category[]>([]);
    const [favoriteCategories, setFavoriteCategories] = useState<string[]>([]);

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
        setFavoriteCategories([...favoriteCategories, event.target.value])
        console.log(event.target);
    }

    useEffect(() => {
        getCategories();
    }, []);
    
    return {
        categories,
        favoriteHandler,
        favoriteCategories
    }
}

interface useEventPageOutCome {
    categories: Category[],
    favoriteHandler: (event:any ) => void,
    favoriteCategories: string[]
}

export default useSignUpDialog;