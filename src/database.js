const mysql = require('mysql');
const { promisify } = require('util');

const { database } = require('./keys.js');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('database connection was closed');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('database was to many connections');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('database connection was refused');
        }
    }
    if (connection) connection.release();
    console.log('connection is established');
    return;
});

pool.query = promisify(pool.query);

module.exports = pool;