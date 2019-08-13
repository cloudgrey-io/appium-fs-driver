import BaseDriver, { errors } from 'appium-base-driver';
import { fs } from 'appium-support';
import _glob from 'glob';
import B from 'bluebird';
import uuid from 'uuid';

const glob = B.promisify(_glob);

const EL_CACHE = {};

class FSDriver extends BaseDriver {
  constructor (opts) {
    super(opts);
    this.locatorStrategies = ['xpath'];
  }

  async createSession (...args) {
    const [sessionId, caps] = await super.createSession(...args);
    return [sessionId, caps];
  }

  async deleteSession () {}

  async findElOrEls (strategy, selector, mult, context) {
    if (context) {
      throw new Error(`Context not currently supported for find element`);
    }

    const files = await glob(selector);

    if (mult) {
      return files.map(this.makeElement.bind(this));
    }

    if (files.length === 0) {
      throw new errors.NoSuchElementError();
    }

    return this.makeElement(files[0]);
  }

  async getText (elId) {
    if (EL_CACHE[elId]) {
      return (await fs.readFile(EL_CACHE[elId])).toString('utf8');
    }

    throw new errors.NoSuchElementError();
  }

  makeElement (file) {
    const elId = uuid.v4();
    EL_CACHE[elId] = file;
    return {ELEMENT: elId};
  }

}

export default FSDriver;
