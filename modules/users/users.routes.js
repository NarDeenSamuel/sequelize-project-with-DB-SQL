import { Router } from "express"
const userRouter =Router()

import {getAllUsers,signUpOperation,signInOperation,signOutOperation,updateUserName,deleteUser,getSpicificUser} from './users.controller.js'
// 1-Get Users
userRouter.get('/users',getAllUsers )
// 2 get spicific user with spicific post & comments
userRouter.get('/users/:id',getSpicificUser)
// 3- SignUp
userRouter.post('/users/signUp', signUpOperation)
//4-SignIn
userRouter.post('/users/signIn', signInOperation)
// 5- SignOut
userRouter.post('/users/signOut/:id',signOutOperation )
// 6- Update
userRouter.patch('/users/update/:id',updateUserName )
//7-delete
userRouter.delete('/users/:id',deleteUser)



export default userRouter

