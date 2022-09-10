import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import { Server } from 'http';

import * as db from './data';
import { makeLogger } from './functions/logger';
import { delay } from './functions/delay';
import { badRequest } from './functions/response';

import { LoginRouter, UserRouter, ProductRouter } from './routes';

config();

const logger = makeLogger('ApiServer');

export default class ApiServer {
  static server: Server;

  // method to start our Express Server
  static async start(): Promise<Server> {
    await db.start();

    const app = express();

    // accessible to any origin
    app.use(cors());

    // Body Parser middleware to handle raw JSON files
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    const PORT = process.env.PORT || 3000;

    this.server = app.listen(PORT, () => {
      logger.info(`🚀⚙️ Server ready at http://localhost:${PORT}`);
    });

    app.use((req, res, next) => {
      // 10 sec timeout
      res.setTimeout(10 * 1000, () => res.status(408).send('Request Timeout.'));

      next();
    });

    // api routes
    app.use('/api/users', UserRouter);
    app.use('/api/products', ProductRouter);
    app.use('/api/login', LoginRouter);

    // when invalid routes are entered
    app.use(async (req, res) => badRequest(res, "Route doesn't exist."));

    return this.server;
  }

  // method to stop our Express Server
  static async stop(): Promise<void> {
    await db.stop();
    await new Promise((resolve) => this.server.close(resolve));
    await delay(3);
    logger.info('API server gracefully stopped.');
  }
}
