import { Schema, model } from 'mongoose';

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },

  company: {
    type: String,
  },

  website: {
    type: String,
  },

  location: {
    type: String,
  },

  status: {
    type: String,
    required: [true, 'status is required!'],
  },

  skills: {
    type: [String],
    required: [true, 'skill is required!'],
  },

  bio: {
    type: String,
  },

  experience: [
    {
      title: {
        type: String,
        required: [true, 'title is required!'],
      },

      company: {
        type: String,
        required: [true, 'company name is required!'],
      },

      location: {
        type: String,
      },

      from: {
        type: Date,
        required: [true, 'from data is required!'],
      },

      to: {
        type: Date,
      },

      current: {
        type: Boolean,
        default: false,
      },

      description: {
        type: String,
      },
    },
  ],

  education: [
    {
      school: {
        type: String,
        required: [true, 'school is required!'],
      },

      degree: {
        type: String,
        required: [true, 'degree is required!'],
      },

      fieldofstudy: {
        type: String,
        required: true,
      },

      from: {
        type: Date,
        required: [true, 'from date is required!'],
      },

      to: {
        type: Date,
      },

      current: {
        type: Boolean,
        default: false,
      },

      description: {
        type: String,
      },
    },
  ],

  social: {
    youtube: {
      type: String,
    },

    twitter: {
      type: String,
    },

    facebook: {
      type: String,
    },

    linkedin: {
      type: String,
    },

    instagram: {
      type: String,
    },

    github: {
      type: String,
    },
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

export default model('Profiles', profileSchema);
