import React from 'react'
import {BarChart, XAxis, YAxis, Tooltip, Legend, Bar} from 'recharts'
import {Box, Button, Card, CardMedia, CardContent, CardActions, Chip, Typography } from '@material-ui/core';


const RankingChart = ({places}) => {
    console.log(places);

    return (
        <Card elevation={6}>
            <CardContent>
            <Typography variant='h5'>
                    Restorant Ranking
            </Typography>
            <BarChart width={750} height={250} data={places} barSize={20}>
                <XAxis dataKey="name" />
                <YAxis dataKey="ranking_position" type="number" />
                <Tooltip />
                <Legend />
                <Bar dataKey="ranking_position" fill="#8884d8" />
                </BarChart>
            </CardContent>
        </Card>
        
    )
}

export default RankingChart
