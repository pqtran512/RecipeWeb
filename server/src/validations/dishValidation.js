import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '../utils/ApiError.js'

const createNew = async (req, res, next) => {
    const correctCondition = Joi.object({
        name: Joi.string().required().min(3).max(50).trim().strict().messages({
            // Custom messages (nếu ko muốn sử dụng message mặc định)
            'any.required': `Name is a required field`,
            'string.empty': `Name cannot be an empty field`,
            'string.min': `Name should have a minimum length of 3`,
            'string.max': `Name should have a maximun length of 50`,
            'string.trim': `Name must not have leading or trailing whitespace`
        }),
        classification: Joi.string().required().min(3).max(50).trim().strict(),
    })

    try {
        // console.log('req.body: ', req.body)
        await correctCondition.validateAsync(req.body, { abortEarly: false})  // false -> ko dừng khi chỉ bắt đc lỗi đầu
        // to Controller
        next()  
    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))  
    }
}

export const dishValidation = {
    createNew
}