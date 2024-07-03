import sequelize from '../dbConnection.js'
import {DataTypes} from 'sequelize'
import {postModel} from './post.model.js'

export const userModel = sequelize.define('user', {

    userName: {
        type: DataTypes.STRING(100)
    },
    email: {
        type: DataTypes.STRING(100)
    },
    password: {
        type: DataTypes.STRING(100)
    }
    ,
    activeNow: {
        type:DataTypes.BOOLEAN
    }
}, { timestamps: true, updatedAt: false })



userModel.hasMany(postModel,{
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
})
postModel.belongsTo(userModel)

