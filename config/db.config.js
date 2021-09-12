const mongoose = require('mongoose');

const connectDb = async () => {
    const connect = await mongoose.connect('mongodb+srv://deboradb:deboraA1983@cluster0.wvpwh.mongodb.net/labTodo?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log(`Connected to Mongo! Database name: ${connect.connections[0].name}`)
};

module.exports = connectDb;