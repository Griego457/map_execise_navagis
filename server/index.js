import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import path from 'path';
import { fileURLToPath } from 'url';
import postRoutes from './routes/post.js';



const app = express();



app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

app.use('/post', postRoutes);

const CONNECTION_URL = 'mongodb+srv://Liam:William031019@cluster0.tuajm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.static('build'));

app.get('*', (req, res) => {
     res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
})

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true});
const conn = mongoose.connection;
mongoose.connection.once('open', () => { console.log('MongoDB Connected'); });
mongoose.connection.on('error', (err) => { console.log('MongoDB connection error: ', err); }); 

app.listen(PORT, HOST, () => console.log(`Server running on port: ${PORT}`))

