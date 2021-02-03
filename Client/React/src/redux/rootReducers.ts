import { combineReducers, Reducer, CombinedState, AnyAction } from 'redux';

import StoreStateType from './storeStateType';
import isLoadingReducer from './IsLoading/isLoadingReducer';
import userReducer from './User/userReducer';
import EventsFiltersReducer from './EventsFilters/EventsFiltersReducer';

export default combineReducers<StoreStateType>({
     isLoading: isLoadingReducer,
     user: userReducer,
     eventsFilters: EventsFiltersReducer
}) as unknown as Reducer<CombinedState<StoreStateType>, AnyAction>;
