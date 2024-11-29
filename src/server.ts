// import { Server } from "http";

import app from './app';
import config from './config';

import mongoose from 'mongoose';

// let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`this is  app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
