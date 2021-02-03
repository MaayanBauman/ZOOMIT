import { useState, useEffect } from 'react';

import axios from 'utils/axios';
import Category from 'models/Category/Category';
import User from 'models/User/User';
import Event from 'models/Event/Event';
import { setUser } from 'redux/User/userActionCreator';
import { getEventsByCatgory } from 'utils/Event';
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

const useEventsPage = () : useEventsPageOutCome  => {
    const [eventsByCategories, setEventsByCategories] = useState<EventsByCategories>({});
    const [categories, setCategories] = useState<Category[]>([]);
    const [events, setEvents] = useState<Event[]>([]);

    const getCategories = () => {
        axios.get('/categories')
        .then((result : any)=> {
            const categoriesResult = result.data.map((category: any)=> {
                return {
                    id: category._id,
                    name: category.name,
                }
            });
           setCategories(categoriesResult);
         })
        .catch((error: any)=> (
            console.log(error)
        ))
    }

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

    useEffect(() => {
        getCategories();
    }, []);
    
    return {
        events,
        categories,
        eventsByCategories,
        updateUserFavCategories,
        getUserEventsByCategories,
        favoriteHandler,   
    }
}

interface useEventsPageOutCome {
    events: Event[],
    categories: Category[],
    eventsByCategories: EventsByCategories,
    updateUserFavCategories: Function,
    getUserEventsByCategories: Function,
    favoriteHandler: Function,
}

export default useEventsPage;