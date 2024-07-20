import { MongoClient, ServerApiVersion } from 'mongodb'
import 'dotenv/config'

let recipeWebDBInstance = null

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const mongoClientInstance = new MongoClient(process.env.MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})
// Kết nối tới DB
export const CONNECT_DB = async () => {
    // Gọi kết nối tới MongoDB Atlas với URI
    await mongoClientInstance.connect()
    // Kết nối thành công => lấy DB theo name và gắn vào recipeWebDBInstance
    recipeWebDBInstance = mongoClientInstance.db(process.env.DATABASE_NAME)
}

export const CLOSE_DB = async () => {
    await mongoClientInstance.close()
}

// Export recipeWebDBInstance sau khi connect thành công MongoDB để sử dụng ở nhiều nơi trong code
// no async
export const GET_DB = () => {
    if (!recipeWebDBInstance) throw new Error('Must connect to Database first!')
        return recipeWebDBInstance
}