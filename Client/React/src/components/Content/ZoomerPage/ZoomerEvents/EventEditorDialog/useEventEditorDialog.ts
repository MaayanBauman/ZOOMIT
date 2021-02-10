import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

import axios from 'utils/axios';
import User from 'models/User/User'; 
import Event from 'models/Event/Event';
import StoreStateType from 'redux/storeStateType';
import {setUser} from 'redux/User/userActionCreator';
import {useZoomerPageOutCome, useZoomerPageInCome} from './useEventEditorDialogInterfaces';

const defaultPrice = 0;
const defaultMaxRegisters = 100;

const useEventEditorDialog = ({currEvent}: useZoomerPageInCome) : useZoomerPageOutCome  => {

    const zoomer = useSelector<StoreStateType, User>(state=> state.user);

    const [link, setLink] = React.useState<string>('');
    const [zoomPass, setZoomPass] = React.useState<string>('');
    const [eventName, setEventName] = React.useState<string>('');
    const [categoryId, setCategoryId] = React.useState<string>();
    const [description, setDescription] = React.useState<string>('');
    const [endDate, setEndDate] = React.useState<Date | null>(new Date());
    const [startDate, setStartDate] = React.useState<Date | null>(new Date());
    const [price, setPrice] = React.useState<number>(defaultPrice);
    const [maxRegisters, setMaxRegisters] = React.useState<number>(defaultMaxRegisters);

    const handleDateChange = (date: Date | null) => {
        setStartDate(date);
        setEndDate(date);
    };

    const setEventFromForm = () : Event => {
        return  {
            id: currEvent? currEvent.id : '',
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
    }
    
    const createEvent = () => {
        axios.post('/events/zoomer', {event: setEventFromForm()}).then((res)=> {
            setUser({
                ...zoomer,
                owned_events: [...zoomer.owned_events, res.data.ops[0]._id]
            })
        }).catch((err)=> {
            console.log(err);
        })
    }

    const updateEvent = () => {
        axios.put(`/events/${currEvent?.id}`, {event: setEventFromForm()}).then((res)=> {
            console.log('updated')
        }).catch((err)=> {
            console.log(err);
        })
    }

    useEffect(()=> {
        if(currEvent) {
            setStartDate(new Date(currEvent.start_time));
            setEndDate(new Date(currEvent.end_time));
            setEventName(currEvent.title);
            setCategoryId(currEvent.category);
            setDescription(currEvent.description);
            setLink(currEvent.zoom_link);
            setPrice(currEvent.price);
            setMaxRegisters(currEvent.max_registers);
            setZoomPass(currEvent.password);
        } else {
            setStartDate(new Date());
            setEndDate(new Date());
            setEventName('');
            setCategoryId(undefined);
            setDescription('');
            setLink('');
            setPrice(defaultPrice);
            setMaxRegisters(defaultMaxRegisters);
            setZoomPass('');
        }
    }, [currEvent])

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
        createEvent,
        updateEvent
    }
}

export default useEventEditorDialog;