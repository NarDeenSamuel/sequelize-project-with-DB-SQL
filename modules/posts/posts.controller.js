import { userModel } from "../../db/models/user.model.js"
import { postModel } from "../../db/models/post.model.js"
import { commentModel } from "../../db/models/comment.model.js"


const getPosts = async (req, res) => {
    let posts = await postModel.findAll({
        include: [{
            model: commentModel,
            attributes: ['content','createdAt'],
            include: {
                model: userModel,
                attributes: ['userName']
            }
        }]
    })
    res.status(200).json({ message: "success", posts })
}
const getSpicificPost = async (req, res) => {
   
   let id=req.params.id
   let postId=req.body.id
   let post = await postModel.findOne({
    where: {
      id: id 
    },
    include: [
      {
        model: userModel,
        attributes: ['userName']
      }
    ]
  });
   res.json({message:"success",post})

}


const addPost =  async (req, res) => {
    await postModel.create(req.body)
    res.status(200).json({ message: "success" })
}
const updatePosts =  async (req, res) => {
    let id=req.params.id
    let postId=req.body.postId
    let created = await postModel.findAll({
        where: {
            id: postId,userId:id
        },
    });
 
    if (created.length != 0) {
        await postModel.update(
            {
                content: req.body.content
            },

            {
                where: {
                    id: postId,
                },
            },
        );
        res.status(200).json({ message: "updated" })
    }
    else {
        res.status(400).json({ message: "NOT YOUR POST" })
    }

}
const deletePost =  async (req, res) => {
    let id=req.params.id
    let postId=req.body.postId
    let created = await postModel.findAll({
        where: {
            id: postId,userId:id
        },
    });
    if (created.length != 0) {
        await postModel.destroy(
            {
                where: {
                    id: postId,
                },
            },
        );
        res.status(200).json({ message: "DELETED" })
    }
    else {
        res.status(400).json({ message: "NOT YOUR POST" })
    }

}

export {getPosts,addPost,updatePosts,deletePost,getSpicificPost}