import * as Redis from 'redis';

export interface IRedisConfig {
  redisHost: string;
  redisPort: number;
  redisUsername?: string;
  redisPassword?: string;
  redisDb: number;
};

export interface IRedisService {
  initialized: boolean;
  isConnected: boolean;

  connect(config: IRedisConfig, prefix?: string): Promise<void>;
  disconnect(): Promise<void>;

  getData(key: string): Promise<any>;  
  setData(key: string, data: any, ttl?: number): Promise<boolean>;

  getJsonData(key: string): Promise<any>;
  setJsonData(key: string, data: any, path?: string, ttl?: number): Promise<boolean>;
  delJsonData(key: string): Promise<boolean>;

  searchFtData(key: string, query: string, options?: any): Promise<any>;
};
