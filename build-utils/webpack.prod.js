const Dotenv = require('dotenv-webpack');
const ENVIRONMENT_VARIABLE = require('dotenv').config({ path: './.env.production' }).parsed;

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new Dotenv({
            path: './.env.production',
        })
    ],
};