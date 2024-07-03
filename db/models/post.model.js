import sequelize from '../dbConnection.js'
import {DataTypes } from 'sequelize'



export const postModel = sequelize.define('post', {

    title: {
        type: DataTypes.STRING(100)
    },
    content: {
        type: DataTypes.STRING(1000)
    }
})

