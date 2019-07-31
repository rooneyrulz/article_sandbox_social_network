import { Router } from 'express';
import { check } from 'express-validator';

// IMPORT ARTICLE CONTROLLERS
import {
  getArticles,
  createArticle,
  deleteArticle,
  likeArticle,
  unlikeArticle,
  commentOnArticle,
  deleteComment,
  getArticle,
} from '../../controllers/article';

// IMPORT AUTH MIDDLEWARE
import isAuth from '../../middleware/auth';

const router = Router({ strict: true });

//  @ROUTE    >    GET   /api/article
//  @DESC     >    GET ALL ARTICLE
//  @ACCESS   >    PUBLIC
router.get('/', getArticles);

//  @ROUTE    >    POST   /api/article/create
//  @DESC     >    CREATE ARTICLE
//  @ACCESS   >    PRIVATE
router.post(
  '/create',
  isAuth,
  [
    check('title', 'Title is required!')
      .not()
      .isEmpty(),
    check('description', 'Description is required!')
      .not()
      .isEmpty(),
  ],
  createArticle
);

//  @ROUTE    >    POST   /api/article/:id
//  @DESC     >    GET ARTICLE
//  @ACCESS   >    PUBLIC
router.get('/:id', getArticle);

//  @ROUTE    >    DELETE   /api/article/:id
//  @DESC     >    DELETE ARTICLE
//  @ACCESS   >    PRIVATE
router.delete('/:id', isAuth, deleteArticle);

//  @ROUTE    >    PUT   /api/article/like/:id
//  @DESC     >    LIKE ARTICLE
//  @ACCESS   >    PRIVATE
router.put('/like/:id', isAuth, likeArticle);

//  @ROUTE    >    PUT   /api/article/unlike/:id
//  @DESC     >    UNLIKE ARTICLE
//  @ACCESS   >    PRIVATE
router.put('/unlike/:id', isAuth, unlikeArticle);

//  @ROUTE    >    POST   /api/article/comment/:id
//  @DESC     >    COMMENT ON ARTICLE
//  @ACCESS   >    PRIVATE
router.post(
  '/comment/:id',
  isAuth,
  [
    check('text', 'Please enter a valid comment!')
      .not()
      .isEmpty(),
  ],
  commentOnArticle
);

//  @ROUTE    >    DELETE   /api/article/:id/:commentId
//  @DESC     >    DELETE COMMENT ON ARTICLE
//  @ACCESS   >    PRIVATE
router.delete('/comment/:id/:commentId', isAuth, deleteComment);

export default router;
