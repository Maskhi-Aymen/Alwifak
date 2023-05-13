import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import seedRouter from './routes/seedRoute.js';
import carsRouter from './routes/carsRoute.js';
import blogRouter from './routes/blogRoute.js';
import userRouter from './routes/userRoute.js';
import rentRouter from './routes/rentRoute.js';
import categoryRouter from './routes/typeRoute.js';
import cors from 'cors'; 
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const app = express();
app.use(cors())
// ADD THIS
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/uploads',express.static('uploads'));
 
app.use('/api/seed/', seedRouter); 
app.use('/api/cars/', carsRouter); 
app.use('/api/blog/', blogRouter);
app.use('/api/users/', userRouter);
app.use('/api/rent/', rentRouter);
app.use('/api/category/', categoryRouter);

app.get('*',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html')
})

//Connect to DB
dotenv.config();
mongoose.connect(process.env.MONGODB_URI).then(() => {

    console.log("Connected to DB");

}).catch((error) => {
    console.log(error.message);
})

//Create Port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serve at: http://localhost:${port}`);
})

export default app