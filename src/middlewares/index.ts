import express from "express";
import { get, merge } from "lodash";

import { getUserBySessionToken } from "../db/users";

export const isOwner = async(req:express.Request, res:express.Response, next:express.NextFunction)=>{
    try {
      const {id}=req.params;
      const currentUserId = get(req, 'identity._id') as string;

      if(!currentUserId){
        return res.sendStatus(403).json({
            message:'Usuario no identificado en la base de datos'
        });
      }
      if(currentUserId.toString()!==id){
        return res.sendStatus(403).json({
            message:'Usuario no identificado en la base de datos'
        });
      }
      return next();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['REST-API-MONGO'];
        if (!sessionToken) {
            return res.sendStatus(403);
        }

        const exitingUser = await getUserBySessionToken(sessionToken);
        if (!exitingUser) {
            return res.sendStatus(403);

        }
        merge(req, { identity: exitingUser });
        return next();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}