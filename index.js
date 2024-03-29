import yargs from 'yargs';
import { asyncify } from 'asyncbox';
import FSDriver from './lib/driver';
import { startServer } from './lib/server';


const DEFAULT_HOST = 'localhost';
const DEFAULT_PORT = 4737;

async function main () {
  let port = yargs.argv.port || DEFAULT_PORT;
  let host = yargs.argv.host || DEFAULT_HOST;
  return await startServer(port, host);
}

if (require.main === module) {
  asyncify(main);
}

export { FSDriver, startServer };
export default FSDriver;
