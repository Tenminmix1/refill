import * as redis from 'redis';
const client = redis.createClient(parseInt(process.env.REDIS_PORT || '6379'), process.env.REDIS_HOST);

export default {
  client
};
