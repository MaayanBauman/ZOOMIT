import * as Actions from './userActionTypes';
import User from 'models/User/User';
import UserType from 'models/Enums/UserType';

export const initialState: User = {
    _id: '',
    full_name: '',
    email:'',
    user_type: UserType.USER,
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
