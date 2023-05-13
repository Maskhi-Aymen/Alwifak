// Create table for cars
import mongoose from 'mongoose'

const carsSchema = new mongoose.Schema({
    carName: {type: String, required: true},
    brand: {type: String, required: true},
    image: {type: String, required: true},
    payPerDay: {type: String, required: true},
    model:{type: String, required: true},
    speed: {type: String, required: true},
    automatic: {type: String, required: true},
    description:{type: String, required: true},
    capacity: {type: String, required: true}, 
    rents: [
        {
            start: {type: String},
            end: {type: String}, 
            title: {type: String},
            tel: {type: String},color: {type:String,default:'#ff9f89'}
/*            overlap:{type:Boolean,default:false},
            display: {type:String,default:'background'},
        */
        }
    ],
    

}, {
    timestamps: true
});

const Cars = mongoose.model('Cars', carsSchema);
export default Cars;