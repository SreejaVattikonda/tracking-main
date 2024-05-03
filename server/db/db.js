const mongoose = require('mongoose');
const dbURI = `mongodb+srv://chakrinya:chakrinya009@nodeprojects.giz5b0e.mongodb.net/tracking?retryWrites=true&w=majority`;

const connectToMongoose = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process if unable to connect to MongoDB
  }
};

module.exports = connectToMongoose;


