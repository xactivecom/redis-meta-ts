import fs from 'fs';
import csv from 'csv-parser';

/**
 * Process a single line of the CSV file.
 * 
 * @param dataObj data object for current CSV line
 * @param lineNo CSV file line number
 * @param filename CSV filename
 * @param consumer data consumer callback function
 * @param columnCount CSV column count
 * @returns processed count report
 */
const _processLine = async (dataObj, lineNo, filename, consumer, columnCount): Promise<any> => {
  let result = {
    processed: 0,
    errors: 0
  };

  // Check for expected field count
  if (dataObj && typeof dataObj === 'object') {
    const fieldCount = Object.keys(dataObj).length;
    if (fieldCount === columnCount) {
      // Consume the data
      try {
          await consumer(dataObj);
          result.processed++;
      } catch (e) {
        console.error(`Failed to process file ${filename} on line # ${lineNo} - ${e.message}`);
        result.errors++;
      }
    } else {
      console.error(`Skip line # ${lineNo} field count ${fieldCount} header count mismatch ${columnCount}`);
      result.errors++;
    }
  } else {
    console.error(`Skip line # ${lineNo} with no field data`);
    result.errors++;
  }
  return result;
};

/**
 * Read the CSV file as a stream and invoke the consumer on each data row.
 *
 * Note: The stream reader approach is capable of processing very large files, since only
 * a few rows of data are present in memory as the reader chunks through file content.
 *
 * SKIP_LINES tells parser to skip number of lines in the file, set to 1 to skip Header Row.
 * Fields are delimited with the FIELD_DELIMITER character.
 *
 * The consumer function is passed an array of field data.
 *
 * @param header array of CSV column names
 * @param filename CSV filename
 * @param consumer data consumer callback function
 * @param separator column delimiter pattern (default comma)
 * @param skipLines skip initial header lines count
 * @returns processed count report
 */
export const readCSVFile = async (headers, filename, consumer, separator = ',', skipLines = 1): Promise<any> => {
  const columnCount = headers.length;
  return new Promise((resolve, reject) => {
    try {
      let result = {
        lines: 0,
        processed: 0,
        errors: 0,
      };
      const linePromises = [];

      const stream = fs.createReadStream(filename)
        .on('error', (e) => {
          console.error(`Error occurred while processing CSV file ${filename}. Lines: ${result.lines} Processed: ${result.processed} Errors: ${result.errors}`);
          reject(e);
        })
        .pipe(csv({
          headers,
          separator,
          skipComments: true,
          skipLines,
        }))
        .on('data', async (dataObj) => {
          result.lines++;
          const linePromise = _processLine(dataObj, result.lines + skipLines, filename, consumer, columnCount);
          linePromise.then((resp) => {
            result.processed = result.processed + resp.processed;
            result.errors = result.errors + resp.errors;
          });
          linePromises.push(linePromise);
        })
        .on('end', async () => {
          await Promise.all(linePromises);
          resolve(result);
        });
    } catch (e) {
      console.error(`Failed to read file ${filename} - ${e.message}`);
      reject(e);
    }
  });
};
