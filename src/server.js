import express from 'express'
import 'dotenv/config'
import usuarioRouter from './routes/usuario.routes.js'


const app = express()
const serverPort = process.env.SERVER_PORT
app.use(express.json())


app.use('/usuario', usuarioRouter)


app.listen(serverPort)


