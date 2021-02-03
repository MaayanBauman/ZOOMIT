import EventsFilter from "models/Event/EventsFilter";

export const SET_EVENTS_FILTERS = 'SET_EVENTS_FILTERS';

interface SetFilters {
    type: typeof SET_EVENTS_FILTERS,
    payload: { filters: EventsFilter }
}

export type EventsFiltersAction = SetFilters;
