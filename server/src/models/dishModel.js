import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '../config/mongodb.js'
import { recipeModel } from './recipeModel.js'

// Define Collection (Name & Schema)
const DISH_COLLECTION_NAME = 'dishes'
const DISH_COLLECTION_SCHEMA = Joi.object({
    name: Joi.string().required().min(3).max(50).trim().strict(),
    slug: Joi.string().required().min(3).trim().strict(),
    classification: Joi.string().required().min(3).max(50).trim().strict(),
    
    // recipeIds: Joi.array().items(Joi.string()).default([]),
    // recipeIds: Joi.array().items(
    //     Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)    
    // ).default([]),
    // date: Joi.date().timestamp('javascript').default(Date.now)
    
    createdAt: Joi.date().timestamp('javascript').default(Date.now),
    updatedAt: Joi.date().timestamp('javascript').default(null),
    _destroy: Joi.boolean().default(false)   // isDeleted by user or not
})

const validateBeforeCreate = async (data) => {
    return await DISH_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false})  // false -> ko dừng khi chỉ bắt đc lỗi đầu
}

const createNew = async (data) => {
    try {
        // Tạo những giá trị default trong schema
        const validData = await validateBeforeCreate(data)
        return await GET_DB().collection(DISH_COLLECTION_NAME).insertOne(validData)
    } catch (error) { throw new Error(error) }
}

const findOneById = async (id) => {
    try {
        const result = await GET_DB().collection(DISH_COLLECTION_NAME).findOne({ _id: new ObjectId(id) })
        return result
    } catch (error) { throw new Error(error) }
}

const getDetails = async (id) => {
    try {
        const result = await GET_DB().collection(DISH_COLLECTION_NAME).aggregate([
            { $match: {
                _id: new ObjectId(id),
                _destroy: false
            } },
            { $lookup: {
                from: recipeModel.RECIPE_COLLECTION_NAME , // collection to join
                localField: '_id',              // field from the dish table
                foreignField: 'dishId',         // field from the recipe table
                as: 'recipes'                   // output array field
            } },
            // Other aggregations 
            // { $lookup: {} },
        ]).toArray()
        return result[0] || {}
    } catch (error) { throw new Error(error) }
}

export const dishModel = {
    DISH_COLLECTION_NAME,
    DISH_COLLECTION_SCHEMA,
    createNew,
    findOneById,
    getDetails
}