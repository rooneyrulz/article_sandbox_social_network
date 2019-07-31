import mongoose from 'mongoose';
import config from 'config';
import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { validationResult } from 'express-validator';

// IMPORT MODELS
import User from '../models/User';

//  @ROUTE    >    GET   /api/user
//  @DESC     >    GET USERS
//  @ACCESS   >    PUBLIC
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
      .select(' -password ')
      .exec();

    if (users.length < 1) return res.status(409).send('No users found!');

    return res.status(200).json({ users });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server Error!');
  }
};

//  @ROUTE    >    POST   /api/user/register
//  @DESC     >    SIGN UP USER
//  @ACCESS   >    PUBLIC
export const registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { name, email, password, cPassword } = req.body;

  if (password !== cPassword)
    return res.status(400).send('Password is not match!');

  try {
    const isUser = await User.findOne({ email }).exec();

    if (isUser) return res.status(409).send('User already exist!');

    const hashedPwd = await hash(password, 10);

    if (!hashedPwd) return res.status(500).send('Password can not be hashed!');

    const newUser = new User({
      _id: mongoose.Types.ObjectId(),
      name,
      email,
      password: hashedPwd,
    });

    const user = await newUser.save();

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

//  @ROUTE    >    GET   /api/user/:id
//  @DESC     >    GET USER BY ID
//  @ACCESS   >    PUBLIC
export const getUser = (req, res, next) =>
  res.status(200).send('Get User By Id..');

//  @ROUTE    >    DELETE   /api/user/:id
//  @DESC     >    DELETE USER
//  @ACCESS   >    PRIVATE
export const deleteUser = (req, res, next) =>
  res.status(200).send('Delete User..');
