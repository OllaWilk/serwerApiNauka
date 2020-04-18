const express = require('express');
const router = express.Router();
const uuidv1 = require('uuid/v1');
const db = require('../db/db');


router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
    res.json(db.testimonials [Math.floor(Math.random() * db.length)]);
});

router.route('/testimonials/:id').get((req, res) => {
    res.json(db.testimonials .filter(data => data.id == req.params.id));
});

router.route('/testimonials').post((req, res) => {
    const {author, text} = req.body;
    const id = uuidv1();
    res.json({ message: 'OK' });
});

router.route('/testimonials/:id').put((req, res) => {
    db.testimonials  = db.testimonials .map(data => data.id == req.params.id? {...data, author: req.body.author, text: req.body.text } : data);
    res.json({ message: 'OK' });
});

router.route('/testimonials/:id').delete((req, res) => {
    db.testimonials  = db.testimonials .filter(data => data.id != req.params.id);
    res.json({ message: 'OK' });
});

module.exports = router;