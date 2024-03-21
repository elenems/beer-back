// const errorHandler = require('./utils/errors');
// const express = require('express');
// const cors = require('cors');
// const productRoutes = require('./routes/products');
// const authRoutes = require('./routes/auth');
// const userRoutes = require('./routes/users');
// const app = express();

// app.use(express.json());
// app.use(cors());

// app.use(function (req, res, next) {
//   console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
//   next();
// });


// app.use('/api/products', productRoutes);
// app.use('/api/users', userRoutes);
// app.use(authRoutes);

// app.use(errorHandler);

// app.listen(3000, function () {
//   console.log('App is listening on port 3000!');
// });

// module.exports = app;
const express = require('express');

const app = express()
const PORT = 8000

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/about', (req, res) => {
  res.send('About route 🎉 ')
})

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
})