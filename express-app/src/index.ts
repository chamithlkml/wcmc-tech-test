import { PORT } from './config'
import express from 'express'
import rootRouter from './routes'
import ErrorHandler from './middlewares/error-handler'

const app = express()
app.use(express.json())

app.use('/api', rootRouter)
app.use(ErrorHandler)

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})

// For tests
export default app;