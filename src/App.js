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
    const [restoInsideCircle, setRestoInsideCircle] = useState(null);

    const isInsideRadius = (restoPosition, coordinates, km) => {
        var ky = 40000 / 360;
        var kx = Math.cos(Math.PI * restoPosition.lat / 180.0) * ky;
        var dx = Math.abs(coordinates.lng - restoPosition.lng) * kx;
        var dy = Math.abs(coordinates.lat - restoPosition.lat) * ky;
        return Math.sqrt(dx * dx + dy * dy) <= km;
    }

    const distance = (placesData) => {
        setTimeout(() => {
            const item = [];
            for(var i=0; placesData.length > i; i++){
                var restoPosition = {lat : Number(placesData[i].latitude), lng: Number(placesData[i].longitude)};
                var n = isInsideRadius(restoPosition, coordinates, 7);
                if(n){
                    item.push(1);
                }
            };
            setRestoInsideCircle(item.length);
        }, 5000);
    }

    useEffect(() => {
        setType('all')
        setCoordinates({lat : 10.30488532658672, lng: 123.89444750640256});
    }, [])


    useEffect(() => {
            getPlacesInfo(type, bounds.sw, bounds.ne)
            .then((data)=>{
                setPlaces(data);
                distance(data);
            });
            
    }, [type ,coordinates, bounds])

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
                        countRestoInsideRadius={restoInsideCircle}
                    />
                </Grid>
            </Grid>
        </>
        
    )
}

export default App
