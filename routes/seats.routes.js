const express = require('express');
const router = express.Router();
const uuidv1 = require('uuid/v1');

const db = require('../db.js');

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
    res.json(db.seats.filter(data => data.id == req.params.id));
});

router.route('/seats').post((req, res) => {
    const {client, seat, day, email} = req.body;
    const id = uuidv1();

    const isTaken = db.seats.some(el => el.seat === seat && el.day === day );

    if (isTaken) {
        res.status(403).json({ message: 'The slot is already taken...'});
    } else {
        res.json(db.seat.push({ id: id, client:client, seat:seat, day: day, email: email }))
    }
});

router.route('/seats/:id').put((req, res) => {
    db.seats = db.seats.map(data => data.id == req.params.id? {...data, day: req.body.day, seat: req.body.seat, client: req.body.client, email: req.body.email, } : data);
    res.json({ message: 'OK' });
});

router.route('/seats/:id').delete((req, res) => {
    db.seats = db.seats.filter(data => data.id != req.params.id);
    res.json({ message: 'OK' });
});

module.exports = router;
