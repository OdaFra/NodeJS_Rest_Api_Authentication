// require('dotenv').config();
import dotenv from 'dotenv';

 dotenv.config();

export const connectDB={
    PORT:process.env.PORT,
    MONGOURI:process.env.MONGO_URI
}
