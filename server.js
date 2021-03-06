const express = require('express');
const app = express();
const cors = require('cors');
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);



/*Error*/
app.use((req, res) => {
  res.status(404).json({ message: 'not found...'});
})

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});