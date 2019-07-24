import config from 'config';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { validationResult } from 'express-validator';

// IMPORT MODELS
import User from '../models/User';

//  @ROUTE    >    POST   /api/auth
//  @DESC     >    AUTHENTICATE USER
//  @ACCESS   >    PUBLIC
export const authenticateUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).exec();

    if (!user) return res.status(409).send('User Not Found!');

    const isMatch = await compare(password, user.password);

    if (!isMatch) return res.status(409).send('Password is not match!');

    const token = await sign({ id: user._id }, config.get('JWT_KEY'), {
      expiresIn: 360000,
    });

    return res.status(200).json({
      token,
      user: { ...user._doc, password: null },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server Error!');
  }
};

//  @ROUTE    >    GET   /api/auth/user
//  @DESC     >    GET AUTHENTICATED USER
//  @ACCESS   >    PRIVATE
export const getAuthUser = async (req, res, next) => {
  const { id } = req.user;

  try {
    const user = await User.findById(id)
      .select(' -password ')
      .exec();

    if (!user) return res.status(401).send('Unauthorized!');

    return res.status(200).json({ user });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server Error!');
  }
};
