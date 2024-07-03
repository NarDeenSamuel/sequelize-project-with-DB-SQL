import bcrypt from 'bcrypt'
import { userModel } from "../../db/models/user.model.js"
import { postModel } from "../../db/models/post.model.js"
import { commentModel } from '../../db/models/comment.model.js'
const getAllUsers = async (req, res) => {
    let users = await userModel.findAll({
        include: { model: postModel }
    })
    res.status(200).json({ message: "success", users })
}
const getSpicificUser = async (req, res) => {
    let id = req.params.id
    let postId=req.body.postId
  
let user = await userModel.findOne({where:{id:id}})
if(user){
    let post = await postModel.findOne({where:{id:postId,userId:id}})
   if(post)
    {
        let totalPostWithComments = await commentModel.findAll({
            where: {
              postId:postId
            },
           
            attributes: ['content', 'userId','createdAt'], 
            include: [{
              model: userModel,
              attributes: ['userName']
              
            }]
          })

        res.status(200).json({user,post,totalPostWithComments})
       
    }
else{
    res.status(400).json({message:"Post Not Found"})
}

}
else
{
    res.status(400).json({message:"User Not Found"})
}
}






const signUpOperation = async (req, res) => {
    let created = await userModel.findAll({
        where: { email: req.body.email }
    })
    if (created.length != 0) {
        res.status(400).json({ message: "email is already exist" })
    }
    else {
        req.body.password = bcrypt.hashSync(req.body.password, 8)
        await userModel.create(req.body)
        res.status(201).json({ message: "success" })
    }

}
const signInOperation = async (req, res) => {
    let created = await userModel.findAll({
        where: {
            email: req.body.email
        },
    });

    if (created.length != 0) {
        let PasswordHashed = created[0].dataValues.password;
        const matched = bcrypt.compareSync(req.body.password, PasswordHashed)

        // console.log(created)
        // console.log(matched)
        if (matched) {
            res.status(200).json({ message: "success" })
        }
        else {
            res.status(400).json({ message: "invalid password" })
        }
    }
    else {
        res.status(400).json({ message: "invalid email" })
    }

}
const signOutOperation = async (req, res) => {
    let id = req.params.id;
    console.log(id)
    let created = await userModel.findAll({
        where: {
            id: id
        },
    });
    if (created.length != 0) {
        await userModel.update(
            { activeNow: false },
            {
                where: {
                    id: id,
                },
            },
        );
        res.status(200).json({ message: "Loged Out" })
    }
    else {
        res.status(400).json({ message: "incorrect id" })
    }

}
const updateUserName = async (req, res) => {
    let id = req.params.id;
    console.log(id)
    let created = await userModel.findAll({
        where: {
            id: id
        },
    });
    // console.log(created.length)
    if (created.length != 0) {
        await userModel.update(
            { userName: req.body.userName },
            {
                where: {
                    id: id
                },
            },
        );
        res.status(200).json({ message: "updated" })
    }
    else {
        res.status(400).json({ message: "incorrect id" })
    }

}
const deleteUser = async (req, res) => {
    let id = req.params.id;
    console.log(id)
    let created = await userModel.findAll({
        where: {
            id: id
        },
    });
    // console.log(created.length)
    if (created.length != 0) {
        await userModel.destroy(
            {
                where: {
                    id: id,
                },
            },
        );
        res.status(200).json({ message: "deleted" })
    }
    else {
        res.status(400).json({ message: "incorrect id" })
    }

}
export { getAllUsers, getSpicificUser,signUpOperation, signInOperation, signOutOperation, updateUserName, deleteUser }