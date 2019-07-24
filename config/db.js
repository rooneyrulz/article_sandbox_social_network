import mongoose from 'mongoose';
import config from 'config';

export default async () => {
  try {
    const isConnected = await mongoose.connect(config.get('MONGO_URI'), {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    if (isConnected) console.log('connecting to mongodb..');
  } catch (error) {
    await process.exit(1);
    throw error;
  }
};
