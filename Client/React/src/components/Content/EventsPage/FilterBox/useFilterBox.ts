import EventsFilter from 'models/Event/EventsFilter';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { setFilters } from 'redux/EventsFilters/EventsFiltersActionCreators';
import StoreStateType from 'redux/storeStateType';
import { initialState } from 'redux/EventsFilters/EventsFiltersReducer';

const useFilterBox = () : useFilterBoxOutCome  => {
    const filters = useSelector<StoreStateType, EventsFilter>(state => state.eventsFilters);

    const setFieldValue = (fieldKey : string, field: any) => {
        setFilters({ 
            ...filters,
            [fieldKey]: field,
        });
    }
    const resetExtraFilter = () => {
        setFilters({...initialState, title: filters.title});
    }

    
    useEffect(() => {
        setFilters(initialState)
    }, []);

    return {
        setFieldValue,
        resetExtraFilter,
    }
}

interface useFilterBoxOutCome {
    setFieldValue: Function,
    resetExtraFilter: Function,
}

export default useFilterBox;