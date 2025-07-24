const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/auth.routes');
const bookRoutes = require('./routes/book.routes');
const errorHandler = require('./middlewares/errorHandler');
const logger = require('./config/logger');

const app = express();

app.get('/', (req, res) => {
  res.send('BookNest API is running 🚀');
});

app.use(helmet());
app.use(morgan('combined', { stream: logger.stream }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

app.use(errorHandler);

module.exports = app;