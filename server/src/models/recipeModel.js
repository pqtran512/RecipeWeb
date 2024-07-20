import Joi from 'joi'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '../utils/validators.js'

// Define Collection (Name & Schema)
const RECIPE_COLLECTION_NAME = 'recipes'
const RECIPE_COLLECTION_SCHEMA = Joi.object({
    // ObjectId type in MongoDB
    recipeId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    dishId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    
    name: Joi.string().required().min(3).max(50).trim().strict(),
    
    createdAt: Joi.date().timestamp('javascript').default(Date.now),
    updatedAt: Joi.date().timestamp('javascript').default(null),
    _destroy: Joi.boolean().default(false)
})
export const recipeModel = {
    RECIPE_COLLECTION_NAME,
    RECIPE_COLLECTION_SCHEMA
}