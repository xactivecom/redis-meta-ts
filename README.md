# Nomenclature Demo Project

Demonstrate using RedisJSON and RediSearch to load and query health nomenclature collections.

## Introduction

Many health-related applications rely on nomenclature collections to translate between medical
system codes to display values and other encodings.

Redis provides a number of advantages over a relational database for storing nomenclature:
- high-performance lookup using Redis in-memory database
- storage/retrieval of nomenclature data in JSON format (RedisJSON module)
- full-text indexes allow wildcard lookup for UX typeahead controls (RediSearch module)

Two of the main features of this project are:
- use of [Redis database](https://redis.io) to store the nomenclature collections
- use of [Redis library](https://github.com/redis/node-redis) to interact with Redis from a TypeScript application

The project depends on minimum levels of the Redis products:
- Redis 6.2.3
- RedisJSON 2.0.4
- RediSearch 2.2.6

## Project Setup

The *environment.ts* file contains the Redis connection configuration. Replace the values specific to your installation.

To load a CSV to Redis, uncomment relevant sections of the file *loadDB.ts* and run `npm run loadDB`.

To run sample queries, uncomment relevant sections of the file *queryDB.ts* and run `npm run queryDB`.


## Nomenclature Collections

To keep this project small only excerpts of the full collections are included in the data folder.
The full CSV collections are available separately.

### OLIS Test Request

Primary index is populated using command 'JSON.SET meta:olis:test:request: $ {JSON object}'

Secondary full-text index definition:
```
FT.DROPINDEX idx:meta:olis:test:request
FT.CREATE idx:meta:olis:test:request ON JSON PREFIX 1 meta:olis:test:request: 
SCHEMA 
  $.requestName AS requestName TEXT NOSTEM 
  $.reportCategory AS reportCategory TAG CASESENSITIVE
```

Sample queries:
```
JSON.GET meta:olis:test:request:TR10043-8
FT.SEARCH idx:meta:olis:test:request "@requestName:amino*"
FT.SEARCH idx:meta:olis:test:request "@reportCategory:{Chemistry} @requestName:amino*"
```

### OLIS Test Result

Primary index is populated using command 'JSON.SET meta:olis:test:result: $ {JSON object}'

Secondary full-text index definition:
```
FT.DROPINDEX idx:meta:olis:test:result
FT.CREATE idx:meta:olis:test:result ON JSON PREFIX 1 meta:olis:test:result: 
SCHEMA 
  $.loincName AS loincName TEXT NOSTEM 
  $.resultCategory AS resultCategory TAG CASESENSITIVE
```

Sample queries:
```
JSON.GET meta:olis:test:result:47213-4
FT.SEARCH idx:meta:olis:test:result "@loincName:hema*"
FT.SEARCH idx:meta:olis:test:result "@resultCategory:{MICRO} @loincName:hema*"
```

### OLIS Test Micro-organism

Primary index is populated using command 'JSON.SET meta:olis:test:micro: $ {JSON object}'

Secondary full-text index definition:
```
FT.DROPINDEX idx:meta:olis:test:micro
FT.CREATE idx:meta:olis:test:micro ON JSON PREFIX 1 meta:olis:test:micro: 
SCHEMA
  $.microName AS microName TEXT NOSTEM 
  $.microType AS microType TAG CASESENSITIVE
```

Sample queries:
```
JSON.GET meta:olis:test:micro:103431004
FT.SEARCH idx:meta:olis:test:micro "@microName:strep*"
FT.SEARCH idx:meta:olis:test:micro "@microType:{Organism} @microName:strep*"
```

### Test Collection Facility

Primary index is populated using command 'JSON.SET meta:test:facility: $ {JSON object}'

Secondary full-text index definition:
```
FT.DROPINDEX idx:meta:test:facility
FT.CREATE idx:meta:test:facility ON JSON PREFIX 1 meta:test:facility: 
SCHEMA 
  $.type AS type TAG CASESENSITIVE 
  $.name AS name TEXT SORTABLE 
  $.licenseId AS licenseId TEXT NOSTEM
```

Sample queries:
```
JSON.GET meta:test:facility:104284941564
FT.SEARCH idx:meta:test:facility "@name:lennox*"
FT.SEARCH idx:meta:test:facility "@type:{LTC} @name:lennox*"
FT.SEARCH idx:meta:test:facility "@type:{PHCY} @name:shoppers*"
FT.SEARCH idx:meta:test:facility "@licenseId:CB01"
```

### Licensed Laboratory

Primary index is populated using command 'JSON.SET meta:lab:lic: $ {JSON object}'

Secondary full-text index definition:
```
FT.DROPINDEX idx:meta:lab:lic
FT.CREATE idx:meta:lab:lic ON JSON PREFIX 1 meta:lab:lic: 
SCHEMA 
  $.type AS type TAG CASESENSITIVE 
  $.lookup AS lookup TEXT SORTABLE
```

Sample queries:
```
JSON.GET meta:lab:lic:4104
FT.SEARCH idx:meta:lab:lic "@lookup:alpha*"
FT.SEARCH idx:meta:lab:lic "@lookup:4104"
FT.SEARCH idx:meta:lab:lic "@type:{LAB} @lookup:alpha*"
FT.SEARCH idx:meta:lab:lic "@type:{LAB} @lookup:4104"
```

### Licensed Physician

Primary index is populated using command 'JSON.SET meta:phys:lic: $ {JSON object}'

Secondary full-text index definition:
```
FT.DROPINDEX idx:meta:phys:lic
FT.CREATE idx:meta:phys:lic ON JSON PREFIX 1 meta:phys:lic: 
SCHEMA 
  $.type AS type TAG CASESENSITIVE 
  $.lookup AS lookup TEXT SORTABLE
```

Sample queries:
```
JSON.GET meta:phys:lic:63225
FT.SEARCH idx:meta:phys:lic "@lookup:stev*"
FT.SEARCH idx:meta:phys:lic "@lookup:63225"
FT.SEARCH idx:meta:phys:lic "@type:{MDL} @lookup:stev*"
FT.SEARCH idx:meta:phys:lic "@type:{MDL} @lookup:stevensonkev*"
FT.SEARCH idx:meta:phys:lic "@type:{MDL} @lookup:63225"
```
