const mongoose = require('mongoose');

const connectDb = async () => {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log(`Connected to Mongo! Database name: ${connect.connections[0].name}`)
};

module.exports = connectDb;