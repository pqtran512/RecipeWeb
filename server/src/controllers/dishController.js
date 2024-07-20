import { StatusCodes } from 'http-status-codes'
import { dishService } from '../services/dishService.js'

const createNew = async (req, res, next) => {
    try {
        // console.log('req.body: ', req.body)
        const createdDish = await dishService.createNew(req.body)

        res.status(StatusCodes.CREATED).json(createdDish)
    } catch (error) { next(error) }
}

const getDetails = async (req, res, next) => {
    try {
        const dishId = req.params.id
        const dish = await dishService.getDetails(dishId)
        res.status(StatusCodes.OK).json(dish)
    } catch (error) { next(error) }
}

export const dishController = {
    createNew,
    getDetails
}