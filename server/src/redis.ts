import { createClient } from 'redis';
import { promisify } from 'util';

const client = createClient();

export default {
  get: promisify(client.get).bind(client),
  set: promisify(client.set).bind(client)
};