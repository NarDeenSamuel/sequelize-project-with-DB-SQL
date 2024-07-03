import sequelize from './db/dbConnection.js'
import express from 'express'
import userRouter from './modules/users/users.routes.js'
import postRouter from './modules/posts/posts.routes.js'
import commentRouter from './modules/comments/comment.routes.js'
const app = express()
const port = 3000



// const userModel = sequelize.define('user', {

//     userName: {
//         type: DataTypes.STRING(100)
//     },
//     email: {
//         type: DataTypes.STRING(100)
//     },
//     password: {
//         type: DataTypes.STRING(100)
//     }
//     ,
//     activeNow: {
//         type:DataTypes.BOOLEAN
//     }
// }, { timestamps: true, updatedAt: false })
// const postModel = sequelize.define('post', {

//     title: {
//         type: DataTypes.STRING(100)
//     },
//     content: {
//         type: DataTypes.STRING(1000)
//     }
// })
// const commentModel = sequelize.define('comment', {

//     content: {
//         type: DataTypes.STRING(1000)
//     },
 
// })

sequelize.sync({ alter: false ,force:false})


// Relations

// userModel.hasMany(postModel,{  
//     onDelete:'CASCADE',
//     onUpdate:'CASCADE'
// })
// postModel.belongsTo(userModel) 
// postModel.hasMany(commentModel,{
//      onDelete:'CASCADE',
//     onUpdate:'CASCADE'
// })
// commentModel.belongsTo(postModel)
// userModel.hasMany(commentModel,{
//      onDelete:'CASCADE',
//     onUpdate:'CASCADE'
// })
// commentModel.belongsTo(userModel)









app.use(express.json())




// ********** USERS  **************

 
app.use(userRouter)

// ********** POSTS  **************

app.use(postRouter)


// ********** COMMENTS **************

app.use(commentRouter)

//********************************************************


app.use('*', (req, res) => res.status(404).json({message:"404 Not FOUND"}))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))