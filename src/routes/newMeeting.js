const express = require('express');
const router = express.Router();

const auth = require('./../lib/auth');
const pool = require('./../database');

privateFuncs = {
    getTasks: function (obj) {
        const array = [];
        if (obj.dateAction1 && obj.checkTask1 == 'on') array.push({task: obj.task1, datetime: obj.dateAction1, progress: obj.progress1});
        if (obj.dateAction2 && obj.checkTask2 == 'on') array.push({task: obj.task2, datetime: obj.dateAction2, progress: obj.progress2});
        if (obj.dateAction3 && obj.checkTask3 == 'on') array.push({task: obj.task3, datetime: obj.dateAction3, progress: obj.progress3});
        if (obj.dateAction4 && obj.checkTask4 == 'on') array.push({task: obj.task4, datetime: obj.dateAction4, progress: obj.progress4});
        if (obj.dateAction5 && obj.checkTask5 == 'on') array.push({task: obj.task5, datetime: obj.dateAction5, progress: obj.progress5});
        if (obj.dateAction6 && obj.checkTask6 == 'on') array.push({task: obj.task6, datetime: obj.dateAction6, progress: obj.progress6});
        if (obj.dateAction7 && obj.checkTask7 == 'on') array.push({task: obj.task7, datetime: obj.dateAction7, progress: obj.progress7});
        if (obj.dateAction8 && obj.checkTask8 == 'on') array.push({task: obj.task8, datetime: obj.dateAction8, progress: obj.progress8});
        if (obj.dateAction9 && obj.checkTask9 == 'on') array.push({task: obj.task9, datetime: obj.dateAction9, progress: obj.progress9});
        if (obj.dateAction10 && obj.checkTask10 == 'on') array.push({task: obj.task10, datetime: obj.dateAction10, progress: obj.progress10});
        return array;
    },

    insertActionPoint: async function (array) {
        let ids = [];
        array.forEach(async element => {
            const row = await pool.query('INSERT INTO `actasunicordoba`.`actionspoints` SET ?;', element);
            ids.push(row.insertId);
        });
        return ids;
    }
};

router.get('/new-meeting', auth.isLoggedIn, auth.isFuncionary, (req, res) => {
    res.render('pages/new-meeting');
});

router.post('/new-meeting', auth.isLoggedIn, auth.isFuncionary, async (req, res) => {
    const tasks = privateFuncs.getTasks(req.body);
    const tasksIds = await privateFuncs.insertActionPoint(tasks);
    const meeting = {
        organizer: req.body.organizer,
        datatime: req.body.datatime,
        assistants: req.body.assistants,
        notes: req.body.notes
    }
    const row = await pool.query('INSERT INTO `actasunicordoba`.`meetings` SET ?;', meeting);
    tasksIds.forEach(async element => {
        await pool.query('INSERT INTO `actasunicordoba`.`meetings-actionspoints` (`idmeetings`, `idactionspoints`) VALUES (?, ?);', [row.insertId, element]);
    });
    res.redirect('/panel');
});

module.exports = router;