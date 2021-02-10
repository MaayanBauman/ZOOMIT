import Swal from 'sweetalert2';
import {useSelector} from 'react-redux';
import React, {useEffect, useState, useRef} from 'react';

import axios from 'utils/axios';
import User from 'models/User/User'; 
import Event from 'models/Event/Event'; 
import theme from 'assets/styles/theme';
import StoreStateType from 'redux/storeStateType';
import {setUser}  from 'redux/User/userActionCreator';
import {convertEvent} from 'utils/EventsUtil/EventsUtil';

import useStyles from './ZoomerEventsTableStyles';

const useZoomerEventsTable  = ({isEventEditorOpen}: Props) : useZoomerPageOutCome  => {

    const classes = useStyles();
    const zoomer = useSelector<StoreStateType, User>(state => state.user);
    const [zoomerEvents, setZoomerEvents] = useState<Event[]>([]); 
    const zoomerEventsRef = useRef(zoomer.owned_events);

    const getZoomerEvents = () => {
        axios.get(`/users/zoomer/${zoomer._id}/events`)
        .then((res)=> {
            const eventsResult = res.data.map(convertEvent);
            setZoomerEvents(eventsResult);
        })
    }

    const deleteEvent = (eventId : String) => {
        Swal.fire({
            title: '?אתה רוצה למחוק את האירוע',
            text: 'האירוע יימחק לתמיד',
            icon: 'warning',
            confirmButtonText: 'כן אני רוצה',
            cancelButtonText: 'התחרטתי',
            showCancelButton: true,
            confirmButtonColor: theme.palette.secondary.main,
            cancelButtonColor: theme.palette.primary.main,
            customClass: {
                title: classes.swal,
                content: classes.swal,
                container: classes.swal
            },
          }).then(({isConfirmed})=> {
              if (isConfirmed){
                  axios.delete(`/events/${eventId}`).then((res)=> {
                      const newOwnedEvents = zoomer.owned_events.filter((id) => id !== eventId);
                      setUser({...zoomer, owned_events: newOwnedEvents});
                  }).catch((err)=> {
                      console.log(err);
                  })
              }
          })
    }

    useEffect(()=> {
        getZoomerEvents();
    }, [])

    useEffect(()=> {
        if(zoomerEventsRef.current !== zoomer.owned_events) 
            getZoomerEvents();
    }, [zoomer])

    useEffect(()=> {
        if(!isEventEditorOpen) 
            getZoomerEvents();
    }, [isEventEditorOpen])

    return {
        zoomerEvents,
        deleteEvent
    }
}

interface useZoomerPageOutCome {
    zoomerEvents: Event[],
    deleteEvent: Function
}

interface Props {
    isEventEditorOpen : boolean
}


export default useZoomerEventsTable;