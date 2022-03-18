import { environment } from './environment';
import { IRedisService } from './services/redis.interface';
import { RedisService } from './services/redis.service';
import { MetaDataFinder } from './controllers/metadata-finder';

// Query CSV collections
(async () => {
  const redisService: IRedisService = new RedisService();
  try {
    // Connect to Redis
    await redisService.connect(environment);
    const metaDataFinder = new MetaDataFinder(redisService);
    let value;

    // Finder tests
    value = await metaDataFinder.getOlisTestRequestById('TR10043-8');
    console.log(`get olis req ${JSON.stringify(value)}`);
    value = await metaDataFinder.searchOlisTestRequestByQuery('@requestName:amino*');
    console.log(`search olis req ${JSON.stringify(value)}`);

    value = await metaDataFinder.getOlisTestResultById('47213-4');
    console.log(`get olis res ${JSON.stringify(value)}`);
    value = await metaDataFinder.searchOlisTestResultByQuery('@loincName:hema*');
    console.log(`search olis req ${JSON.stringify(value)}`);

    value = await metaDataFinder.getOlisTestMicroById('103431004');
    console.log(`get olis micro ${JSON.stringify(value)}`);
    value = await metaDataFinder.searchOlisTestMicroByQuery('@microName:strep*');
    console.log(`search olis req ${JSON.stringify(value)}`);

    value = await metaDataFinder.getTestFacilityByUpi('104284941564');
    console.log(`get facility ${JSON.stringify(value)}`);
    value = await metaDataFinder.searchTestFacilityByQuery('@name:lennox*');
    console.log(`search facility ${JSON.stringify(value)}`);
    value = await metaDataFinder.searchTestFacilityByQuery('@licenseId:CB01');
    console.log(`search facility ${JSON.stringify(value)}`);

    value = await metaDataFinder.getLabByLicenseId('4104');
    console.log(`get lab ${JSON.stringify(value)}`);
    value = await metaDataFinder.searchLabByQuery('@lookup:alpha*');
    console.log(`search lab ${JSON.stringify(value)}`);
    value = await metaDataFinder.searchLabByQuery('@type:{LAB} @lookup:alpha*');
    console.log(`search lab ${JSON.stringify(value)}`);

    value = await metaDataFinder.getPhysicianByLicenseId('63225');
    console.log(`get phys ${JSON.stringify(value)}`);
    value = await metaDataFinder.searchPhysicianByQuery('@lookup:stev*');
    console.log(`search lab ${JSON.stringify(value)}`);
    value = await metaDataFinder.searchPhysicianByQuery('@type:{MDL} @lookup:stev*');
    console.log(`search lab ${JSON.stringify(value)}`);

  } catch (e) {
    console.error(e);
  } finally {
    await redisService.disconnect();
  }
})();
