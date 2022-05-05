const mongoose = require('mongoose');

const connectDatabase = async () => {

    const connection = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
        //useCreateIndex: true,
        //useFindAndModify: false,
    });

    console.log('mongoDB Atlas server running ', connection.connection.host);

};

module.exports = connectDatabase;