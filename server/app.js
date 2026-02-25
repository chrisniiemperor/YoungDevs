const express = require('express');
const cors = require('cors');
const applicationRoutes = require('./routes/applicationRoutes');

const app = express();

app.use(express.json());

const corsOptions = {
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

app.use('/api', applicationRoutes);

app.use((err, req, res, next) => {
  console.error('Global error handler:', err.stack);
  res.status(500).json({ message: 'Something went wrong on the server.' });
});

module.exports = app;