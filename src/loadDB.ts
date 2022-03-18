import { environment } from './environment';
import { readCSVFile } from './helpers/csv-reader';
import { IRedisConfig, IRedisService } from './services/redis.interface';
import { RedisService } from './services/redis.service';
import { OlisTestRequestColumns, OlisTestResultColumns, OlisTestMicroColumns } from './csv-layouts/olis-csv-layout';
import { TestFacilityColumns } from './csv-layouts/facility-csv-layout';
import { LabLicColumns } from './csv-layouts/lab-csv-layout';
import { PhysLicColumns } from './csv-layouts/phys-csv-layout';

// Load OLIS test request nomenclature
const loadMetaOlisTestRequestDB = async (csvFilename: string, redisService: IRedisService, keyPrefix: string) => {
  // Generate header column names
  const csvColumns: OlisTestRequestColumns = new OlisTestRequestColumns();
  csvColumns.setNotEmpty();
  const headers = Object.keys(csvColumns);

  // CSV consumer method
  const csvConsumer = async (dataObj) => {
    const metaObj = {
      requestCode: dataObj.requestCode,
      requestName: dataObj.requestName,
      alternate1Name: dataObj.alternate1Name,
      alternate2Name: dataObj.alternate2Name,
      alternate3Name: dataObj.alternate3Name,
      comments: dataObj.comments,
      testRequestCategory: dataObj.testRequestCategory,
      testRequestSubCategory: dataObj.testRequestSubCategory,
      sortKey: dataObj.sortKey,
      reportCategory: dataObj.reportCategory,      
    };

    // Persist command
    const key = `${keyPrefix}:${metaObj.requestCode}`;
    await redisService.setJsonData(key, { ...metaObj });
    // await redisService.delJsonData(key);
  };

  // Read CSV and skip header
  const result = await readCSVFile(headers, csvFilename, csvConsumer, ',', 1);
  console.log(`result ${JSON.stringify(result)}`);
  return result;
};

// Load OLIS test result nomenclature
const loadMetaOlisTestResultDB = async (csvFilename: string, redisService: IRedisService, keyPrefix: string) => {
  // Generate header column names
  const csvColumns: OlisTestResultColumns = new OlisTestResultColumns();
  csvColumns.setNotEmpty();
  const headers = Object.keys(csvColumns);

  // CSV consumer method
  const csvConsumer = async (dataObj) => {
    const metaObj = {
      loincCode: dataObj.loincCode,
      loincName: dataObj.loincName,
      alternate1Name: dataObj.alternate1Name,
      alternate2Name: dataObj.alternate2Name,
      alternate3Name: dataObj.alternate3Name,
      resultCategory: dataObj.resultCategory,
      resultSubCategory: dataObj.resultSubCategory,
      sortKey: dataObj.sortKey,
    };

    // Persist command
    const key = `${keyPrefix}:${metaObj.loincCode}`;
    await redisService.setJsonData(key, { ...metaObj });
    // await redisService.delJsonData(key);
  };

  // Read CSV and skip header
  const result = await readCSVFile(headers, csvFilename, csvConsumer, ',', 1);
  console.log(`result ${JSON.stringify(result)}`);
  return result;
};

// Load OLIS test micro-organism nomenclature
const loadMetaOlisTestMicroDB = async (csvFilename: string, redisService: IRedisService, keyPrefix: string) => {
  // Generate header column names
  const csvColumns: OlisTestMicroColumns = new OlisTestMicroColumns();
  csvColumns.setNotEmpty();
  const headers = Object.keys(csvColumns);

  // CSV consumer method
  const csvConsumer = async (dataObj) => {
    const metaObj = {
      microCode: dataObj.microCode,
      microType: dataObj.microType,
      microName: dataObj.microName,
      alternate1Name: dataObj.alternate1Name,
      alternate2Name: dataObj.alternate2Name,
      microShortName: dataObj.microShortName,
    };

    // Persist command
    const key = `${keyPrefix}:${metaObj.microCode}`;
    await redisService.setJsonData(key, { ...metaObj });
    // await redisService.delJsonData(key);
  };

  // Read CSV and skip header
  const result = await readCSVFile(headers, csvFilename, csvConsumer, ',', 1);
  console.log(`result ${JSON.stringify(result)}`);
  return result;
};

// Load lab test facility nomenclature
const loadMetaTestFacilityDB = async (csvFilename: string, redisService: IRedisService, keyPrefix: string) => {
  // Generate header column names
  const csvColumns: TestFacilityColumns = new TestFacilityColumns();
  csvColumns.setNotEmpty();
  const headers = Object.keys(csvColumns);

  // CSV consumer method
  const csvConsumer = async (dataObj) => {
    const metaObj = {
      licenseId: dataObj.licenseId,
      type: dataObj.type,
      name: dataObj.name,
      address1: dataObj.address1,
      address2: dataObj.address2,
      city: dataObj.city,
      province: dataObj.province,
      postal: dataObj.postal,
      oid: dataObj.oid,
      fullOid: dataObj.fullOid,
      upi: dataObj.upi,
    };

    // Persist command
    const key = `${keyPrefix}:${metaObj.upi}`;
    await redisService.setJsonData(key, { ...metaObj });
    //await redisService.delJsonData(key);
  };

  // Read CSV and skip header
  const result = await readCSVFile(headers, csvFilename, csvConsumer, '|', 1);
  console.log(`result ${JSON.stringify(result)}`);
  return result;
};

// Load licensed laboratory nomenclature
const loadMetaLabLicDB = async (csvFilename: string, redisService: IRedisService, keyPrefix: string) => {
  // Generate header column names
  const csvColumns: LabLicColumns = new LabLicColumns();
  csvColumns.setNotEmpty();
  const headers = Object.keys(csvColumns);

  // CSV consumer method
  const csvConsumer = async (dataObj) => {
    const metaObj = {
      licenseId: dataObj.licenseId,
      type: dataObj.type,
      name: dataObj.name,
      address1: dataObj.address1,
      address2: dataObj.address2,
      city: dataObj.city,
      province: dataObj.province,
      postal: dataObj.postal,
      fullOid: dataObj.fullOid,
      lookup: `${dataObj.name} - ${dataObj.licenseId}`,
    };

    // Persist command
    const key = `${keyPrefix}:${metaObj.licenseId}`;
    await redisService.setJsonData(key, { ...metaObj });
    //await redisService.delJsonData(key);
  };

  // Read CSV and skip header
  const result = await readCSVFile(headers, csvFilename, csvConsumer, '|', 1);
  console.log(`result ${JSON.stringify(result)}`);
  return result;
};

// Load licensed practitioner nomenclature
const loadMetaPhysLicDB = async (csvFilename: string, redisService: IRedisService, keyPrefix: string) => {
  // Generate header column names
  const csvColumns: PhysLicColumns = new PhysLicColumns();
  csvColumns.setNotEmpty();
  const headers = Object.keys(csvColumns);

  // CSV consumer method
  const csvConsumer = async (dataObj) => {
    const metaObj = {
      licenseId: dataObj.licenseId,
      type: dataObj.type,
      firstName: dataObj.firstName,
      middleName: dataObj.middleName,
      lastName: dataObj.lastName,
      address1: dataObj.address1,
      address2: dataObj.address2,
      city: dataObj.city,
      province: dataObj.province,
      postal: dataObj.postal,
      lookup: `${dataObj.lastName}${dataObj.firstName} - ${dataObj.licenseId}`,
    };

    // Persist command
    const key = `${keyPrefix}:${metaObj.licenseId}`;
    await redisService.setJsonData(key, { ...metaObj });
    //await redisService.delJsonData(key);
  };

  // Read CSV and skip header
  const result = await readCSVFile(headers, csvFilename, csvConsumer, '|', 1);
  console.log(`result ${JSON.stringify(result)}`);
  return result;
};

// Utility for waiting
const waitTimeout = delay => new Promise(resolve => setTimeout(resolve, delay));

// Load CSV collections
(async () => {
  const redisService: IRedisService = new RedisService();
  try {
    // Connect to Redis
    await redisService.connect(environment);

    // CSV load nomenclature
    await loadMetaOlisTestRequestDB('./data/meta-olis-request-4.csv', redisService, 'meta:olis:test:request');
    await loadMetaOlisTestResultDB('./data/meta-olis-result-4.csv', redisService, 'meta:olis:test:result');
    await loadMetaOlisTestMicroDB('./data/meta-olis-micro-4.csv', redisService, 'meta:olis:test:micro');

    await loadMetaTestFacilityDB('./data/meta-test-facility-4.csv', redisService, 'meta:test:facility');
    await loadMetaLabLicDB('./data/meta-lab-lic-4.csv', redisService, 'meta:lab:lic');
    await loadMetaPhysLicDB('./data/meta-phys-lic-8.csv', redisService, 'meta:phys:lic');

    // await waitTimeout(2000);
  } catch (e) {
    console.error(e);
  } finally {
    await redisService.disconnect();
  }
})();
