import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
  },

  name: {
    type: String,
    required: [true, 'user name is required!'],
  },

  email: {
    type: String,
    unique: true,
    required: [true, 'email is required!'],
  },

  password: {
    type: String,
    required: [true, 'password is required!'],
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

export default model('Users', userSchema);
