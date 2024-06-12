require('dotenv').config();
const express = require('express');
const storeRoutes = require('./routes/storeRoutes');
const fruitsVegetablesRoutes = require('./routes/fruitsVegetablesRoutes');
const app = express();
const port = 8080;

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Welcome to SehatIn API');
});
app.use('/stores', storeRoutes);
app.use('/fruitsandvegetables', fruitsVegetablesRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
