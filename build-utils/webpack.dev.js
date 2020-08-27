const Dotenv = require('dotenv-webpack');
const ENVIRONMENT_VARIABLE = require('dotenv').config({ path: './.env.development' }).parsed;


module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    plugins: [
        new Dotenv({
            path: './.env.development',
        })
    ],
};