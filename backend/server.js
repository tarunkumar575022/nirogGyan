const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const doctors =require('./doctors.json'); 


app.use(cors());
app.use(express.json());

app.get('/doctors', (req, res) => {
  res.json(doctors);
});


app.post('/appointments', (req, res) => {
  console.log('Appointment Booked', req.body);
  res.status(201).json({ message: 'Appointment booked successfully' });
});

app.listen(port, () => 
  console.log(`Server is running on http://localhost:${port}`)
);