import React, {useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { CircularProgress, Button,TextField } from '@material-ui/core';
import LocationOutLinedIcon from '@material-ui/icons/LocationOn';
import Modal  from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { DirectionsRenderer, Circle, withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker, 
    } from "react-google-maps";
import { useDispatch, useSelector } from 'react-redux';

import { getPosts } from '../../actions/posts';
import useStyles from './style'
import { getPlaceDetailApi } from '../../api'
import PlaceDetails from '../PlaceDetails/PlaceDetails';
import RankingChart from '../PlaceDetails/RankingChart';
import { render } from '@testing-library/react';



const Map = ({ setCoordinates, setBounds, coordinates, places }) => {
    const dispatch = useDispatch();
    const [resotData, setResotData] = useState({resto_Id: '', name: '', people_visited: 0,});
    const [open, setOpen] = useState(false);
    const [placeDetail, setPlaceDetail] = useState([]);
    const [isLoading, setIsLoading] = useState({});
    const [chartOpen, setChartOpen] = useState(false);
    const [isCircle, setIsCircle] = useState(false);
    const [circleCenter, setIsCircleCenter] = useState({});
    
    const [circleRadius, setCircleRadius] = useState(4000);


    const classes = useStyles();

    useEffect(() => {
        dispatch(getPosts());
    }, [])

    useEffect(() => {
        const km = circleRadius / 1000;
        distance(places, circleCenter, km);
    }, [circleCenter, circleRadius])


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
    const [isDirection, setIsDirection] = useState(false);
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
                setIsDirection(true);
            } else {
                console.error(`error fetching directions ${result}`);
              }
            }
        );
    }


    const [restoInsideCircle, setRestoInsideCircle] = useState(null);

    const isInsideRadius = (restoPosition, coordinates, km) => {
        var ky = 40000 / 360;
        var kx = Math.cos(Math.PI * restoPosition.lat / 180.0) * ky;
        var dx = Math.abs(coordinates.lng - restoPosition.lng) * kx;
        var dy = Math.abs(coordinates.lat - restoPosition.lat) * ky;
        return Math.sqrt(dx * dx + dy * dy) <= km;
    }

    const distance = (places, circleCenter, km) => {
            const item = [];
            for(var i=0; places.length > i; i++){
                var restoPosition = {lat : Number(places[i].latitude), lng: Number(places[i].longitude)};
                var n = isInsideRadius(restoPosition, circleCenter, km);
                if(n){
                    item.push(1);
                }
            };
            setRestoInsideCircle(item.length);
    }
    const image = "http://maps.google.com/mapfiles/kml/pal3/icon55.png";
    const image2 = "http://maps.google.com/mapfiles/kml/pal2/icon32.png";
    const NavagisGoogleMap = withGoogleMap(props =>(
        <GoogleMap
          defaultCenter={coordinates}
          defaultZoom={13}
        >   
            {isCircle ? (
                <>
                <Circle
                //ref = {(ref) => updateRadius(ref)}
                onRadiusChanged={() => ""}
                onDragEnd = {(e) => setIsCircleCenter({lat : e.latLng.lat(), lng: e.latLng.lng()})}
                center={circleCenter}
                radius={circleRadius}
                options={{
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#FF0000',
                    fillOpacity: 0.3,
                    editable: false,
                    draggable: true,
                    }}
                    /> 
                </>
            ): null}
            
            {places?.map((place, i) =>
                    (
                        <Marker
                        icon={image2}
                            position={{
                                lat: Number(place.latitude),
                                lng: Number(place.longitude)
                        }}
                        onClick={()=> {
                            handleOpen(place.location_id)
                        }}
                        />
                    ))}
            
            <Marker icon={image} position={coordinates}/>

          <DirectionsRenderer
            directions={direction}
          />
        </GoogleMap>
    ));

    return (
        
        <div className={classes.mapContainer}>
            <div><h2> Restaurant inside red circle : {restoInsideCircle}  &#160;  &#160;
                    <Button
                        onClick={() => {
                            setChartOpen(true)
                            setIsLoading(false)
                        }}
                        style={{
                            backgroundColor: "#21b6ae",
                            padding: "4px 4px",
                            fontSize: "15px"
                        }}
                        variant="contained"
                    >Check Ranking Chart</Button> &#160;  &#160;  Set Circle Radius : <TextField type="number" style={{marginTop:"-10px"}} label="Unit by meter(s)" variant="filled" color="success" size="small"  onChange={(e)=>{setCircleRadius(Number(e.target.value));}}/>
                      &#160;  &#160;  <Button
                        onClick={() => {
                            if(!isCircle){
                                setIsCircleCenter({lat : 10.30488532658672, lng: 123.89444750640256});
                            setIsCircle(true);
                            }
                        }}
                        style={{
                            backgroundColor: "#21b6ae",
                            padding: "4px 4px",
                            fontSize: "15px"
                        }}
                        variant="contained"
                    >Draw Circle</Button>  &#160;  &#160;
                    {isDirection ? (
                        <Button
                        onClick={() => {
                            setDirection([]);
                            setIsDirection(false);
                        }}
                        style={{
                            backgroundColor: "#21b6ae",
                            padding: "4px 4px",
                            fontSize: "15px"
                        }}
                        variant="contained"
                    >Remove Direction</Button>
                    ): null}
                    </h2></div>
            <NavagisGoogleMap 
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `750px`, width: "1900px" }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
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
                            <Button style={{
                                backgroundColor: "#21b6ae",
                                padding: "4px 4px",
                                fontSize: "15px",
                                marginLeft: '305px'
                            }}
                            variant="contained" 
                                onClick={()=>{
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
