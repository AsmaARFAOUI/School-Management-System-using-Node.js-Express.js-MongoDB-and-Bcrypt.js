const mongoose = require('mongoose');

const connectToDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("Connected successfully to mongo DB ^_^"); 
    } catch (error) {
      console.log("Failed To Connect To mongo DB", error); 
    }
}

module.exports = {
    connectToDB
}