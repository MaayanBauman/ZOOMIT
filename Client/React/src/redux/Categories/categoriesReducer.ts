import * as Actions from './categoriesActionTypes';
import Category from 'models/Category/Category';

export const initialState: Category[] = [];

const categoriesReducer = (state = initialState, action: Actions.SetCategoriesAction): Category[] => {
    switch (action.type) {
        case Actions.SET_CATEGORIES: return action.payload.categories

        default: return state;
    }
}

export default categoriesReducer;
