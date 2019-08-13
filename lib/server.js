import log from './logger';
import { server as baseServer, routeConfiguringFunction } from 'appium-base-driver';
import FSDriver from './driver';

async function startServer (port, address) {
  let driver = new FSDriver({port, address});
  let router = routeConfiguringFunction(driver);
  let server = await baseServer(router, port, address, false);
  // make the driver available
  server.driver = driver;
  log.info(`FSDriver server listening on http://${address}:${port}`);
  return server;
}

export { startServer };
