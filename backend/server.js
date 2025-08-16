const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const reportRoutes = require('./routes/reportRoutes');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors()); // Mengizinkan permintaan dari frontend
app.use(bodyParser.json()); // Mengurai data JSON yang masuk

// Routes
app.use('/api', reportRoutes);

app.listen(PORT, () => {
  console.log(`Server backend berjalan di http://localhost:${PORT}`);
});