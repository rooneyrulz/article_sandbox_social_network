import { validationResult } from 'express-validator';

// IMPORT MODELS
import Profile from '../models/Profile';
import Article from '../models/Article';
import User from '../models/User';

//  @ROUTE    >    GET   /api/profile
//  @DESC     >    GET PROFILES
//  @ACCESS   >    PUBLIC
export const getProfiles = async (req, res, next) => {
  try {
    const profiles = await Profile.find()
      .populate('user', ['name', 'email'])
      .exec();

    if (profiles.length < 1) return res.status(409).send('No profiles found!');

    return res.status(200).json(profiles);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server Error!');
  }
};

//  @ROUTE    >    GET   /api/profile/me
//  @DESC     >    GET CURRENT PROFILE
//  @ACCESS   >    PRIVATE
export const getCurrentProfile = async (req, res, next) => {
  const { id } = req.user;

  try {
    const profile = await Profile.findOne({ user: id })
      .populate('user', ['name', 'email'])
      .exec();

    if (!profile)
      return res.status(400).send('No profile found for this user!');

    return res.status(200).json(profile);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server Error!');
  }
};

//  @ROUTE    >    POST   /api/profile
//  @DESC     >    CREATE OR UPDATE PROFILE
//  @ACCESS   >    PRIVATE
export const createOrUpdateProfile = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { id } = req.user;
  const {
    company,
    website,
    location,
    bio,
    status,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
    github,
  } = req.body;

  // BUILD PROFILE OBJECT
  const profileFields = {};
  profileFields.user = id;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (skills)
    profileFields.skills = skills.split(',').map(skill => skill.trim());

  // BUILD SOCIAL OBJECT
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;
  if (github) profileFields.social.github = github;

  try {
    let profile = await Profile.findOne({ user: id }).exec();

    if (profile) {
      // UPDATE
      profile = await Profile.findOneAndUpdate(
        { user: id },
        { $set: profileFields },
        { new: true }
      );

      return res.status(200).json(profile);
    }

    // CREATE
    profile = new Profile(profileFields);

    await profile.save();

    return res.status(201).json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

//  @ROUTE    >    GET   /api/profile/user/:userId
//  @DESC     >    GET PROFILE BY USER ID
//  @ACCESS   >    PUBLIC
export const getProfileById = async (req, res) => {
  const { userId } = req.params;

  try {
    const profile = await Profile.findOne({
      user: userId,
    })
      .populate('user', ['name', 'avatar'])
      .exec();

    if (!profile) return res.status(400).send('Profile not found!');

    return res.status(200).json(profile);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server Error');
  }
};

//  @ROUTE    >    DELETE   /api/profile
//  @DESC     >    DELETE USER & PROFILE & ARTICLES
//  @ACCESS   >    PRIVATE
export const deleteUser = async (req, res, next) => {
  const { id } = req.user;

  try {
    // REMOVE USER ARTICLES
    await Article.deleteMany({ user: id }).exec();
    // REMOVE PROFILE
    await Profile.findOneAndRemove({ user: id }).exec();
    // REMOVE USER
    await User.findOneAndRemove({ _id: id }).exec();

    return res.status(200).send('Account deleted!');
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server Error');
  }
};

//  @ROUTE    >    PUT   /api/profile/experience
//  @DESC     >    ADD EXPERIENCE
//  @ACCESS   >    PRIVATE
export const addExperience = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { id } = req.user;

  const { title, company, location, from, to, current, description } = req.body;

  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  };

  try {
    const profile = await Profile.findOne({ user: id }).exec();

    if (!profile) return res.status(400).send('Profile not found!');

    profile.experience.unshift(newExp);

    await profile.save();

    return res.status(201).json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

//  @ROUTE    >    DELETE   /api/profile/experience/expId
//  @DESC     >    DELETE EXPERIENCE
//  @ACCESS   >    PRIVATE
export const deleteExperience = async (req, res, next) => {
  const { expId } = req.params;
  const { id } = req.user;

  try {
    const profile = await Profile.findOne({ user: id }).exec();

    if (!profile) return res.status(400).send('Profile not found!');

    // FIND INDEX
    const removeIndex = profile.experience.map(exp => exp.id).indexOf(expId);

    profile.experience.splice(removeIndex, 1);

    await profile.save();

    return res.status(200).send(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

//  @ROUTE    >    PUT   /api/profile/education
//  @DESC     >    ADD EDUCATION
//  @ACCESS   >    PRIVATE
export const addEducation = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { id } = req.user;

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = req.body;

  const newEdu = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  };

  try {
    const profile = await Profile.findOne({ user: id }).exec();

    if (!profile) return res.status(400).send('Profile not found!');

    profile.education.unshift(newEdu);

    await profile.save();

    return res.status(201).json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

//  @ROUTE    >    DELETE   /api/profile/education/eduId
//  @DESC     >    DELETE EDUCATION
//  @ACCESS   >    PRIVATE
export const deleteEducation = async (req, res, next) => {
  const { id } = req.user;
  const { eduId } = req.params;

  try {
    const profile = await Profile.findOne({ user: id }).exec();

    if (!profile) return res.status(400).send('Profile not found!');

    // FIND INDEX
    const removeIndex = profile.education.map(edu => edu.id).indexOf(eduId);

    profile.education.splice(removeIndex, 1);

    await profile.save();

    return res.status(200).json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
