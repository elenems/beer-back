const errorHandler = require('./utils/errors');
const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const app = express();

app.use(express.json());
app.use(cors());

app.use(function (req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});


app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use(authRoutes);

app.use(errorHandler);

app.listen(3001, function () {
  console.log('App is listening on port 3001!');
});