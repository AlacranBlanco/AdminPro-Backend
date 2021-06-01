const mongoose = require('mongoose');
require('dotenv').config();


const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('DB online')
    } catch (e) {
        throw  new Error('Error con la conexión a la DB')
    }

}

module.exports = {
    dbConnection
};