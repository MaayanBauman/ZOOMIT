import store from '../store';
import User from 'models/User/User';
import * as actionTypes from './userActionTypes';

export const setUser = (user: User): void => {
    store.dispatch({
        type: actionTypes.SET_USER,
        payload: {user : user}
    })
}