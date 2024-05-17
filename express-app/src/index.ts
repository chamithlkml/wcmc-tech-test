import { PORT, REACT_APP_PORT } from './config'
import express from 'express'
import cors from 'cors';
import rootRouter from './routes'
import ErrorHandler from './middlewares/error-handler'
import { authRequest } from './middlewares/auth-handler'

const app = express()
app.use(express.json())
app.use(cors({
  origin: `http://localhost:${REACT_APP_PORT}`
}));

app.use('/api', [authRequest], rootRouter)
app.use(ErrorHandler)

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})

// For tests
export default app;