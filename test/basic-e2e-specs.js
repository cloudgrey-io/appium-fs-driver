import { startServer } from '..';
import chai from 'chai';
import { remote } from 'webdriverio';

chai.should();

const TEST_HOST = 'localhost';
const TEST_PORT = 4737;

const WDIO_CONF = {
  hostname: TEST_HOST,
  port: TEST_PORT,
  path: '/wd/hub',
};

const CAPS = {
  platformName: 'Unix',
  deviceName: 'Macbook Pro'
};

describe('FSDriver', function () {
  let server;
  before(async function () {
    server = await startServer(TEST_PORT, TEST_HOST);
  });
  after(async function () {
    await server.close();
  });

  it('should create and delete a session', async function () {
    const driver = await remote({...WDIO_CONF, capabilities: CAPS});
    await driver.deleteSession();
  });

  describe('Session commands', function () {
    let driver;

    before(async function () {
      driver = await remote({...WDIO_CONF, capabilities: CAPS});
    });
    after(async function () {
      await driver.deleteSession();
    });

    it('should find a single file and get its contents', async function () {
      const el = await driver.$('/Users/jlipps/Code/appium/appium-fs-driver/.gitignore');
      const text = await el.getText();
      text.should.contain('build');
    });
  });

});
