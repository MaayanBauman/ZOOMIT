import React, {  useEffect } from 'react';
import { Typography } from '@material-ui/core';

import axios from 'utils/axios';

const EventsPage: React.FC = (): JSX.Element => {

    const [event, setEvents] = React.useState<any>();

    useEffect(()=>{
        axios.get('/events')
        .then((result : any)=> (
            console.log(result)
        ))
        .catch((error: any)=> (
            console.log(error)
        ))
    }, [])

    return (
        <div >
            <Typography>
              אירועים
            </Typography>
        </div>
    );
}

export default EventsPage;
