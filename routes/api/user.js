import { Router } from 'express';
import { check } from 'express-validator';

// IMPORT AUTH CONTROLLERS
import {
  getUsers,
  registerUser,
  getUser,
  deleteUser,
} from '../../controllers/user';

const router = Router({ strict: true });

//  @ROUTE    >    GET   /api/user
//  @DESC     >    GET USERS
//  @ACCESS   >    PUBLIC
router.get('/', getUsers);

//  @ROUTE    >    POST   /api/user/register
//  @DESC     >    SIGN UP USER
//  @ACCESS   >    PUBLIC
router.post(
  '/register',
  [
    check('name', 'Name must be filled!')
      .not()
      .isEmpty(),
    check('email', 'Please enter a valid email!').isEmail(),
    check('password', 'Password must be 8 charactors long!').isLength({
      min: 8,
    }),
  ],
  registerUser
);

//  @ROUTE    >    GET   /api/user/:id
//  @DESC     >    GET USER BY ID
//  @ACCESS   >    PUBLIC
router.get('/:id', getUser);

//  @ROUTE    >    DELETE   /api/user/:id
//  @DESC     >    DELETE USER
//  @ACCESS   >    PRIVATE
router.delete('/:id', deleteUser);

export default router;
