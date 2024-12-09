import { promisify } from 'util';
import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this._client = createClient();
    this._alive = true;
    this._client.on('error', (err) => {
      console.log('Redis connection error:', err);
      this._alive = false;
    });
  }

  isAlive() {
    return this._alive;
  }

  async get(key) {
    const GET = promisify(this._client.GET);
    return GET.call(this._client, key);
    //return await this._client.get(key);
  }

  async set(key, value, expires) {
    const SETEX = promisify(this._client.SETEX);
    await SETEX.call(this._client, key, expires, value);
    //await this._client(key, expires, value);
  }

  async del(key) {
    const DEL = promisify(this._client.DEL);
    return DEL.call(this._client, key);
    //return await this._client.del(key);
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
