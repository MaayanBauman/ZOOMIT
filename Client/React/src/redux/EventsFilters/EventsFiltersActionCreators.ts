import EventsFilter from 'models/Event/EventsFilter';
import store from '../store';
import * as actionTypes from './EventsFiltersActionTypes';

export const setFilters = (filters: EventsFilter): void => {
    store.dispatch({
        type: actionTypes.SET_EVENTS_FILTERS,
        payload: { filters }
    })
}