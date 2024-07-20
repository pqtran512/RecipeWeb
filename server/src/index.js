import express from "express";
import exitHook from "async-exit-hook";
import { CONNECT_DB, CLOSE_DB } from "./config/mongodb.js";
import 'dotenv/config'
import { APIs } from "./routes/index.js";
import { errorHandlingMiddleware } from "./middlewares/errorHandlingMiddleware.js";

const START_SERVER = () => {
  const app = express();
  
  app.use(express.json()) // enable req.body json data
  app.use('/api', APIs)
  
  // Middlware xử lý lỗi tập trung: Nếu trong các hàm (vd: Controller) có next(error) -> quay về đây xử lý
  app.use(errorHandlingMiddleware)

  app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
      console.log(`Server is runing at http://${process.env.APP_HOST}:${process.env.APP_PORT}/`)
  })

  exitHook(() => {
    CLOSE_DB()
    console.log('Disconnected to MongoDB Cloud Atlas!')
  })
}

// Immediately-invoked / Anonymous Async Function
(async () => {
  try {
    console.log('Connecting to MongoDB Cloud Atlas ...')
    await CONNECT_DB()
    console.log('Successfully connect to MongoDB Cloud Atlas!')
    START_SERVER()
  } catch (error) {
    console.log(error)
    process.exit(0)
  }
})()

// CONNECT_DB()
//   .then(() => console.log('Successfully connect to MongoDB Cloud Atlas!'))
//   .then(() => START_SERVER())
//   .catch(error => {
//     console.log(error)
//     process.exit(0)
//   })
