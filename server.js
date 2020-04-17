const express = require('express');
const cors = require('cors');
const uuidv4 = require('uuid/v4');

const app = express();

/*database */

const db = [
    { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
    { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
  ];

/*middleware*/

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

//app.use(cors());

/*endpoints */

//zwraca całą zawartość tablicy
app.get('/testimonials', (req, res) => {
    res.json(db);
});

//GET /testimonials/:id – zwracamy tylko jeden element tablicy, zgodny z :id
app.get('/testimonials/:id', (req, res) => {
    res.json(db[req.params.id - 1]);
});

//GET /testimonials/random – zwracamy losowy element z tablicy.
app.get('/testimonials/random', (req, res) => {
    res.json(db[Math.floor(Math.random()*db.length)]);
});

//POST /testimonials – dodajemy nowy element do tablicy. Możesz założyć, że body przekazywane przez klienta będzie obiektem z dwoma atrybutami author i text. Id dodawanego elementu musisz losować.
app.post('/testimonials', (req, res) => {
    const {author, text} = req.body;
    const id = uuidv4();
    res.json({id:id, author:author, text:text});
});

//PUT /testimonials/:id – modyfikujemy atrybuty author i text elementu tablicy o pasującym :id. Załóż, że body otrzymane w requeście będzie obiektem z atrybutami author i text
app.put('/testimonials/:id', (req, res) => {
    const {author, text} = req.body;
    res.json({ message: 'OK' });
});

//DELETE /testimonials/:id – usuwamy z tablicy wpis o podanym id.
app.get('/testimonials/:id', (req, res) => {
    res.json({ message: 'OK' });
});


app.listen(8000, () => {
  console.log('Server is running on port 8000');
});