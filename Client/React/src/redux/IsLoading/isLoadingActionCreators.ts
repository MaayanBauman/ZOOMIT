import store from '../store';
import * as actionTypes from './isLoadingActionTypes';

export const setIsLoading = (isLoading: boolean): void => {
    store.dispatch({
        type: actionTypes.SET_IS_LOADING,
        payload: {isLoading}
    })
}