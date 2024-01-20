const ArticleModel = require("../models/ArticleModel");
const CommentModel = require("../models/commentModel");
const UserModel = require("../models/userModel");

module.exports.createArticle = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.payload.id);
    if (!user) {
      next(new Error("User not found!"));
    }

    let article = new ArticleModel(req.body);
    article.author = req.payload.id;
    await article.save();

    return res.json({
      success: true,
      message: "Article created!",
      article,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllArticle = async (req, res, next) => {
  let allQuery = {};
  let limit = 0;
  let offset = 0;
  try {
    if ("limit" in req.query) {
      limit = req.query.limit;
    }
    if ("offset" in req.query) {
      offset = req.query.offset;
    }

    const author = req.query.author ? await UserModel.findOne({username: req.query.author}): null
    const favorited = req.query.favorited ? await UserModel.findOne({username: req.query.favorited}) : null

    if(author){
      allQuery.author = author._id
    }

    if(favorited){
      allQuery
    }

    const article = await ArticleModel.find(allQuery)
      .skip(Number(offset))
      .limit(Number(limit))
      .populate("author")
      .sort({ createdAt: -1 })
      .lean();

    return res.json({
      success: true,
      articleCount: article.length,
      article,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getArticleById = async (req, res, next) => {
  try {
    const article = await req.article.populate("author");
    return res.send({
      success: true,
      article,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.updateArticle = async (req, res, next) => {
  try {
    if (req.article.author._id.toString() === req.payload.id.toString()) {
      const article = await req.article.populate("author");

      if (req.body.title) {
        req.article.title = req.body.title;
      }
      if (req.body.description) {
        req.article.description = req.body.description;
      }
      if (req.body.body) {
        req.article.body = req.body.body;
      }
      if (req.body.tagList) {
        req.article.tagList = req.body.tagList;
      }

      const updatedArticle = await req.article.save();
      return res.send({
        success: true,
        message: "article updated",
        updatedArticle,
      });
    }

    next(new Error("Only author can update this article."));
  } catch (error) {
    next(error);
  }
};

module.exports.deleteArticle = async (req, res, next) => {
  try {
    if (req.payload.id.toString() === req.article.author._id.toString()) {
      await ArticleModel.deleteOne({ _id: req.article._id });

      return res.json({
        success: true,
        message: "article deleted",
      });
    }

    next(new Error("Only author can delete this article"));
  } catch (error) {
    next(error);
  }
};

module.exports.addArticleToFav = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.payload.id);
    if (!user) {
      next(new Error("User Not Found"));
    }

    await user.Favorite(req.article._id);

    const updatedArticle = await req.article.updateFavoriteCount();

    return res.json({
      success: true,
      updatedArticle,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteArticleFromFav = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.payload.id);
    if (!user) {
      next(new Error("User Not Found"));
    }

    await user.unfavorite(req.article._id);

    const updatedArticle = await req.article.updateFavoriteCount();

    return res.json({
      success: true,
      updatedArticle,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.addCommentToArticle = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.payload.id);
    if (!user) {
      next(new Error("User Not Found"));
    }

    let comment = new CommentModel();
    comment.author = user._id;
    comment.article = req.article._id;
    comment.body = req.body.comment;

    const addedComment = await comment.save();

    req.article.comments.push(addedComment._id);
    const updatedArticle = await req.article.save();

    return res.json({
      success: true,
      message: "comment added",
      updatedArticle,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteComment = async (req, res, next) => {
  try {
    if (req.comment.author.toString() === req.payload.id.toString()) {
      await CommentModel.deleteOne({ author: req.payload.id });

      req.article.comments.pull({ _id: req.comment._id });

      await req.article.save();
      return res.json({
        success: true,
        message: "comment deleted",
      });
    }
    next(new Error("Only author can delete this comment"));
  } catch (error) {
    next(error);
  }
};
