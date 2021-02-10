import {useSelector} from 'react-redux';
import React, {useState} from 'react';
import { TableContainer, Table, TableBody, TableRow, Typography,
         TableCell, TableHead, Paper, IconButton } from '@material-ui/core';
import {EditOutlined, DeleteOutlineOutlined, AddCircle} from '@material-ui/icons';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import Event from 'models/Event/Event';
import Category from 'models/Category/Category';
import StoreStateType from 'redux/storeStateType';
import {formatDate, formatTime} from 'utils/DatesUtil/DatesUtil';
import {categoryNameById} from 'utils/CategoryUtil/CategoryUtil';
import { contentRoute } from 'utils/Routes/Routes';

import useStyles from './ZoomerEventsTableStyles'; 
import useZoomerEventsTable from './useZoomerEventsTable';
import EventEditorDialog from '../EventEditorDialog/EventEditorDialog';
import FilterBox from 'components/Content/EventsPage/FilterBox/FilterBox';
import { useHistory } from 'react-router-dom';

const ZoomerEventsTable: React.FC = (): JSX.Element => {

    const classes = useStyles();
    const history = useHistory();

    const categories = useSelector<StoreStateType, Category[]>(state => state.categories);
    const [isEventEditorOpen, setIsEventEditorOpen] = useState<boolean>(false);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [chosenEvent, setChosenEvent] = useState<Event>();
    const { zoomerEvents, deleteEvent } = useZoomerEventsTable({isEventEditorOpen});

    return (
        <>
        <EventEditorDialog isOpen={isEventEditorOpen} isEditMode={isEditMode} handleClose={()=> {
            setIsEventEditorOpen(false);
            setChosenEvent(undefined);
        }} event={chosenEvent}/>
        <div className={classes.searchAndAdd}>
            <Typography>{`${zoomerEvents.length} אירועים`}</Typography>
            <FilterBox onFilter={()=> {}} />
            <IconButton onClick={() => {
                setIsEditMode(false);
                setIsEventEditorOpen(true);
            }}>
                <AddCircle className={classes.addEventButton}></AddCircle>
            </IconButton>
        </div>
        <div className={classes.tableContainer}>
            <TableContainer component={Paper} className={classes.table}>
                <Table size="small" dir='rtl'>
                    <TableHead className={classes.tableTitles}>
                    <TableRow>
                        <TableCell>כותרת</TableCell>
                        <TableCell align="right">קטגוריה</TableCell>
                        <TableCell align="right">מועד</TableCell>
                        <TableCell align="right">תיאור</TableCell>
                        <TableCell align="right">מחיר</TableCell>
                        <TableCell align="right">לינק</TableCell>
                        <TableCell align="right">מס' נרשמים</TableCell>
                        <TableCell align="right">פעולות</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody >
                    {zoomerEvents.map((event: Event) => (
                        <TableRow key={event.id} className={classes.tableRow} >
                            <TableCell component="th" scope="row">
                                {event.title}
                            </TableCell>
                            <TableCell align="right">{categoryNameById(categories, event.category)}</TableCell>
                            <TableCell align="right">{
                                formatDate(event.start_time) + ' ' + formatTime(event.start_time) + '-' +
                                formatTime(event.end_time)
                                }</TableCell>
                            <TableCell align="right">{event.description.length > 25 ? `${event.description.slice(0,25)}...`: event.description}</TableCell>
                            <TableCell align="right">{event.price as number}</TableCell>
                            <TableCell align="right">{event.zoom_link.length > 25 ? `...${event.zoom_link.slice(0,25)}`: event.zoom_link}</TableCell>
                            <TableCell align="right">{`${event.registered_users.length}/${event.max_registers}`}</TableCell>
                            <TableCell align="right" className={classes.eventActions}>
                                <IconButton onClick={()=> { history.push(`${contentRoute}/event/${event.id}`);}}>
                                    <VisibilityOutlinedIcon className={classes.icon}/>
                                </IconButton>
                                <IconButton onClick={()=> {
                                    setChosenEvent(event);
                                    setIsEditMode(true);
                                    setIsEventEditorOpen(true);
                                }}>
                                    <EditOutlined className={classes.icon}/>
                                </IconButton>
                                <IconButton onClick={() => { deleteEvent(event.id);}}>
                                    <DeleteOutlineOutlined className={classes.icon}/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        </>
    );
}

export default ZoomerEventsTable;
