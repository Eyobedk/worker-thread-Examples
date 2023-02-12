const dotenv = require('dotenv');
dotenv.config('./config.env');

module.exports = {
    port: process.env.PORT
}