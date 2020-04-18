const express = require('express');
const router = express.Router();
const uuidv1 = require('uuid/v1');

const db = require('../db/db');

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
    res.json(db.concerts.filter(data => data.id == req.params.id));
});

router.route('/concerts').post((req, res) => {
    const {performer, genre, price, day, image} = req.body;
    const id = uuidv1();
    res.json({ message: 'OK' });
});

router.route('/concerts/:id').put((req, res) => {
    db.concerts = db.concerts.map(data =>
        data.id == req.params.id?
        {...data, performer: req.body.performer, genre: req.body.genre, price: req.body.price, day: req.body.day, image: req.body.image}
        : data);
    res.json({ message: 'OK' });
});

router.route('/concerts/:id').delete((req, res) => {
    db.concerts = db.concerts.filter(data => data.id != req.params.id);
    res.json({ message: 'OK' });
});

module.exports = router;