const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
});

const bucketName = process.env.GOOGLE_STORAGE_BUCKET;
const storeName = process.env.JSON_STORE_NAME;
const fruitsVegetablesFileName = process.env.JSON_FRUITS_VEGETABLES_URL;

module.exports = {
  storage,
  bucketName,
  storeName,
  fruitsVegetablesFileName,
};
