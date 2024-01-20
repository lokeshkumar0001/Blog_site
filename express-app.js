const express = require('express')
const cors = require('cors')
const userRoute = require('./routers/userRoute')
const articleRoute = require('./routers/articleRoute')
const { errorHandler } = require('./middlewares/errorHandler')

module.exports.expressApp = (app)=>{
    app.use(cors())
    app.use(express.json())

    app.use('/api/user',userRoute)
    app.use('/api/article',articleRoute)

    app.use(errorHandler)
}