import { Router } from "express";
import  {getComments,addComments,updateComment,deleteComment} from './comments.controller.js'
const commentRouter =Router()


// 1-Get Comments
commentRouter.get('/comments', getComments);
// 2-Add comments
commentRouter.post('/comments', addComments)
// 3-Update Comments
commentRouter.patch('/comments/update/:id',updateComment)
// 4-Delete Comments
commentRouter.delete('/comments/:id',deleteComment)



export default commentRouter