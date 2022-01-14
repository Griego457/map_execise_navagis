import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';



import postRoutes from './routes/post.js';

const path = require('path');

const app = express();



app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

app.use('/post', postRoutes);

const CONNECTION_URL = 'mongodb+srv://Liam:William031019@cluster0.tuajm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

if(process.env.NODE_ENV === 'production')
{
    app.use(express.static('/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'google_map_exam', 'build', 'index.html'));
    })
}

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

//mongoose.set('useFindAndModify', false);