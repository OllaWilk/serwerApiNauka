const express = require('express');
const uuidv1 = require('uuid/v1');
const db = require('./db/db.js');

let app = express();


/*middleware*/

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/*endpoints */

app.get('/testimonials', (req, res) => {
    res.json(db.testimionals);
});

app.get('/testimonials/random', (req, res) => {
    res.json(db.testimionals[Math.floor(Math.random() * db.testimionals.length)]);
});

app.get('/testimonials/:id', (req, res) => {
    res.json(db.testimionals.filter(data => data.id == req.params.id));
});

app.post('/testimonials', (req, res) => {
    const {author, text} = req.body;
    const id = uuidv1();
    res.json({ message: 'OK' });
});

app.put('/testimonials/:id', (req, res) => {
    db.testimionals = db.testimionals.map(data => data.id == req.params.id? {...data, author: req.body.author, text: req.body.text } : data);
    res.json({ message: 'OK' });
});

app.delete('/testimonials/:id', (req, res) => {
    db.testimionals = db.testimionals.filter(data => data.id != req.params.id);
    res.json({ message: 'OK' });
});

app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
})

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});