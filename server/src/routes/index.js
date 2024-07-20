import express from "express";
import { StatusCodes } from 'http-status-codes'
import { dishRoute } from "./dishRoute.js";

const Router = express.Router()

// Check APIs status
Router.get('/status', (req, res) => {
    res.status(StatusCodes.OK).json({message: 'APIs are ready to use.'})
})

// dishes API
Router.use('/dishes', dishRoute)

export const APIs = Router