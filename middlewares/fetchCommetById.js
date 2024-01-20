
const CommentModel = require("../models/commentModel")

module.exports = async(req,res,next,id) => {
    try {
        const comment = await CommentModel.findById(id)
        if(!comment){
            next(new Error('No comment found'))
        }else{
            req.comment = comment
            return next()
        }
    } catch (error) {
        next(error)
    }
}