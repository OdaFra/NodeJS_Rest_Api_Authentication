import express from 'express';
import authentiction from './authentiction';


const router = express.Router();

export default (): express.Router=>{
    authentiction(router);
    return router;
}