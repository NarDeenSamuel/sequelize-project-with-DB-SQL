import { userModel } from "../../db/models/user.model.js";
import { postModel } from "../../db/models/post.model.js";
import {commentModel} from "../../db/models/comment.model.js"

const getComments = async (req, res) => {
    try {
        let comments = await commentModel.findAll({
            include: [{
                model: postModel,
                attributes: ['content','createdAt'],
                include: {
                    model: userModel,
                    attributes: ['userName']
                }
            }]
        });
        res.status(200).json({ message: "success", comments });
    } catch (error) {
        res.status(500).json({ message: "error", error: error.message });
    }
}
const addComments = async (req, res) => {
    // await commentModel.create(req.body)
    const user = await userModel.findOne({where:{id:req.body.userId,activeNow:true}})
    if(!user)
        {
            res.status(400).json({ message: "user not active" })
        }
       else
       {
        const comment = await commentModel.create(req.body)
        res.status(201).json({ message: "success",comment })
       } 
   
}
const updateComment =  async (req, res) => {
    let id=req.params.id
    let commentId=req.body.commentId
    let created = await commentModel.findAll({
        where: {
            id: commentId,userId:id
        },
    });
 
    if (created.length != 0) {
        await commentModel.update(
            {
                content: req.body.content
            },

            {
                where: {
                    id: commentId,
                },
            },
        );
        res.status(200).json({ message: "updated" })
    }
    else {
        res.status(400).json({ message: "NOT YOUR COMMENT" })
    }

}
const deleteComment =  async (req, res) => {
    let id=req.params.id
    let commentId=req.body.commentId
    let created = await commentModel.findAll({
        where: {
            id: commentId,userId:id
        },
    });

    if (created.length != 0) {
        await commentModel.destroy(
            {
                where: {
                    id: commentId,
                },
            },
        );
        res.status(200).json({ message: "DELETED" })
    }
    else {
        res.status(400).json({ message: "NOT YOUR COMMENT" })
    }


}


export {getComments,addComments,updateComment,deleteComment}