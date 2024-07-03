import { Router } from "express"
import {getPosts,addPost,updatePosts,deletePost,getSpicificPost} from './posts.controller.js'
const postRouter = Router()

// 1 Get Posts
postRouter.get('/posts',getPosts )
// 3-Get Spicific Post
postRouter.get('/posts/:id',getSpicificPost)
// 4- Add Posts
postRouter.post('/posts',addPost)
// 5- Update Posts
postRouter.put('/posts/:id',updatePosts)
// 6- Delete posts
postRouter.delete('/posts/:id',deletePost)

export default postRouter