import PostRestoDetail from '../models/postRestoDetails.js'

export const getPosts = async (req, res) =>{
    try {
        const postRestoDetail = await PostRestoDetail.find();

        res.status(200).json(postRestoDetail);
    } catch (error) {
        console.log(error.message);
    }
}

export const createPost = async (req, res) =>{
    const post = req.body;

    const newPost = new PostRestoDetail(post);
    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        console.log(error.message);
    }
}

export const updatePost = async (req, res) =>{
    const {id: _id} = req.params;
    const post = req.body;
    const filter = { resto_Id: _id };

    const updatedPost = await PostRestoDetail.findOneAndUpdate(filter, post, {new: true});

    res.json(updatedPost);
}

