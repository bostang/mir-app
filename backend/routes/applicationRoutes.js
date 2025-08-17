const express = require('express');
const router = express.Router();
const applications = require('../data/applications.json'); // Data utama aplikasi
const links = require('../data/links.json'); // Data link AOD dan Warroom

// Endpoint untuk mendapatkan seluruh daftar aplikasi
router.get('/', (req, res) => {
  res.status(200).json(applications);
});

// Endpoint untuk mendapatkan detail satu aplikasi berdasarkan ID
router.get('/:appId', (req, res) => {
  const appId = req.params.appId;
  
  // Cari data aplikasi dari applications.json
  const application = applications.find(app => app['Application ID'] === appId);

  if (!application) {
    return res.status(404).json({ message: 'Aplikasi tidak ditemukan.' });
  }

  // Cari data link dari links.json
  const applicationLinks = links.find(link => link['Application ID'] === appId);

  // Gabungkan kedua objek data
  const combinedData = {
    ...application,
    ...applicationLinks
  };

  res.status(200).json(combinedData);
});

module.exports = router;