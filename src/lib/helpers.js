const bcrypt = require('bcryptjs');
const pool = require('./../database');
const helpers = {};

helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

helpers.matchPassword = async (password, savedPassword) => {
    try {
        return await bcrypt.compare(password, savedPassword);
    } catch (e) {
        console.log(e);
    }
}

helpers.getAvatarFilename = async (iduser) => {
    const row = await pool.query('SELECT filename FROM ``.`` WHERE `iduser` = ?', [iduser]);
    if (row.length > 0) {
        return row[0].filename;
    } else {
        return false;
    }
}

module.exports = helpers;