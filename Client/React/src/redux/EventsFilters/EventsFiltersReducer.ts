import EventsFilter from 'models/Event/EventsFilter';
import * as Actions from './EventsFiltersActionTypes';

export const initialState: EventsFilter = {
        title: '',
        zoomer_id: '',
        source_id: '',
        start_time: new Date(),
        category: '',
        min_price: 0,
        max_price: 1000,
}

const EventsFiltersReducer = (state = initialState, action: Actions.EventsFiltersAction): EventsFilter => {
    switch (action.type) {
        case Actions.SET_EVENTS_FILTERS: return { ...state, ...action.payload.filters}

        default: return state;
    }
}

export default EventsFiltersReducer;
