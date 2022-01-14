import React, {useEffect} from 'react';
import {Box, Button, Card, CardMedia, CardContent, CardActions, Chip, Typography } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import DirectionIcon from '@material-ui/icons/Directions';
import { Rating } from '@material-ui/lab';
import { useSelector, useDispatch } from 'react-redux';

import { createPost, updatePost } from '../../actions/posts';
import useStyles from './style'


const PlaceDetails = ({restoDetails}) => {
    const dispatch = useDispatch();
    const post = useSelector((state) => restoDetails.location_id ? state.posts.find((p) => p.resto_Id === restoDetails.location_id) : null);
    const classes = useStyles();

    useEffect(() => {
        if(post){
            const updateRestoDetail = {resto_Id: restoDetails.location_id, name: restoDetails.name, people_visited: post.people_visited + 1};
            dispatch(updatePost(post.resto_Id, updateRestoDetail))
        }else{
            const oldRestoDetail = {resto_Id: restoDetails.location_id, name: restoDetails.name, people_visited: 1};
            dispatch(createPost(oldRestoDetail))
        }
    }, [restoDetails])

    return (
        <Card elevation={6}>
            <CardMedia
                style={{height: 350, width: 700 }}
                image={restoDetails.photo ? restoDetails.photo.images.large.url : ''}
                title={restoDetails.name}
            />
            <CardContent>
                <Typography variant='h5'>
                    {restoDetails.name}
                </Typography>
                <Box display='flex' justifyContent="space-between" >
                    <Rating value={Number(restoDetails.rating)}/>
                    <Typography gutterBottom variant='subtitle1'>out of {restoDetails.num_reviews} reviews</Typography>
                </Box>
                <Box display='flex' justifyContent="space-between" >
                    <Typography variant='subtitle1'>Ranking</Typography>
                    <Typography gutterBottom variant='subtitle1'>{restoDetails.ranking}</Typography>
                </Box>
                {restoDetails?.cuisine?.map(({name}) =>(
                    <Chip key={name} size='small' label={name} className={classes.chip} />
                ))}
                {restoDetails?.address  && (
                    <Typography gutterBottom variant='body2' color='textSecondary' className={classes.subtitle}>
                        <LocationOnIcon/> {restoDetails.address}
                    </Typography>
                )}
                {restoDetails?.phone  && (
                    <Typography gutterBottom variant='body2' color='textSecondary' className={classes.spacing}>
                        <PhoneIcon/> {restoDetails.phone}
                    </Typography>
                )}
                {restoDetails?.address  && (
                    <Typography gutterBottom variant='body2' color='textSecondary' className={classes.subtitle}>
                        <DirectionIcon/> People Visited : {post?.people_visited ? post.people_visited : 0}
                    </Typography>
                )}
                <CardActions>
                    <Button size='small' color='primary' onClick={() => window.open(restoDetails.web_url, '_blank')}>
                        Trip Advisor
                    </Button>
                    <Button size='small' color='primary' onClick={() => window.open(restoDetails.website, '_blank')}>
                        Website
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    )
}

export default PlaceDetails
