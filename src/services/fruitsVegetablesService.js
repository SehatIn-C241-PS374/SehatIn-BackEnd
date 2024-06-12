const axios = require('axios');
const { storage, bucketName, fruitsVegetablesFileName } = require('../config/config');

const fetchData = async () => {
    const response = await axios.get(process.env.JSON_FRUITS_VEGETABLES_URL);
    return response.data;
};

const updateJsonFile = async (data) => {
    const file = storage.bucket(bucketName).file(fruitsVegetablesFileName);
    try {
        await file.save(JSON.stringify(data, null, 2), {
            resumable: false,
            contentType: 'application/json',
        });
    } catch (error) {
        throw new Error('Unable to save data');
    }
};

const getFruitOrVegetableByName = async (name) => {
    const data = await fetchData();
    const result = data.find(obj => obj.hasOwnProperty(name));
    return result ? { [name]: result[name] } : null;
};

module.exports = {
    fetchData,
    getFruitOrVegetableByName,
    updateJsonFile,
};
