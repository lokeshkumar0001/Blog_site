const mongoose = require("mongoose");
const UserModel = require("./userModel");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: String,
  body: String,
  favoritesCount: { type: Number, default: 0 },
  comments:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Comment'
  }],
  tagList: [{type:String}],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
},{timestamps: true});

articleSchema.methods.updateFavoriteCount = async function(){
  const totalUserWithFav = await UserModel.find({favorites: {$in:[this._id]}}).count()
  this.favoritesCount = totalUserWithFav

  return this.save();
}


const ArticleModel = new mongoose.model('Article',articleSchema);

module.exports = ArticleModel