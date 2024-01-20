const ArticleModel = require("../models/ArticleModel");

module.exports = async (req, res, next, id) => {
  try {
    const article = await ArticleModel.findById(id);
    if (article) {
      req.article = article;
      return next();
    }
    return next(new Error("Article Not Found"));
  } catch (error) {
    next(error);
  }
};
