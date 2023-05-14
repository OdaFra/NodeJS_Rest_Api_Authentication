import express from "express";
import { deleteUserById, getUserById, getUsers } from "../db/users";

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();
        return res.status(200).json({
            message:`Se ha obtenido todos los usuarios de la base de datos`,
            body:users
        });

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const deleteUser = await deleteUserById(id);
        return res.json({
            message: `Se ha eliminado el usuario con ${id}`,
            body: deleteUser
        });

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { username } = req.body;

        if (!username) {
            return res.sendStatus(403);
        }
       
        const user = await getUserById(id);
        user.username = username;
        await user.save();

        return res.status(200).json({
            message: `Usuario actualizado`,
            body: user
        }).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}