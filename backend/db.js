const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://khannabiha923:ylHU4qJe3FK42YCd@cluster0.jloo293.mongodb.net/";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000, // Reduce timeout to avoid long waits
      socketTimeoutMS: 45000,
      autoIndex: false, // Disable auto-indexing for performance
    });
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1); // Exit process if connection fails
  }
};

module.exports = connectToMongo;
