import express from 'express'
import AuthController from "../../controllers/user/authController";

const userAuth_route =express.Router()


const authController=new AuthController()


userAuth_route.post('/registration',authController.userRegistration)


export default userAuth_route