import exitHook from 'async-exit-hook';

import { makeLogger } from './functions/logger';
import { delay } from './functions/delay';
import ApiServer from './server';

const logger = makeLogger('API');

ApiServer.start();

exitHook.uncaughtExceptionHandler((e) => {
  logger.error(e);
});

exitHook.unhandledRejectionHandler((e) => {
  logger.error(e);
});

exitHook(async (callback: () => void) => {
  await ApiServer.stop();
  await delay(10);
  callback();
});

exitHook.uncaughtExceptionHandler(async () => {
  await delay(10);
  process.exit(-1);
});
