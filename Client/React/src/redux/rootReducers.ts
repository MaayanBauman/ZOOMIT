import { combineReducers, Reducer, CombinedState, AnyAction } from 'redux';

import StoreStateType from './storeStateType';
import isLoadingReducer from './IsLoading/isLoadingReducer';

export default combineReducers<StoreStateType>({
     isLoading: isLoadingReducer,
}) as unknown as Reducer<CombinedState<StoreStateType>, AnyAction>;
