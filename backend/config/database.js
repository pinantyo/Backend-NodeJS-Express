require('dotenv').config();

const mongoose = require('mongoose');

exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER_NAME}.gh4nv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};