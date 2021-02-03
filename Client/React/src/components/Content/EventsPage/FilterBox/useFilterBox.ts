import EventsFilter from 'models/Event/EventsFilter';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { setFilters } from 'redux/EventsFilters/EventsFiltersActionCreators';
import StoreStateType from 'redux/storeStateType';
import { initialState } from 'redux/EventsFilters/EventsFiltersReducer';

const useFilterBox = () : useFilterBoxOutCome  => {
    const filters = useSelector<StoreStateType, EventsFilter>(state => state.eventsFilters);
    
    const setTitle = (title: string) => {
        setFilters({ 
            ...filters,
            title
        });
    }

    const setCategory = (category: string) => {
        setFilters({ 
            ...filters,
            category
        });
    }

    const setZoomer = (zoomer: string) => {
        setFilters({ 
            ...filters,
            zoomer
        });
    }

    const setTimeStart = (start_time: Date) => {
        setFilters({ 
            ...filters,
            start_time
        });
    }

    const setTimeEnd = (end_time: Date) => {
        setFilters({ 
            ...filters,
            end_time
        });
    }
    const setMaxPrice = (max_price: number) => {
        setFilters({ 
            ...filters,
            max_price
        });
    }
    const setMinPrice = (min_price: number) => {
        setFilters({ 
            ...filters,
            min_price
        });
    }
    
    useEffect(() => {
        setFilters(initialState)
    }, []);

    return {
        setTitle,
        setCategory,
        setZoomer,
        setTimeStart,
        setTimeEnd,
        setMaxPrice,
        setMinPrice,
    }
}

interface useFilterBoxOutCome {
    setTitle: Function,
    setCategory: Function,
    setZoomer: Function,
    setTimeStart: Function,
    setTimeEnd: Function,
    setMaxPrice: Function,
    setMinPrice: Function,
}

export default useFilterBox;