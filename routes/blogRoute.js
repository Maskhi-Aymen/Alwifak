import express from 'express'
import Blogs from '../models/blogModel.js';

const blogRouter = express.Router();

blogRouter.get('/getall', async (req, res) => {
    const blog = await Blogs.find();
    res.send(blog);
});
blogRouter.post('/add', async (req, res) => {
    const newBlog  = new Blogs({
        title: req.body.title, 
        author: req.body.author,
        date: req.body.date,
        time: req.body.time,
        imgURL: req.body.imgURL,
        description:req.body.description,
        quote:req.body.quote,
    });
    const blog = await newBlog.save();
    res.send({
        _id: blog._id,
    })
});

//get car by id
blogRouter.get('/blog/:blogId', async (req, res) => {
    const car = await Blogs.findById({_id:req.params.carId});
    if(car) {
        res.send(car)
    } else {
        res.status(404).send({message: 'Car Not Found'});
    }
    
});

export default blogRouter;