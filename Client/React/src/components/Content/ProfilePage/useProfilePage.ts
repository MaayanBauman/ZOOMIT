import { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';

import axios from 'utils/axios';
import User from 'models/User/User';
import Event from 'models/Event/Event';
import { socket } from 'components/useApp';
import Category from 'models/Category/Category';
import { getEventsByCatgory } from 'utils/Event';
import StoreStateType from 'redux/storeStateType';
import { setUser } from 'redux/User/userActionCreator';
import EventsByCategories from 'models/Event/EventsByCategories';

const convertEvent = (event: any)=> {
    return {
        id: event._id,
        title: event.title,
        description: event.description,
        zoomer_id: event.zoomer_id,
        zoom_link: event.zoom_link,
        password: event.password,
        start_time: new Date(event.start_time),
        end_time: new Date(event.end_time),
        max_registers: event.max_registers,
        registered_users: event.registered_users,
        category: event.category,
        price: +event.price.$numberDecimal,
        source_id: event.source_id
    }
};

const useProfilePage = () : useEventsPageOutCome  => {

    const categories = useSelector<StoreStateType,Category[]>(state=> state.categories);
    const [eventsByCategories, setEventsByCategories] = useState<EventsByCategories>({});
    const [events, setEvents] = useState<Event[]>([]);

    const getUserEventsByCategories = (userId: string) => {
        axios.get(`/users/${userId}/events`)
        .then((result : any)=> {
            const eventsResult = result.data.map(convertEvent);
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
    events: Event[],
    categories: Category[],
    eventsByCategories: EventsByCategories,
    updateUserFavCategories: Function,
    getUserEventsByCategories: Function,
    favoriteHandler: Function,
    createNewZoomerReq: Function,
    cancelZoomerReq: Function,
}

export default useProfilePage;