import { slugify } from '../utils/formatters.js'
import { dishModel } from '../models/dishModel.js'
import ApiError from '../utils/ApiError.js'
import { StatusCodes } from 'http-status-codes'

const createNew = async (reqBody) => {
    try {
        const newDish = {
            ...reqBody,
            slug: slugify(reqBody.name)
        }
        // Gọi tới tầng Model
        const createdDish = await dishModel.createNew(newDish)
        // console.log(createdDish)
        const getNewDish = await dishModel.findOneById(createdDish.insertedId)
        // console.log(getNewDish)

        return getNewDish
    } catch (error) { throw error }
}

const getDetails = async (dishId) => {
    try {
        // Gọi tới tầng Model
        const dish = await dishModel.getDetails(dishId)
        if (!dish) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Dish not found !')
        }
        return dish
    } catch (error) { throw error }
}

export const dishService = {
    createNew,
    getDetails
}