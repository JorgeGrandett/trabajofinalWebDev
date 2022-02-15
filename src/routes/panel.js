const express = require('express');
const router = express.Router();

const auth = require('./../lib/auth');
const pool = require('./../database');

router.get('/panel', auth.isLoggedIn, async (req, res) => {
    const items = await pool.query('SELECT * FROM actasunicordoba.meetings;');
    res.render('pages/panel', {items});
});

router.get('/panel/:id', auth.isLoggedIn, async (req, res) => {
    const reunion = await pool.query('SELECT * FROM actasunicordoba.meetings WHERE idmeeting = ?;', [req.params.id]);
    let puntos = [];
    if (reunion.length > 0) {
        const items = await pool.query('SELECT * FROM actasunicordoba.`meetings-actionspoints` WHERE idmeetings = ?;', [reunion[0].idmeeting]);
        if (items.length > 0) {
            for (let i = 0; i < items.length; i++) {
                const row = await pool.query('SELECT * FROM actasunicordoba.actionspoints WHERE idActionPoint = ?;', [items[i].idactionspoints]);
                if (row.length > 0) {
                    const count = puntos.push(row[0]);
                }
            }
        }
    }
    console.log(reunion);
    res.render('pages/panel2', {reunion: reunion, puntos});
});

module.exports = router;