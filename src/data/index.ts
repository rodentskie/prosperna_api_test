import { connect, disconnect } from 'mongoose';
import { config } from 'dotenv';

config();

// start function to enable connection to our MongoDB database
const start = async () => {
  const uri: string = process.env.MONGO_URI || 'mongodb://localhost/prosperna';

  await connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
};

// stop function to disconnect to our MongoDB database
const stop = async () => {
  await disconnect();
};

export { start, stop };
