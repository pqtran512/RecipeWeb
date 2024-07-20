import express from "express";
import { StatusCodes } from 'http-status-codes'
import { dishValidation } from "../validations/dishValidation.js";
import { dishController } from "../controllers/dishController.js"; 
const Router = express.Router()

Router.route('/')
    .get((req, res) => {
        res.status(StatusCodes.OK).json({message: 'GET: API get list dishes'})
    })
    .post(dishValidation.createNew, dishController.createNew )

Router.route('/:id')
    .get(dishController.getDetails)
    .put()

export const dishRoute = Router