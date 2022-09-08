import ApiServer from '../src/server';

before(async function () {
  this.server = await ApiServer.start();
});

after(async function () {
  await ApiServer.stop();
});
