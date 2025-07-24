const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => console.error('DB connection error:', err));
};

module.exports = connectDB;