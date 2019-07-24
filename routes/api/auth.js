import { Router } from 'express';
import { check } from 'express-validator';

// IMPORT AUTH CONTROLLERS
import { authenticateUser, getAuthUser } from '../../controllers/auth';

// IMPORT AUTH MIDDLEWARE
import isAuth from '../../middleware/auth';

const router = Router({ strict: true });

//  @ROUTE    >    POST   /api/auth
//  @DESC     >    AUTHENTICATE USER
//  @ACCESS   >    PUBLIC
router.post(
  '/',
  [
    check('email', 'Please enter a valid email!').isEmail(),
    check('password', 'Password is required!').exists(),
  ],
  authenticateUser
);

//  @ROUTE    >    GET   /api/auth/user
//  @DESC     >    GET AUTHENTICATED USER
//  @ACCESS   >    PRIVATE
router.get('/user', isAuth, getAuthUser);

export default router;
