const express = require("express");
const router = express.Router();
const {
  createArticle,
  getArticleById,
  updateArticle,
  deleteArticle,
  addArticleToFav,
  deleteArticleFromFav,
  addCommentToArticle,
  deleteComment,
  getAllArticle,
} = require("../controllers/articleController");
const fetchArticleById = require("../middlewares/fetchArticleById");
const { isAuth } = require("../middlewares/auth");
const fetchCommetById = require("../middlewares/fetchCommetById");

router.param("articleId", fetchArticleById);
router.param("commentId", fetchCommetById);
// router.route("/create").post(createArticle);
// router.route("/").get(getAllArticle);
router.route("/").post(isAuth, createArticle).get(getAllArticle)
router.route("/:articleId").get(getArticleById).put(isAuth, updateArticle).delete(isAuth,deleteArticle)
router.route("/:articleId/favorite").post(isAuth,addArticleToFav).delete(isAuth,deleteArticleFromFav)
router.route("/:articleId/comment").post(isAuth,addCommentToArticle)
router.route("/:articleId/comment/:commentId").delete(isAuth,deleteComment)

// router.route('/:articleId').get(isAuth, )

module.exports = router;
