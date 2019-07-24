import { Schema, model } from 'mongoose';

const articleSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },

  name: {
    type: String,
    required: [true, 'user name is required!'],
  },

  title: {
    type: String,
    required: [true, 'article title is required!'],
  },

  description: {
    type: String,
    required: [true, 'article description is required!'],
  },

  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
      },
    },
  ],

  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
      },

      text: {
        type: String,
        required: [true, 'comment is required!'],
      },

      name: {
        type: String,
      },

      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  date: {
    type: Date,
    default: Date.now,
  },
});

export default model('Articles', articleSchema);
