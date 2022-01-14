import React from 'react'
import { AppBar, Toolbar, Typography, Box, Select, MenuItem } from '@material-ui/core';

import useStyles from './style'

const Header = ({type, setType}) => {
    const classes = useStyles();

    return (
        <div>
            <AppBar position='static'>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h5" className={classes.tittle}>
                        Navagis Google Maps Examination
                    </Typography>
                    <Box display='flex'>
                    <div className={classes.search}>
                        <Select value={type} onChange={(e) => setType(e.target.value)}>
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="9900">Coffee and Tea</MenuItem>
                            <MenuItem value="10591">Restaurants</MenuItem>
                        </Select>
                    </div>
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header
