import React, {useState, useEffect} from 'react'
import { CssBaseline, Grid } from '@material-ui/core';


import { getPlacesInfo } from './api'
import Header from './component/Header/Header';
import Map from './component/Map/Map';

const App = () => {

    const [places, setPlaces] = useState([]);
    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});
    const [type, setType] = useState({});
    

    useEffect(() => {
        setType('all')
        setCoordinates({lat : 10.30488532658672, lng: 123.89444750640256});
    }, [])


    useEffect(() => {
        
            getPlacesInfo(type,)
            .then((data)=>{
                setPlaces(data);
            });
            
    }, [type])

    return (
        <>
            <CssBaseline/>
            <Header 
                type={type}
                setType={setType}
            />
            <Grid container spacing={3} style={{width: '100%'}}>
                <Grid item xs={12} md={4}>
                  
                </Grid>
                <Grid item xs={12} md={12}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={places}
                    />
                </Grid>
            </Grid>
        </>
        
    )
}

export default App
