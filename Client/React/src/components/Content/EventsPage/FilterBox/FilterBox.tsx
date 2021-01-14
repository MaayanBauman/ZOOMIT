import React from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';
import useStyles from './FilterBoxStyles';


const FilterBox: React.FC<Props> = ({searchText, setSearchText, onFilter}: Props): JSX.Element => {
    
    const classes = useStyles();

    return (
        <div >
            <Paper component="div" className={classes.search}>
                <InputBase
                    className={classes.input}
                    placeholder="חפש זומים"
                    inputProps={{ 'aria-label': 'search zoom events' }}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={(e)=> e.code === 'Enter' && onFilter()}
                />
                <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={() => onFilter()} >
                    <SearchIcon/>
                </IconButton>
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton color="primary" className={classes.iconButton} aria-label="directions">
                    <FilterListIcon />
                </IconButton>
            </Paper>
        </div>
    );
}

interface Props {
    searchText: string,
    setSearchText: Function,
    onFilter: Function
}
export default FilterBox;

// /title/:title