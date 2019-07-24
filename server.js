import express from 'express';
import { createServer } from 'http';
import mongoose from 'mongoose';
import logger from 'morgan';
import bluebird from 'bluebird';

// IMPORT MONGO CONNECTION
import dbConnection from './config/db';

// IMPORT ROUTES
import testRoute from './routes/api';
import authRoute from './routes/api/auth';
import userRoute from './routes/api/user';
import articleRoute from './routes/api/article';
import profileRoute from './routes/api/profile';

const app = express();
const server = createServer(app);

// USE MONGOOSE'S PROMISE LIBRARY
mongoose.Promise = bluebird;

// USE DATABASE CONNECTION
dbConnection();

// USE HTTP-LOGGER MIDDLEWARE
app.use(logger('dev'));

// USE EXPRESS MIDDLEWARE FUNCTIONS FOR PARSING JSON BODY
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// HANDLE CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth-token'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE');
    return res.status(200).json({});
  }
  next();
});

// USE ROUTES
app.use('/api/test', testRoute);
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/article', articleRoute);
app.use('/api/profile', profileRoute);

// LISTENING TO SERVER
server.listen(process.env.PORT || 5000, () =>
  console.log(`server running on port ${process.env.PORT || 5000}`)
);
