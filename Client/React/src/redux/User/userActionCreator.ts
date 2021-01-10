import store from '../store';
import User from 'models/User/User';
import * as actionTypes from './userActionTypes';

export const setIsLoading = (user: User): void => {
    store.dispatch({
        type: actionTypes.SET_USER,
        payload: {...user}
    })
}