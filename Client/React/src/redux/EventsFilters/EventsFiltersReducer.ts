import EventsFilter from 'models/Event/EventsFilter';
import * as Actions from './EventsFiltersActionTypes';

const today = new Date();
const nextWeek = new Date(today.getFullYear(),today.getMonth(),today.getDate() + 7);

export const initialState: EventsFilter = {
        title: '',
        zoomer_id: '',
        start_time: today,
        end_time: nextWeek,
        category: '',
        min_price: 0,
        max_price: 100,
}

const EventsFiltersReducer = (state = initialState, action: Actions.EventsFiltersAction): EventsFilter => {
    switch (action.type) {
        case Actions.SET_EVENTS_FILTERS: return { ...state, ...action.payload.filters}

        default: return state;
    }
}

export default EventsFiltersReducer;
