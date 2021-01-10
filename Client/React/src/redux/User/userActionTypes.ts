import User from 'models/User/User';

export const SET_USER = 'SET_USER';

interface SetUser {
    type: typeof SET_USER,
    payload: { user: User }
}

export type userAction = SetUser;
