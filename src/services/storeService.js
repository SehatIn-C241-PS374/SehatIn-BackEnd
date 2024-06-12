const axios = require('axios');
const { storage, bucketName, fileName } = require('../config/config');
const geolib = require('geolib');

const fetchData = async () => {
  const response = await axios.get(process.env.JSON_STORE_URL);
  return response.data;
};

const updateJsonFile = async (data) => {
  const file = storage.bucket(bucketName).file(fileName);
  try {
    await file.save(JSON.stringify(data, null, 2), {
      resumable: false,
      contentType: 'application/json',
    });
  } catch (error) {
    throw new Error('Unable to save data');
  }
};


const getStoreByName = async (name) => {
  const data = await fetchData();
  const lowerCaseName = name.toLowerCase();
  return data.filter(store => store.nama_toko.toLowerCase().includes(lowerCaseName));
};

const addStore = async (newStore) => {
  const data = await fetchData();
  data.push(newStore);
  await updateJsonFile(data);
  return data;
};

const updateStore = async (index, updatedStore) => {
  const data = await fetchData();
  if (index >= 0 && index < data.length) {
    data[index] = updatedStore;
    await updateJsonFile(data);
    return updatedStore;
  } else {
    return null;
  }
};

const deleteStore = async (index) => {
  const data = await fetchData();
  if (index >= 0 && index < data.length) {
    const removedStore = data.splice(index, 1)[0];
    await updateJsonFile(data);
    return removedStore;
  } else {
    return null;
  }
};

const getStoresByLocation = async (latitude, longitude, radius = 3) => {
  const data = await fetchData();

  const storesWithinRadius = data
    .map(store => {
      const distance = geolib.getDistance(
        { latitude: store.latitude, longitude: store.longitude },
        { latitude: parseFloat(latitude), longitude: parseFloat(longitude) }
      );
      return { ...store, distance }; // Append distance to store object
    })
    .filter(store => store.distance <= radius * 1000) // Filter by radius in meters
    .sort((a, b) => a.distance - b.distance); // Sort by distance

  return storesWithinRadius;
};

module.exports = {
  fetchData,
  getStoreByName,
  addStore,
  updateStore,
  deleteStore,
  getStoresByLocation, 
};
