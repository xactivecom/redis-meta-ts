import { IRedisConfig } from './services/redis.interface';

export const environment: IRedisConfig = {
  redisHost: 'localhost',
  redisPort: 6379,
  redisUsername: 'stuart.thompson',
  redisPassword: '',
  redisDb: 0,
};