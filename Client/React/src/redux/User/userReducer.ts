import * as Actions from './userActionTypes';
import User from 'models/User/User';

export const initialState: User = {
    id: '',
    full_name: '',
    email:'',
    user_type: '',
    favorite_categories: [],
    owned_events: [],
    photograph: '',
    approved_date: new Date(''),
    description: '',
    is_waiting_for_approval: false,
    registerd_events:[]
}

const userReducer = (state = initialState, action: Actions.userAction): User => {
    switch (action.type) {
        case Actions.SET_USER: return action.payload.user

        default: return state;
    }
}

export default userReducer;