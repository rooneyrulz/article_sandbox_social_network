import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

// IMPORT MODELS
import User from '../models/User';
import Article from '../models/Article';

//  @ROUTE    >    GET   /api/article
//  @DESC     >    GET ALL ARTICLE
//  @ACCESS   >    PUBLIC
export const getArticles = async (req, res, next) => {
  try {
    const articles = await Article.find()
      .sort({ date: -1 })
      .exec();

    if (articles.length < 1)
      return res.status(409).send('No Articles Added Yet!');

    return res.status(200).json({
      articles,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server Error!');
  }
};

//  @ROUTE    >    POST   /api/article/create
//  @DESC     >    CREATE ARTICLE
//  @ACCESS   >    PRIVATE
export const createArticle = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { id } = req.user;
  const { title, description } = req.body;

  try {
    const user = await User.findById(id).exec();

    if (!user) return res.status(401).send('Unauthorized, User Not Found!');

    const newArticle = new Article({
      _id: mongoose.Types.ObjectId(),
      user: id,
      name: user.name,
      title,
      description,
    });

    const article = await newArticle.save();
    return res.status(201).json({
      article,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server Error!');
  }
};

//  @ROUTE    >    GET   /api/article/:id
//  @DESC     >    GET ARTICLE
//  @ACCESS   >    PRIVATE
export const getArticle = async (req, res, next) => {
  const { id } = req.params;

  try {
    const article = await Article.findById(id).exec();

    if (!article) return res.status(409).send('No Article Found!');

    return res.status(200).json({
      article,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server Error!');
  }
};

//  @ROUTE    >    DELETE   /api/article/:id
//  @DESC     >    DELETE ARTICLE
//  @ACCESS   >    PRIVATE
export const deleteArticle = async (req, res, next) => {
  const { id } = req.params;

  try {
    const article = await Article.findById(id).exec();

    if (!article) return res.status(409).send('No Article Found!');

    if (article.user.toString() !== req.user.id)
      return res.status(401).send('User not authorized!');

    await article.remove();

    return res.status(200).send('Article removed!');
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server Error!');
  }
};

//  @ROUTE    >    PUT   /api/article/like/:id
//  @DESC     >    LIKE ARTICLE
//  @ACCESS   >    PRIVATE
export const likeArticle = async (req, res, next) => {
  const { id } = req.params;

  try {
    const article = await Article.findById(id).exec();

    if (!article) return res.status(409).send('Article Not Found!');

    // CHECK THE ARTICLE HAS ALEADY BEEN LIKED
    if (
      article.likes.filter(like => like.user.toString() === req.user.id)
        .length > 0
    )
      return res.status(409).send('Article already liked!');

    article.likes.unshift({ user: req.user.id });

    await article.save();

    return res.status(200).json(article.likes);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server Error!');
  }
};

//  @ROUTE    >    PUT   /api/article/unlike/:id
//  @DESC     >    UNLIKE ARTICLE
//  @ACCESS   >    PRIVATE
export const unlikeArticle = async (req, res, next) => {
  const { id } = req.params;

  try {
    const article = await Article.findById(id).exec();

    if (!article) return res.status(409).send('Article Not Found!');

    // CHECK THE ARTICLE HAS ALREADY BEEN LIKED
    if (
      article.likes.filter(like => like.user.toString() === req.user.id)
        .length === 0
    )
      return res.status(409).send('Article has not been liked!');

    // FIND INDEX
    const removeIndex = article.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    article.likes.splice(removeIndex, 1);

    await article.save();

    return res.status(200).json(article.likes);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server Error!');
  }
};

//  @ROUTE    >    POST   /api/article/comment/:id
//  @DESC     >    COMMENT ON ARTICLE
//  @ACCESS   >    PRIVATE
export const commentOnArticle = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { id } = req.params;
  const { text } = req.body;

  try {
    const user = await User.findById(req.user.id)
      .select(' -password ')
      .exec();

    if (!user) return res.status(401).send('Unauthorized, No User Found!');

    const article = await Article.findById(id).exec();

    if (!article) return res.status(409).send('Article not found!');

    const newComment = {
      user: req.user.id,
      text,
      name: user.name,
    };

    article.comments.unshift(newComment);

    await article.save();

    return res.status(201).json(article.comments);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server Error!');
  }
};

//  @ROUTE    >    DELETE   /api/article/comment/:id/:commentId
//  @DESC     >    DELETE COMMENT
//  @ACCESS   >    PRIVATE
export const deleteComment = async (req, res, next) => {
  const { id, commentId } = req.params;

  try {
    const article = await Article.findById(id).exec();

    if (!article) return res.status(409).send('Article Not Found!');

    // FIND THE RIGHT COMMENT
    const comment = article.comments.find(cmnt => cmnt.id === commentId);

    if (!comment) return res.status(409).send('Comment does not exist!');

    if (comment.user.toString() !== req.user.id)
      return res.status(409).send('User not authorized!');

    // FIND INDEX
    const removeIndex = article.comments
      .map(cmnt => cmnt.id)
      .indexOf(commentId);

    article.comments.splice(removeIndex, 1);

    await article.save();

    return res.status(200).json(article.comments);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server Error!');
  }
};
