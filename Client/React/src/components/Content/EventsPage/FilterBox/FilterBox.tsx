import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';
import useStyles from './FilterBoxStyles';
import StoreStateType from 'redux/storeStateType';
import { useSelector } from 'react-redux';
import EventsFilter from 'models/Event/EventsFilter';
import useFilterBox from './useFilterBox';
import { Paper, IconButton, InputBase, Avatar, Card, CardContent, Checkbox, Collapse, Divider, FormControl, FormControlLabel, FormGroup, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import useEventsPage from '../useEventsPage';
import Category from 'models/Category/Category';
import User from 'models/User/User';

const FilterBox: React.FC<Props> = ({ onFilter }: Props): JSX.Element => {

    const classes = useStyles();
    const { zoomers, categories } = useEventsPage ();
    const { setTitle, setCategory, setZoomer, setTimeStart, setTimeEnd, setMaxPrice, setMinPrice } = useFilterBox();
    const filters = useSelector<StoreStateType, EventsFilter>(state => state.eventsFilters);

    const [isExtraFilterOpen, setIsExtrafilterOpen] = useState(true);
    
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
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={(e)=> e.code === 'Enter' && onFilter()}
                />
                <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={() => onFilter()} >
                    <SearchIcon/>
                </IconButton>
                <Divider className={classes.searchDivider} orientation="vertical" />
                <IconButton color="primary" className={classes.iconButton} aria-label="directions" onClick={() => setIsExtrafilterOpen(!isExtraFilterOpen)}>
                    <FilterListIcon />
                </IconButton>
            </Paper>
            <Collapse in={isExtraFilterOpen} timeout="auto" unmountOnExit>
                <Card variant="outlined" className={classes.card}>
                    <CardContent className={classes.content}>
                        <FormGroup className={classes.rightSection}>
                            <FormControl className={classes.filed}>
                                <FormControlLabel
                                    control={<Checkbox checked={shouldFilterByCategory} onChange={() => setShouldFilterByCategory(!shouldFilterByCategory)} name="category" />}
                                    label="קטגוריה"
                                />
                                <Select
                                    defaultValue={categories[0]?.id}
                                    className={classes.select}
                                    value={filters.category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    displayEmpty
                                    variant="standard"
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    { categories?.map((category: Category) => (<MenuItem value={category.id}>{category.name}</MenuItem>))}
                                </Select>
                            </FormControl>
                            <FormControl className={classes.filed}>
                                <FormControlLabel
                                    control={<Checkbox checked={shouldFilterByPrice} onChange={() => setShouldFilterByPrice(!shouldFilterByPrice)} name="category" />}
                                    label="מחיר"
                                />
                                <Typography className={classes.priceRange}>
                                    <div>מ-</div>
                                    <TextField className={classes.priceInput} value={filters.min_price || 0 } onChange={(e)=> setMinPrice(parseInt(e.target.value))}/>
                                    <div>עד-</div>
                                    <TextField className={classes.priceInput} value={filters.max_price || 100} onChange={(e)=> setMaxPrice(parseInt(e.target.value))}/>
                                    <div>בש"ח</div>
                                </Typography>
                            </FormControl>
                            <FormControl className={classes.filed}>
                                <FormControlLabel
                                    control={<Checkbox checked={shouldFilterByDate} onChange={() => setShouldFilterByDate(!shouldFilterByDate) } name="category" />}
                                    label="זמן"
                                />                           
                            </FormControl>
                        </FormGroup>
                        <Divider className={classes.divider} orientation="vertical" />
                        <FormGroup className={classes.leftSection}>
                            <FormControl className={classes.filed}>
                                <FormControlLabel
                                    control={<Checkbox checked={shouldFilterByZoomer} onChange={() => setShouldFilterByZoomer(!shouldFilterByZoomer)} name="category" />}
                                    label="זומר"
                                    />
                                <Select
                                    className={classes.select}
                                    value={filters.zoomer}
                                    onChange={(e) => setZoomer(e.target.value)}
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
                            </FormControl>
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