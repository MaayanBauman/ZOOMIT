import * as Actions from './isLoadingActionTypes';

const initialState: boolean = false

const isLoadingReducer = (state = initialState, action: Actions.IsLoadingAction): boolean => {
    switch (action.type) {
        case Actions.SET_IS_LOADING: return action.payload.isLoading

        default: return state;
    }
}

export default isLoadingReducer;
