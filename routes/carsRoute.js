import express from 'express'
import Cars from '../models/carsModel.js';
import path from 'path';
import User from '../models/userModel.js';
import fs from 'fs';
import multer from'multer';
 

const storage = multer.diskStorage({
    destination: function (req,file,cb){
      cb(null,'./uploads/');
    }, 
    filename:function(req,file,cb){
      cb(null,file.originalname)
    }
});
const fileFiltre =(req,file,cb)=>{
    if(file.mimetype==='image/jpeg'||file.mimetype==='image/png'){
        cb(null,true);
    }else{
        cb(null,false)
    }
}
const upload=multer({storage:storage,fileFilter:fileFiltre});

const carsRouter = express.Router();

carsRouter.get('/getall', async (req, res) => {
    const cars = await Cars.find();
    res.send(cars);
});  
 
//get car by id
carsRouter.get('/car/:carId', async (req, res) => {
    const car = await Cars.findById({_id:req.params.carId});
    if(car) {
        res.send(car)
    } else {
        res.status(404).send({message: 'Car Not Found'});
    }
    
});

carsRouter.post('/add/:userId',upload.single('img') ,async (req, res) => {
    const user = await User.findById({ _id:req.params.userId});
    if (user) {
        if(user.admin){
    try{
    const newcar  = new Cars({
        carName: req.body.carName, 
        brand: req.body.brand,
        model:req.body.model,
        speed: req.body.speed,
        automatic: req.body.automatic,
        description:req.body.description,
        payPerDay: req.body.payPerDay,  
        image: req.body.image, 
        rents:[],
        capacity: req.body.capacity, 
    });
    const car = await newcar.save();
    res.send({
        message: "sucess",
    })
}catch (error) {
    res.send({
        message: error,
    })

  }}}
  else{ res.send({
    message: "erreur",
})}
});

carsRouter.post('/rent/:userId/:carId' ,async (req, res) => { 
    const user = await User.findById({ _id:req.params.userId});
    if (user) {
        if(user.admin){  
    try{
        const car = await Cars.findById({_id:req.params.carId});
        const rent = ({
            start: req.body.start, 
            end: req.body.end,
            title: req.body.title,
            tel: req.body.tel, 
        });
        if (car) {
            car.rents.push(rent);
            car.save();
            res.send({
                message: "success",
            })
        } else {
            res.status(404).send({ message: 'Car Not Found' }); 
        }
}catch (error) { 
    res.send({
        message: error,
    })

  }}}
  else{ res.send({message:"error"})}
});


carsRouter.delete('/rent/:userId/:carId/:insId', async (req, res) => {
    const user = await User.findById({ _id: req.params.userId });
    if (user) {
        if (user.admin) {
            const car = await Cars.findById({ _id: req.params.carId });
            const rentId = req.params.insId;
            if (car) {
                const comment = car.rents.filter(function (x) { if (x._id != rentId) return x; })
                const form2 = await Cars.findByIdAndUpdate({ _id: req.params.carId }, { rents: comment });
                res.send({ "message": "succes" })
            } else {
                res.status(404).send({ message: 'car Not Found' }); 
            }
        }
    }
    else {
        res.status(404).send({ message: 'car Not Found' });
    }
});


carsRouter.put('/car/:userId/:carId',upload.single('img') ,async (req, res) => {
    const user = await User.findById({ _id:req.params.userId});
    if (user) {
        if(user.admin){
    const car = await Cars.findByIdAndUpdate({_id:req.params.carId},req.body);
    if(car) {
       
    res.send({
        message: "update succes",
    })
    } else {
        res.status(404).send({message: 'Car Not Found'}); 
    }
}}else {
    res.status(404).send({message: 'Car Not Found'}); 
}
 });

 carsRouter.delete('/car/:userId/:carId', async (req, res) => {
    const user = await User.findById({ _id:req.params.userId});
    if (user) {
        if(user.admin){
    const cdd = await Cars.findById({_id:req.params.carId});
    if(cdd) {
    const img=cdd['image'].substring(30)
    if (img) {
        const oldPath = path.join("uploads", img);
        if (fs.existsSync(oldPath)) {
          fs.unlink(oldPath, (err) => {
            if (err) {
              console.error(err);
              return;
            }
          });
        }
      }
    const car = await Cars.deleteOne({_id:req.params.carId});
    
        res.send({
            message: "delete succes"
        })
    } else {
        res.status(404).send({message: 'formation Not Found'});
    }}}
    else {
        res.status(404).send({message: 'formation Not Found'});
    }
    
});

export default carsRouter;