import { Router } from 'express';
import { check } from 'express-validator';

// IMPORT PROFILE CONTROLLERS
import {
  getProfiles,
  getCurrentProfile,
  getProfileById,
  createOrUpdateProfile,
  deleteUser,
  addExperience,
  deleteExperience,
  addEducation,
  deleteEducation,
} from '../../controllers/profile';

// IMPORT AUTH MIDDLEWARE
import isAuth from '../../middleware/auth';

const router = Router({ strict: true });

//  @ROUTE    >    GET   /api/profile
//  @DESC     >    GET PROFILES
//  @ACCESS   >    PUBLIC
router.get('/', getProfiles);

//  @ROUTE    >    GET   /api/profile/me
//  @DESC     >    GET CURRENT PROFILE
//  @ACCESS   >    PRIVATE
router.get('/me', isAuth, getCurrentProfile);

//  @ROUTE    >    POST   /api/profile
//  @DESC     >    CREATE OR UPDATE PROFILE
//  @ACCESS   >    PRIVATE
router.post(
  '/',
  isAuth,
  [
    check('status', 'Please enter your status!')
      .not()
      .isEmpty(),
    check('skills', 'Please enter your skills!')
      .not()
      .isEmpty(),
  ],
  createOrUpdateProfile
);

//  @ROUTE    >    GET   /api/profile/user/:userId
//  @DESC     >    GET PROFILE BY USER ID
//  @ACCESS   >    PUBLIC
router.get('/user/:userId', getProfileById);

//  @ROUTE    >    DELETE   /api/profile
//  @DESC     >    DELETE USER & PROFILE & ARTICLES
//  @ACCESS   >    PRIVATE
router.delete('/', isAuth, deleteUser);

//  @ROUTE    >    PUT   /api/profile/experience
//  @DESC     >    ADD EXPERIENCE
//  @ACCESS   >    PRIVATE
router.put(
  '/experience',
  isAuth,
  [
    check('title', 'Title is required!')
      .not()
      .isEmpty(),
    check('company', 'Company name is required!')
      .not()
      .isEmpty(),
    check('from', 'From date is required!')
      .not()
      .isEmpty(),
  ],
  addExperience
);

//  @ROUTE    >    DELETE   /api/profile/experience/expId
//  @DESC     >    DELETE EXPERIENCE
//  @ACCESS   >    PRIVATE
router.delete('/experience/:expId', isAuth, deleteExperience);

//  @ROUTE    >    PUT   /api/profile/education
//  @DESC     >    ADD EDUCATION
//  @ACCESS   >    PRIVATE
router.put(
  '/education',
  isAuth,
  [
    check('school', 'School is required!')
      .not()
      .isEmpty(),
    check('degree', 'Degree is required!')
      .not()
      .isEmpty(),
    check('fieldofindustry', 'Field of industry is required!')
      .not()
      .isEmpty(),
    check('from', 'From date is required!')
      .not()
      .isEmpty(),
  ],
  addEducation
);

//  @ROUTE    >    DELETE   /api/profile/education/eduId
//  @DESC     >    DELETE EDUCATION
//  @ACCESS   >    PRIVATE
router.delete('/education/:eduId', isAuth, deleteEducation);

export default router;
