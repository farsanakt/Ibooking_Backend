import express from 'express'
import dotenv from 'dotenv'
import connectMonogoDb from './config/db'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userAuth_route from './routes/userRoutes/authRoutes'
import auditoriumAuth_route from './routes/auditoriumRoutes/authRoute'
import auditorium_route from './routes/auditoriumRoutes/auditoriumRoutes'

const app=express()
dotenv.config()
const PORT=process.env.PORT


connectMonogoDb()
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:8080', 'https://ibookingvenue.com'],
    credentials: true,
  })
);

app.use('/',auditoriumAuth_route)
app.use('/',userAuth_route)
app.use('/',auditorium_route)

app.listen(PORT,()=>{
    console.log('running')
})