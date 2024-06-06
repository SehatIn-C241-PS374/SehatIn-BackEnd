const tf = require("@tensorflow/tfjs-node");
const InputError = require("../exceptions/InputError");
const fs = require("fs");

// Muat data kelas dari file JSON
const classData = JSON.parse(fs.readFileSync("classes.json"));

async function predictClassification(model, image) {
  try {
    // Pratinjau gambar
    const tensor = tf.node.decodeJpeg(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat();

    // Lakukan prediksi
    const prediction = model.predict(tensor);
    const scores = await prediction.data();

    // Temukan kelas dengan skor tertinggi
    const maxIndex = scores.indexOf(Math.max(...scores));
    const confidenceScore = scores[maxIndex] * 100;

    // Dapatkan kunci dan detail kelas
    const classKeys = Object.keys(classData);
    const classKey = classKeys[maxIndex];
    const classDetails = classData[classKey];

    // Ekstrak informasi kelas
    const label = classDetails.name;
    const description = classDetails.description;
    const nutrition = JSON.stringify(classDetails.nutrition, null, 2); // Format untuk keterbacaan
    const benefits = classDetails.benefits.join(', '); // Gabungkan array menjadi satu string

    // Format saran
    const suggestion = `Kelas yang diprediksi: ${label}.\nDeskripsi: ${description}\nKandungan nutrisi:\n${nutrition}\nManfaat: ${benefits}\nSkor kepercayaan: ${confidenceScore.toFixed(2)}%`;

    return { label, suggestion };
  } catch (error) {
    throw new InputError("Terjadi kesalahan dalam melakukan prediksi", 400);
  }
}

module.exports = predictClassification;
