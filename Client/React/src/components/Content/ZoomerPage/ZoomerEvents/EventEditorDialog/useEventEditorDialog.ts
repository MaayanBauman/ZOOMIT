import React from 'react';
import {useSelector} from 'react-redux';

import axios from 'utils/axios';
import User from 'models/User/User'; 
import Event from 'models/Event/Event';
import StoreStateType from 'redux/storeStateType';
import {setUser} from 'redux/User/userActionCreator';
import {useZoomerPageOutCome} from './useEventEditorDialogInterfaces';

const useEventEditorDialog  = () : useZoomerPageOutCome  => {

    const zoomer = useSelector<StoreStateType, User>(state=> state.user);
    const [startDate, setStartDate] = React.useState<Date | null>(new Date());
    const [endDate, setEndDate] = React.useState<Date | null>(new Date());
    const [eventName, setEventName] = React.useState<string>('');
    const [categoryId, setCategoryId] = React.useState<string>();
    const [description, setDescription] = React.useState<string>('');
    const [link, setLink] = React.useState<string>('');
    const [price, setPrice] = React.useState<number>(0);
    const [maxRegisters, setMaxRegisters] = React.useState<number>(100);
    const [zoomPass, setZoomPass] = React.useState<string>('');


    const handleDateChange = (date: Date | null) => {
        setStartDate(date);
        setEndDate(date);
    };
    
    const createEvent = () => {

        const newEvent : Event = {
            id: '',
            title: eventName,
            description: description,
            zoomer_id: zoomer._id,
            zoom_link: link,
            password: zoomPass,
            start_time: startDate as Date,
            end_time: endDate as Date,
            max_registers: maxRegisters,
            registered_users: [],
            category: categoryId as string,
            price: price,
            source_id: ''
        }

        axios.post('/events/zoomer', {event: newEvent}).then((res)=> {
            console.log(res.data.ops[0]._id);
            setUser({
                ...zoomer,
                owned_events: [...zoomer.owned_events, res.data.ops[0]._id]
            })
        }).catch((err)=> {
            console.log(err);
        })
    }

    return {
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        handleDateChange,
        eventName,
        setEventName,
        categoryId,
        setCategoryId,
        description,
        setDescription,
        link,
        setLink,
        price,
        setPrice,
        maxRegisters,
        setMaxRegisters,
        zoomPass,
        setZoomPass,
        createEvent
    }
}

export default useEventEditorDialog;