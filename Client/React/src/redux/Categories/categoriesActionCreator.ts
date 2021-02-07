import store from '../store';
import Category from 'models/Category/Category';
import * as actionTypes from './categoriesActionTypes';

export const setCategories = (categories: Category[]): void => {
    store.dispatch({
        type: actionTypes.SET_CATEGORIES,
        payload: { categories : categories }
    })
}