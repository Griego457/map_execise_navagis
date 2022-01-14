import React, {useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { CircularProgress, Button } from '@material-ui/core';
import LocationOutLinedIcon from '@material-ui/icons/LocationOn';
import Modal  from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { DirectionsRenderer } from "react-google-maps";
import { useDispatch, useSelector } from 'react-redux';

import { getPosts } from '../../actions/posts';
import useStyles from './style'
import { getPlaceDetailApi } from '../../api'
import PlaceDetails from '../PlaceDetails/PlaceDetails';
import RankingChart from '../PlaceDetails/RankingChart';



const Map = ({ setCoordinates, setBounds, coordinates, places, countRestoInsideRadius }) => {
    
    const dispatch = useDispatch();
    const [resotData, setResotData] = useState({resto_Id: '', name: '', people_visited: 0,});
    const [open, setOpen] = useState(false);
    const [placeDetail, setPlaceDetail] = useState([]);
    const [isLoading, setIsLoading] = useState({});
    const [chartOpen, setChartOpen] = useState(false);

    
    const classes = useStyles();
        
    useEffect(() => {
        dispatch(getPosts());
    }, [])
    

    const handleOpen = (loc_id) => {
        setIsLoading(true);
        getPlaceDetailApi(loc_id)
        .then((data)=>{
            setPlaceDetail(data.data);
            setIsLoading(false);
        });
        setOpen(true);
        
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleClose2 = () => {
        setChartOpen(false);
    };

    const [direction, setDirection] = useState([]);

    const google = window.google;

    const componentDidMount = (destination) => {
        const directionsService = new google.maps.DirectionsService();
        
        directionsService.route(
        {
            origin: coordinates,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING
        },
        (result, status) => {
            
            if (status === google.maps.DirectionsStatus.OK) {
                setDirection(result);
            } else {
                console.error(`error fetching directions ${result}`);
              }
            }
        );
    }
    

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{key : process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={12}
                margin={[50, 50, 50, 50]}
                options={''}
                onGoogleApiLoaded={({map, maps}) =>
                    new maps.Circle({
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#FF0000',
                    fillOpacity: 0.3,
                    map,
                    center: {lat : coordinates.lat, lng: coordinates.lng},
                    radius: 7000,
                })}
                onChange={(e) => {
                    setCoordinates({lat : e.center.lat, lng: e.center.lng});
                    setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw});
                }}
                >
                    <div className={classes.restoCount} ><h1 > Restaurant inside red circle : {countRestoInsideRadius}</h1> <br/><Button
                        onClick={() => {
                            setChartOpen(true)
                            setIsLoading(false)
                        }}
                    >Check Ranking Chart</Button></div>
                    
                    {places?.map((place, i) =>
                    (
                        <div 
                            className={classes.markerContainer} 
                            lat={Number(place.latitude)} 
                            lng={Number(place.longitude)} 
                            key={i}
                            onClick={()=> {
                                handleOpen(place.location_id)
                            }}
                            >
                                <LocationOutLinedIcon color="primary" fontSize='large'/>
                        </div>
                    ))}
                    {direction && (
                        <DirectionsRenderer
                        directions={direction}
                    />
                    )}
            </GoogleMapReact>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        {isLoading ? (
                            <div className={classes.loading}>
                                <CircularProgress size='5rem'/>
                            </div>
                        ): (
                            <>
                            <PlaceDetails
                                restoDetails={placeDetail}
                            />
                            <br/>
                            <br/>
                            <Button className={classes.button} onClick={()=>{
                                handleClose();
                                const destination = {lat: Number(placeDetail.latitude), lng: Number(placeDetail.longitude)};
                                componentDidMount(destination);
                                }}>Direction</Button>
                            </>
                        )}
                    </div>
                </Fade>
            </Modal>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal2}
                open={chartOpen}
                onClose={handleClose2}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={chartOpen}>
                    <div className={classes.paper}>
                        {isLoading ? (
                            <div className={classes.loading}>
                                <CircularProgress size='5rem'/>
                            </div>
                        ): (
                            <>
                            <RankingChart
                                places={places}
                            />
                            </>
                        )}
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default Map
