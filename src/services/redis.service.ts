import { createClient } from 'redis';
import { IRedisService, IRedisConfig } from './redis.interface';

export class RedisService implements IRedisService {
  protected redisClient?;
  protected connectStatus = false;
  public initialized = false;

  // Namespace key prefix
  protected prefix?;

  /**
   * Connect to Redis
   * @param config Redis connection configuration
   * @param prefix namespace key prefix
   */
  connect = async (config: IRedisConfig, prefix?: string): Promise<void> => {
    this.initialized = true;

    // Support global key prefix
    this.prefix = prefix;

    // Set connect options
    const redisOpts: any = {
      socket: {
        host: config.redisHost,
        port: config.redisPort
      },
      database: config.redisDb
    };
    if (config.redisUsername) redisOpts.username = config.redisUsername;
    if (config.redisPassword) redisOpts.password = config.redisPassword;  

    // Connect
    this.redisClient = createClient(redisOpts);
    await this.redisClient.connect();
    this.connectStatus = true;

    // Capture errors in log
    this.redisClient.on('error', (err) => console.log('Redis Client Error', err));
  };

  /**
   * Flush buffer and disonnect from Redis
   */
  disconnect = async (): Promise<void> => {
    await this.redisClient.quit();
  };

  /**
   * Determine if connected to Redis
   * @returns true if connected, otherwise false
   */
  get isConnected(): boolean {
    return this.connectStatus;
  };

  /**
   * Retrieve data from Redis for the specified key.
   * @param key Redis key to identity data
   * @returns data saved in Redis
   */
  getData = async (key: string): Promise<any> => {
    if (this.prefix) key = `${this.prefix}:${key}`;
    const payload = await this.redisClient.get(key);
    if (payload) {
      return JSON.parse(payload);
    }
    return undefined;
  };
  
  /**
   * Create/update data in Redis at the specified key.
   * @param key Redis key to identity data
   * @param data data object
   * @param ttl time-to-live expiry in seconds (default no expiry)
   * @returns true if operation succeeded, otherwise false
   */
  setData = async (key: string, data: any, ttl?: number): Promise<boolean> => {
    if (this.prefix) key = `${this.prefix}:${key}`;
    let resp: string;
    if (ttl > 0) {
      resp = await this.redisClient.set(key, data, 'EX', ttl);
    } else {
      resp = await this.redisClient.set(key, data);
    }
    return 'OK' === resp;
  };

  /**
   * Retrieve JSON data from Redis for the specified key.
   * @param key Redis key to identity data
   * @returns JSON data saved in Redis
   */
  getJsonData = async (key: string): Promise<any> => {
    if (this.prefix) key = `${this.prefix}:${key}`;
    const payload = await this.redisClient.json.get(key);
    if (payload) {
      return payload;
    }
    return undefined;
  };

  /**
   * Create/update JSON data in Redis at the specified key.
   * @param key Redis key to identity data
   * @param data JSON data object
   * @param path JSONPath insertion path (default root = '$')
   * @param ttl time-to-live expiry in seconds (default no expiry)
   * @returns true if operation succeeded, otherwise false
   */
  setJsonData = async (key: string, data: any, path: string = '$', ttl?: number): Promise<boolean> => {
    if (this.prefix) key = `${this.prefix}:${key}`;
    let resp: any;
    if (ttl > 0) {
      // Set expire atomically
      const multi = this.redisClient.multi();
      multi.json.set(key, path, data);
      multi.expire(key, ttl);
      resp = await multi.exec();
      return resp && resp[0] === 'OK';
    } else {
      resp = await this.redisClient.json.set(key, path, data);
    }
    return 'OK' === resp;
  };

  /**
   * Delete JSON data from Redis for the specified key.
   * @param key Redis key to identity data
   * @returns true if operation succeeded, otherwise false
   */
  delJsonData = async (key: string): Promise<boolean> => {
    if (this.prefix) key = `${this.prefix}:${key}`;
    const resp = await this.redisClient.json.del(key);
    return 'OK' === resp;
  };

  /**
   * Retrieve data from Redis for the specified index key and full-text query pattern.
   * @param key Redis key to identity data
   * @param query full-text query pattern
   * @param options full-text query options
   * @returns result set of data saved in Redis
   */
  searchFtData = async (key: string, query: string, options?: any): Promise<any> => {
    if (this.prefix) key = `${this.prefix}:${key}`;
    const resp = await this.redisClient.ft.search(key, query, options);
    return resp;
  };

};
