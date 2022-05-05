const dotenv = require ("dotenv");
const express = require ("express");
const { process_params } = require('express/lib/router');
const morgan = require ("morgan");
const cors = require ("cors");
const errorHandler = require ('./middleware/error');
const connectDatabase = require('./config/db');
const book = require('./paths/book');
const author = require('./paths/author');
const user = require('./paths/user');


dotenv.config({ path: './config/config.env'});
const PORT = process.env.PORT;
connectDatabase();

const app = express();
app.use(express.json());
app.use(cors());

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/author', author);
app.use('/api/book', book);
app.use('/api/user', user);

app.use(errorHandler);

const server = app.listen(
    PORT,
    console.log("Server is running in " + process.env.NODE_ENV + " environment.")
);

process.on('unhandledRejection', (err, promise) => {
    console.log('Error list', err.message);
    server.close(() => process.exit(1));
});