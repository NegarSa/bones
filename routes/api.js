const express = require('express');
const router = express.Router();
const Tasks = require('../models/tasks');

router.get('/tasks', (req, res, next) => {
    Tasks.find({}, ['action', 'status', 'type_of_day'])
        .then((data) => res.json(data))
        .catch(next);
});

router.get('/bones', (req, res, next) => {
    Tasks.find({type_of_day: 'bones'}, ['action', 'status', 'type_of_day'])
        .then((data) => res.json(data))
        .catch(next);
});

router.get('/nobones', (req, res, next) => {
    Tasks.find({type_of_day: 'no bones'}, ['action', 'status', 'type_of_day'])
        .then((data) => res.json(data))
        .catch(next);
});

router.post('/tasks', (req, res, next) => {
    if (req.body.action) {
        Tasks.create(req.body)
            .then((data) => res.json(data))
            .catch(next);
    } 
    else {
        res.json({
            error: 'The input field is empty',
            stuff: req.body,
        });
    }
});

module.exports = router;
  