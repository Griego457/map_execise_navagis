import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    resto_Id: String,
    name: String,
    people_visited: Number,
});

const PostRestoDetail = mongoose.model('PostRestoDetail', postSchema);

export default PostRestoDetail;