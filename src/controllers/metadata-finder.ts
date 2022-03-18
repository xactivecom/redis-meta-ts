import { IRedisService } from '../services/redis.interface';

export class MetaDataFinder {
  // Metadata index names
  protected META_NAME_OLIS_TEST_REQUEST = 'meta:olis:test:request';
  protected META_NAME_OLIS_TEST_RESULT = 'meta:olis:test:result';
  protected META_NAME_OLIS_TEST_MICRO = 'meta:olis:test:micro';

  protected META_NAME_LAB_LIC = 'meta:lab:lic';
  protected META_NAME_PHYSICIAN_LIC = 'meta:phys:lic';
  protected META_NAME_TEST_FACILITY = 'meta:test:facility';

  // JSON root path (full document)
  protected JSON_ROOT_PATH = '$';
  protected FT_PREFIX = 'idx';

  // Namespace key prefix
  protected prefix?;

  /**
   * Finder constructor
   * @param redisService Redis service interface
   * @param prefix namespace key prefix
   */
  constructor(private redisService: IRedisService, prefix?: string) {
  }

  getOlisTestRequestById = async (requestCode: string): Promise<any> => {
    let key = this.META_NAME_OLIS_TEST_REQUEST;
    if (this.prefix) key = `${this.prefix}:${key}`;
    const resp = await this.redisService.getJsonData(`${key}:${requestCode}`);
    return resp;
  };
  searchOlisTestRequestByQuery = async (query: string, options?: any): Promise<any> => {
    let key = `${this.FT_PREFIX}:${this.META_NAME_OLIS_TEST_REQUEST}`;
    if (this.prefix) key = `${this.prefix}:${key}`;
    const resp = await this.redisService.searchFtData(key, query, options);
    return resp;
  };

  getOlisTestResultById = async (loincCode: string): Promise<any> => {
    let key = this.META_NAME_OLIS_TEST_RESULT;
    if (this.prefix) key = `${this.prefix}:${key}`;
    const resp = await this.redisService.getJsonData(`${key}:${loincCode}`);
    return resp;
  };
  searchOlisTestResultByQuery = async (query: string, options?: any): Promise<any> => {
    let key = `${this.FT_PREFIX}:${this.META_NAME_OLIS_TEST_RESULT}`;
    if (this.prefix) key = `${this.prefix}:${key}`;
    const resp = await this.redisService.searchFtData(key, query, options);
    return resp;
  };

  getOlisTestMicroById = async (microCode: string): Promise<any> => {
    let key = this.META_NAME_OLIS_TEST_MICRO;
    if (this.prefix) key = `${this.prefix}:${key}`;
    const resp = await this.redisService.getJsonData(`${key}:${microCode}`);
    return resp;
  };
  searchOlisTestMicroByQuery = async (query: string, options?: any): Promise<any> => {
    let key = `${this.FT_PREFIX}:${this.META_NAME_OLIS_TEST_MICRO}`;
    if (this.prefix) key = `${this.prefix}:${key}`;
    const resp = await this.redisService.searchFtData(key, query, options);
    return resp;
  };

  getLabByLicenseId = async (licenseId: string): Promise<any> => {
    let key = this.META_NAME_LAB_LIC;
    if (this.prefix) key = `${this.prefix}:${key}`;
    const resp = await this.redisService.getJsonData(`${key}:${licenseId}`);
    return resp;
  };
  searchLabByQuery = async (query: string, options?: any): Promise<any> => {
    let key = `${this.FT_PREFIX}:${this.META_NAME_LAB_LIC}`;
    if (this.prefix) key = `${this.prefix}:${key}`;
    const resp = await this.redisService.searchFtData(key, query, options);
    return resp;
  };

  getPhysicianByLicenseId = async (licenseId: string): Promise<any> => {
    let key = this.META_NAME_PHYSICIAN_LIC;
    if (this.prefix) key = `${this.prefix}:${key}`;
    const resp = await this.redisService.getJsonData(`${key}:${licenseId}`);
    return resp;
  };
  searchPhysicianByQuery = async (query: string, options?: any): Promise<any> => {
    let key = `${this.FT_PREFIX}:${this.META_NAME_PHYSICIAN_LIC}`;
    if (this.prefix) key = `${this.prefix}:${key}`;
    const resp = await this.redisService.searchFtData(key, query, options);
    return resp;
  };

  getTestFacilityByUpi = async (upi: string): Promise<any> => {
    let key = this.META_NAME_TEST_FACILITY;
    if (this.prefix) key = `${this.prefix}:${key}`;
    const resp = await this.redisService.getJsonData(`${key}:${upi}`);
    return resp;
  };
  searchTestFacilityByQuery = async (query: string, options?: any): Promise<any> => {
    let key = `${this.FT_PREFIX}:${this.META_NAME_TEST_FACILITY}`;
    if (this.prefix) key = `${this.prefix}:${key}`;
    const resp = await this.redisService.searchFtData(key, query, options);
    return resp;
  };
};
