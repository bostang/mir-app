require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const reportRoutes = require('./routes/reportRoutes');
const applicationRoutes = require('./routes/applicationRoutes'); // Import router baru

const app = express();
const PORT = process.env.PORT; // Gunakan PORT dari .env

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL // Gunakan URL frontend dari .env
}));
app.use(bodyParser.json());

// Routes
app.use('/api', reportRoutes);
app.use('/api/applications', applicationRoutes); // Gunakan router baru untuk endpoint /api/applications

app.listen(PORT, () => {
  console.log(`Server backend berjalan di http://localhost:${PORT}`);
});