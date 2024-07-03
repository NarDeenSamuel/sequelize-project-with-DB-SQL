import sequelize from "../dbConnection.js"
import { DataTypes} from 'sequelize'
import {postModel} from './post.model.js'
import {userModel} from './user.model.js '


export const commentModel = sequelize.define('comment', {

    content: {
        type: DataTypes.STRING(1000)
    },
 
})

postModel.hasMany(commentModel,{
    onDelete:'CASCADE',
   onUpdate:'CASCADE'
})
commentModel.belongsTo(postModel)
userModel.hasMany(commentModel,{
    onDelete:'CASCADE',
   onUpdate:'CASCADE'
})
commentModel.belongsTo(userModel)
