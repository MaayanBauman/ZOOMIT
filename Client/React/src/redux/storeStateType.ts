import EventsFilter from 'models/Event/EventsFilter';
import User from 'models/User/User';
export default interface StoreStateType {
    isLoading: boolean;
    user: User;
    eventsFilters: EventsFilter;
};
