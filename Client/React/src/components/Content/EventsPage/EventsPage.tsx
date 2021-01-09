import React, {  useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';

import useEventPage from './useEventPage';
import useStyles from './EventsPageStyles';
import EventCategoryRow from './EventCategoryRow/EventCategotryRow';

const EventsPage: React.FC = (): JSX.Element => {

    const {events, categories} = useEventPage();
    const classes = useStyles();

    useEffect((()=>{

    }), [events]);

    return (
        <>
            <div className={classes.container}>
                <div className={classes.topbar}>
                    <Typography className={classes.count} variant="subtitle1" gutterBottom>
                        {events.length} זומים
                    </Typography>
                    <Paper component="form" className={classes.search}>
                        <InputBase
                            className={classes.input}
                            placeholder="חפש זומים"
                            inputProps={{ 'aria-label': 'search zoom events' }}
                        />
                        <IconButton type="submit" className={classes.iconButton} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                        <Divider className={classes.divider} orientation="vertical" />
                        <IconButton color="primary" className={classes.iconButton} aria-label="directions">
                            <FilterListIcon />
                        </IconButton>
                    </Paper>
                </div>
                {
                    categories.map(category => (<EventCategoryRow key={category.id} events={events} title={category.name}/>) )
                }
            </div>
        </>
        
    );
}

export default EventsPage;
