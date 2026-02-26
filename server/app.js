const express = require('express');
const cors = require('cors');
const applicationRoutes = require('./routes/applicationRoutes');

const app = express();

app.use(express.json());
app.use(cors()); // ✅ Allow all origins

app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

app.use('/api', applicationRoutes);

app.use((err, req, res, next) => {
  console.error('Global error handler:', err.stack);
  res.status(500).json({ message: 'Something went wrong on the server.' });
});

module.exports = app;