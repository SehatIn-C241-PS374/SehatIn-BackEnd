const fruitsVegetablesService = require('../services/fruitsVegetablesService');

const getAllFruitVegetables = async (req, res) => {
    const item = await fruitsVegetablesService.fetchData();
    res.json({
        message: `Berhasil mendapatkan ${item.length} Buah dan Sayur`,
        status: 'success',
        data: item
    });
};

const getFruitOrVegetableByName = async (req, res) => {
    const { name } = req.params;
    const item = await fruitsVegetablesService.getFruitOrVegetableByName(name);

    if (item) {
        res.json({
            message: 'Berhasil mendapatkan data',
            status: 'success',
            data: item
        });
    } else {
        res.status(404).json({
            message: 'Data tidak ditemukan',
            status: 'fail'
        });
    }
};

module.exports = {
    getFruitOrVegetableByName,
    getAllFruitVegetables,
};
