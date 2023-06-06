// Create table for cars
import mongoose from 'mongoose'

const rentSchema = new mongoose.Schema({

    name : {type : String} ,
    lastname: {type : String} ,
    email: {type : String} ,
    numtel: {type : String} ,
    car : {type : mongoose.Schema.Types.ObjectID , ref:'cars'},
    start:{type : String} ,
    end:{type : String} ,
    totalDays : {type : String},
    totalPay : {type : String},
    payment:{type : String} ,
}, {
    timestamps: true
});

const Rent = mongoose.model('Rent', rentSchema);
export default Rent;