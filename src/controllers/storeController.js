const storeService = require('../services/storeService');

const getAllStores = async (req, res) => {
  const stores = await storeService.fetchData();
  res.json({ 
    message: `Berhasil mendapatkan ${stores.length} toko`, 
    status: 'success', 
    data: stores 
  });
};

const getStoreByName = async (req, res) => {
  const store = await storeService.getStoreByName(req.params.name);
  if (store) {
    res.json({ 
      message: `Berhasil mendapatkan ${store.length} toko`, 
      status: 'success', 
      data: store 
    });
  } else {
    res.status(404).json({ 
      message: 'Toko tidak ditemukan', 
      status: 'fail' 
    });
  }
};

const addStore = async (req, res) => {
  const newStore = req.body;
  const updatedStores = await storeService.addStore(newStore);
  res.json({ 
    message: `Berhasil menambahkan toko baru ${newStore.nama_toko}`, 
    status: 'success', 
    data: updatedStores 
  });
};

const updateStore = async (req, res) => {
  const updatedStore = req.body;
  const index = req.params.index;
  const result = await storeService.updateStore(index, updatedStore);
  if (result) {
    res.json({
      message: 'Berhasil memperbarui toko',
      status: 'success',
      data: updatedStore
    });
  } else {
    res.status(404).json({
      message: 'Toko tidak ditemukan',
      status: 'fail'
    });
  }
};

const deleteStore = async (req, res) => {
  const index = req.params.index;
  const result = await storeService.deleteStore(index);
  if (result) {
    res.json({
      message: `Berhasil menghapus toko pada index ${index}`,
      status: 'success',
      data: result
    });
  } else {
    res.status(404).json({
      message: 'Toko tidak ditemukan',
      status: 'fail'
    });
  }
};

const getStoresByLocation = async (req, res) => {
  const { latitude, longitude } = req.query;
  const radius = 3; // Default radius in km

  if (!latitude || !longitude) {
    return res.status(400).json({ 
      message: 'Latitude and longitude are required', 
      status: 'fail' 
    });
  }

  const stores = await storeService.getStoresByLocation(latitude, longitude, radius);
  if (stores.length > 0) {
    res.json({ 
      message: `Berhasil mendapatkan toko dalam radius ${radius} km`, 
      status: 'success', 
      data: stores 
    });
  } else {
    res.status(404).json({ 
      message: 'Toko tidak ditemukan', 
      status: 'fail' 
    });
  }
};

module.exports = {
  getAllStores,
  getStoreByName,
  addStore,
  updateStore,
  deleteStore,
  getStoresByLocation, 
};
