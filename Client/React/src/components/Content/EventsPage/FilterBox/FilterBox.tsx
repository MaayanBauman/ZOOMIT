import React, { useState, useEffect } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';
import useStyles from './FilterBoxStyles';
import StoreStateType from 'redux/storeStateType';
import { useSelector } from 'react-redux';
import EventsFilter from 'models/Event/EventsFilter';
import useFilterBox from './useFilterBox';
import { Paper, IconButton, InputBase, Avatar, Card, CardContent, Checkbox, Collapse, Divider, FormControl, FormControlLabel, FormGroup, MenuItem, Select, TextField, Typography, Button, } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { CalendarToday } from '@material-ui/icons';

import useEventsPage from '../useEventsPage';
import Category from 'models/Category/Category';
import User from 'models/User/User';
import { initialState } from 'redux/EventsFilters/EventsFiltersReducer';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import Source from 'models/Source/Source';


const FilterBox: React.FC<Props> = ({ onFilter, zoomerIdEvents }: Props): JSX.Element => {
    const classes = useStyles();
    const { zoomers, sources, categories } = useEventsPage();
    const { setFieldValue, resetExtraFilter } = useFilterBox();
    const filters = useSelector<StoreStateType, EventsFilter> (state => state.eventsFilters);
    
    const [isExtraFilterOpen, setIsExtrafilterOpen] = useState(false);
    const [shouldFilterByCategory, setShouldFilterByCategory] = useState(false);
    const [shouldFilterByPrice, setShouldFilterByPrice] = useState(false);
    const [shouldFilterByDate, setShouldFilterByDate] = useState(false);
    const [shouldFilterByZoomer, setShouldFilterByZoomer] = useState(false);
    const [shouldFilterBySource, setShouldFilterBySource] = useState(false);
    
    const getZoomerItem = (zoomer: User) => (
        <MenuItem className={classes.menuItem} value={zoomer._id}>
            <Avatar className={classes.avatar} alt={zoomer.full_name} src={zoomer.photograph}/>
            {zoomer.full_name}
        </MenuItem>
    )
    const getSourceItem = (source: Source) => (
        <MenuItem className={classes.menuItem} value={source._id}>
            <Avatar className={classes.avatar} alt={source.name} src={source.photograph}/>
            {source.name}
        </MenuItem>
    )

    useEffect(() => {
        if (!isExtraFilterOpen){
            onFilter()
        }
    }, [isExtraFilterOpen]);
    
    return (
        <div className={classes.container}>
            <Paper component="div" className={classes.search}>
                <InputBase
                    className={classes.input}
                    placeholder="חפש זומים"
                    inputProps={{ 'aria-label': 'search zoom events'}}
                    value={filters.title}
                    onChange={(e) => setFieldValue({ title: e.target.value })}
                    onKeyDown={(e)=> e.code === 'Enter' && onFilter()}
                />
                <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={() => onFilter()} >
                    <SearchIcon/>
                </IconButton>
                <Divider className={classes.searchDivider} orientation="vertical" />
                <IconButton 
                    color="primary" 
                    className={classes.iconButton} 
                    aria-label="directions" 
                    onClick={() => {
                        if (isExtraFilterOpen) {
                            resetExtraFilter()
                            setShouldFilterByCategory(false)
                            setShouldFilterByPrice(false)
                            setShouldFilterByDate(false)
                            setShouldFilterByZoomer(false)
                        } 
                        setIsExtrafilterOpen(!isExtraFilterOpen)
                    }}
                >
                    <FilterListIcon />
                </IconButton>
            </Paper>
            <Collapse in={isExtraFilterOpen} timeout="auto" unmountOnExit>
                <Card variant="outlined" className={classes.card}>
                    <CardContent className={classes.content}>
                        <FormGroup className={classes.rightSection}>
                            <FormControl className={classes.filed}>
                                <FormControlLabel
                                    label="קטגוריה"
                                    control={
                                        <Checkbox
                                            icon={<CircleUnchecked className={classes.checkbox}/>}
                                            checkedIcon={<CircleCheckedFilled className={classes.checkbox}/>} 
                                            checked={shouldFilterByCategory} 
                                            name="category" 
                                            onChange={() => {
                                                shouldFilterByCategory && setFieldValue({ category: initialState.category })
                                                setShouldFilterByCategory(!shouldFilterByCategory)
                                            }} 
                                        />
                                    }
                                />
                                {
                                    shouldFilterByCategory &&
                                    <Select
                                        className={classes.select}
                                        value={filters.category}
                                        onChange={(e) => setFieldValue({ category: e.target.value })}
                                        variant="standard"
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        { categories?.map((category: Category) => (<MenuItem className={classes.menuItem} value={category.id}>{category.name}</MenuItem>))}
                                    </Select>
                                }
                            </FormControl>
                            <FormControl className={classes.filed}>
                                <FormControlLabel
                                    label="מחיר"
                                    control={
                                        <Checkbox 
                                            icon={<CircleUnchecked className={classes.checkbox} />}
                                            checkedIcon={<CircleCheckedFilled className={classes.checkbox} />}
                                            checked={shouldFilterByPrice} 
                                            name="price"
                                            onChange={() => {
                                                shouldFilterByPrice && setFieldValue({ min_price: initialState.min_price, max_price: initialState.max_price })
                                                setShouldFilterByPrice(!shouldFilterByPrice)
                                            }}
                                        />
                                    }
                                /> 
                                {
                                    shouldFilterByPrice && 
                                    <Typography className={classes.priceRange}>
                                            <div>מ-</div>
                                            <TextField className={classes.priceInput} value={filters.min_price} onChange={(e)=> setFieldValue({ min_price: e.target.value !== '' ? parseInt(e.target.value) : 0 })}/>
                                            <div>עד-</div>
                                            <TextField className={classes.priceInput} value={filters.max_price} onChange={(e)=> setFieldValue({ max_price: parseInt(e.target.value) || 100 })}/>
                                            <div>בש"ח</div>
                                        </Typography>
                                }
                            </FormControl>
                            <FormControl className={classes.filed}>
                                <FormControlLabel
                                    label="החל מתאריך"
                                    control={
                                        <Checkbox
                                            icon={<CircleUnchecked className={classes.checkbox} />}
                                            checkedIcon={<CircleCheckedFilled className={classes.checkbox} />} 
                                            name="time" 
                                            checked={shouldFilterByDate} 
                                            onChange={() => {
                                                shouldFilterByDate && setFieldValue({ start_time: initialState.start_time })
                                                setShouldFilterByDate(!shouldFilterByDate)
                                            }} 
                                        />
                                    }
                                />             
                                {
                                    shouldFilterByDate && 
                                    <KeyboardDatePicker
                                        autoOk
                                        className={classes.picker}
                                        format="dd/MM/yyyy"
                                        value={filters.start_time}
                                        onChange={(date) => setFieldValue({ start_time: date })}
                                        showTodayButton
                                        keyboardIcon={
                                            <CalendarToday className={classes.calendarIcon}/>
                                        }
                                        variant="inline"
                                    />
                                }              
                            </FormControl>
                        </FormGroup> 
                        <Divider className={classes.divider} orientation="vertical" />
                       <FormGroup className={classes.leftSection}>
                            { !zoomerIdEvents &&
                                <FormControl className={classes.filed}>
                                    <FormControlLabel
                                        label="זומר"
                                        control={
                                            <Checkbox
                                                icon={<CircleUnchecked className={classes.checkbox} />}
                                                checkedIcon={<CircleCheckedFilled className={classes.checkbox} />}
                                                name="zoomer_id" 
                                                checked={shouldFilterByZoomer} 
                                                onChange={() => {
                                                    shouldFilterByZoomer && setFieldValue({ zoomer_id: initialState.zoomer_id })
                                                    setShouldFilterByZoomer(!shouldFilterByZoomer)
                                                }} 
                                            />
                                        }
                                    />
                                    {
                                        shouldFilterByZoomer && 
                                        <Select
                                            className={classes.select}
                                            value={filters.zoomer_id}
                                            onChange={(e) => setFieldValue({ zoomer_id: e.target.value })}
                                            variant="standard"
                                            renderValue={(zoomerId: any) => {
                                                const selectedZoomer: any = zoomers.find(zoomer=> zoomer._id === zoomerId);
                                                return selectedZoomer?._id && getZoomerItem(selectedZoomer)
                                            }}
                                        >
                                            { zoomers?.map((zoomer: User) => getZoomerItem(zoomer))}
                                        </Select>
                                    }
                                </FormControl>
                            }
                            { !zoomerIdEvents &&
                                <FormControl className={classes.filed}>
                                    <FormControlLabel
                                        label="מקור"
                                        control={
                                            <Checkbox
                                                icon={<CircleUnchecked className={classes.checkbox} />}
                                                checkedIcon={<CircleCheckedFilled className={classes.checkbox} />}
                                                name="souece_id" 
                                                checked={shouldFilterBySource} 
                                                onChange={() => {
                                                    shouldFilterBySource && setFieldValue({ source_id: initialState.source_id })
                                                    setShouldFilterBySource(!shouldFilterBySource)
                                                }} 
                                            />
                                        }
                                    />
                                    {
                                        shouldFilterBySource && 
                                        <Select
                                            className={classes.select}
                                            value={filters.source_id}
                                            onChange={(e) => setFieldValue({ source_id: e.target.value })}
                                            variant="standard"
                                            renderValue={(sourceId: any) => {
                                                const selectedSource: any = sources.find(source=> source._id === sourceId);
                                                return selectedSource?._id && getSourceItem(selectedSource)
                                            }}
                                        >
                                            { sources?.map((source: Source) => getSourceItem(source))}
                                        </Select>
                                    }
                                </FormControl>
                            }
                            <Button variant="contained" className={classes.filterBtn} onClick={() => onFilter()}> עדכן סינונים </Button>
                        </FormGroup>
                    </CardContent>
                </Card>
            </Collapse>
        </div>
    );
}

interface Props {
    onFilter: Function,
    zoomerIdEvents ?: string 
}

export default FilterBox;