import { useState } from 'react';
import {useSelector} from 'react-redux';

import axios from 'utils/axios';
import User from 'models/User/User';
import { socket } from 'components/useApp';
import Category from 'models/Category/Category';
import { getEventsByCatgory } from 'utils/Event';
import StoreStateType from 'redux/storeStateType';
import Event, {FullEvent} from 'models/Event/Event';
import { setUser } from 'redux/User/userActionCreator';
import {convertEvent, convertFullEvent} from 'utils/EventsUtil/EventsUtil';
import EventsByCategories from 'models/Event/EventsByCategories';

const useProfilePage = () : useEventsPageOutCome  => {

    const categories = useSelector<StoreStateType,Category[]>(state=> state.categories);
    const user = useSelector<StoreStateType, User>(state => state.user);
    const [eventsByCategories, setEventsByCategories] = useState<EventsByCategories>({});
    const [events, setEvents] = useState<FullEvent[]>([]);

    const getUserEventsByCategories = (userId: string) => {
        axios.get(`/users/${userId}/events/join`)
        .then((result : any)=> {
            const eventsResult = result.data.map(convertFullEvent);
            setEvents(eventsResult);
            const eventsByCategories: EventsByCategories = getEventsByCatgory(eventsResult)
            setEventsByCategories(eventsByCategories);
        })
        .catch((error: any) => {
            console.log(error);
        });
    }
    
     const favoriteHandler = (event : any, user: User,) => {
        const newFav = event.target.value;
        const favoriteCategories = user.favorite_categories;
        let userFavCategories = [];
        if (!favoriteCategories?.find((value) => value === newFav)) {
            userFavCategories = [...favoriteCategories, event.target.value];
        } else {
            userFavCategories = favoriteCategories.filter((item: string) => item !== newFav);
        }
        updateUserFavCategories(user, userFavCategories)
    }

    const updateUserFavCategories = (user: User, favCategories: string[]) => {
        const updatedUser = { ...user, favorite_categories : favCategories }
        axios.put(`/users/${user._id}`, { user: updatedUser })
        .then((result : any) => {
            setUser(result.data.value)
        })
        .catch((error: any)=> (
            console.log(error)
        ))
    }

    const createNewZoomerReq = (user: User) => {
        const updatedUser = { ...user, is_waiting_for_approval: true }
        axios.put(`/users/${user._id}`, { user: updatedUser })
        .then((result : any) => {
            setUser(result.data.value)
            socket.emit('new-zoomer-request', user._id);
        })
        .catch((error: any)=> (
            console.log(error)
        ))
    }
    const cancelZoomerReq = (user: User) => {
        const updatedUser = { ...user, is_waiting_for_approval: false }
        axios.put(`/users/${user._id}`, { user: updatedUser })
        .then((result : any) => {
            setUser(result.data.value)
        })
        .catch((error: any)=> (
            console.log(error)
        ))
    }
    
    return {
        user,
        events,
        createNewZoomerReq,
        categories,
        eventsByCategories,
        updateUserFavCategories,
        getUserEventsByCategories,
        favoriteHandler,  
        cancelZoomerReq, 
    }
}

interface useEventsPageOutCome {
    user: User,
    events: FullEvent[],
    categories: Category[],
    eventsByCategories: EventsByCategories,
    updateUserFavCategories: Function,
    getUserEventsByCategories: Function,
    favoriteHandler: Function,
    createNewZoomerReq: Function,
    cancelZoomerReq: Function,
}

export default useProfilePage;