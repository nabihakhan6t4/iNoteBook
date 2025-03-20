const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://khannabiha923:itx%40nabihakhan6t4@cluster0.r4gvu.mongodb.net/notebookDB?retryWrites=true&w=majority";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      serverSelectionTimeoutMS: 50000,
      socketTimeoutMS: 45000,
    });
    console.log("Mongoose connected successfully");
  } catch (error) {
    console.error("Mongo connection failed", error);
  }
};

module.exports = connectToMongo;
