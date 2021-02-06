import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';
import useStyles from './FilterBoxStyles';
import StoreStateType from 'redux/storeStateType';
import { useSelector } from 'react-redux';
import EventsFilter from 'models/Event/EventsFilter';
import useFilterBox from './useFilterBox';
import { Paper, IconButton, InputBase, Avatar, Card, CardContent, Checkbox, Collapse, Divider, FormControl, FormControlLabel, FormGroup, MenuItem, Select, TextField, Typography, Button, } from '@material-ui/core';
import useEventsPage from '../useEventsPage';
import Category from 'models/Category/Category';
import User from 'models/User/User';
import { initialState } from 'redux/EventsFilters/EventsFiltersReducer';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';

const FilterBox: React.FC<Props> = ({ onFilter }: Props): JSX.Element => {

    const classes = useStyles();
    const { zoomers, categories } = useEventsPage ();
    const { setFieldValue, resetExtraFilter } = useFilterBox();
    const filters = useSelector<StoreStateType, EventsFilter> (state => state.eventsFilters);

    const [isExtraFilterOpen, setIsExtrafilterOpen] = useState(false);
    const [shouldFilterByCategory, setShouldFilterByCategory] = useState(false);
    const [shouldFilterByPrice, setShouldFilterByPrice] = useState(false);
    const [shouldFilterByDate, setShouldFilterByDate] = useState(false);
    const [shouldFilterByZoomer, setShouldFilterByZoomer] = useState(false);

    return (
        <div className={classes.container}>
            <Paper component="div" className={classes.search}>
                <InputBase
                    className={classes.input}
                    placeholder="חפש זומים"
                    inputProps={{ 'aria-label': 'search zoom events'}}
                    value={filters.title}
                    onChange={(e) => setFieldValue('title', e.target.value)}
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
                        resetExtraFilter()
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
                                                shouldFilterByCategory && setFieldValue('category' , initialState.category)
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
                                        onChange={(e) => setFieldValue('category', e.target.value)}
                                        variant="standard"
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        { categories?.map((category: Category) => (<MenuItem value={category.name}>{category.name}</MenuItem>))}
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
                                                shouldFilterByPrice && setFieldValue('min_price', initialState.min_price) && setFieldValue('max_price', initialState.max_price)
                                                setShouldFilterByPrice(!shouldFilterByPrice)
                                            }}
                                        />
                                    }
                                /> 
                                {
                                    shouldFilterByPrice && 
                                    <Typography className={classes.priceRange}>
                                            <div>מ-</div>
                                            <TextField className={classes.priceInput} value={filters.min_price} onChange={(e)=> setFieldValue('min_price', e.target.value !== '' ? parseInt(e.target.value) : 0 )}/>
                                            <div>עד-</div>
                                            <TextField className={classes.priceInput} value={filters.max_price} onChange={(e)=> setFieldValue('max_price', parseInt(e.target.value) || 100 )}/>
                                            <div>בש"ח</div>
                                        </Typography>
                                }
                            </FormControl>
                            <FormControl className={classes.filed}>
                                <FormControlLabel
                                    label="זמן"
                                    control={
                                        <Checkbox
                                            icon={<CircleUnchecked className={classes.checkbox} />}
                                            checkedIcon={<CircleCheckedFilled className={classes.checkbox} />} 
                                            name="time" 
                                            checked={shouldFilterByDate} 
                                            onChange={() => {
                                                shouldFilterByDate && setFieldValue('start_time', initialState.start_time) && setFieldValue('end_time', initialState.end_time)
                                                setShouldFilterByDate(!shouldFilterByDate)
                                            }} 
                                        />
                                    }
                                />                           
                            </FormControl>
                        </FormGroup>
                        <Divider className={classes.divider} orientation="vertical" />
                        <FormGroup className={classes.leftSection}>
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
                                                shouldFilterByZoomer && setFieldValue('zoomer_id', initialState.zoomer_id)
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
                                        onChange={(e) => setFieldValue('zoomer_id', e.target.value)}
                                        variant="standard"
                                        inputProps={{ 'aria-label': 'Without label', select: {'display':'flex' }}}
                                    >
                                        { zoomers?.map((zoomer: User) => (
                                            <MenuItem className={classes.menuItem} value={zoomer._id}>
                                                <Avatar className={classes.avatar} alt={zoomer.full_name} src={zoomer.photograph}/>
                                                {zoomer.full_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                }
                            </FormControl>
                            <Button variant="contained" className={classes.filterBtn} onClick={() => onFilter()}> עדכן סינונים נוספים </Button>
                        </FormGroup>
                    </CardContent>
                </Card>
            </Collapse>
        </div>
    );
}

interface Props {
    onFilter: Function
}

export default FilterBox;