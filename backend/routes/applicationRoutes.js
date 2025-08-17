const express = require('express');
const router = express.Router();
const applications = require('../data/applications.json'); // Import data aplikasi

// Endpoint untuk mendapatkan seluruh daftar aplikasi
router.get('/', (req, res) => {
  res.status(200).json(applications);
});

// Endpoint untuk mendapatkan detail satu aplikasi berdasarkan ID
router.get('/:appId', (req, res) => {
  const appId = req.params.appId;
  const application = applications.find(app => app['Application ID'] === appId);

  if (application) {
    res.status(200).json(application);
  } else {
    res.status(404).json({ message: 'Aplikasi tidak ditemukan.' });
  }
});

module.exports = router;