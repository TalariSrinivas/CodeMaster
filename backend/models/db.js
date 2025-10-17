const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://Admin:201067@cluster0.sitvi.mongodb.net/CodeMaster', {
      useNewUrlParser: true,
      useUnifiedTopology: true,  // <- Corrected this line
    });

    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
