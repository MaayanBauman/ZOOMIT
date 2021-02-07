import User from 'models/User/User';
import Category from 'models/Category/Category';
import EventsFilter from 'models/Event/EventsFilter';

export default interface StoreStateType {
    isLoading: boolean;
    user: User;
    eventsFilters: EventsFilter;
    categories: Category[];
};
