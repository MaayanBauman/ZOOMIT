import { combineReducers, Reducer, CombinedState, AnyAction } from 'redux';

import userReducer from './User/userReducer';
import StoreStateType from './storeStateType';
import isLoadingReducer from './IsLoading/isLoadingReducer';
import categoriesReducer from './Categories/categoriesReducer';
import EventsFiltersReducer from './EventsFilters/EventsFiltersReducer';

export default combineReducers<StoreStateType>({
     isLoading: isLoadingReducer,
     user: userReducer,
     eventsFilters: EventsFiltersReducer,
     categories: categoriesReducer
}) as unknown as Reducer<CombinedState<StoreStateType>, AnyAction>;
