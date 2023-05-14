import express from 'express';
import authentiction from './authentiction';
import users from './users';

const router = express.Router();

export default (): express.Router=>{
    authentiction(router);
    users(router);
    return router;
}